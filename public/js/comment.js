const commentRevealHandler = async (event) => {
    event.preventDefault();

    const makeComment = document.querySelector(".makeComment");
    makeComment.setAttribute("class", "reveal");
};

const makeCommentHandler = async (event) => {
    event.preventDefault();

    const response = await fetch("api/posts/")

}

document.querySelector("#addComment").addEventListener("click", commentRevealHandler);
document.querySelector("#submitComment").addEventListener("click", makeCommentHandler);