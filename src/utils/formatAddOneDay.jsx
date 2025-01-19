export const addOneDay = (dateString) => {
	const date = new Date(dateString);
	date.setDate(date.getDate() + 1);
	return date.toISOString().split("T")[0];
};
