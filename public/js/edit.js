const editPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector("#ePostTitle").value;
    const post_body = document.querySelector("#ePostBody").value;

    // const id = event.target.getAttribute("data-id");
    // console.log(id);

    if(title && post_body) {

        const id = event.target.getAttribute("data-id");

        const response = await fetch(`/api/posts/${id}`, {
            method: "PUT",
            body: JSON.stringify({ title, post_body }),
            headers: { 'Content-Type': 'application/json' },
        });

        if(response.ok) {
            console.log("I am updating this post");
            document.location.replace("/dashboard");
        } else {
            alert('Failed to update post');
        }
    } else {
        alert("Please include a title and body for your post");
    }
};

const deletePostHandler = async (event) => {
    event.preventDefault();

    if(event.target.hasAttribute("data-id")) {
        const id = event.target.getAttribute("data-id");

        console.log(id);

        const response = await fetch(`/api/posts/${id}`, {
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

document.querySelector("#updatePost").addEventListener("click", editPostHandler);
document.querySelector("#deletePost").addEventListener("click", deletePostHandler);