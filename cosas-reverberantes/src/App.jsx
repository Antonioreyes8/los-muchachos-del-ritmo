import { useEffect, useState } from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import CategorySelection from "./pages/CategorySelection";
import NameSelection from "./pages/NameSelection";
import FormPage from "./pages/FormPage";

import { getSuggestions, createSuggestion } from "./services/suggestions";

const FAMILY_MEMBERS = ["Tony", "Wonk", "Uri", "Tesco", "Matt"];

const CATEGORIES = [
	"Movies",
	"Series",
	"Articles",
	"Books",
	"Podcasts",
	"Songs",
	"Artists",
];

function App() {
	const [currentPage, setCurrentPage] = useState("dashboard");
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [selectedName, setSelectedName] = useState(null);
	const [suggestions, setSuggestions] = useState([]);
	const [loading, setLoading] = useState(true);

	/* ---------------- LOAD FROM SUPABASE ---------------- */

	useEffect(() => {
		loadSuggestions();
	}, []);

	async function loadSuggestions() {
		try {
			const data = await getSuggestions();
			setSuggestions(data);
		} catch (error) {
			console.error("Error loading suggestions:", error);
		} finally {
			setLoading(false);
		}
	}

	/* ---------------- NAVIGATION ---------------- */

	const handleAddSuggestion = () => {
		setCurrentPage("categorySelection");
	};

	const handleCategorySelect = (category) => {
		setSelectedCategory(category);
		setCurrentPage("nameSelection");
	};

	const handleNameSelect = (name) => {
		setSelectedName(name);
		setCurrentPage("formPage");
	};

	const handleBackToDashboard = () => {
		setCurrentPage("dashboard");
		setSelectedCategory(null);
		setSelectedName(null);
	};

	/* ---------------- FORM SUBMIT ---------------- */

	const handleFormSubmit = async (formData) => {
		try {
			await createSuggestion(formData);
			await loadSuggestions(); // refresh from DB
			handleBackToDashboard();
		} catch (error) {
			console.error("Error saving suggestion:", error);
		}
	};

	/* ---------------- RENDER ---------------- */

	return (
		<div className="App">
			{currentPage === "dashboard" &&
				(loading ? (
					<p>Loading suggestions...</p>
				) : (
					<Dashboard suggestions={suggestions} onDelete={loadSuggestions} />
				))}

			{currentPage === "categorySelection" && (
				<CategorySelection
					categories={CATEGORIES}
					onSelectCategory={handleCategorySelect}
					onBack={handleBackToDashboard}
				/>
			)}

			{currentPage === "nameSelection" && (
				<NameSelection
					category={selectedCategory}
					family_member={FAMILY_MEMBERS}
					onSelectName={handleNameSelect}
					onBack={handleBackToDashboard}
				/>
			)}

			{currentPage === "formPage" && (
				<FormPage
					category={selectedCategory}
					name={selectedName}
					onSubmit={handleFormSubmit}
					onBack={handleBackToDashboard}
				/>
			)}

			<button
				className="floating-plus-btn"
				onClick={handleAddSuggestion}
				aria-label="Add new suggestion"
			>
				+
			</button>
		</div>
	);
}

export default App;
