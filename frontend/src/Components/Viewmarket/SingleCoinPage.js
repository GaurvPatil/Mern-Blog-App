import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { SingleCoin } from "../../ViewMarket - Config/api";
import { makeStyles, Typography } from "@material-ui/core";
import Loading from "../Loading";
import { checkButton } from "../../checkBrowserButtons/CheckButtons";
import { numberWithCommas } from "./ViewMarketHomePage/Carousel";
import { colorChanger } from "../../themeColorChanger/themeColorChange";

const SingleCoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const [loading, setLoading] = useState(true);
  const currencyData = useSelector((state) => state.viewMarketReducer);
  const checkTheme = useSelector((state) => state.themeChangeReducer);
  const { currency, symbol } = currencyData;
  const location = useLocation();
  const currentURL = `/category/crypto/market/cryptocurrency/coin/${id}`;
  

  // after relode or browser back buttons check url and scroll to bottom

  checkButton(location, currentURL);

  // fetching single coin
  useEffect(() => {
    let mounted = true;
    const fetchTrendingCoins = async () => {
      try {
        const { data } = await axios.get(SingleCoin(id));

        if (mounted) {
          setCoin(data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTrendingCoins();
    return () => {
      mounted = false;
    };
  }, [id]);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      alignItems: "center",
      fontFamily:"sans-serif",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      paddingBottom: 20,
    },
    sidebar: {
      width: "50%",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        border: "none",
        alignItems: "center",
        paddingRight: 0,
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      paddingRight: 40,
      borderRight: "2px solid grey",
    },

    heading: {
      fontWeight: "bold",
      marginBottom: 10,
      fontFamily: "Montserrat",
      color:colorChanger("black","white",checkTheme),
    },

    prices:{
      fontFamily: "Montserrat",
      color:colorChanger("black","white",checkTheme),
    },

    marketData: {
      width: "50%",
      display: "flex",
      flexDirection: "column",
      padding: 25,
      paddingTop: 20,
      [theme.breakpoints.down("sm")]: {
        alignItems: "center",
        width: "100%",
      },
    },
  }));

  const classes = useStyles();

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <h2
        style={{
          width: "100%",
          textAlign: "center",
          borderBottom:colorChanger("1px solid black","1px solid gold",checkTheme),
          lineHeight: "0.1em",
          margin: "40px 0 20px",
        }}
      >
        <span
          style={{
            background: colorChanger("white","#303030",checkTheme),
            color: colorChanger("black","gold",checkTheme),
            padding: "0 10px",
          }}
        >
          {coin.name}
        </span>
      </h2>

      <div className={classes.container}>
        <div className={classes.sidebar}>
          {/* Sidebar  */}
          <div style={{textAlign:"center"}}>
            <img
              src={coin.image.large}
              alt={coin.name}
              height="200"
              style={{ marginBottmom: 20 }}
            />
            <Typography variant="h4" className={classes.heading}>
              {coin.name}
            </Typography>
          </div>
        </div>

        <div className={classes.marketData}>
          {/* Rank  */}
          <span style={{ display: "flex" }}>
            <Typography variant="h6" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h6"
              className={classes.prices}
            >
              {coin.market_cap_rank}
            </Typography>
          </span>

          {/* current price  */}
          <span style={{ display: "flex" }}>
            <Typography variant="h6" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h6"
              className={classes.prices}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>

          {/* Market Cap */}
          <span style={{ display: "flex" }}>
            <Typography variant="h6" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h6"
              className={classes.prices}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>

          {/* circulating supply  */}
          <span style={{ display: "flex" }}>
            <Typography variant="h6" className={classes.heading}>
              Circulating:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h6"
              className={classes.prices}
            >
              {numberWithCommas(coin.market_data.circulating_supply)
                .toString()
                .slice(0, -6)}
              M
            </Typography>
          </span>

          {/* 24hr low high */}

          <span style={{ display: "flex" }}>
            <Typography variant="h6" className={classes.heading}>
              high-24h:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h6"
              className={classes.prices}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin.market_data.high_24h[currency.toLowerCase()]
              )}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h6" className={classes.heading}>
              low-24h:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h6"
              className={classes.prices}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin.market_data.low_24h[currency.toLowerCase()]
              )}
            </Typography>
          </span>
        </div>
      </div>
    </>
  );
};

export default SingleCoinPage;
