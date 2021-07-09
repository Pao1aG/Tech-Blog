const {Post} = require("../../models");

// const createReveal = async (event) => {
//     event.preventDefault();

//     const createPostForm = document.querySelector(".formReveal");
//     createPostForm.setAttribute("class", "reveal");
//     // createPostForm.removeAttribute("class", "hidden");
// }

// const dashboardCreateHandler = async (event) => {
//     event.preventDefault();

//     const postTitle = document.querySelector("#cPostTitle").value.trim();
//     const postBody = document.querySelector("#cPostBody").value.trim();

//     if(postTitle && postBody) {
//         const response = await fetch("api/posts", {
//             method: "POST",
//             body: JSON.stringify({ postTitle, postBody }),
//             headers: { 'Content-Type': 'application/json' },
//         });

//         if(response.ok) {
//             document.location.replace("/dashboard");
//         } else {
//             alert('Failed to create post');
//         }
//     } else {
//         alert("Post could not be created");
//     }

// };

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

const dashboardPostHandler = async (event) => {
    // event.preventDefault();
    
    document.location.replace("/api/posts");

    // if(event.target.getAttribute("newpost")) {
    //     const response = await fetch("/api/posts/create", {
    //         method: "GET",

    //     });

    //     if(response.ok) {
    //         document.location.replace("/api/posts/create");
    //     }
    // }

   

};

document.querySelector("#newpost").addEventListener("click", dashboardPostHandler);
document.querySelector("#updateDPost").addEventListener("submit", dashboardUpdateHandler);