import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { UserContext } from "../../context/userContext";
import { useContext, useEffect, useState } from "react";
import { useGet } from "../../hooks/useGet";
import { toast } from "react-toastify";
import style from './Favorite.module.scss'

export const Favorite = ({ listing_id, favoriteArray }) => {

  const { userToken } = useContext(UserContext);

  // const { data } = useGet(
  //   "https://api.mediehuset.net/homelands/favorites",
  //   userToken?.access_token
  // );

  //Tjekker om listing allerede er liket, some() returnerer true hvis der er et favorite med home_id der matcher listing id
  const isInitiallyLiked = favoriteArray?.items?.some((item) => item.home_id === listing_id);

  const [isLoading, setIsLoading] = useState();
  const [locallyLiked, setLocallyLiked] = useState(isInitiallyLiked);

  //UseEffect som setter locallyLiked når isInitiallyLiked ændrer sig
  useEffect(() => {
    setLocallyLiked(isInitiallyLiked);
  }, [isInitiallyLiked]);

  //opretter ny favorite
  const likeListing = async (id, token) => {
    setIsLoading(true);

    const body = new URLSearchParams();
    body.append("home_id", id);

    const options = {
      method: "POST",
      body: body,
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const response = await fetch(
        `https://api.mediehuset.net/homelands/favorites`,
        options
      );

      if (!response.ok) {
        throw new Error("Der opstod en fejl");
      }

      const res = await response.json();

      if (res.status === "Ok") {
        toast.success("Tilføjet til dine favoritter");
        setLocallyLiked(true);
      } else {
        throw new Error("Der opstod en fejl");
      }
    } catch (error) {
      toast.error(error.message || "Der opstod en fejl");
    } finally {
      setIsLoading(false);
    }
  };

  //Fjerner favorit
  const unlikeListing = async (id, token) => {
    setIsLoading(true);

    const options = {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const response = await fetch(
        `https://api.mediehuset.net/homelands/favorites/${id}`,
        options
      );

      if (!response.ok) {
        throw new Error("Der opstod en fejl");
      }

      const res = await response.json();

      if (res.message === "Record deleted") {
        toast.success("Fjernet fra dine likes");
        setLocallyLiked(false);
      } else {
        throw new Error("Der opstod en fejl");
      }
    } catch (error) {
      toast.error(error.message || "Der opstod en fejl, prøv igen senere");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {userToken && (
        <div className={style.favoriteStyling}>
          {locallyLiked ? (
            <span
              onClick={() => unlikeListing(listing_id, userToken.access_token)}
            >
              <IoMdHeart />
            </span>
          ) : (
            <span
              onClick={() => likeListing(listing_id, userToken.access_token)}
            >
              <IoIosHeartEmpty />
            </span>
          )}
        </div>
      )}
    </>
  );
};
