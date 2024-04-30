import React from "react";
import { useCookies } from "react-cookie";
function LogOutButton() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  return (
    <button
      type="button"
      class="btn btn-outline-danger mx-2 "
      onClick={() => {
        removeCookie("userid");
        removeCookie("fullname");
        removeCookie("AuthToken");
        window.location.reload();
      }}
    >
      Logout
    </button>
  );
}
export default LogOutButton;
