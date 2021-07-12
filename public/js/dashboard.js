const dashboardPostHandler = async () => {
    window.location="/dashboard/create"
};

document.querySelector("#newpost").addEventListener("click", dashboardPostHandler);


const postContentHandler = async (event) => {
    event.preventDefault();

    if(event.target.hasAttribute("data-id")) {
        const id = event.target.getAttribute("data-id");


        const response = await fetch(`/dashboard/edit/${id}`, {
            method: "GET",
        });

        if (response.ok) {
            console.log("I was able to find the specific post");
            document.location.replace(`/dashboard/edit/${id}`);
        }
    }
};

const posts = document.querySelectorAll(".userPosts");
let i;
//need to loop over all posts to give them them the event listener and function
for(i = 0; i < posts.length; i++) {
    posts[i].addEventListener("click", postContentHandler);
};

