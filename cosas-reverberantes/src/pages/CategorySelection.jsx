import "../styles/CategorySelection.css";

function CategorySelection({ categories, onSelectCategory, onBack }) {
	return (
		<div className="category-selection">
			<button className="back-btn" onClick={onBack}>
				← Back
			</button>
			<h1>What are you suggesting?</h1>
			<h2>Que estas sugeriendo?</h2>
			<div className="categories-grid">
				{categories.map((category) => (
					<button
						key={category}
						className="category-btn"
						onClick={() => onSelectCategory(category)}
					>
						{category}
					</button>
				))}
			</div>
		</div>
	);
}

export default CategorySelection;
