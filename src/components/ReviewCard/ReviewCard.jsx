import { useGet } from "../../hooks/useGet";
import { formatMonth } from "../../helpers/formatMonth";
import style from "./ReviewCard.module.scss";
import { Form } from "../Form/Form";
import { reviewForm } from "../../utils/reviewForm";
import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";

export const ReviewCard = () => {
  const { userToken } = useContext(UserContext);

  const { data } = useGet("https://api.mediehuset.net/homelands/reviews");

  const [openReview, setOpenReview] = useState(false);
  const [closeReview, setCloseReview] = useState(false);

  const randomReview = data?.items?.sort(() => Math.random() - 0.5).slice(0, 1);

  //Toggler viewet af reviewCarded baseret på om man har trykket på carded
  function toggleReviewCard() {
    if (userToken) {
      setCloseReview((prevState) => !prevState);
      setOpenReview((prevState) => !prevState);
    } else {
    }
  }

  

  return (
    <>
      {/* Viser en anmeldelse hvis randomReview er tilstede og closeReview er false */}
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
          {/* Vis kun p-tag hvis brugeren er logget ind */}
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
      {/* //Viser form til at skrive anmeldelse hvis openReview er true */}
      {openReview && userToken && (
        <div className={style.review}>
          <Form
            formArray={reviewForm}
            custom="reviewForm"
            customButton="reviewButton"
          />
        </div>
      )}
    </>
  );
};
