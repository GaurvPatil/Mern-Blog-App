import React from 'react'
import {  Outlet } from 'react-router-dom';
import CatTop from '../Components/CatTop/CatTop';


const Lifestyle = () => {
  const sections = [
    {
      name: "All Post",
      link: "/category/lifestyle/allpost",
    },

    {
      name: "Popular Post",
      link: "/category/lifestyle/popularpost",
    },
  ];
  const head = "Fashion & Life-Style"
    return (
        <>
       <CatTop sections = {sections} head = {head}/>
        <Outlet />
        </>
    )
}

export default Lifestyle;
