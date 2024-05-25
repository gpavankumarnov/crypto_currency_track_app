import React, { useContext, useEffect, useState } from "react";
import { CoinList } from "../config/api";
import { Crypto } from "../CryptoContext";

import axios from "axios";
import {
  Container,
  LinearProgress,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { createTheme } from "@material-ui/core";
import {useNavigate} from "react-router-dom";
import {TableContainer} from "@material-ui/core";

const useStyles = makeStyles(() => ({}));

export function numberWithCommas(x) {
  //regex to have commas on currentprice
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = () => {
  const classes = useStyles();

  const navigate = useNavigate();

  const { currency, symbol } = useContext(Crypto);

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  console.log("coins", coins);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const handleSearch = () => {
    return coins.filter((coin) => (
      coin.name.toLowerCase().includes(searchVal) || coin.symbol.toLowerCase().includes(searchVal)
    )
  )};

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search For a Crypto Currency"
          variant="outlined"
          style={{ width: "100%" }}
          onChange={(e) => setSearchVal(e.target.value)}
        />

        <TableContainer>
          {loading ? (
            //i will display if its still loading -> linear progress

            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {/* heading finished. */}
              {/* this handleSearch returns us all of the filtered array coins. */}
              <TableBody>
                {handleSearch().map((row) => {
                  const profit = row.price_change_percentage_24h > 0;
                  return (
                    <TableRow
                      onClick={() => navigate(`/coins/${row.id}`)}
                      className="row"
                      key={row.name}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        styles={{ display: "flex", gap: 15 }}
                      >
                        <img
                          src={row?.image}
                          alt={row.name}
                          height="50"
                          style={{ marginBottom: 10 }}
                        />
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span
                            style={{ textTransform: "uppercase", fontSize: 22 }}
                          >
                            {row.symbol}
                          </span>
                          <span style={{ color: "darkgrey" }}>{row.name}</span>
                        </div>
                      </TableCell>{" "}
                      <TableCell
                        align="right"
                        style={{
                          // color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                          fontWeight: 500,
                        }}
                      >
                        {symbol}{" "}
                        {numberWithCommas(row.current_price.toFixed(2))}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                          fontWeight: 500,
                        }}
                      >
                        {profit && "+"}{" "}
                        {row.price_change_percentage_24h.toFixed(2)}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          // color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                          fontWeight: 500,
                        }}
                      >
                        {symbol}{" "}
                        {numberWithCommas(
                          row.market_cap.toString().slice(0, -6)
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
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
