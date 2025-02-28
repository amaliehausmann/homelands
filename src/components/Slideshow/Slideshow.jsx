import { useEffect, useState } from "react";
import style from "./SlideShow.module.scss";
import { useGet } from "../../hooks/useGet";

export const Slideshow = ({ custom }) => {
  // Henter slideshow-billeder fra API'et
  const { data: slideshowImages } = useGet(
    "https://api.mediehuset.net/homelands/images"
  );

  // Tager de sidste 3 billeder fra arrayet
  const threeImages = slideshowImages?.items?.slice(-3) || [];

  // Sorterer billederne efter id
  const sortedImages = threeImages.sort((a, b) => a.id - b.id);

  // Mapper arrayet for at få URL'er
  const imageURLs = sortedImages.map((item) => item.image[0]);

  // State til at holde styr på det nuværende billede i slideshowet
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    // Skifter til næste billede hvert 3. sekund
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % imageURLs.length);
    }, 3000);

    // Rydder intervallet hvis componentet unmountes eller hvis imageURLs ændres
    return () => clearInterval(interval);
  }, [imageURLs]);

  // Returnerer null, hvis der ikke er billeder at vise
  if (imageURLs.length === 0) return null;

  return (
    <section className={`${style.slideshow} ${style[custom]}`}>
      <img src={imageURLs[currentImage]} alt={`Slide ${currentImage + 1}`} />
      <div></div>
    </section>
  );
};
