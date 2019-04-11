var rmApi = require('rickmortyapi'),
	utils = require('./plumbus.utils');

/**
 * @param  {string} currentDimension
 * @return {Promise<Object>}
 */
async function list(currentDimension) {
	let results = await utils.listAll(rmApi.getLocation, {});

	let dimensions = [];
	for (let result of results) {
		if (result.dimension === 'unknown') continue;

		let inArray = dimensions.map((i) => { return i.name}).indexOf(result.dimension);
		if (inArray === -1) {
			dimensions.push({
				id: result.dimension,
				name: result.dimension
			});
		}
	}

	return utils.buildDropdownList(dimensions, currentDimension);
}

/**
 * @param {string} dimension
 * @return {Promise<Array>}
 */
async function characters(dimension) {
	let locations = await utils.listAll(rmApi.getLocation, { dimension });

	let characterIds = [];
	for (let location of locations) {
		characterIds = characterIds.concat(utils.getIdsFromUrlList(location.residents));
	}

	return await rmApi.getCharacter(characterIds);
}

/** ----- */
module.exports = {
	list,
	characters
};