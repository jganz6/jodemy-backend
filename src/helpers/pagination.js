const dbMySql = require("./../databases/dbMysql");
module.exports = function (query, qs) {
  const paginate = "LIMIT ? OFFSET ?";
  const qsWithPaginate = qs.concat(" ", paginate);
  // is query.limit truthy value?
  // number 0 => falsy value
  // null | undefined | 0 | "" | false
  const limit = Number(query.limit) || 3;
  // const limit = query.limit ?? 3
  // nullish coalescence
  // null | undefined
  const page = Number(query.page) || 1;
  const offset = (page - 1) * limit;
  // console.log(limit, page, offset);
  new Promise((resolve, reject) => {
    dbMySql.query(qsWithPaginate, [limit, offset], (err, result) => {
      if (err) return reject(err);

      const qsCount = 'SELECT COUNT(*) AS "count" FROM videogames';
      // escaped character (\) => sehingga tanda yang digunakan sebagai syntax muncul sebagai string
      dbMySql.query(qsCount, (err, data) => {
        if (err) return reject(err);

        const { count } = data[0];
        let finalResult = {
          result,
          count,
          page,
          limit,
        };
        resolve(finalResult);
      });
    });
    // count page next prev
  });
};
