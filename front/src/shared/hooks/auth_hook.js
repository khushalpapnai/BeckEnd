import { useState, useCallback, useEffect } from "react";
let logoutTimer;
export const useAuthHook = () => {
  const [token, settoken] = useState(false);
  const [tokenExiringDate, setExpiringDate] = useState();
  const [userId, setuserId] = useState(false);

  const LOGIN = useCallback((uid, token, ExpirationDate) => {
    settoken(token);
    setuserId(uid);
    const exixting =
      ExpirationDate || new Date(new Date().getTime() + 5000 * 60);
    setExpiringDate(exixting);
    localStorage.setItem(
      "userdata",
      JSON.stringify({
        userId: uid,
        token: token,
        Expiration: exixting.toISOString(),
      })
    );
  }, []);
  const LOGOUT = useCallback(() => {
    settoken(null);
    setExpiringDate(null);
    setuserId(null);
    localStorage.removeItem("userdata");
  }, []);
  useEffect(() => {
    if (token && tokenExiringDate) {
      const remainTime = tokenExiringDate.getTime() - new Date().getTime();
      setTimeout(LOGOUT, remainTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, LOGOUT, tokenExiringDate]);
  useEffect(() => {
    const storeddata = JSON.parse(localStorage.getItem("userdata"));
    if (
      storeddata &&
      storeddata.token &&
      new Date(storeddata.Expiration) > new Date()
    ) {
      LOGIN(
        storeddata.userId,
        storeddata.token,
        new Date(storeddata.Expiration)
      );
    }
  }, [LOGIN]);

  return { token, LOGIN, LOGOUT, userId };
};
