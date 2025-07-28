const container = document.querySelector('.container');
const signUpBtn = document.querySelector('.signup-btn');
const loginBtn = document.querySelector('.login-btn');
signUpBtn.addEventListener('click',()=>{
    container.classList.add('active');
});
loginBtn.addEventListener('click',()=>{
    container.classList.remove('active');
});



document.addEventListener("DOMContentLoaded", function () {
const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Use FormData to get values properly
    const formData = new FormData(signupForm);
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const password = formData.get("password").trim();

    if (!name || !email || !password) {
    alert("Please fill in all required fields.");
    return;
    }
    try {
    const res = await fetch("/check-user", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    });

    const data = await res.json();

    if (data.exists) {
        alert("User already exists!");
    } else {
        signupForm.submit(); // Submit only if valid
    }
    } catch (err) {
    alert("Server error. Please try again later.");
    }
});
});
document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const loginForm = document.getElementById("loginForm");
    const formData = new FormData(loginForm);
    const email = formData.get("email").trim();
    const password = formData.get("password").trim();
    const response = await fetch("/check-login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.error) {
        alert(data.error);
    } else {
        window.location.href = "/home";
    }
});

