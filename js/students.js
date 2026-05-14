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
function loadData(){
    let tablebody = document.getElementById('tablebody')

    firebase.database().ref("userDetails").on("value",(snapshot)=>{
        tablebody.innerHTML = "";

        snapshot.forEach((childSnapshot) => {
            let data = childSnapshot.val()
            let key = childSnapshot.key

            if(data.Status == "active" && data.Role == "Student"){
                tablebody.innerHTML += `
                <tr>
                    <td>${data.FirstName}</td>
                    <td>${data.LastName}</td>
                    <td>${data.Email}</td>
                    <td>
                        <button class="btn-reject" onclick="suspendStudent('${key}')">Suspend</button>
                       
                    </td>
                </tr>
          `
            }
                        
            }
        )
    })

}
loadData();

function suspendStudent(){
    let confirmSuspend = confirm("Are you sure you want to suspend this student?");
    if (!confirmSuspend) return; 
    firebase.database().ref("userDetails/" + studentid).update({
        Status: "suspended"
    }).then(() => {
        alert("Student suspended successfully");
    }).catch((error) => {
        alert("Error suspending student: ")

    })
    

}
 
//acctivate student function
function loadinactivateSt(){
    let tablebody = document.getElementById('tablebody')

    firebase.database().ref("userDetails").on("value",(snapshot)=>{
        tablebody.innerHTML = "";

        snapshot.forEach((childSnapshot) => {
            let data = childSnapshot.val()
            let key = childSnapshot.key

            if(data.Status == "suspended" && data.Role == "Student"){
                tablebody.innerHTML += `
                <tr>
                    <td>${data.FirstName}</td>
                    <td>${data.LastName}</td>
                    <td>${data.Email}</td>
                    <td>
                        <button class="btn-approve" onclick="activateStudent('${key}')">Activate</button>
                    </td>
                </tr>
                `
            }
        })
    })
}
loadinactivateSt();

function activateStudent(studentid){
    let confirmActivate = confirm("Are you sure you want to activate this student?");
    if (!confirmActivate) return;
    firebase.database().ref("userDetails/" + studentid).update({
        Status: "active"
    }).then(() => {
        alert("Student activated successfully");
    }).catch((error) => {
        alert("Error activating student: " + error.message);
    })
}