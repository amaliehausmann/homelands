import { useContext, useState } from "react";
import { GridContainer } from "../components/GridContainer/GridContainer";
import { ListingCard } from "../components/ListingCard/ListingCard";
import { SectionWrapper } from "../components/SectionWrapper/SectionWrapper";
import { useGet } from "../hooks/useGet";
import { UserContext } from "../context/userContext";
import { useParams } from "react-router-dom";
import { PageTitle } from "../components/PageTitle/PageTitle";

export const Listings = () => {
  const { userToken } = useContext(UserContext);

  const { keyword } = useParams();

  //Henter data for boliger
  const { data: listingData } = useGet(
    keyword
      ? `https://api.mediehuset.net/homelands/search/${keyword}`
      : "https://api.mediehuset.net/homelands/homes"
  );
  const { data: favoriteData } = useGet(
    userToken ? "https://api.mediehuset.net/homelands/favorites" : "",
    userToken?.access_token
  );

  //UseState til at holde styr på den valgte sortering
  const [sortOption, setSortOption] = useState("");

  //Laver en kopi af listingData.items arrayet
  let sortedListings = listingData?.items ? [...listingData.items] : [];

  //   SORTERINGER
  //Sorterer alfabetisk efter type hvis denne option er valgt
  if (sortOption === "type") {
    sortedListings.sort((a, b) => a.type.localeCompare(b.type));
  }

  // Sorterer efter pris (laveste til højeste)
  if (sortOption === "priceLowToHigh") {
    sortedListings.sort((a, b) => a.cost - b.cost);
  }

  // Sorterer efter pris (højeste til laveste)
  if (sortOption === "priceHighToLow") {
    sortedListings.sort((a, b) => b.cost - a.cost);
  }

  // Filtrerer favoritter, så kunne disse vises hvis denne option er valgt
  if (sortOption === "favorite" && favoriteData?.items) {
    sortedListings = sortedListings.filter((listing) =>
      favoriteData.items.find((item) => item.home_id === listing.id)
    );
  }

  return (
    <SectionWrapper customStyling="listings">
      <PageTitle pageTitle="HomeLands: Boliger" />
      <span>
        <h2>Boliger til salg</h2>

        {/* sortering options */}
        <select onChange={(e) => setSortOption(e.target.value)}>
          <option value="">Standard sortering</option>
          <option value="type">Sorter efter type</option>
          <option value="priceLowToHigh">
            Sorter efter pris (laveste til højeste)
          </option>
          <option value="priceHighToLow">
            Sorter efter pris (højeste til laveste)
          </option>
          {userToken && (
            <option value="favorite">Sorter efter favoritter</option>
          )}
        </select>
      </span>

      <GridContainer columns={3} gap="custom">
        {/* Viser en besked, hvis der ikke er nogen boliger der matcher sorteringen */}
        {sortedListings.length > 0 ? (
          <ListingCard
            favoriteArray={favoriteData}
            array={sortedListings}
            customStyle="listingSite"
          />
        ) : (
          <p>Ingen boliger fundet.</p>
        )}
      </GridContainer>
    </SectionWrapper>
  );
};
