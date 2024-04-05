"use strict";

let logoutButton = new LogoutButton();
let ratesBoard = new RatesBoard();
let moneyManager = new MoneyManager();
let favoritesWidget = new FavoritesWidget();

logoutButton.action = () =>
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
    } else {
        favoritesWidget.setMessage(response.success, response.message = response.error);
    }
});

ApiConnector.getStocks(response => {
    console.log(response);
    if (response.success) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data);
    }
});
setInterval(ApiConnector.getStocks(response => {
    console.log(response);
    if (response.success) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data);
    } else {
        favoritesWidget.setMessage(response.success, response.message = response.error);
    }
}), 60000);

moneyManager.addMoneyCallback = data => {
    console.log(data);
    ApiConnector.addMoney(data, response => {
        console.log(response);
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, response.message = 'Пополнение счёта успешно выполнено');
        } else {
            moneyManager.setMessage(response.success, response.message = response.error);
        }
    });
};

moneyManager.conversionMoneyCallback = data => {
    console.log(data);
    ApiConnector.convertMoney(data, response => {
        console.log(response);
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, response.message = 'Конвертация валют успешно выполнена');
        } else {
            moneyManager.setMessage(response.success, response.message = response.error);
        }
    });
};

moneyManager.sendMoneyCallback = data => {
    console.log(data);
    ApiConnector.transferMoney(data, response => {
        console.log(response);
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, response.message = 'Перевод средств успешно выполнен');
        } else {
            moneyManager.setMessage(response.success, response.message = response.error);
        }
    });
}

ApiConnector.getFavorites(response => {
    console.log(response);
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    } else {
        favoritesWidget.setMessage(response.success, response.message = response.error);
    }
});

favoritesWidget.addUserCallback = data => {
    console.log(data);
    ApiConnector.addUserToFavorites(data, response => {
        console.log(response);
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        } else {
            moneyManager.setMessage(response.success, response.message = response.error);
        }
    });
}

favoritesWidget.removeUserCallback = data => {
    console.log(data);
    ApiConnector.removeUserFromFavorites(data, response => {
        console.log(response);
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        } else {
            moneyManager.setMessage(response.success, response.message = response.error);
        }
    });
}