import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Funktion der ændrer page title ift hvor på siden man er
export function PageTitle({ pageTitle }) {
  const location = useLocation();

  useEffect(() => {
    document.title = pageTitle;
  }, [location, pageTitle]);

  return null;
}