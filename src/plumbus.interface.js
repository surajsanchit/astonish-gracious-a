var rmApi = require('rickmortyapi');

/**
 * @param {string} dimension
 * @returns {Promise<Array>}
 */
async function listCharactersByDimension(dimension) {
  let locations = await listAll(rmApi.getLocation, { dimension });
  
  let characters = [];
  for (let location of locations) {
    let charactersAtLocation = await listCharactersByLocation(location.name);
    characters = characters.concat(charactersAtLocation);
  }

  return characters;
}

/**
 * @param {string} name
 * @returns {Promise<Array>}
 */
async function listCharactersByLocation(name) {
  let location = await rmApi.getLocation({ name });
  
  if (location.status === 404) return [];

  let characterIds = getIdsFromUrlList(location.results[0].residents);

  return await rmApi.getCharacter(characterIds);
}

/**
 * @param {string} episode
 * @return {Promise<Array>}
 */
async function listCharactersByEpisode(episode) {
  let ep = await rmApi.getEpisode({ episode });

  let characterIds = getIdsFromUrlList(ep.results[0].characters);

  return await rmApi.getCharacter(characterIds);
}

/**
 * Get all results from all pages.
 * 
 * @param {function} endpoint
 * @param {*} filters
 * @returns {Promise<Array>}
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
 * @param {array} list
 */
function getIdsFromUrlList(list) {
  let Ids = [];

  for (let item of list) {
    let id = item.substring(item.lastIndexOf('/') + 1);
    Ids.push(id);
  }

  return Ids;
}

/** Module Interface **/
module.exports = {
  listCharactersByDimension,
  listCharactersByLocation,
  listCharactersByEpisode
};
