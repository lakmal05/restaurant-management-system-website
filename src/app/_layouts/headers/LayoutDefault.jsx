"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AppData from "@data/app.json";
import MiniCart from "@layouts/cart/MiniCart";
import MiniSidebar from "@layouts/sidebar/MiniSidebar";
import { logout } from "@/src/util/CommonFun";

const DefaultHeader = () => {
  const [cartTotal, setCartTotal] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const [miniCart, setMiniCart] = useState(false);
  const [miniSidebar, setMiniSidebar] = useState(false);
  const [isLogin, setIsLogin] = useState(false); //convert to redux later
  const asPath = usePathname();

  useEffect(() => {
    setCartTotal(
      localStorage.getItem("CART_LIST")
        ? JSON.parse(localStorage.getItem("CART_LIST")).length
        : 0
    );
    setIsLogin(localStorage.getItem("CUSTOMER") ? true : false);
  }, []);

  const isPathActive = (path) => {
    return (asPath.endsWith(path) == 1 && path !== "/") || asPath === path;
  };

  const handleSubMenuClick = (index, e) => {
    if (window !== undefined) {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        setOpenSubMenu(openSubMenu === index ? false : index);
      }
    }
  };

  useEffect(() => {
    // close mobile menu
    setMobileMenu(false);
    setMiniCart(false);
    setMiniSidebar(false);
    setOpenSubMenu(false);
  }, [asPath]);

  const handleLogout = () => {
    setIsLogin(false);
    logout();
  };

  return (
    <>
      {/* top bar */}
      <div className="sb-top-bar-frame">
        <div className="sb-top-bar-bg"></div>
        <div className="container">
          <div className="sb-top-bar">
            <Link href="/" className="sb-logo-frame">
              {/* logo img */}
              <img
                src={AppData.header.logo.image}
                alt={AppData.header.logo.alt}
                style={{ height: "auto", width: 200 }}
              />
            </Link>
            {/* menu */}
            <div className="sb-right-side">
              <nav id="sb-dynamic-menu" className="sb-nav sb-menu-transition">
                <ul
                  className={`sb-navigation ${mobileMenu ? "sb-active" : ""}`}
                >
                  {AppData.header.menu.map((item, index) => (
                    <li
                      className={`sb-has-children ${
                        isPathActive(item.link) ? "sb-active" : ""
                      }`}
                      key={`header-menu-item-${index}`}
                    >
                      <Link
                        href={item.link}
                        onClick={
                          item.children.length > 0
                            ? (e) => handleSubMenuClick(index, e)
                            : null
                        }
                      >
                        {item.label}
                      </Link>
                      {item.children.length > 0 && (
                        <ul
                          className={openSubMenu === index ? "sb-active" : ""}
                        >
                          {item.children.map((subitem, subIndex) => (
                            <li
                              key={`header-submenu-item-${subIndex}`}
                              className={
                                isPathActive(subitem.link) ? "sb-active" : ""
                              }
                            >
                              <Link href={subitem.link}>{subitem.label}</Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="sb-buttons-frame">
                {/* login button */}
                <div
                  className={`sb-btn sb-btn-2 sb-btn-gray sb-btn-icon sb-m-0 sb-btn-cart `}
                >
                  {isLogin ? (
                    <span
                      className=" mx-2"
                      onClick={() => {
                        handleLogout();
                      }}
                    >
                      LogOut{" "}
                      <img
                        height={25}
                        src="/img/ui/icons/logout.svg"
                        alt="icon"
                        className="mx-2"
                      />
                    </span>
                  ) : (
                    <Link href="/login">
                      <span className="mx-2">
                        LogIn{" "}
                        <img
                          height={25}
                          src="/img/ui/icons/login.svg"
                          alt="icon"
                          className="mx-2"
                        />
                      </span>
                    </Link>
                  )}
                </div>
                {/* login button end */}
                {/* button */}
                <div
                  className={`sb-btn sb-btn-2 sb-btn-gray sb-btn-icon sb-m-0 sb-btn-cart ${
                    miniCart ? "sb-active" : ""
                  }`}
                  onClick={() => setMiniCart(!miniCart)}
                >
                  <span className="sb-icon">
                    <img src="/img/ui/icons/cart.svg" alt="icon" />
                  </span>
                  <i className="sb-cart-number">{cartTotal}</i>
                </div>
                {/* button end */}
                {/* menu btn */}
                <div
                  className={`sb-menu-btn ${mobileMenu ? "sb-active" : ""}`}
                  onClick={() => setMobileMenu(!mobileMenu)}
                >
                  <span></span>
                </div>
                {/* info btn */}
                <div
                  className={`sb-info-btn ${miniSidebar ? "sb-active" : ""}`}
                  onClick={() => setMiniSidebar(!miniSidebar)}
                >
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* info bar */}
        <div className={`sb-info-bar ${miniSidebar ? "sb-active" : ""}`}>
          <MiniSidebar />
        </div>
        {/* info bar end */}
        {/* minicart */}
        <div className={`sb-minicart ${miniCart ? "sb-active" : ""}`}>
          <MiniCart isOpen={miniCart} />
        </div>
        {/* minicart end */}
      </div>
      {/* top bar end */}
    </>
  );
};
export default DefaultHeader;
