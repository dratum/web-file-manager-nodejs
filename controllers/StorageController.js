import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getStorageContents = (req, res) => {
  let directoryPath = path.join(__dirname, "../public");

  fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Ошибка чтения директории");
    }
    const fileData = files.map((file) => ({
      name: file.name,
      isDirectory: file.isDirectory(),
    }));
    res.json(fileData);
  });
};

export const getDirectoryContents = (req, res) => {
  let directoryPath = path.join(__dirname, "../public", req.params.directory);

  fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Ошибка чтения директории");
    }
    const fileData = files.map((file) => ({
      name: file.name,
      isDirectory: file.isDirectory(),
    }));
    res.json(fileData);
  });
};

export const createDirectory = (req, res) => {
  const { prefix: fullPath } = req.body;
  const directoryPath = path.join(__dirname, `../public`, fullPath);
  fs.access(directoryPath, fs.constants.F_OK, (err) => {
    if (!err) {
      return res.status(400).send("Директория с таким именем уже существует");
    }

    fs.mkdir(directoryPath, { recursive: true }, (err) => {
      if (err) {
        console.error("Ошибка при создании директории:", err);
        return res.status(500).send("Ошибка при создании директории");
      }
      res.status(200).send("Директория успешно создана");
    });
  });
};
