//var firebase = require('firebase');

var usersList = document.getElementById('usersList');
var nameInput = document.getElementById('nameInput');
var ageInput = document.getElementById('ageInput');
var addButton = document.getElementById('addButton');

const db = firebase.firestore();

addButton.addEventListener('click', () => {
    if (nameInput.value != "" && ageInput.value != "") {
        create(nameInput.value, ageInput.value);
    }
    else if (nameInput.value == "" && ageInput.value == "") {
        alert("Form vazio, preencha os campos.");
    }
    else if (nameInput.value == "") {
        alert("Campo NOME vazio.")
    }
    else if (ageInput.value == "") {
        alert("Campo IDADE vazio.")
    }
});

function create(name, age) {

    var data = {
        age: age,
        name: name
    };

    return db.collection('users').add(data);
}

function listUsers() {
    db.collection('users').get().then( (Snapshot) => {

        Snapshot.forEach( (user) => {
            var li = document.createElement('li');

            var pName = document.createElement('p');
            pName.appendChild(document.createTextNode(`Name: ${user.data().name}`));
            li.appendChild(pName);

            var pAge = document.createElement('p');
            pAge.appendChild(document.createTextNode(`Age: ${user.data().age}`)); 
            li.appendChild(pAge);

            usersList.appendChild(li);
        });

    });
}
listUsers();

