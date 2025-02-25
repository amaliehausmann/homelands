//function der formaterer en string til dato i måned + år format
export function formatMonth(timestamp) {
  const date = new Date(timestamp);
  const options = { year: "numeric", month: "long" };

  //Formaterer til dansk format
  const formattedDate = new Intl.DateTimeFormat("da-DK", options).format(date);

  // Returnerer den formaterede dato som en streng
  return formattedDate;
}
