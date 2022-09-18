import classes from "./Coin_item.module.css";
import { useNavigate } from "react-router-dom";

const Coin_item = (props) => {
  let navigate = useNavigate();
  const viewCoinDetails = (coin_id) => {
    let path = `/coin/${coin_id}`;
    navigate(path);
  };

  return (
    <table
      className={classes.Coin_item}
      onClick={() => viewCoinDetails(props.coin_id)}
    >
      <tbody>
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
            <p>R{props.market_cap.toLocaleString()}</p>
          </td>
          <td>
            <p
              className={
                props.market_cap_change_percentage_24h > 0
                  ? classes.increase
                  : classes.decrease
              }
            >
              {props.market_cap_change_percentage_24h.toFixed(2)}%
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Coin_item;
