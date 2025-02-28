import { useParams } from "react-router-dom";
import { Hero } from "../components/Hero/Hero";
import { SectionWrapper } from "../components/SectionWrapper/SectionWrapper";
import { useGet } from "../hooks/useGet";
import { DetailsCard } from "../components/DetailsCard/DetailsCard";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { PageTitle } from "../components/PageTitle/PageTitle";

export const ListingDetails = () => {
  const { id } = useParams();
  const { userToken } = useContext(UserContext);

  // Fetching listing data
  const { data: listingData } = useGet(
    `https://api.mediehuset.net/homelands/homes/${id}`
  );

  // Fetching favorite data if the user is authenticated
  const { data: favoriteData } = useGet(
    userToken ? "https://api.mediehuset.net/homelands/favorites" : "",
    userToken?.access_token
  );

  // Destructuring item from listingData
  const item = listingData?.item;

  // Fixer url for floorplan
  const fixedUrl = item?.floorplan
    ? item.floorplan.replace(
        "https://api.mediehuset.net/images/homelands//plans/https://api.mediehuset.net/images/homelands/plans/",
        "https://api.mediehuset.net/images/homelands/plans/"
      )
    : null;

  return (
    <>
        <PageTitle pageTitle='HomeLands: Detaljer'/>
      {item && (
        <>
          <Hero imgsrc={item.images[0]?.filename?.large || ""} />
          <SectionWrapper>
            <DetailsCard
              title={item.address}
              city={item.city}
              type={item.type}
              space={item.floor_space}
              rooms={item.num_rooms}
              clicks={item.num_clicks}
              listing_id={item.id}
              favoriteArray={favoriteData}
              price={Number(item.price).toLocaleString("da-DK")}
              payout={Number(item.payout).toLocaleString("da-DK")}
              cost={`${Number(item.cost).toLocaleString("da-DK")},00`}
              ground={item.ground_space}
              plans={item.num_floors}
              basement={item.basement_space}
              yearbuilt={item.year_construction}
              yearRebuilt={item.year_rebuilt}
              energylabel={item.energy_label_name}
              time={item.date_friendly}
              brutto={Number(item.gross).toLocaleString("da-DK")}
              netto={Number(item.net).toLocaleString("da-DK")}
              description={item.description}
              name={`${item.staff.firstname} ${item.staff.lastname}`}
              position={item.staff.position}
              phone={item.staff.phone}
              email={item.staff.email}
              imgsrc={item.staff.image}
              floorplan={fixedUrl}
              imageArray={item.images.map((item) => item.filename.large)}
            />
          </SectionWrapper>
        </>
      )}
    </>
  );
};
