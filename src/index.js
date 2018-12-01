const moment = require('moment')
const config = require('./config/config.js')
const makeConStringWithDate = require('./helpers/conStringMaker')
const { getRepo, getPeriod } = require('./helpers/argvParser')
const fetchData = require('./api')

//parsing repo and period parameters from the user command
const repo = getRepo()
const period = getPeriod() === 0 ? 'All' : getPeriod()

const date = moment()
  .subtract(period, 'days')
  .toISOString()
//making connection string
const apiBase = 'https://api.github.com'
const conStrBase = `/repos/${repo}`
const conStrParamsArr = makeConStringWithDate(period, date)

const conParams = {
  responseType: 'stream',
  baseURL: apiBase,
  headers: {
    Authorization: `token ${config.GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
}

async function init() {
  for (const conStrParam of conStrParamsArr) {
    await fetchData(period, conStrBase, conStrParam, conParams)
  }
}

if (repo) {
  init()
}
