import React from "react";
import ViewWeekIcon from "@material-ui/icons/ViewWeek";
import ViewAgendaIcon from "@material-ui/icons/ViewAgenda";
import { Tooltip } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

const ChangePosition = () => {
  const checkFlex = useSelector((state) => state.flexReducer);
  const dispatch = useDispatch();
 
  return (
    <>
      <div
        style={{
          margin: "2rem",
        }}
      >
        <Tooltip title={checkFlex === "row" ? "horizontal" : "verticle"} arrow>
          {checkFlex === "row" ? (
            <ViewWeekIcon
              onClick={() => {
                dispatch({ type: "FLEX_COLUMN" });
                dispatch({ type: "DISPLAY_NONE" });
              }}
              style={{
                cursor: "pointer",
              }}
            />
          ) : (
            <ViewAgendaIcon
              onClick={() => {
                dispatch({ type: "FLEX_ROW" });
                dispatch({ type: "DISPLAY_CONTENTS" });
              }}
              style={{
                cursor: "pointer",
              }}
            />
          )}
        </Tooltip>
      </div>
    </>
  );
};

export default ChangePosition;
