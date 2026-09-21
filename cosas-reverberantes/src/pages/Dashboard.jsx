import "../styles/Dashboard.css";
import { useEffect, useState } from "react";
import { deleteSuggestion } from "../services/suggestions";

const ALL_FIELDS = [
	"category",
	"suggested_by",
	"title",
	"creator",
	"where_from",
	"year",
	"link",
	"description",
];

const FIELD_LABELS = {
	category: "Category",
	suggested_by: "Suggested By",
	title: "Title",
	creator: "Author / Artist / Director",
	where_from: "Where",
	year: "Year",
	link: "Link",
	description: "Description",
};

const TABLE_FIELDS = ALL_FIELDS.filter((field) => field !== "description");

function Dashboard({ suggestions = [], onDelete }) {
	const [categoryFilter, setCategoryFilter] = useState("");
	const [suggestedByFilter, setSuggestedByFilter] = useState("");
	const [sortBy, setSortBy] = useState("created_desc");
	const [selectedSuggestion, setSelectedSuggestion] = useState(null);

	const getCreator = (suggestion) =>
		suggestion.author ||
		suggestion.artist_name ||
		suggestion.director ||
		suggestion.creator ||
		"-";

	const getFieldValue = (suggestion, field) => {
		if (field === "creator") return getCreator(suggestion);
		return suggestion[field] || "-";
	};

	const categories = [
		...new Set(
			suggestions.map((suggestion) => suggestion.category).filter(Boolean),
		),
	].sort();
	const suggestedBy = [
		...new Set(
			suggestions.map((suggestion) => suggestion.suggested_by).filter(Boolean),
		),
	].sort();

	const visibleSuggestions = suggestions
		.filter((suggestion) => {
			const matchesCategory =
				!categoryFilter || suggestion.category === categoryFilter;
			const matchesSuggestedBy =
				!suggestedByFilter || suggestion.suggested_by === suggestedByFilter;
			return matchesCategory && matchesSuggestedBy;
		})
		.sort((first, second) => {
			if (sortBy === "created_desc") {
				return (
					new Date(second.created_at || 0) - new Date(first.created_at || 0)
				);
			}

			const firstYear = Number(first.year);
			const secondYear = Number(second.year);
			const firstHasYear =
				Number.isFinite(firstYear) && first.year !== "" && first.year != null;
			const secondHasYear =
				Number.isFinite(secondYear) &&
				second.year !== "" &&
				second.year != null;

			if (!firstHasYear || !secondHasYear)
				return firstHasYear ? -1 : secondHasYear ? 1 : 0;
			return sortBy === "year_desc"
				? secondYear - firstYear
				: firstYear - secondYear;
		});

	useEffect(() => {
		if (!selectedSuggestion) return undefined;

		const handleKeyDown = (event) => {
			if (event.key === "Escape") setSelectedSuggestion(null);
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [selectedSuggestion]);
	const handleDelete = async (id) => {
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this suggestion?",
		);

		if (!confirmDelete) return;

		try {
			await deleteSuggestion(id);
			if (onDelete) onDelete();
		} catch (error) {
			console.error("Error deleting suggestion:", error);
		}
	};

	return (
		<div className="dashboard">
			<h1>Los Muchachos del Ritmo</h1>

			<div className="table-controls" aria-label="Filter and sort suggestions">
				<label>
					Category
					<select
						value={categoryFilter}
						onChange={(event) => setCategoryFilter(event.target.value)}
					>
						<option value="">All categories</option>
						{categories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
				</label>
				<label>
					Suggested by
					<select
						value={suggestedByFilter}
						onChange={(event) => setSuggestedByFilter(event.target.value)}
					>
						<option value="">Everyone</option>
						{suggestedBy.map((name) => (
							<option key={name} value={name}>
								{name}
							</option>
						))}
					</select>
				</label>
				<label>
					Sort by
					<select
						value={sortBy}
						onChange={(event) => setSortBy(event.target.value)}
					>
						<option value="created_desc">Recently added</option>
						<option value="year_desc">Year: newest first</option>
						<option value="year_asc">Year: oldest first</option>
					</select>
				</label>
			</div>

			<p className="table-scroll-hint">
				Swipe horizontally to see more columns
			</p>

			<div className="table-wrapper">
				<table>
					<thead>
						<tr>
							<th></th>
							{TABLE_FIELDS.map((field) => (
								<th key={field}>{FIELD_LABELS[field]}</th>
							))}
						</tr>
					</thead>

					<tbody>
						{visibleSuggestions.length === 0 ? (
							<tr>
								<td colSpan={TABLE_FIELDS.length + 1} className="empty-message">
									{suggestions.length === 0
										? "No suggestions yet"
										: "No suggestions match these filters"}
								</td>
							</tr>
						) : (
							visibleSuggestions.map((suggestion) => (
								<tr
									key={suggestion.id}
									className="suggestion-row"
									onClick={() => setSelectedSuggestion(suggestion)}
								>
									<td>
										<button
											className="delete-btn"
											onClick={(event) => {
												event.stopPropagation();
												handleDelete(suggestion.id);
											}}
										>
											−
										</button>
									</td>

									{TABLE_FIELDS.map((field) => {
										const value = getFieldValue(suggestion, field);

										return (
											<td
												key={field}
												className={
													["description", "title", "creator"].includes(field)
														? "title-or-description-cell"
														: ""
												}
											>
												{field === "link" && value !== "-" ? (
													<a
														href={value}
														target="_blank"
														rel="noreferrer"
														onClick={(event) => event.stopPropagation()}
													>
														View
													</a>
												) : (
													value
												)}
											</td>
										);
									})}
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>

			{selectedSuggestion && (
				<div
					className="modal-overlay"
					role="presentation"
					onClick={() => setSelectedSuggestion(null)}
				>
					<section
						className="suggestion-modal"
						role="dialog"
						aria-modal="true"
						aria-labelledby="suggestion-modal-title"
						onClick={(event) => event.stopPropagation()}
					>
						<button
							className="modal-close"
							type="button"
							onClick={() => setSelectedSuggestion(null)}
							aria-label="Close suggestion details"
						>
							×
						</button>
						<p className="modal-category">
							{getFieldValue(selectedSuggestion, "category")}
						</p>
						<h2 id="suggestion-modal-title">
							{getFieldValue(selectedSuggestion, "title")}
						</h2>
						<div className="modal-meta">
							<span>{getCreator(selectedSuggestion)}</span>
							<span>{getFieldValue(selectedSuggestion, "year")}</span>
							<span>{getFieldValue(selectedSuggestion, "where_from")}</span>
						</div>
						<p className="modal-description">
							{getFieldValue(selectedSuggestion, "description")}
						</p>
						{selectedSuggestion.link && (
							<a
								href={selectedSuggestion.link}
								target="_blank"
								rel="noreferrer"
							>
								Open link
							</a>
						)}
					</section>
				</div>
			)}
		</div>
	);
}

export default Dashboard;
