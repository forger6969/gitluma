import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMe } from "./store/slices/authSlice";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";



const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token && location.pathname !== "/too-many-requests") {
      dispatch(fetchMe());
    }
  }, [location.pathname]);

  return (
    <div className="bg-oq">
      <Outlet />
      <Toaster position="top-right" />
    </div>
  );
};

export default App;