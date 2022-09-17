import React, { useEffect, useState } from "react";
import classes from "./Coin_Details.module.css";
import Navigation from "../../Components/Navigation/Navigation";
import axios from "axios";
import Chart_component from "../../Components/Chart/Chart";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../Components/UI/LoadingSpinner/LoadingSpinner";

const Coin_Details = () => {
  const [coin_details, get_coin_details] = useState(null);
  const [chart_data, get_chart_data] = useState(null);
  const [active_tab, set_active_tab] = useState("price");
  const coin_id = useParams().coin_id;

  useEffect(() => {
    const currDate = new Date();
    const prevDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);

    const currTimeStamp = Math.floor(currDate.getTime() / 1000);
    const prevTimeStamp = Math.floor(prevDate.getTime() / 1000);
    console.log(coin_id);
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coin_id}?localization=false&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=false`
      )
      .then((crypto_coin) => get_coin_details(crypto_coin.data))
      .catch((error) => console.log(error));

    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coin_id}/market_chart/range?vs_currency=zar&from=${prevTimeStamp}&to=${currTimeStamp}`
      )
      .then((charts_data) => get_chart_data(charts_data.data))
      .catch((error) => console.log(error));
  }, []);

  const set_active_tab_handler = (tab) => {
    set_active_tab(tab);
  };
  let chartData = null;
  let increasing = null;
  let formatter = Intl.NumberFormat("en", { notation: "compact" });
  console.log(coin_details);

  let coinDetails = (
    <div className={classes.loading_wrapper}>
      <LoadingSpinner />
    </div>
  );

  if (chart_data && coin_details) {
    switch (active_tab) {
      case "price":
        chartData = chart_data.prices;
        increasing = coin_details.market_data.price_change_percentage_24h > 0;
        break;
      case "market_cap":
        chartData = chart_data.market_caps;
        increasing =
          coin_details.market_data.market_cap_change_percentage_24h > 0;
        break;
      case "total_volumes":
        chartData = chart_data.total_volumes;
        increasing =
          coin_details.market_data.market_cap_change_percentage_24h > 0;

        break;

      default:
        chartData = chart_data.prices;

        break;
    }
    coinDetails = (
      <div className={classes.Coin_Details}>
        <div className={classes.Coin_Details_wrapper}>
          <div className={classes.header_bar_wrapper}>
            <div className={classes.coin_icon}>
              <img src={coin_details.image.small} alt="coin_icon" />
            </div>
            <div className={classes.coin_identifier}>
              <div className={classes.coin_name_wrapper}>
                <div className={classes.coin_name}>{coin_details.name}</div>
                <div className={classes.coin_symbol}>{coin_details.symbol}</div>
              </div>
              <div className={classes.percentage_tracker}>
                +ZAR(
                <span
                  className={
                    coin_details.market_data.price_change_percentage_24h > 0
                      ? classes.increase
                      : classes.decrease
                  }
                >
                  {coin_details.market_data.price_change_percentage_24h.toFixed(
                    2
                  )}
                  %
                </span>
                )
              </div>
            </div>
          </div>
          <div className={classes.chart_wrapper}>
            <div className={classes.toggle_btns_wrapper}>
              <div className={classes.toggle_btns_innerWrapper}>
                <button
                  className={
                    active_tab == "price"
                      ? [classes.btn, classes.active].join(" ")
                      : classes.btn
                  }
                  onClick={() => set_active_tab_handler("price")}
                >
                  Price
                </button>
                <button
                  className={
                    active_tab == "market_cap"
                      ? [classes.btn, classes.active].join(" ")
                      : classes.btn
                  }
                  onClick={() => set_active_tab_handler("market_cap")}
                >
                  Market cap
                </button>
                <button
                  className={
                    active_tab == "total_volumes"
                      ? [classes.btn, classes.active].join(" ")
                      : classes.btn
                  }
                  onClick={() => set_active_tab_handler("total_volumes")}
                >
                  Total volume
                </button>
              </div>
            </div>
            <Chart_component
              chart_data={chartData || []}
              increasing={increasing}
              lineWidth={1.5}
              chart_height={"400px"}
            />
          </div>
          <div className={classes.market_stats_wrapper}>
            <h2 className={classes.secondary_header}>
              Market stats and details
            </h2>
            <div className={classes.market_stats_innerWrapper}>
              <div className={classes.market_stat_item}>
                <p className={classes.header}>Price high(24)</p>
                <p className={classes.stat}>
                  R {formatter.format(coin_details.market_data.high_24h.zar)}
                </p>
              </div>
              <div className={classes.market_stat_item}>
                <p className={classes.header}>Price Change(1h)</p>
                <p
                  className={
                    coin_details.market_data
                      .price_change_percentage_1h_in_currency.zar > 0
                      ? classes.stat_increasing
                      : classes.stat_decreasing
                  }
                >
                  {coin_details.market_data.price_change_percentage_1h_in_currency.zar.toFixed(
                    2
                  )}
                  %
                </p>
              </div>
              <div className={classes.market_stat_item}>
                <p className={classes.header}>Price Change(24h)</p>
                <p
                  className={
                    coin_details.market_data
                      .price_change_percentage_24h_in_currency.zar > 0
                      ? classes.stat_increasing
                      : classes.stat_decreasing
                  }
                >
                  {coin_details.market_data.price_change_percentage_24h_in_currency.zar.toFixed(
                    2
                  )}
                  %
                </p>
              </div>
              <div className={classes.market_stat_item}>
                <p className={classes.header}>Price Change(30d)</p>
                <p
                  className={
                    coin_details.market_data
                      .price_change_percentage_30d_in_currency.zar > 0
                      ? classes.stat_increasing
                      : classes.stat_decreasing
                  }
                >
                  {coin_details.market_data.price_change_percentage_30d_in_currency.zar.toFixed(
                    2
                  )}
                  %
                </p>
              </div>
              <div className={classes.market_stat_item}>
                <p className={classes.header}>Popularity score</p>
                <p className={classes.stat}>
                  {coin_details.public_interest_score}
                </p>
              </div>
              <div className={classes.market_stat_item}>
                <p className={classes.header}>Market cap</p>
                <p className={classes.stat}>
                  R {formatter.format(coin_details.market_data.market_cap.zar)}
                </p>
              </div>
              <div className={classes.market_stat_item}>
                <p className={classes.header}>Total volume</p>
                <p className={classes.stat}>
                  R{" "}
                  {formatter.format(coin_details.market_data.total_volume.zar)}
                </p>
              </div>
              <div className={classes.market_stat_item}>
                <p className={classes.header}>Cirtulating supply</p>
                <p className={classes.stat}>
                  {coin_details.market_data.circulating_supply}
                </p>
              </div>
            </div>
          </div>
          <div className={classes.about_wrapper}>
            <h2 className={classes.secondary_header}>
              About {coin_details.name}
            </h2>
            <div
              className={classes.about_text}
              dangerouslySetInnerHTML={{ __html: coin_details.description.en }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navigation />
      {coinDetails}
    </>
  );
};

export default Coin_Details;
