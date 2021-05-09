const mysql = require("mysql");
const sortBy = (sort) => {
  if (sort) {
    const sortValue = sort.split("-").map((q) => {
      switch (q) {
        case "AZ":
          return mysql.raw("ASC");
        case "ZA":
          return mysql.raw("DESC");
        default:
          return mysql.raw(q);
      }
    });
    return sortValue;
  }
  return ["1", "ASC"];
};
module.exports = {
  sortBy,
};
