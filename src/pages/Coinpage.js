import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import axios from "axios";
import CoinInfo from "../components/CoinInfo";
import { LinearProgress, Typography, makeStyles } from "@material-ui/core";
import { numberWithCommas } from "../components/CoinsTable";
import { Crypto } from "../CryptoContext";
// import { Theme } from "@material-ui/00
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    // [Theme.breakpoints.down("md")]: {
    //   flexDirection: "column",
    //   alignItems: "center",
    // },
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
    width:"25%"
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
  },
  description: {
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
}));



const Coinpage = () => {
  const classes = useStyles();

  const { id } = useParams();



  const [coin, setCoin] = useState();

  const { currency, symbol } = useContext(Crypto);

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  console.log("coin isssss", coin);

  useEffect(() => {
    fetchCoin();
  }, []);

  if(!coin) return <LinearProgress style={{backgroundColor: "gold"}}/>

  return (
    <div className={classes.container}>
      {/* sidebar */}
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />

        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>

        {/* i want to have description upto pullstop. i don't want more than that. */}
        <Typography variant="subtitle1" className={classes.description}>
          {coin?.description.en.split(".")[0]}
        </Typography>

        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:{" "}
            </Typography>
            <Typography variant="h5">{coin?.market_cap_rank} </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:{" "}
            </Typography>
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}
              {coin?.market_data.current_price[currency.toLowerCase()]}{" "}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:{" "}
            </Typography>
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {coin?.market_data.market_cap[currency.toLowerCase()]
                .toString()
                .slice(0, -6)}{" "}
            </Typography>
          </span>
        </div>
      </div>
      {/* chart */}
      <CoinInfo coin={coin} />
    </div>
  );
};

export default Coinpage;
