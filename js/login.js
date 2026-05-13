let submitBtn = document.getElementById('submitBtn');

    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();

    let txtusername = document.getElementById("txtusername").value;
    let txtpassword = document.getElementById("txtpassword").value;
    if (txtusername === "" || txtpassword === "") {
        alert("All fields must be filled");
    } else {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                return firebase.auth().signInWithEmailAndPassword(txtusername, txtpassword);
            })
            .then((userCredential) => {
                 let emailid = txtusername.replace(/\./g, "_dot_").replace(/@/g, "_at_");
                    return firebase.database().ref('userDetails/' + emailid).once('value');
            })
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const userDetails = snapshot.val();
                    const role = userDetails.Role;
                    const status = userDetails.Status;
                    if (status === "active") {
                        if (role === "admin") {
                            window.location.href = "dashboard.html";
                        } else if (role === "Student") {
                            window.location.href = "student-dashboard.html";
                        } else {
                            alert("Unknown user role. Please contact support.");
                        }
                    } else {
                        alert("Your account is inactive. Please contact support.");
                    }
                } else {
                    alert("User details not found");
                }
            })
            .catch((error) => {
                alert("Login failed: " + error.message);
            });
    }
                
});
    

