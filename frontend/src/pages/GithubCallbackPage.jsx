import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const GithubCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const access_token = searchParams.get("access_token");
    const refresh_token = searchParams.get("refresh_token");
    const is_new_user = searchParams.get("is_new_user");

    if (!access_token || !refresh_token) {
      setStatus("error");
      return;
    }

    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);

    window.history.replaceState({}, document.title, "/github/callback");

    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        navigate(is_new_user === "true" ? "/onboarding" : "/dashboard");
      }, 1200);
    }, 1000);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-[#0d1117] text-white">
      
      <div className="flex flex-col items-center gap-6">
        
        {/* Loader */}
        {status === "loading" && (
          <>
            <div className="w-16 h-16 border-4 border-gray-700 border-t-white rounded-full animate-spin"></div>
            <p className="text-lg font-medium animate-pulse">
              Входим через GitHub...
            </p>
          </>
        )}

        {/* Success */}
        {status === "success" && (
          <>
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center animate-scale">
              ✓
            </div>
            
            <p className="text-lg font-medium">
              Успешно! Перенаправляем...
            </p>
          </>
        )}

        {/* Error */}
        {status === "error" && (
          <>
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
              ✕
            </div>
            <p className="text-lg font-medium">
              Ошибка авторизации
            </p>
          </>
        )}
      </div>

   
      <style>
        {`
          .animate-scale {
            animation: scaleIn 0.4s ease;
          }

          @keyframes scaleIn {
            from {
              transform: scale(0.5);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default GithubCallbackPage;