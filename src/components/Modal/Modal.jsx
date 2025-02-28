import style from "./Modal.module.scss";
export const Modal = ({ children, action }) => {
  return (
    <>
      <section className={style.modalContainer} onClick={action}></section>
      <div className={style.modal}>{children}</div>
    </>
  );
};
