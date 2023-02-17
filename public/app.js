const remove = async id => {
    await fetch(`/${id}`, {
        method: "DELETE"
    });
};

const edit = async (id, title) => {
    await fetch(`/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, id })
    });
};

document.addEventListener("click", event => {
    if (event.target.dataset.type === "remove") {
        const id = event.target.dataset.id;
        remove(id).then(() => {
            event.target.closest("li").remove();
        });
    }
    if (event.target.dataset.type === "edit") {
        const id = event.target.dataset.id;
        const newTitle = prompt("Введите новое название");
        if (newTitle !== null) {
            edit(id, newTitle).then(() => {
                event.target.closest("li").querySelector(".title").innerHTML =
                    newTitle;
            });
        }
    }
});
