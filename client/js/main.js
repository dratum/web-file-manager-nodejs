import uploadFile from "./actions/uploadFile.js";
import getStorage from "./actions/getStorageData.js";
import { deleteFile } from "./actions/deleteFile.js";
import downloadFile from "./actions/downloadFile.js";
import createDirectory from "./actions/createDirectory.js";
import { setDirectory, titlePaths } from "./actions/setDirectory.js";
import { createInputForRename } from "./actions/createInputForRename.js";

const list = document.querySelector(".storage-list");
const inputFile = document.querySelector(".upload-file-input");
const uploadForm = document.querySelector(".upload-file-form");
const createDirectoryButton = document.querySelector(".create-dir-button");

getStorage();

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("directory")) {
    const directoryPath = e.target.dataset.path || e.target.textContent.trim();
    setDirectory(directoryPath);
    titlePaths(directoryPath);
  } else if (e.target.classList.contains("delete-file")) {
    const filename = e.target.dataset.filename;
    const currentPath = list.dataset.path || "";
    deleteFile(filename, currentPath);
  } else if (e.target.classList.contains("download-file")) {
    const filename = e.target.dataset.filename;
    const currentPath = list.dataset.path || "/";
    downloadFile(currentPath, filename);
  } else if (e.target.classList.contains("rename")) {
    const filename = e.target.dataset.filename;
    const currentPath = list.dataset.path || "";
    createInputForRename(e, filename, currentPath);
  }
});

uploadForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const currentPath = list.dataset.path || "/";
  uploadFile(currentPath, inputFile);
});

createDirectoryButton.addEventListener("click", () => {
  const currentPath = list.dataset.path || "";
  createDirectory(currentPath);
  createDirectoryButton.disabled = true;
});
