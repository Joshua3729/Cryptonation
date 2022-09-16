import React, { useEffect, useState } from "react";
import classes from "./Coin_item.module.css";
import axios from "axios";
import Chart_component from "../Chart/Chart";

const Coin_item = (props) => {
  const [chart_data, get_chart_data] = useState(null);

  useEffect(() => {
    const currDate = new Date();
    const prevDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);

    const currTimeStamp = Math.floor(currDate.getTime() / 1000);
    const prevTimeStamp = Math.floor(prevDate.getTime() / 1000);

    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${props.coin_id}/market_chart/range?vs_currency=zar&from=${prevTimeStamp}&to=${currTimeStamp}`
      )
      .then((charts_data) => get_chart_data(charts_data.data))
      .catch((error) => console.log(error));
  }, []);

  let coin_chart = null;
  if (chart_data)
    coin_chart = (
      <Chart_component
        chart_data={chart_data.prices}
        increasing={props.price_change_percentage_24h > 0}
      />
    );
  return (
    <table className={classes.Coin_item}>
      <tr>
        <td>
          <p className={classes.rank}>{props.rank}</p>
        </td>
        <td>
          <div className={classes.coin_icon}>
            <img src={props.coin_icon} alt="coin icon" />
            {props.name}
          </div>
        </td>
        <td>
          <p className={classes.coin_price}>
            R{props.current_price.toLocaleString()}
          </p>
        </td>
        <td>
          <p
            className={
              props.price_change_percentage_24h > 0
                ? classes.increase
                : classes.decrease
            }
          >
            {props.price_change_percentage_24h.toFixed(2)}%
          </p>
        </td>
        <td>
          <div className={classes.chart_wrapper}>{coin_chart}</div>
        </td>
        <td>
          <p>R{props.market_cap.toLocaleString()}</p>
        </td>
      </tr>
    </table>
  );
};

export default Coin_item;
