import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./App.css";
import Today from "./Pages/Today";
import Weekly from "./Pages/Weekly";
import { restoreSession, watchAuthState } from "./redux/auth";
import { inject } from "@vercel/analytics";

function App() {
  const dispatch = useDispatch();

  inject();

  useEffect(() => {
    // Paint the signed-in UI immediately from the cached session...
    dispatch(restoreSession());

    // ...then let Firebase be the authority. It corrects the cache if the real
    // session has expired, and keeps up with sign-outs in other tabs.
    // Mounted here rather than in Navbar because App mounts once, while Navbar
    // remounts on every route change.
    const unsubscribe = dispatch(watchAuthState());
    return unsubscribe;
  }, [dispatch]);

  return (
    <Routes>
      <Route exact path="/" element={<Today />}></Route>
      <Route exact path="/daily" element={<Today />}></Route>
      <Route exact path="/weekly" element={<Weekly />}></Route>
    </Routes>
  );
}

export default App;
