//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    
    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyAPc31YV2I2sWfbD42B0E9wPigqaR_ys6I",
        authDomain: "chatfirebase-practice.firebaseapp.com",
        projectId: "chatfirebase-practice",
        storageBucket: "chatfirebase-practice.appspot.com",
        messagingSenderId: "761978211647",
        appId: "1:761978211647:web:f7196a0ad90bbb0a11178a"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);


    firebase.auth().onAuthStateChanged((user) => {
        //logged user
        if (user) {
            userAuth(user)
            chatContent(user)
            hideButton("logIn")
        }
        //user not logged
        else {
            userWithoutAuth()
            hideButton("logOut")
        }
    })
    
    const userWithoutAuth = () => {
        console.log('usuario sin registrar')
        form.classList.add('d-none')
        webContent.innerHTML = `
            <p id="startSesion" class="lead text-center my-5">Debes iniciar sesión</p>
        `
        const provider = new firebase.auth.GoogleAuthProvider()
        btnLogIn.onclick = () => {
            firebase.auth().signInWithPopup(provider).then((result) => {
                const user = result.user
                userName.innerHTML = user.displayName
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code
                // The email of the user's account used.
                const email = error.email
            })
        }

    }

    const userAuth = user => {
        console.log('usuario registrado')
        const startSesion = document.getElementById('startSesion')
        form.classList.remove('d-none')
        if (startSesion) webContent.removeChild(startSesion)
        userName.innerHTML = user.displayName

        btnLogOut.onclick = () => {
            firebase.auth().signOut().then(() => {
                // Sign-out successful.
                userName.innerHTML = "BChat"
            }).catch((error) => {
                // An error happened.
                console.log(error)
            })
        }
    }

});