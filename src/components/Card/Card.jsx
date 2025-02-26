import style from "./Card.module.scss";

export const Card = ({
  image,
  title,
  children,
  custom,
  custom2,
  action,
  alttext,
}) => {
  return (
    <div
      onClick={action}
      className={`${style.cardStyling} ${style[custom]} ${style[custom2]}`}
    >
      <img src={`${image}`} alt={alttext} />
      <div>
        {children}
      </div>
    </div>
  );
};
