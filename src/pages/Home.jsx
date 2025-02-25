import { Card } from "../components/Card/Card";
import { GridContainer } from "../components/GridContainer/GridContainer";
import { ListingCard } from "../components/ListingCard/ListingCard";
import { ReviewCard } from "../components/ReviewCard/ReviewCard";
import { SectionWrapper } from "../components/SectionWrapper/SectionWrapper";
import { Slideshow } from "../components/SlideShow/SlideShow";
import { useGet } from "../hooks/useGet";

export const Home = () => {
  //Henter data for boliger
  const { data: homeListings } = useGet(
    "https://api.mediehuset.net/homelands/homes"
  );

  //Henter data for staff
  const { data: staffData } = useGet(
    "https://api.mediehuset.net/homelands/staff"
  );

  //Finder 3 random boliger
  const randomThreeListings = homeListings?.items
    ?.sort(() => Math.random() - 0.5)
    .slice(0, 3);

  return (
    <>
      <Slideshow custom="negativeMargin" />
      <SectionWrapper>
        <GridContainer columns={3} gap={2}>
          <ListingCard array={randomThreeListings} />
        </GridContainer>
        <h2 style={{ textAlign: "center" }}> Det siger kunderne:</h2>
        <ReviewCard />
        <h2 style={{ textAlign: "center" }}>Mød vores ansatte</h2>
        <SectionWrapper>
          <GridContainer columns={4} gap={1}>
            {staffData?.items?.map((item) => (
              <Card
                key={item.id}
                custom="staff"
                image={item.image}
                title={`${item.firstname} ${item.lastname}`}
              >
                <p>{item.position}</p>
                <div>
                  <h3>
                    {item.firstname} {item.lastname}
                  </h3>
                  <p>{item.position}</p>
                  <p>Email: {item.email}</p>
                  <p>Mobil: {item.phone}</p>
                </div>
              </Card>
            ))}
          </GridContainer>
        </SectionWrapper>
      </SectionWrapper>
    </>
  );
};
