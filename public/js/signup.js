const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector("#signupUsername").value.trim();
    const password = document.querySelector("#signupPassword").value.trim();

    if (username && password) {
        const response = await fetch("api/users", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            console.log(response.statusText);
            alert("Please try again");
        };
    };
};

document.querySelector(".signupForm").addEventListener("submit", signupFormHandler);