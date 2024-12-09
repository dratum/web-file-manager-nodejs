import { URL_API } from "../../constants/url.js";

export async function deleteFile(filename, path) {
  try {
    const response = await fetch(`${URL_API}/${path}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filename }),
    });
    if (response.ok) {
      console.log("file removed!");
    }
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
}
