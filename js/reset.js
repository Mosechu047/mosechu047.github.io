let resetBtn = document.getElementById('resetBtn');

resetBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let txtemail = document.getElementById("txtemail").value;
    if (txtemail === "") {
        alert("Please enter your email");
        return;
    }
    auth.sendPasswordResetEmail(txtemail)
        .then(() => {
            alert("Password reset email sent. Please check your inbox(if email exists in the system).");
            document.getElementById("txtemail").value = ""; // Clear the input field
            window.location.href = "index.html";
        })
        .catch((error) => {
            alert("Error: " + error.message);
            console.log(error);
        });
});