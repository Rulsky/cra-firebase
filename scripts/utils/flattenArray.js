const flattenArray = (array, acc = []) => {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) {
      flattenArray(array[i], acc)
    } else {
      acc.push(array[i])
    }
  }
  return acc
}

module.exports = flattenArray
