const multer = require("multer");
const uuidv4 = require("uuid/v4");
const path = require("path");

// Chọn nơi lưu trữ cho các tệp được tải lên
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    const pathFile = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + pathFile);
  },
});

const fileFilter = (req, file, cb) => {
  // Kiểm tra kiểu tệp
  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!"); // thông báo lỗi nếu kiểu tệp không phù hợp
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = {
  upload: upload,
};
