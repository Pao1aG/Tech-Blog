// const {Post} = require("../../models");

const dashboardUpdateHandler = async (event) => {
    event.preventDefault();

    if (event.target.getAttribute("data-id") == Post.id) {
        const id = event.target.getAttribute("data-id");
        const postTitle = document.querySelector("#uPostTitle").value.trim();
        const postBody = document.querySelector("#uPostBody").value.trim();

        const response = await fetch(`/api/posts/${id}`, {
            method: "PUT",
            body: JSON.stringify({ postTitle, postBody }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/dasboard");
        } else {
            alert("Post could not be updated");
        }
    }
};

const dashboardPostHandler = async () => {
    window.location="/dashboard/create"
};

document.querySelector("#newpost").addEventListener("click", dashboardPostHandler);
// document.querySelector("#updateDPost").addEventListener("submit", dashboardUpdateHandler);