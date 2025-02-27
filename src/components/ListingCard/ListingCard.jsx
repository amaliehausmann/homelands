import { useNavigate } from "react-router-dom";
import { Card } from "../Card/Card";
import { Favorite } from "../Favorite/Favorite";
import { toast } from "react-toastify";

export const ListingCard = ({ array, customStyle, favoriteArray }) => {

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

  const navigate = useNavigate();

  function navigateDetails(id){
    navigate(`/boliger/${id}`)
    updateClickCount(id)
  }

  //PATCH

  const updateClickCount = async (id) =>{
    const options = {
      method: 'PATCH',
    };
    
    try {
      const response = await fetch(`https://api.mediehuset.net/homelands/homes/${id}`, options);
      if (!response.ok){
        throw new Error('Der opstod en fejl')
      }

      const res = await response.json();

    } catch (error) {
      console.error(error.message || 'Der opstod en fejl, prøv igen senere')
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
          custom2={customStyle}
          navigate={()=>navigateDetails(item.id)}
        >
          <Favorite favoriteArray={favoriteArray} listing_id={item.id}/>
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
