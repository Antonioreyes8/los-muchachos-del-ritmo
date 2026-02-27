import "../styles/NameSelection.css";

function NameSelection({ category, brothers, onSelectName, onBack }) {
	return (
		<div className="name-selection">
			<button className="back-btn" onClick={onBack}>
				← Back
			</button>
			<h1>Who is this suggestion from?</h1>
			<p className="subtitle">Choose your name for {category}</p>
			<div className="names-grid">
				{brothers.map((brother) => (
					<button
						key={brother}
						className="name-btn"
						onClick={() => onSelectName(brother)}
					>
						{brother}
					</button>
				))}
			</div>
		</div>
	);
}

export default NameSelection;
