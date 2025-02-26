import { useGet } from "../../hooks/useGet";
import { formatDay } from "../../helpers/formatDay";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../../context/userContext";
import style from "./Dashboard.module.scss";


export const Dashboard = () => {
  const { data: reviewData, setData: setReviewData } = useGet(
    "https://api.mediehuset.net/homelands/reviews"
  );

  const [isLoading, setIsLoading] = useState();
  const { userToken } = useContext(UserContext);

  // Funktion til at slette anmeldelse
  const deleteReview = async (id, token) => {
    setIsLoading(true);

    const options = {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const response = await fetch(
        `https://api.mediehuset.net/homelands/reviews/${id}`,
        options
      );

      if (!response.ok) {
        throw new Error("Der opstod en fejl");
      }

      const res = await response.json();

      if (res.message === "Record deleted") {
        toast.success("Du har slettet anmeldelsen");

        //Sletter det valgte review fra viewet ved at kopiere (spread-operator) det gamle array og filtrere
        setReviewData((prevData) => ({
          ...prevData,
          items: prevData.items.filter((item) => item.id !== id),
        }));
      } else {
        throw new Error("Der opstod en fejl");
      }
    } catch (err) {
      toast.error(err.message || "Der opstod en fejl, prøv igen senere");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={style.dashBoard}>
        <h2>Administration</h2>
        <p>Du er logget ind som admin</p>
        <span>
          <h3>Dine anmeldelser</h3>
          <h3>Dato</h3>
          <h3 className={style.actions}>Handling</h3>
        </span>

        {reviewData?.items?.map((item) => (
          <span key={item.id}>
            <h3>{item.title.substring(0, 10) + "..."}</h3>
            <h3>{formatDay(item.created_friendly)}</h3>
            <div className={style.actions}>
              <h3 style={{ color: "red" }}>Slet</h3>
              <h3
                style={{ color: "green" }}
                onClick={() => deleteReview(item.id, userToken.access_token)}
              >
                Rediger
              </h3>
            </div>
          </span>
        ))}
      </div>
    </>
  );
};
