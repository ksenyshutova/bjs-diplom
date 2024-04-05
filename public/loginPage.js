"use strict";

let userForm = new UserForm();
userForm.loginFormCallback = data => {
    console.log(data);
    ApiConnector.login(data, response => {
        console.log(response);
        if (response.success) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage('Ошибка в логине или пароле, повторите попытку');
        }
    });
};

userForm.registerFormCallback = data => {
    console.log(data);
    ApiConnector.register(data, response => {
        console.log(response);
        if (response.success) {
            location.reload();
        } else {
            userForm.setRegisterErrorMessage('Ошибка в регистрации, повторите попытку');
        }
    });
};