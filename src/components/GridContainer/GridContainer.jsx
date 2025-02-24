import style from "./GridContainer.module.scss";

export const GridContainer = ({ children, columns, gap }) => {
  return (
    <section className={`${style.gridStyling} ${style[`gap-${gap}`]} ${style[`column-${columns}`]}`}>
      {children}
    </section>
  );
};
