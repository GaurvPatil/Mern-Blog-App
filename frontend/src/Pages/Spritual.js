import React from "react";
import {  Outlet } from "react-router-dom";
import CatTop from "../Components/CatTop/CatTop";

const Spritual = () => {
  const sections = [
    {
      name: "All Post",
      link: "/category/spritual/allpost",
    },

    {
      name: "Popular Post",
      link: "/category/spritual/popularpost",
    },
  ];

  const head = "Spritual";
  return (
    <>
      <CatTop sections={sections} head={head} />
      <Outlet />
    </>
  );
};

export default Spritual;
