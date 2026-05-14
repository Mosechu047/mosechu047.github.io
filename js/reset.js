let resetBtn = document.getElementById('resetBtn');

resetBtn.addEventListener('click', (event) => {
    
    let txtemail = document.getElementById("txtemail").value;
    resetBtn.innerHTML = "Sending Reset Link...";
    auth.sendPasswordResetEmail(txtemail)
        .then(() => {
            alert("Password reset email sent. Please check your inbox(if email exists in the system).");
            txtemail.value = "";
        
        })
        .catch((error) => {
            alert(error.message);
            console.log(error);
            txtemail.value = "";
        });
});