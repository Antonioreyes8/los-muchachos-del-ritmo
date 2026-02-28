import { useState } from "react";
import "../styles/FormPage.css";

const FORM_FIELDS = {
	Movie: [
		{ label: "Title", key: "title", type: "text", required: true },
		{
			label: "Where is it from?",
			key: "whereFrom",
			type: "text",
			required: true,
		},
		{ label: "What year was it from?", key: "year", type: "text", required: true },
		{
			label: "Why do you recommend it?",
			key: "recommendation",
			type: "textarea",
			required: true,
		},
	],
	Series: [
		{ label: "Title", key: "title", type: "text", required: true },
		{
			label: "Where is it from?",
			key: "whereFrom",
			type: "text",
			required: true,
		},
		{ label: "What year was it from?", key: "year", type: "text", required: true },
		{
			label: "Why do you recommend it?",
			key: "recommendation",
			type: "textarea",
			required: true,
		},
	],
	Article: [
		{ label: "Title", key: "title", type: "text", required: true },
		{
			label: "Where is it from?",
			key: "whereFrom",
			type: "text",
			required: true,
		},
		{ label: "What year was it from?", key: "year", type: "text", required: true },
		{ label: "Link", key: "link", type: "url", required: true },
		{
			label: "Why do you recommend it?",
			key: "recommendation",
			type: "textarea",
			required: true,
		},
	],
	Book: [
		{ label: "Author", key: "author", type: "text", required: true },
		{ label: "Title", key: "title", type: "text", required: true },
		{
			label: "Where is it from?",
			key: "whereFrom",
			type: "text",
			required: true,
		},
		{ label: "What year was it from?", key: "year", type: "text", required: true },
		{
			label: "Why do you recommend it?",
			key: "recommendation",
			type: "textarea",
			required: true,
		},
	],
	Podcast: [
		{ label: "Title", key: "title", type: "text", required: true },
		{
			label: "Where is it from?",
			key: "whereFrom",
			type: "text",
			required: true,
		},
		{ label: "What year was it from?", key: "year", type: "text", required: true },
		{ label: "Link", key: "link", type: "url", required: true },
	],
	Song: [
		{ label: "Title", key: "title", type: "text", required: true },
		{
			label: "Where is it from?",
			key: "whereFrom",
			type: "text",
			required: true,
		},
		{ label: "What year was it from?", key: "year", type: "text", required: true },
		{
			label: "Why do you recommend it?",
			key: "recommendation",
			type: "textarea",
			required: true,
		},
	],
	Artist: [
		{ label: "Name", key: "artistName", type: "text", required: true },
		{
			label: "Where is it from?",
			key: "whereFrom",
			type: "text",
			required: true,
		},
		{ label: "What year was it from?", key: "year", type: "text", required: true },
		{
			label: "Why do you recommend it?",
			key: "recommendation",
			type: "textarea",
			required: true,
		},
	],
	"Public entities": [
		{ label: "Name", key: "entityName", type: "text", required: true },
		{
			label: "Where is it from?",
			key: "whereFrom",
			type: "text",
			required: true,
		},
		{
			label: "Why do you recommend it?",
			key: "recommendation",
			type: "textarea",
			required: true,
		},
	],
};

function FormPage({ category, name, onSubmit, onBack }) {
	const fields = FORM_FIELDS[category] || [];
	const [formData, setFormData] = useState({});
	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const validateForm = () => {
		const newErrors = {};
		fields.forEach((field) => {
			if (field.required && !formData[field.key]) {
				newErrors[field.key] = `${field.label} is required`;
			}
		});
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
			onSubmit(formData);
		}
	};

	return (
		<div className="form-page">
			<button className="back-btn" onClick={onBack}>
				← Back
			</button>
			<h1>Add {category}</h1>
			<p className="subtitle">Suggested by: {name}</p>

			<form onSubmit={handleSubmit} className="suggestion-form">
				{fields.map((field) => (
					<div key={field.key} className="form-group">
						<label htmlFor={field.key}>{field.label}</label>
						{field.type === "textarea" ? (
							<textarea
								id={field.key}
								name={field.key}
								value={formData[field.key] || ""}
								onChange={handleChange}
								rows="5"
								className={errors[field.key] ? "error" : ""}
							/>
						) : (
							<input
								type={field.type}
								id={field.key}
								name={field.key}
								value={formData[field.key] || ""}
								onChange={handleChange}
								className={errors[field.key] ? "error" : ""}
							/>
						)}
						{errors[field.key] && (
							<span className="error-message">{errors[field.key]}</span>
						)}
					</div>
				))}

				<div className="form-actions">
					<button type="submit" className="submit-btn">
						Add Suggestion
					</button>
				</div>
			</form>
		</div>
	);
}

export default FormPage;
