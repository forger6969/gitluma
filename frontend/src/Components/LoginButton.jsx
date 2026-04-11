import React from 'react'

const LoginButton = ({ onClick }) => {
    return (
        <div
            className="bg-[#232a38] rounded-[18px] px-7 pt-7 pb-[24px] w-full flex flex-col items-center shadow-lg"
            style={{ maxWidth: 340 }}
        >
            {/* Button */}
            <div className="relative inline-flex w-full mb-5">

                {/* Blur glow */}
                <div
                    style={{
                        background: 'linear-gradient(90deg,#E8654A,#f0926e,#E8654A,#E8654A)',
                        backgroundSize: '300% 100%',
                        animation: 'spinGradient 3s linear infinite',
                        filter: 'blur(12px)',
                        opacity: 0.6,
                    }}
                    className="absolute -inset-[4px] rounded-[14px] -z-10"
                />

                {/* Border */}
                <div
                    style={{
                        background: 'linear-gradient(90deg,#E8654A,#f0926e,#E8654A,#E8654A)',
                        backgroundSize: '300% 100%',
                        animation: 'spinGradient 3s linear infinite',
                    }}
                    className="absolute -inset-[2px] rounded-[12px] -z-10"
                />

                {/* Button */}
                <button
                    onClick={onClick}
                    className="
                        relative z-10 w-full
                        flex items-center justify-center gap-[10px]
                        bg-[#E8654A] hover:bg-[#d55a42]
                        active:scale-[0.97] hover:-translate-y-[1px]
                        text-white border-none rounded-[10px]
                        py-[13px] px-5 text-[15px] font-medium
                        transition-all duration-200 cursor-pointer
                    "
                    style={{
                        boxShadow: '0 0 20px rgba(232,101,74,0.4)',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.boxShadow =
                            '0 0 30px rgba(232,101,74,0.6), 0 0 60px rgba(232,101,74,0.2)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.boxShadow =
                            '0 0 20px rgba(232,101,74,0.4)';
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 .5C5.73.5.99 5.24.99 11.51c0 4.87 3.16 9 7.55 10.45.55.1.75-.24.75-.53v-1.87c-3.07.67-3.72-1.48-3.72-1.48-.5-1.26-1.23-1.6-1.23-1.6-1-.7.08-.69.08-.69 1.1.08 1.68 1.14 1.68 1.14.98 1.68 2.56 1.2 3.18.92.1-.72.38-1.2.7-1.47-2.45-.28-5.03-1.22-5.03-5.44 0-1.2.43-2.18 1.14-2.95-.11-.28-.5-1.43.11-2.98 0 0 .93-.3 3.05 1.13a10.6 10.6 0 0 1 5.55 0c2.12-1.43 3.05-1.13 3.05-1.13.61 1.55.22 2.7.11 2.98.71.77 1.14 1.75 1.14 2.95 0 4.23-2.58 5.16-5.04 5.43.39.34.73 1 .73 2.02v3c0 .29.2.64.76.53 4.38-1.45 7.54-5.58 7.54-10.45C23.01 5.24 18.27.5 12 .5z" />
                    </svg>
                    Continue with GitHub
                </button>
            </div>

            <p className="text-[#EEF1F7]/60 text-[13px] text-center leading-[1.6] mb-[16px]">
                Sign in securely using your GitHub account.
            </p>

            <div className="flex items-center gap-2">
                <div className="w-[7px] h-[7px] bg-[#22c55e] rounded-full flex-shrink-0" />
                <span className="text-[#EEF1F7]/40 text-[10.5px] tracking-[0.08em] uppercase">
                    Secure / OAuth
                </span>
            </div>
        </div>
    )
}

export default LoginButton;