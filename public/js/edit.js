const editPostHandler = async (event) => {
    // event.preventDefault();

    const postTitle = document.querySelector("#ePostTitle").value;
    const postBody = document.querySelector("#ePostBody").value;

    if(event.target.hasAttribute("data-id") && postTitle && postBody) {

        const id = event.target.getAttribute("data-id");

        const response = await fetch(`/api/posts/${id}`, {
            method: "PUT",
            body: JSON.stringify({ postTitle, postBody }),
            headers: { 'Content-Type': 'application/json' },
        });

        if(response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert('Failed to update post');
        }
    } else {
        alert("Please include a title and body for your post");
    }
};

const deletePostHandler = async (event) => {
    // event.preventDefault();

    if(event.target.hasAttribute("data-id")) {
        const id = event.target.getAttribute("data-id");

        const response = await fetch(`api/posts/${id}`, {
            method: "DELETE",
        });

        if(response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert('Failed to delete post');
        }
    } else {
        alert("Please include a title and body for your post");
    }
};

document.querySelector("#updatePost").addEventListener("submit", editPostHandler);
document.querySelector("#deletePost").addEventListener("submit", deletePostHandler);