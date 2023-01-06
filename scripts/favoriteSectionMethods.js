import returnElementId from "./returnElementId.js";

const showDialogMessage = (status) => {
    const saveConfirmed = document.querySelector('.save-confirmed');
    const saveConfirmedLabel = document.querySelector('#save-confirmed-label');
    if (status === 'added') {
        saveConfirmedLabel.textContent = 'ADDED!';
    }
    else if (status === 'removed') {
        saveConfirmedLabel.textContent = 'REMOVED!';
    } else {
        saveConfirmedLabel.textContent = 'ALREADY ADDED!';
    }

    saveConfirmed.hidden = false;
    // Show save confirmed for 2 seconds
    setTimeout(() => { saveConfirmed.hidden = true; }, 2000);
}

// Add results to favorites
const saveFavorite = (itemObject, itemUrl) => {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    if (!favorites || Object.keys(favorites).length === 0) {
        const tempFavorites = {};
        tempFavorites[itemUrl] = itemObject;
        localStorage.setItem('favorites', JSON.stringify(tempFavorites));
        showDialogMessage('added');
    }
    else {
        if (!favorites.hasOwnProperty(itemUrl)) {
            favorites[itemUrl] = itemObject;
            localStorage.setItem('favorites', JSON.stringify(favorites));
            showDialogMessage('added');
        } else {
            showDialogMessage('already added');
        }
    }
}

// Add item from favorites in localStorage
const removeFavorite = (itemUrl) => {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    if (favorites.hasOwnProperty(itemUrl)) {
        const elementToRemove = document.getElementById(returnElementId(favorites[itemUrl].title));
        delete favorites[itemUrl];
        elementToRemove.remove();
        localStorage.setItem('favorites', JSON.stringify(favorites));
        showDialogMessage('removed');
    }
}

export { saveFavorite, removeFavorite };