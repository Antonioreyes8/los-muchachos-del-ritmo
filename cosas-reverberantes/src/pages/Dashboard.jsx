import "../styles/Dashboard.css";
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

function Dashboard({ suggestions = [], onDelete }) {
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

	const getFieldValue = (suggestion, field) => {
		if (field === "creator") {
			return suggestion.author || suggestion.artist_name || suggestion.director || suggestion.creator || "-";
		}
		return suggestion[field] || "-";
	};

	return (
		<div className="dashboard">
			<h1>Los Muchachos del Ritmo</h1>

			<div className="table-wrapper">
				<table>
					<thead>
						<tr>
							<th></th>
							{ALL_FIELDS.map((field) => (
								<th key={field}>{FIELD_LABELS[field]}</th>
							))}
						</tr>
					</thead>

					<tbody>
						{suggestions.length === 0 ? (
							<tr>
								<td colSpan={ALL_FIELDS.length + 1} className="empty-message">
									No suggestions yet
								</td>
							</tr>
						) : (
							suggestions.map((suggestion) => (
								<tr key={suggestion.id}>
									<td>
										<button
											className="delete-btn"
											onClick={() => handleDelete(suggestion.id)}
										>
											−
										</button>
									</td>

									{ALL_FIELDS.map((field) => {
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
		</div>
	);
}

export default Dashboard;