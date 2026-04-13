import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMe } from "./store/slices/authSlice";
import { Outlet } from "react-router-dom";import { Toaster } from "react-hot-toast";



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
      <Toaster position="top-right" />
    </div>
  )
};

export default App;