import React, { useState, useEffect } from "react";
import { CoinList } from "../../../ViewMarket - Config/api";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "./Carousel";
import { handleSearch } from "../../../CommonPagination/CommonPagination";

import {
  Container,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Loading from "../../Loading";
import { colorChanger } from "../../../themeColorChanger/themeColorChange";

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState();
  const [page, setPage] = useState(1);
  const checkTheme = useSelector((state) => state.themeChangeReducer);
  const currencyData = useSelector((state) => state.viewMarketReducer);
  const { currency, symbol } = currencyData;
  let navigate = useNavigate();

  // Material Ui v4
  const useStyles = makeStyles({
    row: {
      cursor: "pointer",
      "&:hover": {
        backgroundColor: colorChanger("	#D3D3D3", "#333", checkTheme),
      },
      fontFamily: "sans-serif",
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: colorChanger("black", "gold", checkTheme),
      },
    },
  });
  const classes = useStyles();

  // Fetching coins
  const fetchTrendingCoins = async (mounted) => {
    try {
      const { data } = await axios.get(CoinList(currency));

      if (mounted) {
        setCoins(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // fetching data on first rendering
  useEffect(() => {
    let mounted = true;
    fetchTrendingCoins(mounted);

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // import handleSearch() for check filtered array
  let array = handleSearch(search, coins);



  // for display coins in table
  // slice explain =

  // if array = 100
  // and page = 1
  // (1-1)* 10 , (1-1)*10+10
  // 0*10 , (0)*10+10
  // 0 , 0+10
  // = 10

  // common maths = first solve equation in brackets then divide , mutltiply , addition , sub

  // so if page = 1 then first 10 items dsiplay out of 100
  // anf if user click on 2 in pagination next 10 items will display

  let newArray =
    array.length > 10
      ? array.slice((page - 1) * 10, (page - 1) * 10 + 10)
      : array;



  return (
    <Container style={{ textAlign: "center" }}>
      <Typography
        variant="h4"
        style={{
          margin: 18,
          fontFamily: "Montserrat",
        }}
      >
        Cryptocurrency Prices by Market Cap
      </Typography>

      <TextField
        label="Search For a Crypto Currency.."
        variant="outlined"
        style={{
          width: "100%",
          marginBottom: "10px",
          backgroundColor: colorChanger("#fff", "#333", checkTheme),
        }}
        onChange={(e) => {
          // set Search value if user type something in textfield
          setSearch(e.target.value.toLowerCase());
        }}
      />

      <TableContainer>
        {loading ? (
          <Loading />
        ) : (
          <Table aria-label="simple table">
            {/* header  */}

            <TableHead
              style={{
                backgroundColor: colorChanger("white", "#EEBC1D", checkTheme),
              }}
            >
              <TableRow>
                <TableCell
                  style={{
                    color: "black",
                    fontWeight: "700",
                    fontFamily: "Montserrat",
                  }}
                >
                  Coin
                </TableCell>

                {["Price", "24h Change", "Market Cap"].map((head) => (
                  <TableCell
                    style={{
                      color: "black",
                      fontWeight: "700",
                      fontFamily: "Montserrat",
                    }}
                    key={head}
                    align="right"
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* body  */}
            <TableBody>
              {newArray.map((coin) => {
              
                const profit = coin.price_change_percentage_24h > 0;
                return (
                  <TableRow
                    onClick={() => {
                      navigate(
                        `/category/crypto/viewmarket/cryptocurrency/coin/${coin.id}`,
                        {
                          replace: true,
                        }
                      );

                      window.scroll(0, document.documentElement.scrollHeight);
                    }}
                    className={classes.row}
                    key={coin.name}
                  >
                    {/* Coin Colom  */}

                    <TableCell
                      component="th"
                      scope="row"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 15,
                      }}
                    >
                      <img
                        src={coin?.image}
                        alt={coin.name}
                        height="50"
                        width="50"
                        style={{ marginBottom: 10 }}
                      />

                      {/* Coin colom div    */}
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span
                          style={{
                            textTransform: "uppercase",
                            fontSize: 22,
                          }}
                        >
                          {coin.symbol} {coin.id}
                        </span>
                        <span style={{ color: "darkgrey" }}>{coin.name}</span>
                      </div>
                    </TableCell>

                    {/* Price colom  */}

                    <TableCell align="right">
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                    </TableCell>

                    {/* 24hr change colom  */}

                    <TableCell
                      align="right"
                      style={{
                        color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                        fontWeight: 500,
                      }}
                    >
                      {profit && "+"}
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </TableCell>

                    {/* Market cap colom  */}

                    <TableCell align="right">
                      {symbol}{" "}
                      {numberWithCommas(
                        // slice last 6 digit and add million
                        coin.market_cap.toString().slice(0, -6)
                      )}
                      M
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {/* pagination from material ui  */}
      <Pagination
        // count for number line array = 100 , 100/10 = 10 if division in float to fixed fix it
        // ex = 0.5 = 1 and parseint change string to int bcz count only takes integer not string  
        count={parseInt((array.length / 10).toFixed(0))}
        style={{
          padding: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        classes={{ ul: classes.pagination }}
        // after clicking on pagination number this number is change set
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 450);
        }}
      />
    </Container>
  );
};

export default CoinsTable;
