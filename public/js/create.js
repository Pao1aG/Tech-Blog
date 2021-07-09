const postsCreateHandler = async (event) => {
    event.preventDefault();

    const postTitle = document.querySelector("#cPostTitle").value;
    const postBody = document.querySelector("#cPostBody").value;

    console.log(postTitle);
    console.log(postBody);

    if(postTitle && postBody) {
        const response = await fetch("/api/posts", {
            method: "POST",
            body: JSON.stringify({ postTitle, postBody }),
            headers: { "Content-Type": "application/json" },
        });

        if(response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert('Failed to create post');
        }
    } 

};

document.querySelector(".createDPost").addEventListener("submit", postsCreateHandler);