import { URL_API } from "../../constants/url.js";
import { createButtons } from "../helpers/createButtons.js";

export default async function getStorageData() {
  try {
    const response = await fetch(URL_API);
    const data = await response.json();

    // сортировка списка
    data.sort((a, b) => {
      if (a.isDirectory && !b.isDirectory) {
        return -1;
      }
      if (!a.isDirectory && b.isDirectory) {
        return 1;
      }
      return 0;
    });

    if (data.length > 0) {
      data.forEach((el) => {
        const list = document.querySelector(".storage-list");
        const li = document.createElement("li");

        li.innerHTML += `${el.name}`;
        li.classList.add(el.isDirectory ? "directory" : "file");

        if (el.isDirectory) {
          const a = document.createElement("a");

          li.dataset.path = `${el.name}`;
          a.href = `#${el.name}`;
          createButtons(li, el.name, "rename");
          createButtons(li, el.name, "delete");

          a.appendChild(li);
          list.appendChild(a);
        } else {
          createButtons(li, el.name, "delete");
          createButtons(li, el.name, "download");
          createButtons(li, el.name, "rename");
          list.appendChild(li);
        }
      });
    }
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
}
