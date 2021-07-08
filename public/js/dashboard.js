const {Post} = require("../../models");

const dashboardCreateHandler = async (event) => {
    const postTitle = document.querySelector("#cPostTitle").value.trim();
    const postBody = document.querySelector("#cPostBody").value.trim();

    if(postTitle && postBody) {
        const response = await fetch("api/posts", {
            method: "POST",
            body: JSON.stringify({ postTitle, postBody }),
            headers: { 'Content-Type': 'application/json' },
        });
    }

    if(response.ok) {
        document.location.replace("/dashboard");
    } else {
        alert('Failed to create post');
    }
};

const dashboardUpdateHandler = async (event) => {
    if (event.target.getAttribute("data-id") == Post.id) {
        const id = event.target.getAttribute("data-id");
        const postTitle = document.querySelector("#uPostTitle").value.trim();
        const postBody = document.querySelector("#uPostBody").value.trim();

        const response = await fetch(`/api/posts/${id}`, {
            method: "PUT",
            body: JSON.stringify({ postTitle, postBody }),
        });

        if (response.ok) {
            document.location.replace("/dasboard");
        } else {
            alert("Post could not be updated");
        }
    }
};

document.querySelector("createDPost").addEventListener("click", dashboardCreateHandler);
document.querySelector("updateDPost").addEventListener("click", dashboardUpdateHandler);