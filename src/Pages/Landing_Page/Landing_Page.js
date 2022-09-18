import React, { useEffect, useState } from "react";
import Coin_item from "../../Components/Coin_item/Coin_item";
import classes from "./Landing_Page.module.css";
import axios from "axios";
import Navigation from "../../Components/Navigation/Navigation";
import coin_bg from "../../Assets/coin.png";
import LoadingSpinner from "../../Components/UI/LoadingSpinner/LoadingSpinner";
import Modal from "../../Components/Modal/Modal";
const Landing_Page = (props) => {
  const [coins, get_coins] = useState(null);
  const [show_modal, set_show_modal] = useState(false);
  const [error_message, set_error_message] = useState(null);

  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=zar&order=market_cap_desc&per_page=10&page=1&sparkline=false";

  useEffect(() => {
    axios
      .get(url)
      .then((crypto_coins) => get_coins(crypto_coins.data))
      .catch((error) => {
        set_show_modal(true);
        set_error_message(error.message);
      });
  }, []);

  const close_modal_handler = () => {
    set_show_modal(false);
  };

  let dashboard = (
    <div className={classes.loading_wrapper}>
      <LoadingSpinner />
    </div>
  );

  if (coins)
    dashboard = (
      <div className={classes.dashboard_wrapper}>
        <div className={classes.dashboard_innerWrapper}>
          <table className={classes.dashboard_header}>
            <tbody>
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
                  <p>Mkt cap</p>
                </td>
                <td>
                  <p>24h</p>
                </td>
              </tr>
            </tbody>
          </table>

          {coins.map((coin) => (
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
              market_cap_change_percentage_24h={
                coin.market_cap_change_percentage_24h
              }
            />
          ))}
        </div>
      </div>
    );

  return (
    <>
      <Navigation />
      <Modal show={show_modal} clicked={close_modal_handler}>
        <div className={classes.modal_inner_wrapper}>{error_message}</div>
      </Modal>
      <div className={classes.Landing_Page}>
        <div className={classes.header_bar}>
          <div className={classes.inner_wrapper}>
            <h1 className={classes.primary_header}>
              Today's top 10 crypto coins by market cap
            </h1>
          </div>
          <div className={classes.bg_wrapper}>
            <img src={coin_bg} />
          </div>
        </div>
        {dashboard}
      </div>
    </>
  );
};

export default Landing_Page;
