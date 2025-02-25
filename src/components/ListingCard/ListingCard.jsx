import { useGet } from "../../hooks/useGet";
import { Card } from "../Card/Card";

export const ListingCard = ({ array }) => {

  //Function der returnerer en hexkode udfra hvad energylabel er
  function getBackgroundColor(energyLabel) {
    switch (energyLabel) {
      case "A":
        return "#2d9d40";
      case "B":
        return "#74a634";
      case "C":
        return "#d2a20c";
      case "D":
        return "#d27e17";
      case "E":
        return "#cb4c23";
      case "F":
        return "#810814";
      case "G":
        return "#5a2a57";
      default:
        return "transparent";
    }
  }

  return (
    <>
    {/* Mapper arrayet ud */}
      {array?.map((item) => (
        <Card
          key={item.id}
          image={item.images[0].filename.large}
          title={item.address}
          custom="listings"
        >
          <h5>
            <b>
              {item.zipcode} {item.city}
            </b>
          </h5>
          <h5>{item.type}</h5>
          <div>
            <div>
              <h2
                style={{
                  // Sætter baggrundsfarven baseret på energylabel navn
                  backgroundColor: getBackgroundColor(item.energy_label_name),
                }}
              >
                {item.energy_label_name}
              </h2>
              <h3>
                {item.num_rooms} værelse(r), {item.floor_space}m<sup>2</sup>
              </h3>
            </div>
            <h3>
              {/* Ganger tallet med 1000 og returnerer tallet som et dansk tal */}
              {(Number(item.cost) * 1000).toLocaleString("da-DK")},00 DKK
            </h3>
          </div>
        </Card>
      ))}
    </>
  );
};
