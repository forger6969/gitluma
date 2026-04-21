import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe } from "./store/slices/authSlice";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const mode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token && location.pathname !== "/too-many-requests") {
      dispatch(fetchMe());
    }
  }, [dispatch, location.pathname]);

  return (
    <div className="bg-oq">
      <Outlet />
      <Toaster position="top-right" />
    </div>
  );
};

export default App;

