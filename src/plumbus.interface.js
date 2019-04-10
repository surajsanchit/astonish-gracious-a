var rmApi = require('rickmortyapi');

/**
 * @param {string} dimension
 * @returns {array}
 */
async function listCharactersByDimension(dimension) {
  let locations = await listAll(rmApi.getLocation, { dimension });
  
  let characters = [];
  for (let location of locations) {
    let charactersAtLocation = await listCharactersAtLocation(location.name);
    characters = characters.concat(charactersAtLocation);
  }

  return characters;
};

/**
 * @param {string} name
 * @returns {array}
 */
async function listCharactersByLocation(name) {
  console.log(name);
  let location = await rmApi.getLocation({ name });
  
  if (location.status == 404) return [];

  let characterIds = [];
  for (let resident of location.results[0].residents) {
    characterIds.push(getIdFromUrl(resident));
  }

  let characters = await rmApi.getCharacter(characterIds);

  return characters;
}

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
  listCharactersByDimension,
  listCharactersByLocation
};
