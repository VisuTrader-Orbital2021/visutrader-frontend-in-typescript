const data =
  `REACT_APP_ALPHA_VANTAGE_API_KEY=${process.env.REACT_APP_ALPHA_VANTAGE_API_KEY}\n` +
  `REACT_APP_NEWS_API_KEY=${process.env.REACT_APP_NEWS_API_KEY}\n`;

const fs = require("fs");
fs.writeFileSync("./.env", data);
