import React from "react";
import {  Outlet } from "react-router-dom";
import CatTop from "../Components/CatTop/CatTop";

const Crypto = () => {
  const sections = [
    {
      name: "All Post",
      link: "/category/crypto/allpost",
    },
    {
      name: "Popular Post",
      link: "/category/crypto/popularpost",
    },
    {
      name: "View Market",
      link: "/category/crypto/viewmarket",
    },
  ];
  const head = "Crypto";
  return (
    <>
      <CatTop sections={sections} head={head} />
      <Outlet />
    </>
  );
};

export default Crypto;
