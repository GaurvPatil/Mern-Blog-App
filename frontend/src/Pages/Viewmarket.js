import React from "react";
import { Outlet } from "react-router-dom";

import Viewmarketheader from "../Components/Viewmarket/Viewmarketheader";
import ViewMarketHomePage from "../Components/Viewmarket/ViewMarketHomePage/ViewMarketHomePage";

const Viewmarket = () => {

  return (
    <>
      <div>
        <Viewmarketheader />
        <ViewMarketHomePage />
        <Outlet />
      </div>
    </>
  );
};

export default Viewmarket;
