import { Routes, Route } from "react-router";
import Home from "./components/Home";
import CountryDetail from "./components/CountryDetail";
import Fallback from "./components/Fallback";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/country/:alpha3Code" element={<CountryDetail />} />
      <Route path="*" element={<Fallback />} />
    </Routes>
  );
}

export default App;
