import Coin_Details from "./Pages/Coin_Details_Page/Coin_Details_Page";
import Landing_Page from "./Pages/Landing_Page/Landing_Page";
import { Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing_Page />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="coin/:coin_id" element={<Coin_Details />} />
    </Routes>
  );
}

export default App;
