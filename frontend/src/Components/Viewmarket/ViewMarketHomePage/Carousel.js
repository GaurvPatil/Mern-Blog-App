import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { TrendingCoins } from "../../../ViewMarket - Config/api";
import { useSelector } from "react-redux";
import AliceCarousel from "react-alice-carousel";
import Loading from "../../Loading";
import { Link } from "react-router-dom";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const currencyData = useSelector((state) => state.viewMarketReducer);
  const { currency, symbol } = currencyData;

  // fetching trending coins
  useEffect(() => {
    // use mounted for avoid error component try to rendering after termination of component
    let mounted = true;
    const fetchTrendingCoins = async () => {
      try {
        const { data } = await axios.get(TrendingCoins(currency));

        if (mounted) {
          setTrending(data);
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
  }, [currency]);

  // material ui v4
  const useStyles = makeStyles((theme) => ({
    carousel: {
      height: "50%",
      display: "flex",
      alignItems: "center",
      fontFamily: "sans-serif",
    },
    carouselItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "white",
    },
  }));
  const classes = useStyles();
  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;

    return (
      <Link
        className={classes.carouselItem}
        to={`/category/crypto/viewmarket/cryptocurrency/coin/${coin.id}`}
        onClick={() => window.scroll(0, document.documentElement.scrollHeight)}
      >
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    700: {
      items: 3,
    },
    800: {
      items: 4,
    },
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
};

export default Carousel;
