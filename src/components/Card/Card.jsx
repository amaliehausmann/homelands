import style from './Card.module.scss'

export const Card = ({image, title, description, children, custom, custom2, action, alttext}) => {
  return (
    <div onClick={action} className={`${style.cardStyling} ${style[custom]} ${style[custom2]}`}>
        <img src={`${image}`} alt={alttext} />
        <div>
        <h3>{title}</h3>
        <p>{description}</p>
        {children}
        </div>
    </div>
  )
}