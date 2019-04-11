var rmApi = require('rickmortyapi'),
    utils = require('./plumbus.utils');

/**
 * @param  {string} currentLocationId
 * @return {Promise<Object>}
 */
async function list(currentLocationId) {
  let results = await utils.listAll(rmApi.getLocation, {});

  return utils.buildDropdownList(results, currentLocationId);
}

/**
 * @param  {Object} query
 * @return {Promise<Array>}
 */
async function view(query) {
  return await rmApi.getCharacter(query);
}

/**
 * @param  {string} locationId
 * @return {Promise<Array>}
 */
async function characters(locationId) {
  let location = await rmApi.getLocation([locationId]);

  if (location.status === 404) return [];

  let characterIds = utils.getIdsFromUrlList(location.residents);

  return await rmApi.getCharacter(characterIds);
}

module.exports = {
  list,
  characters
};
