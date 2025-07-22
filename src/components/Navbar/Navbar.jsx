import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/trivflix-logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";
import { login, logout } from "../../firebase";

const Navbar = () => {
  const navRef = useRef();
  const [name, setName] = useState("Profile");

  useEffect(() => {
    const storedName = localStorage.getItem("useremail");
    if (storedName) {
      setName(storedName);
    }

    window.addEventListener("scroll", () => {
      {
        window.scrollY >= 80
          ? navRef.current.classList.add("nav-dark")
          : navRef.current.classList.remove("nav-dark");
      }
    });
  }, []);

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Language</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icon} alt="" className="icons" />
        <p>{name}</p>
        <img src={bell_icon} alt="" className="icons" />
        <div className="navbar-profile">
          <img src={profile_img} alt="" className="profile" />
          <img src={caret_icon} alt="" />

          <div className="dropdown">
            <p
              onClick={() => {
                logout();
              }}
            >
              Sign out
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
