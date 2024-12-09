import multer from "multer";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const directoryName = req.params.directory;
    const directoryPath = path.join(__dirname, `../public`, directoryName);

    cb(null, directoryPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage: storage });

export const uploadFile = (req, res) => {
  res.json("Файл успешно загружен!");
};

export const downloadFile = (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, `../public`, filename);

  res.download(filePath, (err) => {
    if (err) {
      console.error("Ошибка при загрузке файла:", err);
      return res.status(500).send("Ошибка при загрузке файла");
    }
    res.status(200).end();
  });
};
