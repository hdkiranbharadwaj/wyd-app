import React from "react";
import { useCookies } from "react-cookie";

function Main() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const userid = cookies.userid;
  return <>{userid}</>;
}
export default Main;
