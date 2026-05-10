import { Routes, Route } from "react-router";
import Header from "./components/Header";
import Home from "./components/Home";
import CountryDetail from "./components/CountryDetail";
import Fallback from "./components/Fallback";

function App() {
  return (
    <div className="bg-grey-50 min-h-dvh dark:bg-blue-950">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:alpha3Code" element={<CountryDetail />} />
        <Route path="*" element={<Fallback />} />
      </Routes>
    </div>
  );
}

export default App;
