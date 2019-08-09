const axios = require('axios');
//modules for stream parsing
const { parser } = require('stream-json');
const { streamArray } = require('stream-json/streamers/StreamArray');
const { streamValues } = require('stream-json/streamers/StreamValues');
const errorHandler = require('../errorHandlers');
let resourceCounter = 0;
let chunksLength = 0;
let statsObj = {};

async function fetchData(
  period, 
  conStrBase, 
  conStrParam, 
  conParams
){
  //instantiating stream for filtering and writing data
  const createProcessingStream = require('../streamModifier');

  const input =
    conStrParam !== '/rate_limit' ? conStrBase + conStrParam : conStrParam;

  await axios
    .get(input, conParams)
    .then(response => {
      resourceCounter++
      let contLength = response.headers['content-length']
      let processingStream = createProcessingStream(
        contLength,
        resourceCounter,
        chunksLength,
        statsObj,
        period,
      );
      response.data
        .pipe(parser())
        .pipe(resourceCounter !== 5 ? streamArray() : streamValues())
        .pipe(processingStream)
    })
    .catch(errorHandler);
}

module.exports = fetchData;
