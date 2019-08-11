const moment = require('moment');
// NODE_PATH=./src
const config = require('config');
const makeConStringWithDate = require('./utils/conStringMaker');
const fetchData = require('./api');

/* 
  getting repo and period parameters from the command line
  the simple-argv-parser is the package written by me and
  uploaded to the npm repository to be easyly reused
*/
const argvParsedObj = require('simple-argv-parser');

const repo = argvParsedObj['--repo'];
const period = !argvParsedObj['--period']
  ? 'All'
  : argvParsedObj['--period'];

//making connection string
const date = moment()
  .subtract(period, 'days')
  .toISOString()
const conStrBase = `/repos/${repo}`;
const conStrParamsArr = makeConStringWithDate(period, date);

const conParams = {
  responseType: 'stream',
  baseURL: config.apiBase,
  headers: {
    Authorization: `token ${config.GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
};

async function init() {
  for (const conStrParam of conStrParamsArr) {
    await fetchData(period, conStrBase, conStrParam, conParams)
  };
};

if (repo) {
  init();
} else {
  console.log('Please provide --repo parameter');
}
