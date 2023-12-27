// tailwind.config.js
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
});

// module.exports = {
//   // ...
//   theme: {
//     extend: {
//       screens: {
//         'sm': '640px',
//         // Add other breakpoints if needed
//       },
//     },
//   },
// }
