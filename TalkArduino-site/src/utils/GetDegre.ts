export const GetDegre = (val: number): number => {
  if (val >= 2500 || val <= 400) {
    return val / 5000 * 360;
  }

  if (val > 1300) {
    val += 400;
    return (1700 + (val % 1700) * 17 / 25) / 5000 * 360;
  }

  if (val >= 800) {
    return (val + 400) / 5000 * 360;
  }

  return (400 + (val % 400) * 2) / 5000 * 360;
}