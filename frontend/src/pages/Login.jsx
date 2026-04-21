import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";
import LoginButton from "../Components/LoginButton";
import LoginComments from "../Components/LoginComments";

const Login = () => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("gl-login-theme") !== "light";
  });

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("gl-login-theme", next ? "dark" : "light");
  };

  const loginWithGithub = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/github`;
  };

  return (
    <div
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      className={`min-h-screen flex flex-col lg:flex-row relative overflow-hidden transition-colors duration-300 ${
        isDark ? "bg-[#2B3141]" : "bg-[#F0F2F7]"
      }`}
    >
      {/* Dark/Light toggle — top right corner */}
      <button
        onClick={toggleTheme}
        className={`fixed top-4 right-4 z-50 p-2.5 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 shadow-md ${
          isDark
            ? "bg-white/10 text-[#EEF1F7]/70 hover:bg-white/20 hover:text-white"
            : "bg-black/10 text-[#2B3141]/70 hover:bg-black/15 hover:text-[#2B3141]"
        }`}
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {/* Login section */}
      <div className="w-full lg:w-[480px] min-h-screen flex flex-col items-center justify-center shrink-0 px-6 relative z-10">
        <div className="w-[52px] h-[52px] bg-[#E8654A] rounded-[14px] flex items-center justify-center mb-[14px]">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
            stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <polyline points="8 10 12 6 16 10" />
            <line x1="12" y1="6" x2="12" y2="18" />
          </svg>
        </div>

        <h1 className={`text-[26px] font-semibold tracking-[0.01em] m-0 mb-1 transition-colors duration-300 ${
          isDark ? "text-[#FFFFFF]" : "text-[#2B3141]"
        }`}>
          GITLUMA
        </h1>
        <p className={`text-[10px] tracking-[0.18em] uppercase mb-7 transition-colors duration-300 ${
          isDark ? "text-[#EEF1F7]/50" : "text-[#2B3141]/50"
        }`}>
          system.auth_initialize
        </p>

        <LoginButton onClick={loginWithGithub} isDark={isDark} />

        <div className="flex items-center gap-[10px] mt-7">
          {["Documentation", "Privacy Policy", "Support"].map((link, i, arr) => (
            <React.Fragment key={link}>
              <a
                href="#"
                className={`text-[12px] no-underline transition-colors ${
                  isDark
                    ? "text-[#EEF1F7]/50 hover:text-[#E8654A]"
                    : "text-[#2B3141]/50 hover:text-[#E8654A]"
                }`}
              >
                {link}
              </a>
              {i < arr.length - 1 && (
                <div className={`w-[3px] h-[3px] rounded-full ${
                  isDark ? "bg-[#EEF1F7]/30" : "bg-[#2B3141]/30"
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Testimonials - hidden below lg */}
      <div className="hidden lg:flex lg:flex-1 lg:min-h-screen overflow-hidden">
        <LoginComments isDark={isDark} />
      </div>
    </div>
  );
};

export default Login;
