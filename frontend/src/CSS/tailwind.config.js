/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            keyframes: {
                spinGradient: {
                    '0%': { backgroundPosition: '0% 50%' },
                    '100%': { backgroundPosition: '300% 50%' },
                },
            },
            animation: {
                'spin-gradient': 'spinGradient 2.5s linear infinite',
            },
        },
    },
    plugins: [],
}