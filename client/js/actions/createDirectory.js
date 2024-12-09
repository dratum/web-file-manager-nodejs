import { URL_API } from "../../constants/url.js";

export default function createDirectory(currentPath) {
  const form = document.createElement("form");
  const input = document.createElement("input");
  const button = document.createElement("button");
  const list = document.querySelector(".storage-list");

  button.classList.add("send-button");
  button.textContent = "Создать";

  form.classList.add("create-dir-form");

  list.prepend(form);
  form.appendChild(input);
  form.appendChild(button);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const folderName = input.value.trim();
    if (folderName) {
      try {
        const fullPath = `${currentPath}/${folderName}`;
        const response = await fetch(URL_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prefix: fullPath }),
        });

        if (response.ok) {
          console.log("Папка успешно создана");
          form.remove();
        } else {
          console.error("Ошибка при создании папки, попробуйте другое имя");
        }
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    }
  });
}
