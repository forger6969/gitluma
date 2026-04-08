import React from "react";
import LoginButton from "../Components/LoginButton";

const Login = () => {
  const loginWithGithub = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/github`;
    console.log(import.meta.env.VITE_API_URL);
    
  };  




  return (
    <div
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      className="min-h-screen flex flex-col items-center justify-center bg-[#0e1117] px-4"
    >  
      <div className="w-[52px] h-[52px] bg-[#5c5bce] rounded-[14px] flex items-center justify-center mb-[14px]">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
          stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <polyline points="8 10 12 6 16 10" />
          <line x1="12" y1="6" x2="12" y2="18" />
        </svg>
      </div>

      <h1 className="text-white text-[26px] font-semibold tracking-[0.01em] m-0 mb-1">
        GITLUMA
      </h1>
      <p className="text-[#4a5568] text-[10px] tracking-[0.18em] uppercase mb-7">
        system.auth_initialize
      </p>

      {/* Card */}

      <LoginButton onClick={loginWithGithub} />
      {/* Footer */}
      <div className="flex items-center gap-[10px] mt-7">
        {["Documentation", "Privacy Policy", "Support"].map((link, i, arr) => (
          <React.Fragment key={link}>
            <a href="#" className="text-[#4a5568] text-[12px] no-underline hover:text-[#718096] transition-colors">
              {link}
            </a>
            {i < arr.length - 1 && (
              <div className="w-[3px] h-[3px] bg-[#2d3748] rounded-full" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Login;