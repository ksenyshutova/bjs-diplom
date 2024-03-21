"use strict";

let userLogout = new LogoutButton();
userLogout.action = () =>
    ApiConnector.logout(response => {
        console.log(response);
        if (response.success) {
            location.reload();
        }
    });

ApiConnector.current(response => {
    console.log(response);
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

let userRatesBoard = new RatesBoard();
ApiConnector.getStocks(response => {
    console.log(response);
    if (response.success) {
        userRatesBoard.clearTable();
        userRatesBoard.fillTable(response.data);
    }
});
setInterval(ApiConnector.getStocks(response => {
    console.log(response);
    if (response.success) {
        userRatesBoard.clearTable();
        userRatesBoard.fillTable(response.data);
    }
}), 60000);


let userMoneyManager = new MoneyManager();
userMoneyManager.addMoneyCallback = data => {
    console.log(data);
    ApiConnector.addMoney(data, response => {
        console.log(response);
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            userMoneyManager.setMessage(response.success, response.message = 'Пополнение счёта успешно выполнено');
        } else {
            userMoneyManager.setMessage(response.success, response.message = response.error);
        }
    });
};

userMoneyManager.conversionMoneyCallback = data => {
    console.log(data);
    ApiConnector.convertMoney(data, response => {
        console.log(response);
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            userMoneyManager.setMessage(response.success, response.message = 'Конвертация валют успешно выполнена');
        } else {
            userMoneyManager.setMessage(response.success, response.message = response.error);
        }
    });
};

userMoneyManager.sendMoneyCallback = data => {
    console.log(data);
    ApiConnector.transferMoney(data, response => {
        console.log(response);
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            userMoneyManager.setMessage(response.success, response.message = 'Перевод средств успешно выполнен');
        } else {
            userMoneyManager.setMessage(response.success, response.message = response.error);
        }
    });
}

let userFavoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(response => {
    console.log(response);
    if (response.success) {
        userFavoritesWidget.clearTable();
        userFavoritesWidget.fillTable(response.data);
        userMoneyManager.updateUsersList(response.data);
    }
});

userFavoritesWidget.addUserCallback = data => {
    console.log(data);
    ApiConnector.addUserToFavorites(data, response => {
        console.log(response);
        if (response.success) {
            userFavoritesWidget.clearTable();
            userFavoritesWidget.fillTable(response.data);
            userMoneyManager.updateUsersList(response.data);
        } else {
            userMoneyManager.setMessage(response.success, response.message = response.error);
        }
    });
}

userFavoritesWidget.removeUserCallback = data => {
    console.log(data);
    ApiConnector.removeUserFromFavorites(data, response => {
        console.log(response);
        if (response.success) {
            userFavoritesWidget.clearTable();
            userFavoritesWidget.fillTable(response.data);
            userMoneyManager.updateUsersList(response.data);
        } else {
            userMoneyManager.setMessage(response.success, response.message = response.error);
        }
    });
}