let f1: HTMLFormElement = document.querySelector('#f1');
let login: HTMLInputElement = document.querySelector('.login');
let password: HTMLInputElement = document.querySelector('.password');
let email: HTMLInputElement = document.querySelector('.email');
let arr1 = [];
arr1.push(login, email, password);
let arrValue = [];
let arrValid = [];
let regExpLogin: RegExp = /^[a-zA-Z]{4,16}$/;
let regExpPassword: RegExp = /^[a-zA-Z0-9_.-]{4,16}$/;
let regExpEmail: RegExp = /^[a-z]+[a-z0-9_.-]*@[a-z]+\.[a-z]+$/;
let users = [];
function check(): boolean {
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
        let input: HTMLInputElement = document.querySelector(`.${elem}`);
        input.style.cssText = 'border: 2px solid #cd1d3ee8;';
    });
    keytrue.forEach(element => {
        let input: HTMLInputElement = document.querySelector(`.${element}`);
        input.style.cssText = 'border: 2px solid #22c722;';
    });
    if (keytrue.length === 3) {
        return true
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
})

interface IUser {
    login: string;
    password: any;
    email: any;
}
let userIndex: number;
function addUser(): void {
    let user: IUser = {
        login: login.value,
        password: password.value,
        email: email.value,
    }
    users.push(user);
    render()
}
let editUserBTN: HTMLButtonElement = document.querySelector('.edit');
let addUserBTN: HTMLButtonElement = document.querySelector('.add');
let tbody: HTMLFormElement = document.querySelector('.tbody')
function render(): void {
    editUserBTN.style.display = 'none';
    addUserBTN.style.display = 'block';
    tbody.innerHTML = '';
    users.forEach((elem, index) => {
        let template: string =
            `<tr data-index = "${index}">
                <td>${index + 1} </td>
                <td>${elem["login"]}</td>
                <td>${elem["password"]}</td>
                <td>${elem["email"]}</td>
                <td><button  type="button" class="btn-warning btn" data-name = "edit" data-id="${index}">Edit</button></td>
                <td><button type="button" class="btn-danger btn" data-name = "delete" data-id="${index}">Delete</button></td>
        </tr>`
        tbody.insertAdjacentHTML('beforeend', template)
    })
}

document.body.addEventListener('click', (event) => {
    if (event.target !== null && event.target instanceof HTMLElement) {
        let element = event.target
        if (element.dataset.name == 'delete') {
            deleteUser()
        }
        if (element.dataset.name == 'edit') {
            editUser()
        }
        if (element.dataset.name == 'saveChanges') {
            if (check() == true) {
                saveEditUser()
            }
        }
        function deleteUser(): void {
            let id: number = +element.dataset.id;
            users.splice(id, 1);
            render();
        }
        function editUser(): void {
            userIndex = +element.dataset.id;
            let editObj: IUser = users[userIndex];
            login.value = editObj.login;
            password.value = editObj.password;
            email.value = editObj.email;
            editUserBTN.style.display = 'block';
            addUserBTN.style.display = 'none';
        }
    }
    function saveEditUser(): void {
        class User implements IUser {
            login = login.value;
            password = password.value;
            email = email.value;
        }
        let objectNew = new User()
        users[userIndex] = objectNew;
        f1.reset();
        arr1.forEach(elem => {
            elem.style.borderColor = 'lightgray';
        });
        render();
    }
})