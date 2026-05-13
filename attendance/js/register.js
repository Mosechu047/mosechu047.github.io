let submitBtn = document.getElementById('submitBtn');

    submitBtn.addEventListener('click', () => {

    let txtfname = document.getElementById("txtfname").value;
    let txtlname = document.getElementById("txtlname").value;
    let txtemail = document.getElementById("txtemail").value;
    let txtpassword = document.getElementById("txtpassword").value;
    let txtconpass = document.getElementById("txtconpass").value;

    if (txtfname === "" || txtlname === "" || txtemail === "" || txtpassword === "" || txtconpass === "") {
        alert("All fields must be filled");
    } else {
        if (txtpassword === txtconpass) {
            let emailid = txtemail.replace(/\./g, "_dot_").replace(/@/g, "_at_");
            let status = "active";
            let timenow = new Date().toLocaleString();

            firebase.auth().createUserWithEmailAndPassword(txtemail, txtpassword)
                .then((userCredential) => {
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
                    alert("Account created successfully");
                    window.location.href = "index.html";
                })
                .catch((error) => {
                    console.error(error);
                    alert(error.message);
                });
        } else {
            alert("Passwords do not match");
        }
    }
}); 