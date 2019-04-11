var rmApi = require('rickmortyapi'),
    utils = require('./plumbus.utils');

/**
 * @param  {string} current
 * @return {Promise<Array>}
 */
async function list(currentId) {
  let results = await utils.listAll(rmApi.getLocation, {});

  return utils.buildDropdownList(results, currentId);
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
}
