import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMe } from "./store/slices/authSlice";
import { Outlet } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      dispatch(fetchMe());
    }
  }, []);

  return <Outlet />;
};

export default App;