import fs from "fs";
export function checkContentType(filePath, callback) {
  fs.stat(filePath, (err, stats) => {
    if (err) {
      return callback(err);
    }
    if (stats.isDirectory()) {
      callback(null, "directory");
    } else if (stats.isFile()) {
      callback(null, "file");
    } else {
      callback(null, "other");
    }
  });
}
