const fs = require('fs')
fs.writeFileSync('./.env', `REACT_APP_ALPHA_VANTAGE_API_KEY=${process.env.REACT_APP_ALPHA_VANTAGE_API_KEY}\n`)
