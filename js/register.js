let submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener('click',() => {

    let txtfname = document.getElementById("txtfname").value
    let txtlname = document.getElementById("txtlname").value
    let txtemail = document.getElementById("txtemail").value
    let txtpassword = document.getElementById("txtpassword").value
    let txtconpass = document.getElementById("txtconpass").value

    if(txtfname == "" || txtemail == "" || txtpassword == "" || txtconpass == ""){
        alert("All fields must be filled")
    }else{
        if(txtpassword == txtconpass){
            let emailid= txtemail.replace(/\./g,"_dot_").replace(/@/g,"_at_")
            let status = "active"
            let timenow = new Date().toLocaleString()
            firebase.auth().createUserWithEmailAndPassword(txtemail,txtpassword)
            .then((userCredential) => {
                firebase.database().ref('userDatails/'+emailid).set({
                    FirstName:txtfname,
                    LastName:txtlname,
                    Email:txtemail,
                    Status:status,
                    CreateBy:txtemail,
                    CreateOn:timenow
                })
                alert("Account created successfully")
                window.location.href = "index.html"
            })
            .catch((error) => {
                console
                alert(errorMessage)
            }
        }else{
            alert("Passwords do not match")
        }
    }


}) 