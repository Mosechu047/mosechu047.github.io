let submitBtn = document.getElementById('submitBtn');
    submitBtn.addEventListener('click', (event) => {
    let txtusername = document.getElementById("txtusername").value;
    let txtpassword = document.getElementById("txtpassword").value;
    submitBtn.innerHTML = "Logging in...";
    if (txtusername == "" || txtpassword =="") {
        alert("All fields must be filled");
    } else {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                return firebase.auth().signInWithEmailAndPassword(txtusername, txtpassword)
            })
            .then((userCredential) => {
                 let emailid = txtusername.replace(/\./g, "_dot_").replace(/@/g, "_at_");
                    return firebase.database().ref('userDetails/' + emailid).once('value')
            })
            .then((snapshot) => {
                    const userDetails = snapshot.val();
                    const role = userDetails.Role;
                    const status = userDetails.Status;
                    if (status == "active") {
                        if (role == "Admin") {
                            //admin
                            window.location.href = "dashboard.html";
                        } else if (role == "Student") {
                            //student
                            window.location.href = "dashboard.html";
                            alert("Student login successful. Redirecting to student dashboard...");
                        } else {
                            alert("Unknown user role. Please contact support.")
                        }

                    } else {
                        alert("Your account is inactive. Please contact support.")
                    }
               
            })
            .catch((error) =>{
			alert("Wrong username or password. Please try again.");
			
           submitBtn.innerHTML = "Log in"
            })
    }

});
    

