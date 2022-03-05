import React from "react";
import Footer from "../Components/Footer/Footer";
import HeroConent from "../Components/Home/HeroConent";
import LatestPost from "../Components/Home/LatestPost";
import RandomPopular from "../Components/Home/RandomPopular";

const Home = () => {
  return (
    <>
      <HeroConent />
      <LatestPost />
      <RandomPopular />
      <Footer />
    </>
  );
};

export default Home;
