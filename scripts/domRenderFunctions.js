import createDomNode from "./createDomNode.js";

const activateNav = (keyword) => {
    document.querySelectorAll('.clickable').forEach(navLink => {
        navLink.id.includes(keyword) ? navLink.classList.add('active-background') :
            navLink.classList.remove('active-background');
    });
}

const updateDom = (toPosition, targetList, imagesContainer) => {
    if (toPosition === 'HOME') {
        targetList.forEach((result) => {
            const resultCard = createDomNode(result, "results");
            imagesContainer.appendChild(resultCard);
        });
    } else {
        Object.values(targetList).forEach((result) => {
            const resultCard = createDomNode(result, "favorites");
            imagesContainer.appendChild(resultCard);
        });
    }
}

const showFavoritesSection = (toPosition, targetList, imagesContainer) => {
    const savedItems = JSON.parse(localStorage.getItem('favorites'));
    if (savedItems && Object.keys(savedItems).length !== 0) {
        document.querySelectorAll('.results-section').forEach((resultNode) => {
            resultNode.hidden = true;
        });
        imagesContainer.classList.add('favorites-shown');
        activateNav('favorites');
        updateDom(toPosition, targetList, imagesContainer);
    }
    else
        alert("Your Favorites Section is Either Empty or we've Run into Error.\nPlease TRY again!");
}

const showResultsSection = (toPosition, targetList, imagesContainer) => {
    if (imagesContainer.classList.contains('favorites-shown')) {
        document.querySelectorAll('.favorites-section').forEach((resultNode) => {
            resultNode.hidden = true;
        });
        imagesContainer.classList.remove('favorites-shown');
        activateNav('home');
        updateDom(toPosition, targetList, imagesContainer);
    }
}

export { updateDom, showFavoritesSection, showResultsSection };