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

const removeFavorite = (e) => {
    const itemUrl = e.path[2].children[0].children[0].src;  // gets card image src from where button is clicked
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    if (favorites.hasOwnProperty(`${itemUrl}`)) {
        const elementToRemove = e.path[2];
        delete favorites[itemUrl];
        elementToRemove.remove();
        localStorage.setItem('favorites', JSON.stringify(favorites));
        showDialogMessage('removed');
    }
}

export { saveFavorite, removeFavorite };