// Devanagari numerals converter
export function toDevanagariNumerals(num) {
  const devanagariDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return String(num).replace(/[0-9]/g, (d) => devanagariDigits[Number(d)]);
}
