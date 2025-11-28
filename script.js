async function loginUser() {
    const registration = document.getElementById("reg").value;
    const password = document.getElementById("pass").value;
    const msg = document.getElementById("msg");

    const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registration, password })
    });

    const data = await response.json();

    if (!response.ok) {
        msg.style.color = "red";
        msg.innerHTML = data.message;
    } else {
        msg.style.color = "green";
        msg.innerHTML = "Login Successful! Welcome " + data.user.name;
    }
}
