var rmApi = require('rickmortyapi');

/**
 * @param {string} dimension 
 */
async function listCharactersInDimension(dimension) {
  let locations = await listAll(rmApi.getLocation, { dimension });
  
  let characterIds = [];
  for (let location of locations) {
    for (let resident of location.residents) {
      characterIds.push(getIdFromUrl(resident));
    }
  }

  let characters = await rmApi.getCharacter(characterIds);

  return characters;
};

/**
 * Get all results from all pages.
 * 
 * @param {function} endpoint
 * @param {*} filters
 * @returns {array}
 */
async function listAll(endpoint, filters) {
  let firstCall = await endpoint(filters);

  if (!firstCall) return [];

  let pages = firstCall.info.pages;
  let results = firstCall.results;

  for (let i = 2; i <= pages; i++) {
    filters.page = i;
    let additionalPage = await endpoint(filters);

    results = results.concat(additionalPage.results);
  }

  return results;
}

/**
 * @param {string} url 
 */
function getIdFromUrl(url) {
  return  url.substring(url.lastIndexOf('/') + 1);
}

/** Module Interface **/
module.exports = {
  listCharactersInDimension
};
