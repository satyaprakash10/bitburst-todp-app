export function compare(a: any, b: any, toggle: boolean = false) {
  // Use toUpperCase() to ignore character casing
  const dataA = a.text.toUpperCase();
  const dataB = b.text.toUpperCase();

	let comparison = 0;
	if (!toggle) {
		if (dataA > dataB) {
			comparison = 1;
		} else if (dataA < dataB) {
			comparison = -1;
		}
	} else {
		if (dataA < dataB) {
			comparison = 1;
		} else if (dataA > dataB) {
			comparison = -1;
		}
	}

  return comparison;
}

export function compareDates(a: any, b: any, toggle: boolean = false) {
	if (!toggle) {
		return Date.parse(a.createdAt) - Date.parse(b.createdAt)
	} else {
		return Date.parse(b.createdAt) - Date.parse(a.createdAt)
	}
}