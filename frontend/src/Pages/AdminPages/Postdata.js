import { Container, makeStyles} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import NavigationIcon from "@material-ui/icons/Navigation";


const Postdata = () => {
  const checkTheme = useSelector((state) => state.themeChangeReducer);
  const ID = useSelector((state) => state.adminIDCheckReducer);

  const location = useLocation();

  const useStyles = makeStyles((theme) => ({
    linkstyle: {
      fontFamily: "monteserrat",
      fontWeight: "bold",
      fontSize: "1.3rem",
    },
    link: {
      fontSize: "1.3rem",
      fontFamily: "monteserrat",
      fontWeight: "bold",
      borderBottom:
        checkTheme === "light" ? "2px solid aqua" : "2px solid gold",
    },
    navigateback: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      border: "2px solid white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transform: "rotate(-90deg)",
      transition: "0.4s",
      "&:hover": {
        background: "white",
        color: "black",
      },
    },

    [theme.breakpoints.down("xs")]: {
      navigateback: {
        width: "25px",
        height: "25px",
      },
    },
  }));
  const classes = useStyles();

  return (
    <Container maxWidth="xl">
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-evenly",
          margin: "3rem",
        }}
      >
        <Link
          to="/adminhome"
          className={classes.navigateback}
          onClick={() => window.scroll(0, 0)}
        >
          <NavigationIcon />
        </Link>
        <Link
          to={`/postdata/${ID}/allpost`}
          className={
            location.pathname.includes("/allpost")
              ? classes.link
              : classes.linkstyle
          }
        >
          All Post
        </Link>
        <Link
          to={`/postdata/${ID}/createpost`}
          className={
            location.pathname.includes("/createpost")
              ? classes.link
              : classes.linkstyle
          }
        >
          Create Post
        </Link>
      </div>
   
      <Outlet />
    </Container>
  );
};

export default Postdata;
