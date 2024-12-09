import { URL_API } from "../../constants/url.js";
import { createButtons } from "../helpers/createButtons.js";

export function titlePaths(path) {
  const title = document.querySelector(".path");
  title.innerHTML = path;
}
export async function setDirectory(path) {
  try {
    const response = await fetch(`${URL_API}/${encodeURIComponent(path)}`);
    if (response.ok) {
      const data = await response.json();
      const list = document.querySelector(".storage-list");

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

      list.innerHTML = "";
      list.dataset.path = path;

      if (path !== "/") {
        const navButton = document.createElement("a");

        navButton.classList.add("up-directory-button");

        navButton.href = `#`;
        navButton.textContent = "<- ...";
        list.appendChild(navButton);

        navButton.addEventListener("click", (e) => {
          e.preventDefault();
          const pathParts = path.split("/").filter((part) => part);

          if (pathParts.length > 1) {
            pathParts.pop();
            path = pathParts.join("/");
          } else {
            path = "/";
          }
          setDirectory(path);
          titlePaths(path);
        });
      }

      if (data.length > 0) {
        data.forEach((el) => {
          const li = document.createElement("li");
          li.textContent = el.name;
          li.classList.add(el.isDirectory ? "directory" : "file");

          if (el.isDirectory) {
            const a = document.createElement("a");
            li.dataset.path = `${path}/${el.name}`;
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
    }
  } catch (error) {
    throw new Error(error);
  }
}
