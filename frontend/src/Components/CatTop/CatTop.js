import { Container, makeStyles, Tooltip, Typography } from "@material-ui/core";
import React, { useState } from "react";
import NavigationIcon from "@material-ui/icons/Navigation";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { colorChanger } from "../../themeColorChanger/themeColorChange";
import { useSelector } from "react-redux";
import clsx from "clsx";

const CatTop = ({ sections, head }) => {
  const checkTheme = useSelector((state) => state.themeChangeReducer);

  const useStyles = makeStyles((theme) => ({
    btnOuterDiv: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      gap: "1rem",
      marginBottom: "2rem",
    },

    linkDiv: {
      width: "150px",
      textAlign: "center",
      padding: "0.2rem 0.5rem",
      margin: "0.5rem",
      cursor: "pointer",
      border: colorChanger("2px solid black", "2px solid gold", checkTheme),
      backgroundColor: colorChanger("white", "#212121", checkTheme),
      "-webkit-user-select": "none",
      "-moz-user-select": "none",
      "-ms-user-select": "none",
      "user-select": "none",
    },

    activebtn: {
      backgroundColor: colorChanger("#a4e5af", "gold", checkTheme),
      color: "black",
    },
  }));

  const classes = useStyles();
  const location = useLocation();
  const path = location.pathname.split("/").slice(-1);
  let navigateBack = useNavigate();
  const [value, setValue] = useState(path[0].toUpperCase());

  window.onpopstate = function(){
    const path = location.pathname.split("/").slice(-1);
    setValue(path[0].toUpperCase())
 
  }

  return (
    <Container
      maxWidth="lg"
      style={{
        fontFamily: "monteserrat",
      }}
    >
      <Typography
        variant="h4"
        style={{
          fontWeight: "bold",
          textAlign: "center",
          margin: "2rem",
        }}
      >
        <Tooltip title="back" arrow>
          <NavigationIcon
            onClick={() => navigateBack(-1, { replace: true })}
            style={{ cursor: "pointer", transform: "rotate(-90deg)" }}
          />
        </Tooltip>{" "}
        {head}
      </Typography>

      <div className={classes.btnOuterDiv}>
        {sections.map((section, index) => {
          const secName = section.name.toUpperCase().replaceAll(' ','')
          return (
            <div
              key={index}
              className={clsx(
                classes.linkDiv,
                value === secName && classes.activebtn
              )}
              onClick={() => {
                navigateBack(section.link, { replace: true });

                
                setValue(secName);
              }}
            >
              <Link
                onClick={() => setValue(secName)}
                to={section.link}
                style={{
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                }}
              >
                {section.name}
              </Link>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default CatTop;
