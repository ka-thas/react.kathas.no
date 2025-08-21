/** @type {import('tailwindcss').Config} */

import tailwindcss from "@tailwindcss/vite";

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    theme: {
        extend: {
            fontFamily: {
                urbanist: ["Urbanist", "sans-serif"],
            },
        },
    },
    plugins: [tailwindcss()],
};
