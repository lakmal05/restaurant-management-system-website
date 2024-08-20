"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "../../_styles/scss/Loader.scss";

const Loader = () => {
  // const loader = useSelector((state) => state.loading.isLoading);

  useEffect(() => {
    const pageHeight = document.documentElement.scrollHeight;
    console.log("Page height:", pageHeight);
  }, []);

  return (
    // loader && (
    //   <div id="loader_div">
    //     <div className="loader"></div>
    //   </div>
    // )
    <></>
  );
};

export default Loader;
