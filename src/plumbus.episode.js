var rmApi = require('rickmortyapi'),
    utils = require('./plumbus.utils');

/**
 * @return {Promise<Array>}
 */
async function list() {
  let results = await utils.listAll(rmApi.getEpisode, {});

  let episodes = [];
  for (let result of results) {
    episodes.push({
      id: result.id,
      episode: result.episode, 
      name: result.name 
    });
  }

  return episodes;
}

/**
 * @param  {Object} query
 * @return {Promis<Array>}
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

  return await rmApi.getCharacter(characterIds);
}

/** ----- */
module.exports = {
  list,
  view,
  characters
}
