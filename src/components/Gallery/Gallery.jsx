import { useState } from "react";
import style from "./Gallery.module.scss";

export const Gallery = ({ imageArray }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  //Function der skifter til næste billede
  function goNext() {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageArray.length);
  }

  //Function der skifter til forrige billede
  function goPrev() {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageArray.length - 1 : prevIndex - 1
    );
  }

  return (
    <div className={style.gallery}>
      <button className={style.prev} onClick={goPrev}>
        ←
      </button>
      <img
        src={imageArray[currentIndex]}
        alt={`Gallery Image ${currentIndex}`}
      />
      <button className={style.next} onClick={goNext}>
        →
      </button>
    </div>
  );
};
