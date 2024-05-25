import React, { useContext, useEffect, useState } from "react";
import { Crypto } from "../CryptoContext";
import { HistoricalChart } from "../config/api";
import { CircularProgress, ThemeProvider, makeStyles } from "@material-ui/core";
import { createTheme } from "@material-ui/core";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { chartDays } from "../config/data";
import SelectButton from "./SelectButton";

const useStyles = makeStyles(() => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
  },
}));

const CoinInfo = ({ coin }) => {
  const classes = useStyles();

  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);

  const { currency } = useContext(Crypto);

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricalData(data.prices);
  };

  console.log("historical data is", historicalData);

  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicalData ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                label: historicalData.map((coin) => {
                  /** 
    [0 … 99]
    [100 … 199]
    [200 … 288]
     0 :  Array(2)
                  0 :  1704650132758
                  1 :  3665065.080690347

    We have been given an date(0) and we are formatting in a right format below.
                  */
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}: ${date.getMinutes()} PM `
                      : `${date.getHours()}: ${date.getMinutes()} AM`;

                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicalData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) om ${currency}`,
                    borderColor: "gold",
                  },
                ],
              }}
            />
            <div style={{display:'flex', marginTop:20, justifyContent:'space-around', width:'100%'}}>
              {chartDays.map((day) => (
                <SelectButton key={day.value} onClick={()=>setDays(day.value)} selected={day.value === days}>{day.label}</SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
