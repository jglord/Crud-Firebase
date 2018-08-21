//var firebase = require('firebase');

var usersList = document.getElementById('usersList');
var nameInput = document.getElementById('nameInput');
var ageInput = document.getElementById('ageInput');
var addButton = document.getElementById('addButton');
var deleteAllUsersButton = document.getElementById('deleteAllUsersButton')

var editUserModal = document.getElementById('editUserModal');
var saveButton = document.getElementById('saveButton');
var nameEditInput = document.getElementById('nameEditInput');
var ageEditInput = document.getElementById('ageEditInput');

var db = firebase.database();

addButton.addEventListener('click', () => {
    if (nameInput.value != "" && ageInput.value != "") {
        createUser(nameInput.value, ageInput.value);
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

deleteAllUsersButton.addEventListener('click', () => {
    if (confirm('Certeza que você quer deletar todos os usuários?')) {
        return db.ref('users').set(null);
    }
});

function createUser(name, age) {

    let data = {
        age: age,
        name: name
    };

    return db.ref().child('users').push(data);
}

function deleteUser(userKey) {
    return db.ref().child(`users/${userKey}`).remove();
}


function updateUser(name, age, userKey) {

    let data = {
        name: name,
        age: age        
    };
    
    return db.ref(`users/${userKey}`).update(data);
}

function listUsers() {
    db.ref('users').on('value', (snapshot) => {
        usersList.innerHTML = '';

        snapshot.forEach((user) => {
            const data = user.val();
            const userKey = user.key;

            let trUser = document.createElement('tr');
            trUser.classList = 'table-active';

            let tdName = document.createElement('td');
            tdName.appendChild(document.createTextNode(`${data.name}`));
            trUser.appendChild(tdName);

            let tdAge = document.createElement('td');
            tdAge.appendChild(document.createTextNode(`${data.age}`));
            trUser.appendChild(tdAge);

            let editButton = document.createElement('button');
            editButton.appendChild(document.createTextNode('EDIT'));
            editButton.setAttribute('type', 'button');
            editButton.setAttribute('data-toggle', 'modal');
            editButton.setAttribute('data-target', '#modalEditUser')
            editButton.classList = 'btn btn-primary';
            editButton.addEventListener('click', () => {

                editUserModal.appendChild(document.createTextNode(`Editando ${data.name}`));

                saveButton.addEventListener('click', () => {
                    updateUser(nameEditInput.value, ageEditInput.value, userKey);
                });
            });

            let tdEditButton = document.createElement('td');
            tdEditButton.appendChild(editButton);
            trUser.appendChild(tdEditButton);

            let deleteButton = document.createElement('button');
            deleteButton.appendChild(document.createTextNode('DELETE'));
            deleteButton.setAttribute('type', 'button');
            deleteButton.classList = 'btn btn-danger';
            deleteButton.addEventListener('click', () => {
                //if( confirm(`Deseja mesmo deletar ${data.name}?`) ) {
                deleteUser(userKey);
                listUsers();
                //}
                //else {
                //alert('else');
                //}
            });

            let tdDeleteButton = document.createElement('td');
            tdDeleteButton.appendChild(deleteButton);
            trUser.appendChild(tdDeleteButton);

            usersList.appendChild(trUser);
        });
    });
}
listUsers();

