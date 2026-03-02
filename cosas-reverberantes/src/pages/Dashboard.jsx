import "../styles/Dashboard.css";
import { deleteSuggestion } from "../services/suggestions";

const CATEGORY_FIELDS = {
	Movies: ["suggested_by", "title", "where_from", "year", "recommendation"],
	Series: ["suggested_by", "title", "where_from", "year", "recommendation"],
	Articles: [
		"suggested_by",
		"title",
		"where_from",
		"year",
		"link",
		"recommendation",
	],
	Books: [
		"suggested_by",
		"author",
		"title",
		"where_from",
		"year",
		"recommendation",
	],
	Podcasts: ["suggested_by", "title", "where_from", "year", "link"],
	Songs: ["suggested_by", "title", "where_from", "year", "recommendation"],
	Artists: ["suggested_by", "artist_name", "where_from", "year", "recommendation"],
};

const FIELD_LABELS = {
	suggested_by: "Suggested By",
	title: "Title",
	author: "Author",
	artist_name: "Name",
	where_from: "Where",
	year: "Year",
	link: "Link",
	recommendation: "Reccommended because",
};

function Dashboard({ suggestions = [], onDelete }) {
	const groupedSuggestions = Object.keys(CATEGORY_FIELDS).reduce(
		(acc, category) => {
			acc[category] = suggestions.filter(
				(s) => s.category === category
			);
			return acc;
		},
		{}
	);

	const handleDelete = async (id) => {
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this suggestion?"
		);

		if (!confirmDelete) return;

		try {
			await deleteSuggestion(id);
			if (onDelete) onDelete(); // refresh suggestions
		} catch (error) {
			console.error("Error deleting suggestion:", error);
		}
	};

	return (
		<div className="dashboard">
			<h1>Los Muchachos del Ritmo</h1>

			<div className="tables-container">
				{Object.entries(CATEGORY_FIELDS).map(([category, fields]) => (
					<div key={category} className="table-section">
						<h2>{category}</h2>

						{groupedSuggestions[category].length === 0 ? (
							<p className="empty-message">
								No suggestions yet for {category}
							</p>
						) : (
							<div className="table-wrapper">
								<table>
									<thead>
										<tr>
											<th></th> {/* Delete column */}
											{fields.map((field) => (
												<th key={field}>
													{FIELD_LABELS[field]}
												</th>
											))}
										</tr>
									</thead>

									<tbody>
										{groupedSuggestions[category].map((suggestion) => (
											<tr key={suggestion.id}>
												<td>
													<button
														className="delete-btn"
														onClick={() =>
															handleDelete(suggestion.id)
														}
													>
														−
													</button>
												</td>

												{fields.map((field) => (
													<td key={field}>
														{field === "link" && suggestion[field] ? (
															<a
																href={suggestion[field]}
																target="_blank"
																rel="noreferrer"
															>
																View
															</a>
														) : (
															suggestion[field] || "-"
														)}
													</td>
												))}
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

export default Dashboard;