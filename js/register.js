let submitBtn = document.getElementById('submitBtn');

    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();

    let txtfname = document.getElementById("txtfname").value.trim();
    let txtlname = document.getElementById("txtlname").value.trim();
    let txtemail = document.getElementById("txtemail").value.trim();
    let txtpassword = document.getElementById("txtpassword").value;
    let txtconpass = document.getElementById("txtconpass").value;

    if (txtfname === "" || txtlname === "" || txtemail === "" || txtpassword === "" || txtconpass === "") {
        alert("All fields must be filled");
        return;
    }
    
    // Email validation
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(txtemail)) {
        alert("Please enter a valid email address");
        return;
    }
    
    if (txtpassword.length < 6) {
        alert("Password must be at least 6 characters long");
        return;
    }
    
    if (txtpassword === txtconpass) {
        let emailid = txtemail.replace(/\./g, "_dot_").replace(/@/g, "_at_");
        let status = "active";
        let timenow = new Date().toLocaleString();

        console.log("Attempting to create user with email:", txtemail);

        firebase.auth().createUserWithEmailAndPassword(txtemail, txtpassword)
            .then((userCredential) => {
                console.log("User created successfully:", userCredential.user.email);
                console.log("Writing to database path:", 'userDetails/' + emailid);
                return firebase.database().ref('userDetails/' + emailid).set({
                    FirstName: txtfname,
                    LastName: txtlname,
                    Email: txtemail,
                    Status: status,
                    CreateBy: txtemail,
                    CreateOn: timenow
                });
            })
            .then(() => {
                console.log("Database write successful");
                alert("Account created successfully");
                // Clear form
                document.getElementById("txtfname").value = "";
                document.getElementById("txtlname").value = "";
                document.getElementById("txtemail").value = "";
                document.getElementById("txtpassword").value = "";
                document.getElementById("txtconpass").value = "";
                window.location.href = "index.html";
            })
            .catch((error) => {
                console.error("Registration error:", error);
                console.error("Error code:", error.code);
                console.error("Error message:", error.message);
                alert("Error: " + error.message);
            });
    } else {
        alert("Passwords do not match");
    }
}); 