const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    const nameFormat = `${Date.now()}-${file.fieldname}${path.extname(
      file.originalname
    )}`;
    cb(null, nameFormat);
  },
});

const bytes = 1000;

const power = (byte, n) => {
  if (n) return byte * power(byte, n - 1);
  return 1;
};

const limits = {
  fileSize: 10 * power(bytes, 2), // 5 Mb
};

const fileFilter = (req, file, cb) => {
  const acceptedFileType = /jpg|jpeg|jfif|gif|png/i;
  const isFileTypeAccepted = acceptedFileType.test(
    path.extname(file.originalname)
  );
  if (!isFileTypeAccepted) return cb(new Error("Error: Images Only"));
  cb(null, true);
};

const multerUploadImage = multer({
  storage,
  limits,
  fileFilter,
});

module.exports = multerUploadImage;
