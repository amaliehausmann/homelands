export const reviewForm = [
  {
    name: "title",
    label: "Titel:",
    validation: {
      required: "Titel er påkrævet",
      minLength: {
        value: 3,
        message: "Titel skal være mindst 3 tegn",
      },
      maxLength: {
        value: 100,
        message: "Titel må ikke være mere end 100 tegn",
      },
    },
  },
  {
    name: "review",
    label: "Anmeldelse:",
    type: "textarea",
    validation: {
      required: "Anmeldelse er påkrævet",
      maxLength: {
        value: 500,
        message: "Anmeldelse må ikke være mere end 500 tegn",
      },
    },
  },
];
