const postsCreateHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector("#cPostTitle").value;
    const post_body = document.querySelector("#cPostBody").value;

    if(title && post_body) {
        console.log(title);
        console.log(post_body);
        const response = await fetch("/api/posts", {
            method: "POST",
            body: JSON.stringify({ title, post_body }),
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