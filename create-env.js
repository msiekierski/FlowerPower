const fs = require('fs');
const path = `./.env`;
const vars = `
 REACT_APP_API_ADDRESS=${process.env.REACT_APP_API_ADDRESS}
`;
fs.writeFileSync(path, vars);
