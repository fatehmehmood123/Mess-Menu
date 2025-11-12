// Small utility to format meal arrays consistently across the app
// Returns a comma-separated string or "No menu" if not available

export function formatMeal(arr) {
  return Array.isArray(arr) && arr.length > 0 ? arr.join(", ") : "No menu";
}
