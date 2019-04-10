/**
 * Lists all items on all pages.
 * 
 * @param   {function} endpoint 
 * @param   {Object} filters
 * @return  {Promise<Array>}
 */
async function listAll(endpoint, filters) {
  let firstPage = await endpoint(filters);

  if (!firstPage) return [];

  let results = firstPage.results;

  // Loop through remaining pages and collect results
  for (let i = 2; i <= firstPage.info.pages; i++) {
    filters.page = i;
    let nextPage = await endpoint(filters);

    results = results.concat(nextPage.results);
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

module.exports = {
  listAll,
  getIdsFromUrlList
}
