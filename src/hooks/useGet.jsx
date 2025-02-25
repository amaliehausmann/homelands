import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";

export const useGet = (url, token) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();
  const { setUserToken, userToken } = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      const options = {
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},
      };

      if(url.includes('undefined')){
        return;
      };

      try {
        const data = await fetch(url, options);
        const res = await data.json();
        setData(res);

        if (res.access_token) {
          setUserToken(res);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [url, userToken]);
  return { data, error, isLoading };
};
