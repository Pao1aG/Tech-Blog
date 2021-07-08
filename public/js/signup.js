const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector("#signupUsername");
    const password = document.querySelector("#signupPassword");

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
        };
    };
};

document.querySelector(".signupForm").addEventListener("submit", signupFormHandler);