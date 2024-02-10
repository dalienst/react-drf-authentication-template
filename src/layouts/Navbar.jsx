/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../authContext";
import { api } from "../api/axios";

import navImage from "../assets/images/logo/2024logo-orange-big.svg";
import { Link } from "react-router-dom";
import { publicLinks } from "../constants/links";

function Navbar() {
  const { user, tokens, logout } = useContext(AuthContext);
  const [person, setPerson] = useState([]);

  const fetchPerson = async () => {
    if (!user?.user_id) {
      return;
    }
    try {
      const response = await api.get(`me/${user?.user_id}/`, {
        headers: {
          Authorization: `Bearer ${tokens?.access}`,
        },
      });
      setPerson(response?.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchPerson();
  }, [user]);

  return (
    <>
      <nav className="navbar navbar-expand-md sticky-top border-bottom bg-white">
        <div className="container">
          <div className="navbar-brand">
            <img src={navImage} alt="" height="35px" />
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasScrolling"
            aria-controls="offcanvasScrolling" // Add aria-controls attribute
          >
            <i className="bi bi-list"></i>
          </button>

          {/* offcanvas */}
          <div
            className="offcanvas offcanvas-start"
            data-bs-scroll="true"
            data-bs-backdrop="false"
            tabIndex="-1"
            id="offcanvasScrolling"
            aria-labelledby="offcanvasScrollingLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasScrollingLabel">
                {user ? <>Hello {person.username}</> : <>Hello</>}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <hr />
              
            </div>
          </div>
          {/* end of offcanvas */}

          <div className="collapse navbar-collapse justify-content-end">
            {user ? (
              <>
                <button className="btn btn-danger fw-semibold" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to={publicLinks?.Login}
                  className="btn btn-success fw-semibold"
                >
                  Login
                </Link>
              </>
            )}
            {/* <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link text-dark fw-semibold">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-dark fw-semibold">
                  Careers
                </NavLink>
              </li>
            </ul> */}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
