import React, { useEffect, useState } from "react";
import Coin_item from "../../Components/Coin_item/Coin_item";
import classes from "./Landing_Page.module.css";
import axios from "axios";
import Navigation from "../../Components/Navigation/Navigation";
import Chart_component from "../../Components/Chart/Chart";
import coin_bg from "../../Assets/coin.png";
const Landing_Page = (props) => {
  const [coins, get_coins] = useState(null);

  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=zar&order=market_cap_desc&per_page=10&page=1&sparkline=false";

  useEffect(() => {
    axios.get(url).then((crypto_coins) => get_coins(crypto_coins.data));
  }, []);

  let coins_container = null;
  if (coins)
    coins_container = coins.map((coin) => (
      <Coin_item
        key={coin.id}
        coin_id={coin.id}
        rank={coin.market_cap_rank}
        coin_icon={coin.image}
        name={coin.name}
        current_price={coin.current_price}
        market_cap={coin.market_cap}
        price_change_percentage_24h={coin.price_change_percentage_24h}
        total_volume={coin.total_volume}
      />
    ));
  console.log(coins);
  return (
    <>
      <Navigation />
      <div className={classes.Landing_Page}>
        <div className={classes.header_bar}>
          <div className={classes.inner_wrapper}>
            <h1 className={classes.primary_header}>
              Today's cryptocurrency prices
            </h1>
          </div>
          <div className={classes.bg_wrapper}>
            <img src={coin_bg} />
          </div>
        </div>
        <div className={classes.dashboard_wrapper}>
          <table className={classes.dashboard_header}>
            <tr>
              <td>
                <p>#</p>
              </td>
              <td>
                <p className={classes.header_item}>Coin</p>
              </td>
              <td>
                <p>Price</p>
              </td>
              <td>
                <p>24h</p>
              </td>
              <td>
                <p>Chart</p>
              </td>
              <td>
                <p>Mkt cap</p>
              </td>
            </tr>
          </table>
          {coins_container}
        </div>
      </div>
    </>
  );
};

export default Landing_Page;
