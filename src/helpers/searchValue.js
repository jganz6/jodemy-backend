const mysql = require("mysql");
const searchValue = (search, filter) => {
  let valueFill = "";
  if (filter) {
    const filterValue = filter.split("-");
    valueFill = filterValue[1];
    if (filterValue[1] === "paid") {
      filter = "AND class." + filterValue[0] + " <> ";
    } else {
      filter = "AND class." + filterValue[0] + " = ";
    }
  } else {
    filter = "";
  }
  if (search) {
    return ["%" + search + "%", mysql.raw(filter), valueFill];
  } else {
    return ["%%", mysql.raw(filter), valueFill];
  }
};
module.exports = {
  searchValue,
};
