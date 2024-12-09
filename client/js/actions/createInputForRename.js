import { rename } from "./rename.js";

export function createInputForRename(e, filename, currentPath) {
  const li = e.target.closest("li");
  const inputRename = document.createElement("input");

  inputRename.type = "text";
  inputRename.placeholder = filename;
  li.appendChild(inputRename);

  const saveButton = document.createElement("button");
  saveButton.textContent = "Сохранить";
  li.appendChild(saveButton);

  saveButton.addEventListener("click", async () => {
    const newName = inputRename.value.trim();

    if (newName) {
      try {
        const response = await rename(currentPath, filename, newName);
        if (response.ok) {
          inputRename.remove();
          saveButton.remove();
        } else {
          console.log("Ошибка изменения имени");
        }
      } catch (error) {
        console.error("Ошибка при переименовании:", error);
      }
    }
  });
}
