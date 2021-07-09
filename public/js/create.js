const postsCreateHandler = async (event) => {
    event.preventDefault();

    const postTitle = document.querySelector("#cPostTitle").value.trim();
    const postBody = document.querySelector("#cPostBody").value.trim();

    if(postTitle && postBody) {
        const response = await fetch("api/posts", {
            method: "POST",
            body: JSON.stringify({ postTitle, postBody }),
            headers: { 'Content-Type': 'application/json' },
        });

        if(response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert('Failed to create post');
        }
    } else {
        alert("Post could not be created");
    }

};

document.querySelector("#createDPost").addEventListener("submit", postsCreateHandler);