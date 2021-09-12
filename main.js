let f1 = document.querySelector('#f1');
let login = document.querySelector('.login');
let password = document.querySelector('.password');
let email = document.querySelector('.email');
let arr1 = [];
arr1.push(login, email, password);
let arrValue = [];
let arrValid = [];
let regExpLogin = /^[a-zA-Z]{4,16}$/;
let regExpPassword = /^[a-zA-Z0-9_.-]{4,16}$/;
let regExpEmail = /^[a-z]+[a-z0-9_.-]*@[a-z]+\.[a-z]+$/;
let users = [];
function check() {
    let validLogin = regExpLogin.test(login.value);
    let validEmail = regExpEmail.test(email.value);
    let validPassword = regExpPassword.test(password.value);
    let error = {
        login: validLogin,
        password: validPassword,
        email: validEmail,
    };
    let keyfalse = Object.keys(error).filter(key => error[key] === false);
    let keytrue = Object.keys(error).filter(key => error[key] === true);
    keyfalse.forEach(elem => {
        let input = document.querySelector(`.${elem}`);
        input.style.cssText = 'border: 2px solid #cd1d3ee8;';
    });
    keytrue.forEach(element => {
        let input = document.querySelector(`.${element}`);
        input.style.cssText = 'border: 2px solid #22c722;';
    });
    if (keytrue.length === 3) {
        return true;
    }
}
document.querySelector('.add').addEventListener('click', function () {
    if (check() == true) {
        arr1.forEach(elem => {
            elem.style.borderColor = 'lightgray';
        });
        addUser();
        f1.reset();
    }
});
let userIndex;
function addUser() {
    let user = {
        login: login.value,
        password: password.value,
        email: email.value,
    };
    users.push(user);
    render();
}
let editUserBTN = document.querySelector('.edit');
let addUserBTN = document.querySelector('.add');
let tbody = document.querySelector('.tbody');
function render() {
    editUserBTN.style.display = 'none';
    addUserBTN.style.display = 'block';
    tbody.innerHTML = '';
    users.forEach((elem, index) => {
        let template = `<tr data-index = "${index}">
                <td>${index + 1} </td>
                <td>${elem["login"]}</td>
                <td>${elem["password"]}</td>
                <td>${elem["email"]}</td>
                <td><button  type="button" class="btn-warning btn" data-name = "edit" data-id="${index}">Edit</button></td>
                <td><button type="button" class="btn-danger btn" data-name = "delete" data-id="${index}">Delete</button></td>
        </tr>`;
        tbody.insertAdjacentHTML('beforeend', template);
    });
}
document.body.addEventListener('click', (event) => {
    if (event.target !== null && event.target instanceof HTMLElement) {
        let element = event.target;
        if (element.dataset.name == 'delete') {
            deleteUser();
        }
        if (element.dataset.name == 'edit') {
            editUser();
        }
        if (element.dataset.name == 'saveChanges') {
            if (check() == true) {
                saveEditUser();
            }
        }
        function deleteUser() {
            let id = +element.dataset.id;
            users.splice(id, 1);
            render();
        }
        function editUser() {
            userIndex = +element.dataset.id;
            let editObj = users[userIndex];
            login.value = editObj.login;
            password.value = editObj.password;
            email.value = editObj.email;
            editUserBTN.style.display = 'block';
            addUserBTN.style.display = 'none';
        }
    }
    function saveEditUser() {
        class User {
            login = login.value;
            password = password.value;
            email = email.value;
        }
        let objectNew = new User();
        users[userIndex] = objectNew;
        f1.reset();
        arr1.forEach(elem => {
            elem.style.borderColor = 'lightgray';
        });
        render();
    }
});
