import fs from "fs-extra";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { checkContentType } from "../utils/checkContentType.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const deleteContent = (req, res) => {
  const { filename } = req.body;
  const currentDirectory = req.params[0];

  const directoryPath = path.join(
    __dirname,
    `../public`,
    currentDirectory,
    filename
  );

  checkContentType(directoryPath, (err, type) => {
    if (err) {
      return res.status(500).send("Ошибка при проверке пути");
    }

    if (type === "file") {
      fs.unlink(directoryPath, (err) => {
        if (err) {
          return res.status(500).send("Ошибка при удалении файла");
        }
        res.status(200).send({ message: "Файл успешно удален" });
      });
    } else if (type === "directory") {
      fs.remove(directoryPath, (err) => {
        if (err) {
          return res.status(500).send("Ошибка при удалении директории");
        }
        res.status(200).send({ message: "Директория успешно удалена" });
      });
    } else {
      res.status(400).send("Указанный путь не является файлом или директорией");
    }
  });
};

export const renameContent = async (req, res) => {
  const filename = req.params.filename;
  const { newFilePath } = req.body;

  const filePath = path.join(__dirname, "../public", filename);
  const newName = path.join(__dirname, "../public", newFilePath);

  fs.access(newName, fs.constants.F_OK, (err) => {
    if (!err) {
      return res.status(400).send("Путь назначения уже существует");
    }

    fs.rename(filePath, newName, (err) => {
      if (err) {
        console.error("Ошибка при изменении имени:", err);
        return res.status(500).send("Ошибка при изменении имени");
      }
      res.status(200).send(`Папка успешно переименована: ${newName}`);
    });
  });
};
