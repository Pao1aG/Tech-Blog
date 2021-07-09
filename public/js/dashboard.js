const dashboardPostHandler = async () => {
    window.location="/dashboard/create"
};

document.querySelector("#newpost").addEventListener("click", dashboardPostHandler);
