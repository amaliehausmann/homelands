export const loginForm = [
  {
    name: "email",
    type: "email",
    placeholder: 'Brugernavn',
    validation: {
      required: "Brugernavn er påkrævet",
      pattern: {
        value: /^[a-zAZ0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Brugernavn skal være en gyldig email",
      },
    },
  },
  {
    name: "password",
    type: "password",
    placeholder: 'Adgangskode',
    validation: {
      required: "Password er påkrævet",
      minLength: { value: 8, message: "Password skal være mindst 8 tegn" },
    },
  },
];
