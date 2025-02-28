import { FaCamera } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { Favorite } from "../Favorite/Favorite";
import style from "./DetailsCard.module.scss";
import { timeSince } from "../../helpers/timeSince";
import { Modal } from "../Modal/Modal";
import { useState } from "react";
import { Gallery } from "../Gallery/Gallery";

export const DetailsCard = ({
  title,
  city,
  type,
  space,
  rooms,
  clicks,
  listing_id,
  favoriteArray,
  price,
  cost,
  payout,
  ground,
  plans,
  basement,
  yearRebuilt,
  yearbuilt,
  energylabel,
  time,
  brutto,
  netto,
  description,
  name,
  imgsrc,
  position,
  phone,
  email,
  floorplan,
  imageArray,
}) => {
  // Deler beskrivelsen op i sections ud fra bindestreger
  const descriptionSections = description.split(". ");

  const [openFloorPlan, setOpenFloorPlan] = useState(false);
  const [openGallery, setOpenGallery] = useState(false);

  //Toggler visning af floorplan
  function toggleFloorPlan() {
    setOpenFloorPlan((prevState) => !prevState);
  }

  //Togller visning af galleriet
  function toggleGallery() {
    setOpenGallery((prevState) => !prevState);
  }

  return (
    <div className={style.details}>
      <section className={style.firstRow}>
        <div>
          <h1>{title}</h1>
          <h5>{city}</h5>
          <h5>
            {type} | {space} m<sup>2</sup> | {rooms} vær
          </h5>
          <h5>Set {clicks} gange</h5>
        </div>
        <div>
          <span onClick={toggleGallery}>
            <FaCamera />
          </span>
          <span onClick={toggleFloorPlan}>
            <img src="/blueprint.svg" alt="" />
          </span>
          <span>
            <IoLocationSharp />
          </span>
          <Favorite
            custom="details"
            listing_id={listing_id}
            favoriteArray={favoriteArray}
          />
        </div>
        <div>
          <span style={{ display: "flex" }}>
            <h3>
              <b>Kontantpris</b>
            </h3>
            <h1>{price}</h1>
          </span>
          <h3>Udbetaling {payout}</h3>
          <h3>Ejerudgift per måned {cost}</h3>
        </div>
      </section>
      <section className={style.secondRow}>
        <div>
          <span>
            <h3>Sagsnr.</h3>
            <h3>
              <b>{listing_id}</b>
            </h3>
          </span>
          <span>
            <h3>Boligareal</h3>
            <h3>
              <b>
                {space} m<sup>2</sup>
              </b>
            </h3>
          </span>
          <span>
            <h3>Grundareal</h3>
            <h3>
              <b>
                {ground} m<sup>2</sup>
              </b>
            </h3>
          </span>
          <span>
            <h3>Antal rum</h3>
            <h3>
              <b>{rooms}</b>
            </h3>
          </span>
          <span>
            <h3>Antal plan</h3>
            <h3>
              <b>{plans}</b>
            </h3>
          </span>
        </div>

        <div>
          <span>
            <h3>Kælder</h3>
            <h3>
              <b>
                {basement} m<sup>2</sup>
              </b>
            </h3>
          </span>
          <span>
            <h3>Byggeår</h3>
            <h3>
              <b>{yearbuilt}</b>
            </h3>
          </span>
          <span>
            <h3>Ombygget</h3>
            <h3>
              <b>{yearRebuilt}</b>
            </h3>
          </span>
          <span>
            <h3>Energimærke</h3>
            <h3>
              <b>{energylabel}</b>
            </h3>
          </span>
          <span>
            <h3>Liggetid</h3>
            <h3>
              <b>{timeSince(time)} dage</b>
            </h3>
          </span>
        </div>

        <div>
          <span>
            <h3>Kontantpris</h3>
            <h3>
              <b>{price}</b>
            </h3>
          </span>
          <span>
            <h3>Udbetaling</h3>
            <h3>
              <b>{payout}</b>
            </h3>
          </span>
          <span>
            <h3>Brutto ex. ejerudgift</h3>
            <h3>
              <b>{brutto}</b>
            </h3>
          </span>
          <span>
            <h3>Netto ex. ejerudgift</h3>
            <h3>
              <b>{netto}</b>
            </h3>
          </span>
          <span>
            <h3>Ejerudgift</h3>
            <h3>
              <b>{cost}</b>
            </h3>
          </span>
        </div>
      </section>
      <section className={style.lastRow}>
        <article>
          {/* Mapper description ud i sections */}
          {descriptionSections.map((section) => (
            <p key={section}>{section}.</p>
          ))}
        </article>
        <article>
          <h1>Kontakt</h1>
          <img src={imgsrc} alt="" />
          <h3>
            <b>{name}</b>
          </h3>
          <h3>{position}</h3>
          <h3>Mobil: {phone}</h3>
          <h3>Email: {email}</h3>
        </article>
      </section>
      {openFloorPlan && (
        <Modal action={toggleFloorPlan}>
          <img
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            src={floorplan}
            alt=""
          />
        </Modal>
      )}
      {openGallery && (
        <Modal action={toggleGallery}>
          <Gallery imageArray={imageArray} />
        </Modal>
      )}
    </div>
  );
};
