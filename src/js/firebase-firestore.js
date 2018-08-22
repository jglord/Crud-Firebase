var firebase = require('firebase');

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

function deleteUser(userId) { 
    db.collection('users').doc(`${userId}`).delete();
}


function listUsers() {
    db.collection('users').get().then( (Snapshot) => {

        Snapshot.forEach( (user) => {
            const data = user.data();
            const userId = user.id;
            

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
                    updateUser(nameEditInput.value, ageEditInput.value, userId);
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
                deleteUser(userId);
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

