import "../styles/NameSelection.css";

function NameSelection({ category, family_member, onSelectName, onBack }) {
	return (
		<div className="name-selection">
			<button className="back-btn" onClick={onBack}>
				← Back
			</button>
			<h1>Quien eres?</h1>
			<p className="subtitle">Who are you?</p>
			<div className="names-grid">
				{family_member.map((family_member) => (
					<button
						key={family_member}
						className="name-btn"
						onClick={() => onSelectName(family_member)}
					>
						{family_member}
					</button>
				))}
			</div>
		</div>
	);
}

export default NameSelection;
