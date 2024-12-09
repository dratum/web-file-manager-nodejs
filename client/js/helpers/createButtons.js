export function createButtons(li, name, buttonType) {
  let button;

  switch (buttonType) {
    case "download":
      button = document.createElement("button");
      button.textContent = "^";
      button.classList.add("download-file");
      button.title = "Загрузить файл";
      button.dataset.filename = name;
      break;

    case "delete":
      button = document.createElement("button");
      button.textContent = "x";
      button.classList.add("delete-file");
      button.title = "Удалить файл";
      button.dataset.filename = name;
      break;

    case "rename":
      button = document.createElement("button");
      button.textContent = "Переименовать";
      button.classList.add("rename");
      button.dataset.filename = name;
      break;
  }
  li.appendChild(button);
  return button;
}
