import { supabase } from "../lib/supabase";

/* ------------------ FETCH ALL ------------------ */
export async function getSuggestions() {
	const { data, error } = await supabase
		.from("suggestions")
		.select("*")
		.order("created_at", { ascending: false });

	if (error) throw error;
	return data;
}

/* ------------------ INSERT ------------------ */
export async function createSuggestion(suggestion) {
	const { data, error } = await supabase
		.from("suggestions")
		.insert([suggestion])
		.select();

	if (error) throw error;
	return data;
}

/* ------------------ DELETE ------------------ */
export async function deleteSuggestion(id) {
	const { error } = await supabase
		.from("suggestions")
		.delete()
		.eq("id", id);

	if (error) throw error;
}