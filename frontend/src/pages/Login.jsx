import React from "react";

const Login = () => {

  const loginWithGithub = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/github`;
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#0d1117]">
      
      <div className="bg-[#161b22] p-8 rounded-2xl shadow-xl flex flex-col items-center gap-6 w-[320px]">
        
       
        <h1 className="text-white text-2xl font-semibold">
          Welcome 👋
        </h1>

        <p className="text-gray-400 text-sm text-center">
          Войди через GitHub, чтобы продолжить
        </p>

        <button
          onClick={loginWithGithub}
          className="w-full flex items-center justify-center gap-3 bg-white text-black font-medium py-3 rounded-xl hover:bg-gray-200 transition-all duration-200 active:scale-95"
        >
        
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path d="M12 .5C5.73.5.99 5.24.99 11.51c0 4.87 3.16 9 7.55 10.45.55.1.75-.24.75-.53v-1.87c-3.07.67-3.72-1.48-3.72-1.48-.5-1.26-1.23-1.6-1.23-1.6-1-.7.08-.69.08-.69 1.1.08 1.68 1.14 1.68 1.14.98 1.68 2.56 1.2 3.18.92.1-.72.38-1.2.7-1.47-2.45-.28-5.03-1.22-5.03-5.44 0-1.2.43-2.18 1.14-2.95-.11-.28-.5-1.43.11-2.98 0 0 .93-.3 3.05 1.13a10.6 10.6 0 0 1 5.55 0c2.12-1.43 3.05-1.13 3.05-1.13.61 1.55.22 2.7.11 2.98.71.77 1.14 1.75 1.14 2.95 0 4.23-2.58 5.16-5.04 5.43.39.34.73 1 .73 2.02v3c0 .29.2.64.76.53 4.38-1.45 7.54-5.58 7.54-10.45C23.01 5.24 18.27.5 12 .5z"/>
          </svg>

          Login with GitHub
        </button>

        {/* Footer */}
        <p className="text-gray-500 text-xs text-center">
          Мы не сохраняем ваш пароль
        </p>
      </div>
    </div>
  );
};

export default Login;