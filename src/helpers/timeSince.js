export function timeSince(dateString) {
  // Splitter dateString i[dag, måned, år]
  const [day, month, year] = dateString.split("-").map(Number);

  // Opretter en Date objekt ud fra de splittede værdier
  const pastDate = new Date(year, month - 1, day);
  const today = new Date();

  // Beregner forskellen i millisekunder
  const differenceInMs = today - pastDate;

  // Konverterer millisekunder til dage
  return Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
}
