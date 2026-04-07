import React from "react";

const Login = () => {
  const loginWithGithub = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/github`;
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
      <div
        className="bg-[#161b27] rounded-[18px] px-7 pt-7 pb-[22px] w-full flex flex-col items-center"
        style={{ maxWidth: 340 }}
      >

        {/* Button */}
        <div className="relative inline-flex w-full mb-5">

          {/* Blur soya */}
          <div className="
            absolute -inset-[3px] rounded-[13px] -z-10
            bg-[length:300%_100%]
            [background:linear-gradient(90deg,#6c6be8,#a78bfa,#f472b6,#6c6be8)]
            blur-[10px] opacity-80 animate-spin-gradient
          "/>

          {/* Border qatlam */}
          <div className="
            absolute -inset-[2px] rounded-[12px] -z-10
            bg-[length:300%_100%]
            [background:linear-gradient(90deg,#6c6be8,#a78bfa,#f472b6,#6c6be8)]
            animate-spin-gradient
          "/>

          {/* Tugma */}
          <button
            onClick={loginWithGithub}
            className="
              relative z-10 w-full
              flex items-center justify-center gap-[10px]
              bg-[#6c6be8] hover:bg-[#7877f0]
              active:scale-[0.98] hover:-translate-y-px
              text-white border-none rounded-[10px]
              py-[13px] px-5 text-[15px] font-medium
              transition-all duration-150 cursor-pointer
            "
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.73.5.99 5.24.99 11.51c0 4.87 3.16 9 7.55 10.45.55.1.75-.24.75-.53v-1.87c-3.07.67-3.72-1.48-3.72-1.48-.5-1.26-1.23-1.6-1.23-1.6-1-.7.08-.69.08-.69 1.1.08 1.68 1.14 1.68 1.14.98 1.68 2.56 1.2 3.18.92.1-.72.38-1.2.7-1.47-2.45-.28-5.03-1.22-5.03-5.44 0-1.2.43-2.18 1.14-2.95-.11-.28-.5-1.43.11-2.98 0 0 .93-.3 3.05 1.13a10.6 10.6 0 0 1 5.55 0c2.12-1.43 3.05-1.13 3.05-1.13.61 1.55.22 2.7.11 2.98.71.77 1.14 1.75 1.14 2.95 0 4.23-2.58 5.16-5.04 5.43.39.34.73 1 .73 2.02v3c0 .29.2.64.76.53 4.38-1.45 7.54-5.58 7.54-10.45C23.01 5.24 18.27.5 12 .5z" />
            </svg>
            Continue with GitHub
          </button>
        </div>

        {/* Description */}
        <p className="text-[#c0c4ce] text-[13px] text-center leading-[1.55] mb-[14px]">
          asd
        </p>

        {/* Security badge */}
        <div className="flex items-center gap-2">
          <div className="w-[7px] h-[7px] bg-[#e35050] rounded-full flex-shrink-0" />
          <span className="text-[#4a5568] text-[10.5px] tracking-[0.08em] uppercase">
            asd &nbsp;/&nbsp; asd
          </span>
        </div>
      </div>

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