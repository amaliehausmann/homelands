import { ToastContainer, Bounce } from "react-toastify";
import { GridContainer } from "../GridContainer/GridContainer";
import { FaTwitterSquare } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import style from './Footer.module.scss'

export const Footer = () => {
  return (
    <>
      <footer className={style.footerStyling}>
        <GridContainer columns={2}>
        <GridContainer columns={3} gap={1}>
          <h2>HomeLands</h2>
          <ul>
            <li>Øster Uttrupvej 5</li>
            <li>9000 Aalborg</li>
          </ul>
          <ul>
            <li>Emal: info@homelands.dk</li>
            <li>Telefon: +45 1122 3344</li>
          </ul>
        </GridContainer>
        <div>
        <FaTwitterSquare />
        <FaSquareFacebook />
        </div>
        </GridContainer>
      </footer>

      {/* Container til toast notifikationer */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
};
