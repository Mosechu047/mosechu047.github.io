let btnAddstudent = document.getElementById('btnAddstudent');

    btnAddstudent.addEventListener('click', (event) => {
    let txtfname = document.getElementById("txtfname").value.trim();
    let txtlname = document.getElementById("txtlname").value.trim();
    let txtemail = document.getElementById("txtemail").value.trim();
    
    if (txtfname == "" || txtlname == "" || txtemail == "" ) {
        alert("All fields must be filled");

      
    }else {
        
            let emailid = txtemail.replace(/\./g, "_dot_").replace(/@/g, "_at_")
            let status = document.querySelector("select").value;
            let timenow = Date.now();
            let role = "Student";
            let autpassword = "12345678";
            let user = firebase.auth().currentUser;
            let createdBy = user.email 
            firebase.auth().createUserWithEmailAndPassword(txtemail,autpassword)
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
                alert("New student added successfully! Default password is 12345678 and username is email")
                window.location.href = "index.html";
            })

            
            .catch((error) => {
                console.log("Error creating user:", error);
                alert(error.message);
            });
    
    }
});
