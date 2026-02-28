import { useState } from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import CategorySelection from "./pages/CategorySelection";
import NameSelection from "./pages/NameSelection";
import FormPage from "./pages/FormPage";

const FAMILY_MEMBERS = ["Tony", "Wonk", "Uri", "Tesco", "Matt"];

const CATEGORIES = [
	"Movie",
	"Series",
	"Article",
	"Book",
	"Podcast",
	"Song",
	"Artist",
	"Public entities",
];

function App() {
	const [currentPage, setCurrentPage] = useState("dashboard");
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [selectedName, setSelectedName] = useState(null);
	const [suggestions, setSuggestions] = useState([]);

	const handleAddSuggestion = () => {
		setCurrentPage("categorySelection");
		setSelectedCategory(null);
		setSelectedName(null);
	};

	const handleCategorySelect = (category) => {
		setSelectedCategory(category);
		setCurrentPage("nameSelection");
	};

	const handleNameSelect = (name) => {
		setSelectedName(name);
		setCurrentPage("formPage");
	};

	const handleFormSubmit = (formData) => {
		const newSuggestion = {
			id: Date.now(),
			category: selectedCategory,
			name: selectedName,
			...formData,
		};
		setSuggestions([...suggestions, newSuggestion]);
		setCurrentPage("dashboard");
		setSelectedCategory(null);
		setSelectedName(null);
	};

	const handleBackToDashboard = () => {
		setCurrentPage("dashboard");
		setSelectedCategory(null);
		setSelectedName(null);
	};

	return (
		<div className="App">
			{currentPage === "dashboard" && <Dashboard suggestions={suggestions} />}
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

			{/* Floating Plus Button */}
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
