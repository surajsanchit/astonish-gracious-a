var rmApi = require('rickmortyapi'),
    utils = require('./plumbus.utils');

/**
 * @param  {string} currentEpisodeId
 * @return {Promise<Object>}
 */
async function list(currentEpisodeId) {
  let results = await utils.listAll(rmApi.getEpisode, {});

  return utils.buildDropdownList(results, currentEpisodeId);
}

/**
 * @param  {Object} query
 * @return {Promise<Array>}
 */
async function view(query) {
  return await rmApi.getCharacter(query);
}

/**
 * @param  {string} episodeId
 * @return {Promise<Array>}
 */
async function characters(episodeId) {
  let episode = await rmApi.getEpisode([episodeId]);

  if (episode.status === 404) return [];

  let characterIds = utils.getIdsFromUrlList(episode.characters);

  if (characterIds.length === 0) return [];

  return await rmApi.getCharacter(characterIds);
}

/** ----- */
module.exports = {
  list,
  view,
  characters
};
