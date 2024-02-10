import React from "react";
import navImage from "../assets/images/logo/2024logo-orange-big.svg";

function Navbar() {
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
            className="offcanvas offcanvas-start bg-black"
            data-bs-scroll="true"
            data-bs-backdrop="false"
            tabIndex="-1"
            id="offcanvasScrolling"
            aria-labelledby="offcanvasScrollingLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasScrollingLabel">
                Hello
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
          </div>
          {/* end of offcanvas */}

          <div className="collapse navbar-collapse justify-content-end">
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
