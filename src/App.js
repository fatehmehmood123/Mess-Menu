import { Route, Routes } from "react-router-dom";
import "./App.css";
import Today from "./Pages/Today";
import Weekly from "./Pages/Weekly";
import { inject } from "@vercel/analytics";

function App() {
  inject();
  return (
    <Routes>
      <Route exact path="/" element={<Today />}></Route>
      <Route exact path="/daily" element={<Today />}></Route>
      <Route exact path="/weekly" element={<Weekly />}></Route>
    </Routes>
  );
}

export default App;
