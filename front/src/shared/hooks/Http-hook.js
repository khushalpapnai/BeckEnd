import { useState, useCallback, useRef, useEffect } from "react";

export const Httprequest = () => {
  const [isLoading, setIsLogading] = useState(false);
  const [error, setError] = useState();

  const Activehttrequest = useRef([]);

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLogading(true);
      const HttpAbourtControl = new AbortController();

      Activehttrequest.current.push(HttpAbourtControl);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: HttpAbourtControl.signal,
        });

        const responseData = await response.json();
        Activehttrequest.current = Activehttrequest.current.filter(
          (rectrl) => rectrl !== HttpAbourtControl
        );
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLogading(false);
        return responseData;
      } catch (err) {
        setError(err.message || "A something went wrong");
        setIsLogading(false);
        throw err;
      }
    },
    []
  );
  const clearError = () => {
    setError(null);
  };
  useEffect(() => {
    return () => {
      Activehttrequest.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);
  return { isLoading, error, request, clearError };
};
