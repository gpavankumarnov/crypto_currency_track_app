import { makeStyles } from "@material-ui/core";
import React, { useEffect, useContext, useState } from "react";
import { TrendingCoins } from "../config/api";
import axios from "axios";
import { Crypto } from "../CryptoContext";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
const useStyles = makeStyles(() => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
    
  },
  carouselItem:{
    display: "flex",
    alignItems: "center",
    flexDirection:'column',
    color:'white',
    cursor:'pointer',
    textTransform:'uppercase',
    color:'white'
  }
}));

export function numberWithCommas(x){
  //regex to have commas on currentprice 
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const Carousel = () => {
  const [trending, setTrending] = useState([]);

  const { currency, setCurrency, symbol } = useContext(Crypto);

  const classes = useStyles();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  console.log("trending", trending);

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const response = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  const items = trending.map((coin) => {

    let profit = coin.price_change_percentage_24h >= 0
    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img src={coin?.image} alt={coin.name} height="80" />
        <span>{coin?.symbol}
        
        &nbsp;
        <span style={{color: profit > 0 ? "rgba(14,203,129)" : "red", fontWeight:500}}>{profit && '+'} {coin?.price_change_percentage_24h?.toFixed(2)}</span>
        </span>
        <span style={{fontSize:22, fontWeight:500}}>{symbol} {numberWithCommas(coin?.current_price.toFixed(2))}</span>
      </Link>
    );
  });

  

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={response}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
