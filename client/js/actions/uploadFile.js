import { URL_API } from "../../constants/url.js";

export default async function uploadFile(directory, file) {
  const formData = new FormData();

  formData.append("file", file.files[0]);
  console.log(directory);

  try {
    const response = await fetch(
      `${URL_API}/upload/${encodeURIComponent(directory)}`,
      {
        method: "POST",
        body: formData,
      }
    );
    if (response.ok) {
      const result = await response.json();
      console.log("Файл успешно загружен:", result);
    } else {
      console.error("Ошибка при загрузке файла:", response.statusText);
    }
  } catch (error) {
    throw new Error(error);
  }
}
