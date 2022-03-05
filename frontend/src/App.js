import "./App.css";

// Nabar
import Header from "./Components/Header/Header";

// Navbar Pages imported
import Home from "./Pages/Home";
import Category from "./Pages/Catagory";
import About from "./Pages/About";
import Contact from "./Pages/Contact";

//Crypto.....
import Crypto from "./Pages/Crypto";
import CryptoAllPost from "./Components/Crypto/CryptoAllPost";
import CryptoPopularPost from "./Components/Crypto/CryptoPopularPost";

import Viewmarket from "./Pages/Viewmarket";
import SingleCoinPage from "./Components/Viewmarket/SingleCoinPage";

// Life style & Fashion
import Lifestyle from "./Pages/Lifestyle";
import LifeStyleAllPost from "./Components/Lifestyle/LifeStyleAllPost";
import LifestylePopularpost from "./Components/Lifestyle/LifestylePopularPost";

//Spritual
import Spritual from "./Pages/Spritual";
import SpritualAllPost from "./Components/Spritual/SpritualAllPost";
import SpritualPopularPost from "./Components/Spritual/SpritualPopularPost";

//authenticate
import Admin from "./Pages/Authenticate/Admin";
import Auth from "./Pages/Authenticate/Auth";
import ForgotPass from "./Pages/ForgotPass";

// admin pages
import HomeAdminPage from "./Pages/AdminPages/HomeAdminPage";
import Postdata from "./Pages/AdminPages/Postdata";
import AllPostData from "./Pages/AdminPages/AllPostData";

import CreatePost from "./Pages/AdminPages/CreatePost";

// news pages
import AllNewsPostData from "./Pages/AdminPages/News/AllNewsPostData";
import CreateNewsPost from "./Pages/AdminPages/News/CreateNewsPost";


//fetch single post
import FetchSinglePost from "./Components/FetchSinglePost";

// error page
import Error from "./Pages/Error";

// react router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import SingleNews from "./Components/SingleNews";

function App() {
  const checkTheme = useSelector((state) => state.themeChangeReducer);
  const checkLogin = useSelector((state) => state.protectedReducer)
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }
  // themechange code
  const theme = createTheme({
    palette: {
      type: checkTheme === "dark" ? "dark" : "light",
      primary: {
        main: "#000000",
      },
      secondary: {
        main: "#FFFFFF",
      },
    },

    breakpoints: {
      values: {
        xs: 320, // mobile
        sm: 500, //tablet
        md: 767, //landscape
        lg: 960, //laptop
        xl: 1800, //desktop
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Router>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/categories" element={<Category />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Crypto category = gaurav*/}
            <Route path="/category/crypto/" element={<Crypto />}>
              <Route path="allpost" element={<CryptoAllPost />} />
              <Route path="popularpost" element={<CryptoPopularPost />} />

              <Route path="viewmarket" element={<Viewmarket />}>
                <Route
                  path="cryptocurrency/coin/:id"
                  element={<SingleCoinPage />}
                />
              </Route>
            </Route>

            {/* lifestyle category = madiha */}
            <Route path="/category/lifestyle/" element={<Lifestyle />}>
              <Route path="allpost" element={<LifeStyleAllPost />} />
              <Route path="popularpost" element={<LifestylePopularpost />} />
            </Route>

            {/* spritual category = aishwarya  */}
            <Route path="/category/spritual/" element={<Spritual />}>
              <Route path="allpost" element={<SpritualAllPost />} />
              <Route path="popularpost" element={<SpritualPopularPost />} />
            </Route>

            {/* protetced Routes ..........................  */}

            {/* admin page  */}
            <Route path="/admin" element={<Admin />} />

            {checkLogin === "login" && (
              <Route path="/adminhome" element={<HomeAdminPage />} />
            )}

            {/* All Main Post  */}

            {checkLogin === "login" && (
              <Route path="/postdata/:id" element={<Postdata />}>
                <Route path="allpost" element={<AllPostData />} />
                <Route path="createpost" element={<CreatePost />} />
                
              </Route>
            )}

            {/* News  */}

            {checkLogin === "login" && (
              <Route path="/postdata/news" element={<Postdata />}>
                <Route path="allpost" element={<AllNewsPostData />} />
                <Route path="createpost" element={<CreateNewsPost />} />
               
              </Route>
            )}

            {/* protetced Routes ........................... */}

            {/* Authenticate page  */}
            <Route path="/auth" element={<Auth />}></Route>
            {/* forget password  */}
            <Route path="/forgotpassword" element={<ForgotPass />}></Route>

            {/* single  post   */}
            <Route
              path="/category/:categoryname/:id"
              element={<FetchSinglePost />}
            ></Route>
            {/* fetch single news post  */}
            <Route path="/news/:id" element={<SingleNews />} />

            {/* error route  */}
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
