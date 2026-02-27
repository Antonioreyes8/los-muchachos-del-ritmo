import "../styles/Dashboard.css";

const CATEGORY_FIELDS = {
	Movie: [
		"Who suggested it?",
		"Title",
		"Where is it from?",
		"What era is it from?",
		"Why do you recommend it?",
	],
	Series: [
		"Who suggested it?",
		"Title",
		"Where is it from?",
		"What era is it from?",
		"Why do you recommend it?",
	],
	Article: [
		"Who suggested it?",
		"Title",
		"Where is it from?",
		"What era is it from?",
		"Link",
		"Why do you recommend it?",
	],
	Book: [
		"Who suggested it?",
		"Author",
		"Title",
		"Where is it from?",
		"What era is it from?",
		"Why do you recommend it?",
	],
	Podcast: [
		"Who suggested it?",
		"Title",
		"Where is it from?",
		"What era is it from?",
		"Link",
	],
	Song: [
		"Who suggested it?",
		"Title",
		"Where is it from?",
		"What era is it from?",
		"Why do you recommend it?",
	],
	Artist: [
		"Who suggested it?",
		"Name",
		"Where is it from?",
		"What era is it from?",
		"Why do you recommend it?",
	],
	"Public entities": [
		"Who suggested it?",
		"What era is it from?",
		"When was it created?",
		"Why do you recommend it?",
	],
};

function Dashboard({ suggestions }) {
	const groupedSuggestions = {};

	Object.keys(CATEGORY_FIELDS).forEach((category) => {
		groupedSuggestions[category] = suggestions.filter(
			(s) => s.category === category,
		);
	});

	return (
		<div className="dashboard">
			<h1>Community Dashboard</h1>
			<p className="subtitle">All Suggestions from the Crew</p>

			<div className="tables-container">
				{Object.entries(CATEGORY_FIELDS).map(([category, fields]) => (
					<div key={category} className="table-section">
						<h2>{category}</h2>
						{groupedSuggestions[category].length === 0 ? (
							<p className="empty-message">No suggestions yet for {category}</p>
						) : (
							<div className="table-wrapper">
								<table>
									<thead>
										<tr>
											{fields.map((field) => (
												<th key={field}>{field}</th>
											))}
										</tr>
									</thead>
									<tbody>
										{groupedSuggestions[category].map((suggestion) => (
											<tr key={suggestion.id}>
												<td>{suggestion.name || "-"}</td>
												<td>
													{suggestion.title ||
														suggestion.author ||
														suggestion.artistName ||
														"-"}
												</td>
												<td>{suggestion.whereFrom || "-"}</td>
												<td>{suggestion.era || "-"}</td>
												{category === "Article" || category === "Podcast" ? (
													<td>{suggestion.link || "-"}</td>
												) : null}
												{category === "Public entities" ? (
													<td>{suggestion.createdWhen || "-"}</td>
												) : null}
												<td className="recommendation-cell">
													{suggestion.recommendation || "-"}
												</td>
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
