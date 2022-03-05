import {
  AppBar,
  Avatar,
  Container,
  IconButton,
  makeStyles,
  Toolbar,
  Tooltip,
} from "@material-ui/core";
import { Brightness2, Brightness7 } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ToolbarItems from "./ToolbarItems";
import navpic from "../../images/navimg.png";
import { deepPurple } from "@material-ui/core/colors";
import { Link, useNavigate } from "react-router-dom";
import decode from "jwt-decode";

// for avoid theme change after refresh, if user set theme to dark and refresh the page is on same mode
// set localStorage here and get values in themeChangeReducer for set default value of state
const avoidChangeTheme = (theme) => {
  if (theme) {
    localStorage.setItem("mode", theme);
    return;
  }
};

const Header = () => {
  const checkTheme = useSelector((state) => state.themeChangeReducer);

  const useStyles = makeStyles((theme) => ({
    // // main container
    Container: {
      display: "flex",
      flexDirection: "row-reverse",
      alignItems: "center",
      justifyContent: "space-between",

      "-webkit-user-select": "none",
      "-moz-user-select": "none",
      "-ms-user-select": "none",
      "user-select": "none",
    },
    Toolbar: {
      display: "flex",
      width: "50%",
      justifyContent: "space-between",
      padding: "15px 5px",
    },
    themeChangeButton: {
      border: checkTheme === "light" ? "2px solid black" : "2px solid gold",
      height: "2.5rem",
      width: "2.5rem",
    },

    menuIcon: {
      display: "none",
    },

    list: {
      width: 250,
    },
    fullList: {
      width: "auto",
    },

    drawernav: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "4rem",
      padding: "1rem",
      marginTop: "1rem",
    },

    heading: {
      color: "rgba(0,183,255, 1)",
      textDecoration: "none",
    },
    image: {
      marginLeft: "15px",
    },

    profile: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "10px",
    },
    userName: {
      display: "flex",
      alignItems: "center",
    },
    brandContainer: {
      display: "flex",
      alignItems: "center",
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },

    [theme.breakpoints.down("md")]: {
      Toolbar: {
        display: "none",
      },
      menuIcon: {
        display: "unset",
        cursor: "pointer",
      },
    },
    [theme.breakpoints.down("sm")]: {
      drawernav: {
        marginTop: "3rem",
      },
    },
    [theme.breakpoints.down("xs")]: {
      drawernav: {
        marginTop: "4rem",
      },
    },
  }));
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [state, setState] = React.useState({
    left: false,
  });

  const [user, setUser] = useState();

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp) logout();
    }

    // jwt
    if (localStorage.getItem("profile"))
   
      setUser(JSON.parse(localStorage.getItem("profile")));


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
navigate("/auth" , {replace:true})
 
    setUser(null);
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <div className={classes.drawernav}>
          <ToolbarItems />
          <img
            src={navpic}
            alt="navpic"
            style={{
              width: "90%",
            }}
          />
        </div>
      </List>
    </div>
  );

  return (
    <>
      <AppBar color="inherit" position="sticky">
        <Container className={classes.Container} maxWidth="xl">
          <div className={classes.menuIcon}>
            <React.Fragment>
              <Button onClick={toggleDrawer("left", true)}>
                {" "}
                <MenuOpenIcon
                  style={{
                    fontSize: "3rem",
                  }}
                />
              </Button>
              <Drawer
                anchor="left"
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
              >
                {list("left")}
              </Drawer>
            </React.Fragment>
          </div>
          <div className={classes.Toolbar}>
            <ToolbarItems />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Tooltip title="change theme" arrow>
              {checkTheme === "light" ? (
                <IconButton
                  className={classes.themeChangeButton}
                  onClick={() => {
                    dispatch({ type: "DARK_THEME" });
                    avoidChangeTheme("dark");
                  }}
                >
                  <Brightness2 />
                </IconButton>
              ) : (
                <IconButton
                  className={classes.themeChangeButton}
                  onClick={() => {
                    dispatch({ type: "LIGHT_THEME" });
                    avoidChangeTheme("light");
                  }}
                >
                  <Brightness7 />
                </IconButton>
              )}
            </Tooltip>
            <Toolbar className={classes.toolbar}>
              {user?.result ? (
                <div className={classes.profile}>
                  <Avatar
                    className={classes.purple}
                    alt={user?.result.name}
                    src={user?.result.imageUrl}
                  >
                    {user?.result.imageUrl
                      ? user?.result.imageUrl
                      : user?.result.name.charAt(0)}
                  </Avatar>

                  <Button
                    style={{ width: "7rem", height: "2rem" }}
                    variant="contained"
                    className={classes.logout}
                    color="secondary"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  style={{ width: "7rem", height: "2rem" }}
                  component={Link}
                  to="/auth"
                  variant="contained"
                  color="primary"
                >
                  Sign In
                </Button>
              )}
            </Toolbar>
          </div>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
