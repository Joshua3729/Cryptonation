import Coin_Details from "./Pages/Coin_Details_Page/Coin_Details_Page";
import Landing_Page from "./Pages/Landing_Page/Landing_Page";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  // return <Landing_Page />;
  return (
    <Routes>
      <Route path="/" exact element={<Landing_Page />} />
      <Route path="/coin/:coin_id" exact element={<Coin_Details />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
