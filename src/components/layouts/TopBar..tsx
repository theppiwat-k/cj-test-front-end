import React from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../provider/AuthContext";
import {signout as signoutService} from "../../services/user";

export function TopBarComponent() {
  const {user, setAuthenticated} = useAuth();
  const navigate = useNavigate();
  const signout = async () => {
    try {
      await signoutService(user.id);
    } catch (error) {
      console.error(error);
    } finally {
      await setAuthenticated(false);
      navigate("/", {replace: true});
    }
  };

  const handleLoout = () => {
    signout();
  };

  const sidebarToggle = () => {
    const sidebarOverlay = document.querySelector(".sidebar-overlay");
    const sidebarMenu = document.querySelector(".sidebar-menu");
    const main = document.querySelector(".main");
    if (sidebarOverlay && sidebarMenu && main) {
      main.classList.toggle("active");
      sidebarOverlay.classList.toggle("hidden");
      sidebarMenu.classList.toggle("-translate-x-full");
    }
  };

  return (
    <>
      <div className="sticky left-0 top-0 z-30 flex items-center bg-white px-6 py-2 shadow-md shadow-black/5">
        <button
          type="button"
          className="sidebar-toggle text-lg text-gray-600"
          onClick={sidebarToggle}>
          <i className="ri-menu-line"></i>
        </button>
        <ul className="ml-4 flex items-center text-sm">
          <li className="mr-2">
            <a
              href="#"
              className="font-medium text-gray-400 hover:text-gray-600">
              Dashboard
            </a>
          </li>
          <li className="mr-2 font-medium text-gray-600">/</li>
          <li className="mr-2 font-medium text-gray-600">Analytics</li>
        </ul>
        <ul className="ml-auto flex items-center">
          <li className="dropdown ml-3">
            <button
              type="button"
              className="dropdown-toggle flex items-center"
              onClick={handleLoout}>
              <i className="ri-login-box-line"></i>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
