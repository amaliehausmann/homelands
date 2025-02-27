import style from "./Card.module.scss";

export const Card = ({
  image,
  title,
  children,
  custom,
  custom2,
  action,
  alttext,
  navigate
}) => {
  return (
    <div
      onClick={action}
      className={`${style.cardStyling} ${style[custom]} ${style[custom2]}`}
    >
      <img onClick={navigate} src={`${image}`} alt={alttext} />
      <div>
        <h3 onClick={navigate} className={style.title}>{title}</h3>
        {children}
      </div>
    </div>
  );
};
