const writeResponse = (res, header, status, result) => {
  let response;
  if (header) {
    res.header(header);
  }
  if (result) {
    response = {
      success: true,
      result,
    };
  }
  res.status(status).json(response);
};

const writeError = (res, status, err) => {
  res.status(status).json(err);
};

module.exports = {
  writeResponse,
  writeError,
};
