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
 * Recieves and array and formats it to use in dropdowns.
 * 
 * @param  {Array<Object>} items
 * @param  {string} currentId
 * @return {Object}
 */
function buildDropdownList(items, currentId) {
  let list = {
    current: null,
    items: []
  };

  for (let item of items) {
    if (item.id == currentId) {
      list.current = item.name
    }

    list.items.push({
      id: item.id,
      value: item.name
    });
  }

  return list;
}

/**
 * Pull Ids from lists of urls to RickMortyApi
 * 
 * @param {Array<number>} list
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
  buildDropdownList,
  getIdsFromUrlList
}
