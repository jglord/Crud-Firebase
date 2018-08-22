//var firebase = require('firebase');

var emailInput = document.getElementById('emailInput');
var passwordInput = document.getElementById('passwordInput');

var emailCreateInput = document.getElementById('emailCreateInput');
var passwordCreateInput = document.getElementById('passwordCreateInput');

var authEmailPassButton = document.getElementById('authEmailPassButton');
var createAccountButton = document.getElementById('createAccountButton');

var logoutButton = document.getElementById('logoutButton');

authEmailPassButton.addEventListener('click', () => {
    signInAuth(emailInput.value, passwordInput.value);
});

createAccountButton.addEventListener('click', () => {
    createAuth(emailCreateInput.value, passwordCreateInput.value);
});

logoutButton.addEventListener('click', () => {
    logoutAuth();
});


function signInAuth(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password).catch( (error) => {
        console.log(error.code);
        console.log(error.message);
    });
}

function createAuth(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password).catch( (error) => {
        console.log(error.code);
        console.log(error.message);
    });
}

function logoutAuth() {
    return firebase.auth().signOut().catch( (error) => {
        console.log(error.code);
        console.log(error.message);
    });
}

