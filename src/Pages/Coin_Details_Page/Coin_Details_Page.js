import React, { useEffect, useState } from "react";
import classes from "./Coin_Details.module.css";
import Navigation from "../../Components/Navigation/Navigation";
import axios from "axios";

const Coin_Details = () => {
  const [coin_details, get_coin_details] = useState(null);

  const url =
    "https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=false";

  useEffect(() => {
    axios.get(url).then((crypto_coin) => get_coin_details(crypto_coin.data));
  }, []);

  console.log(coin_details);

  return (
    <>
      <Navigation />
      <div className={classes.Coin_Details}>
        <div className={classes.Coin_Details_wrapper}>
          <div className={classes.header_bar_wrapper}>
            <div className={classes.coin_icon}>
              <img src={coin_details?.image.small} alt="coin_icon" />
            </div>
            <div className={classes.coin_identifier}>
              <div className={classes.coin_name_wrapper}>
                <div className={classes.coin_name}>Bitcoin</div>
                <div className={classes.coin_symbol}>BTC</div>
              </div>
              <div className={classes.percentage_tracker}>
                +ZAR(
                <span
                  className={
                    coin_details?.market_data.market_cap_change_percentage_24h >
                    0
                      ? classes.increase
                      : classes.decrease
                  }
                >
                  {coin_details?.market_data.market_cap_change_percentage_24h.toFixed(
                    2
                  )}
                  %
                </span>
                )
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coin_Details;
