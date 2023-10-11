/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        light: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        strong:
          "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
      },
      gridTemplateColumns: {
        "state-card": "repeat(auto-fit, minmax(300px, 1fr))",
      },
      screens: {
        vsm: "370px",
        xlg: "1300px",
      },
      width: {
        "dashboard-sidebar": "300px",
        "dashboard-content": "calc(100% - 300px)",
      },
      colors: {
        primary: "#008bd1",
        "dark-1": "#0e1016",
        "dark-2": "#151922",
        "dark-2-lighter": "#1a1f2a",
        "dark-3": "#293346",
        "gray-1": "#d0d1d3",
        "gray-2": "#8a8c91",
        "gray-3": "#5e6064",
        "gray-4": "#3f4145",
        "gray-5": "#2e3033",
      },
    },
  },
  plugins: [],
};
