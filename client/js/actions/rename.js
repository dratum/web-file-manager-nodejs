import { URL_API } from "../../constants/url.js";

export async function rename(directory, filename, changeFileName) {
  const normalizedDirectory = directory.endsWith("/")
    ? directory
    : directory + "/";
  const newFilePath = normalizedDirectory + changeFileName;

  try {
    const response = await fetch(
      `${URL_API}/${encodeURIComponent(normalizedDirectory + filename)}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newFilePath }),
      }
    );
    return response;
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
  }
}
