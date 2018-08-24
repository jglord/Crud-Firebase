//var firebase = require('firebase');

var emailInput = document.getElementById('emailInput');
var passwordInput = document.getElementById('passwordInput');

var emailCreateInput = document.getElementById('emailCreateInput');
var passwordCreateInput = document.getElementById('passwordCreateInput');

var displayName = document.getElementById('displayName');

var authEmailPassButton = document.getElementById('authEmailPassButton');
authEmailPassButton.addEventListener('click', () => {
    signInAuth(emailInput.value, passwordInput.value);
});

var createAccountButton = document.getElementById('createAccountButton');
createAccountButton.addEventListener('click', () => {
    createAuth(emailCreateInput.value, passwordCreateInput.value);
});


var logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('click', () => {
    logoutAuth();
});


function signInAuth(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then( (result) => {
        displayName.innerHTML = 'Bem vindo ' + emailInput.value;
    })
    .catch( (error) => {
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
    return firebase.auth().signOut()
    .then( (result) => {
        displayName.innerHTML = 'Você não está autenticado!';
    })  
    .catch( (error) => {
        console.log(error.code);
        console.log(error.message);
    });
}

