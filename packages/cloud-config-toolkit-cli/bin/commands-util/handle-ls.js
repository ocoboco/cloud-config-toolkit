async function handleLs(toolkit, { namespace }) {
  const names = await toolkit.getItemNames(`${namespace}/configs`, 0, 100);
  names.forEach(function(name) {
    console.log(name);
  });
}

module.exports = handleLs;