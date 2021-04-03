// const writeResponse = (res, header, status, result) => {
//   let response;
//   if (header) {
//     res.header(header);
//   }
//   if (result) {
//     response = {
//       code: status,
//       message: "success",
//       data: result,
//     };
//   }
//   res.status(status).json(response);
// };
module.exports = (
  response,
  message,
  aditionalData = {},
  status = 200,
  success = true
) => {
  return response.status(status).send({
    code: status,
    success,
    message: message || "Success",
    data: { ...aditionalData },
  });
};
// const writeError = (res, status, err) => {
//   res.status(status).json(err);
// };

// module.exports = {
//   writeResponse,
//   writeError,
// };
