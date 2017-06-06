module.exports = function converter({
  fullName,
  corpClientName,
  procDocType=[],
}) {
  return {
    name: fullName,
    surname: corpClientName,
    products: procDocType,
  };
}
