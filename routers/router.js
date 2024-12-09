import Router from "express";
const router = new Router();
import {
  getDirectoryContents,
  getStorageContents,
  createDirectory,
} from "../controllers/StorageController.js";
import {
  downloadFile,
  upload,
  uploadFile,
} from "../controllers/FileController.js";
import {
  deleteContent,
  renameContent,
} from "../controllers/ContentController.js";

router.get("/", getStorageContents);
router.get("/:directory", getDirectoryContents);
router.get("/download/:filename", downloadFile);

router.post("/", createDirectory);
router.post("/upload/:directory", upload.single("file"), uploadFile);

router.put("/:filename", renameContent);

router.delete("/*", deleteContent);

export default router;
