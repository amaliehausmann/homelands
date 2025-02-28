import { useGet } from "../../hooks/useGet";
import { formatDay } from "../../helpers/formatDay";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../../context/userContext";
import style from "./Dashboard.module.scss";

export const Dashboard = () => {
  //Henter reviewData
  const { data: reviewData, setData: setReviewData } = useGet(
    "https://api.mediehuset.net/homelands/reviews"
  );

  const [isLoading, setIsLoading] = useState();
  const { userToken, setUserData, setUserToken } = useContext(UserContext);

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

  //Function til at logge ud
  function logOut() {
    setUserData(null);
    setUserToken(null);
    toast.info("Du er nu logget ud");
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("userToken");
  }

  return (
    <>
      <div className={style.dashBoard}>
        <article>
          <article>
            <h2>Administration</h2>
            <p>Du er logget ind som admin</p>
          </article>
          <button onClick={logOut}>Log ud</button>
        </article>

        <span>
          <h3>Dine anmeldelser</h3>
          <h3>Dato</h3>
          <h3 className={style.actions}>Handling</h3>
        </span>

        {reviewData?.items?.map((item) => (
          <span key={item.id}>
            <h3 style={{ minWidth: "11vw" }}>
              {item.title.substring(0, 10) + "..."}
            </h3>
            <h3>{formatDay(item.created_friendly)}</h3>
            <div className={style.actions}>
              <h3
                style={{ color: "red", cursor: "pointer" }}
                onClick={() => deleteReview(item.id, userToken.access_token)}
              >
                Slet
              </h3>
              <h3 style={{ color: "green", cursor: "pointer" }}>Rediger</h3>
            </div>
          </span>
        ))}
      </div>
    </>
  );
};
