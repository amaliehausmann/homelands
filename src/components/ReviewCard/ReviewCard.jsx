import { useGet } from "../../hooks/useGet";
import { formatMonth } from "../../helpers/formatMonth";
import style from "./ReviewCard.module.scss";
import { Form } from "../Form/Form";
import { reviewForm } from "../../utils/reviewForm";
import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { toast } from "react-toastify";

export const ReviewCard = () => {
  // Henter brugerens token og data fra context
  const { userToken, userData } = useContext(UserContext);

  // Henter anmeldelserne
  const { data: reviewData } = useGet(
    "https://api.mediehuset.net/homelands/reviews"
  );

  // States til at håndtere review-card visning
  const [openReview, setOpenReview] = useState(false);
  const [closeReview, setCloseReview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Vælger en tilfældig anmeldelse fra listen
  const randomReview = reviewData?.items
    ?.sort(() => Math.random() - 0.5)
    .slice(0, 1);

  // Toggler visning af anmeldelsekort
  function toggleReviewCard() {
    if (userToken) {
      setCloseReview((prevState) => !prevState);
      setOpenReview((prevState) => !prevState);
    }
  }

  // Funktion til at sende anmeldelsen
  const submitReview = (data, token) => {
    const body = new URLSearchParams();
    body.append("title", data.title);
    body.append("content", data.review);
    body.append("user_id", userData.id);
    body.append("active", true);
    body.append("num_stars", 5);

    const fetchData = async () => {
      setIsLoading(true);

      const options = {
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer ${token}` },
      };

      try {
        const response = await fetch(
          "https://api.mediehuset.net/homelands/reviews",
          options
        );

        if (!response.ok) {
          throw new Error("Der opstod en fejl");
        }

        const res = await response.json();

        if (res.status === "Ok") {
          toast.success("Tak for din anmeldelse!");
          setOpenReview(false);
          setCloseReview(false);
        } else {
          throw new Error("Der opstod en fejl");
        }
      } catch (err) {
        toast.error(err.message || "Der skete en fejl, prøv igen senere");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  };

  return (
    <>
      {/* Viser en tilfældig anmeldelse hvis den findes og closeReview er false */}
      {randomReview && closeReview === false && (
        <>
          <div
            style={{ cursor: userToken ? "pointer" : "default" }}
            onClick={toggleReviewCard}
            className={style.reviewCard}
          >
            <h2>{randomReview[0].title}...</h2>
            <h2 style={{ fontWeight: "400" }}>
              <i>"{randomReview[0].content}"</i>
            </h2>
            <p>
              {randomReview[0].user.firstname} {randomReview[0].user.lastname},{" "}
              {formatMonth(randomReview[0].created_friendly)}
            </p>
          </div>
          {/* Viser kun "Skriv en anmeldelse", hvis brugeren er logget ind */}
          {userToken ? (
            <p
              onClick={toggleReviewCard}
              style={{ textAlign: "center", cursor: "pointer" }}
              className={style.writeReview}
            >
              Skriv en anmeldelse
            </p>
          ) : null}
        </>
      )}

      {/* Viser formularen til at skrive en anmeldelse, hvis openReview er true og der er et userToken */}
      {openReview && userToken && (
        <div className={style.review}>
          <Form
            formArray={reviewForm}
            callback={(data) => submitReview(data, userToken?.access_token)}
            custom="reviewForm"
            customButton="reviewButton"
          />
        </div>
      )}
    </>
  );
};
