import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const ToolbarItems = () => {
  const checkTheme = useSelector((state) => state.themeChangeReducer);
  const location = useLocation();

  const useStyles = makeStyles({
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
  });

  const classes = useStyles();
  return (
    <>
      <Link
        to="/"
        className={
          location.key.includes("texuqvlp") ? classes.link : classes.linkstyle
        }
        onClick={() => window.scroll(0, 0)}
      >
        {" "}
        Home{" "}
      </Link>
      <Link
        to="/categories"
        className={
          location.pathname.includes("/categories") ||
          location.pathname.includes("/category")
            ? classes.link
            : classes.linkstyle
        }
        onClick={() => window.scroll(0, 0)}
      >
        {" "}
        Category{" "}
      </Link>
      <Link
        to="/about"
        className={
          location.pathname.includes("/about")
            ? classes.link
            : classes.linkstyle
        }
        onClick={() => window.scroll(0, 0)}
      >
        {" "}
        About us{" "}
      </Link>
      <Link
        to="/contact"
        className={
          location.pathname.includes("/contact")
            ? classes.link
            : classes.linkstyle
        }
        onClick={() => window.scroll(0, 0)}
      >
        {" "}
        Contact-us{" "}
      </Link>

      <Link
        to="/admin"
        className={
          location.pathname.includes("/admin")
            ? classes.link
            : classes.linkstyle
        }
        onClick={() => window.scroll(0, 0)}
      >
        Admin
      </Link>
    </>
  );
};

export default ToolbarItems;
