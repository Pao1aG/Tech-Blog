const commentRevealHandler = async (event) => {
    event.preventDefault();

    const makeComment = document.querySelector(".makeComment");
    makeComment.setAttribute("class", "reveal");

    //scroll to bottom of page
    window.scrollTo(0, document.body.scrollHeight);
};

const makeCommentHandler = async (event) => {
    event.preventDefault();

    const post_id = event.target.getAttribute("data-id");
    console.log(post_id);
    const comment_body = document.querySelector("#commentBody").value;
    console.log(comment_body);

    const response = await fetch(`/api/posts/comment/${post_id}`, {
        method: "POST",
        body: JSON.stringify({ comment_body, post_id }),
        headers: { "Content-Type": "application/json" },
    });

    if(response.ok) {
        document.location.replace(`/posts/${post_id}`);
    } else {
        alert("Failed to make a comment");
    }

}

document.querySelector("#addComment").addEventListener("click", commentRevealHandler);
document.querySelector("#submitComment").addEventListener("click", makeCommentHandler);