import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMe } from "./store/slices/authSlice";
import { Outlet } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      dispatch(fetchMe());

    }
  }, []);
  return (
    <div className="bg-bg-gray-950">
      <Outlet />
    </div>
  )
};

export default App;