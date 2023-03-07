const fs = require('fs');
const path = require('path');

const readFiles = (fileName) => {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, '../data', fileName), 'utf-8')
  );
};

const writeFiles = (fileName, data) => {
  return fs.writeFileSync(
    path.join(__dirname, '../data', fileName),
    JSON.stringify(data, null, 4)
  );
};

module.exports = {
  readFiles,
  writeFiles,
};
