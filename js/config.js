const firebaseConfig = {
  apiKey: "AIzaSyAhBHuXs21MbzOaCjl2pIdj16HS4wKoYTY",
  authDomain: "attendance-5dc0f.firebaseapp.com",
  databaseURL: "https://attendance-5dc0f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "attendance-5dc0f",
  storageBucket: "attendance-5dc0f.firebasestorage.app",
  messagingSenderId: "545210256586",
  appId: "1:545210256586:web:ec7ab483a88ca1af0b3833",
  measurementId: "G-01WBHVCKZ3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

console.log('connected to firebase');

function logout() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    window.location.href = "index.html";
  }).catch((error) => {
    // An error happened.
    alert("Error signing out: " + error.message)
    console.log(error);
  })
}