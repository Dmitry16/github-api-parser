const moment = require('moment');
// NODE_PATH=./src
const config = require('config');
const makeConStringWithDate = require('./utils/conStringMaker');
const { getRepo, getPeriod } = require('./utils/argvParser');
const fetchData = require('./api');

//parsing repo and period parameters from the user command
const repo = getRepo();
const period = getPeriod() === 0 ? 'All' : getPeriod();

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

if (repo) init();
