import { URL_API } from "../../constants/url.js";

export default async function downloadFile(directory, file) {
  const normalizedDirectory = directory.endsWith("/")
    ? directory
    : directory + "/";
  try {
    const response = await fetch(
      `${URL_API}/download/${encodeURIComponent(normalizedDirectory + file)}`
    );

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } else {
      console.error("Ошибка при загрузке файла:", response.statusText);
    }
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
}
