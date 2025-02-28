import { SectionWrapper } from "../components/SectionWrapper/SectionWrapper";
export const PageNotFound = () => {
  return (
    <SectionWrapper>
      <h1 style={{ margin: "auto", display: "block", textAlign: "center" }}>
        404 - Denne side eksisterer ikke
      </h1>
      <h3 style={{ margin: "auto", textAlign: "center" }}>
        Siden du leder efter findes desværre ikke
      </h3>
    </SectionWrapper>
  );
};
