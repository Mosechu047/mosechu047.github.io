let submitBtn = document.getElementById('submitBtn');

    submitBtn.addEventListener('click', (event) => {
    let txtfname = document.getElementById("txtfname").value.trim();
    let txtlname = document.getElementById("txtlname").value.trim();
    let txtemail = document.getElementById("txtemail").value.trim();
    let txtpassword = document.getElementById("txtpassword").value;
    let txtconpass = document.getElementById("txtconpass").value;

    if (txtfname === "" || txtlname === "" || txtemail === "" || txtpassword === "" || txtconpass === "") {
        alert("All fields must be filled");

      
    }else {
        if (txtpassword == txtconpass) {
            let emailid = txtemail.replace(/\./g, "_dot_").replace(/@/g, "_at_")
            let status = "active";
            let timenow = Date.now();
            let role = "Admin";
            firebase.auth().createUserWithEmailAndPassword(txtemail, txtpassword)
                .then((userCredential) => {
                    console.log("User created successfully:", userCredential.user.email);
                firebase.database().ref('userDetails/' + emailid).set({
    
                    FirstName: txtfname,
                    LastName: txtlname,
                    Email: txtemail,
                    Status: status,
                    CreateBy: txtemail,
                    CreateOn: timenow,
                    Role: role
                })
                alert("Account created successfully")
                window.location.href = "index.html";
            })

            
            .catch((error) => {
                console.log("Error creating user:", error);
                alert(error.message);
            });
    } else {
        alert("Passwords do not match");
    }
}
}); 