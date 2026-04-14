// Round to 2 decimal places to avoid floating point issues
// Example: 100/3 = 33.333333 → 33.33
const roundTo2 = (num) => Math.round(num * 100) / 100;

module.exports = { roundTo2 };