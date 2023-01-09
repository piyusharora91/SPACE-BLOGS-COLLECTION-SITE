import createDomNode from "./createDomNode.js";

const activateNav = (keyword) => {
    document.querySelectorAll('.clickable').forEach(navLink => {
        navLink.id.includes(keyword) ? navLink.classList.add('active-background') :
            navLink.classList.remove('active-background');
    });
}

const scrolTop = () => {
    window.scrollTo({
        top: -100,
        left: 0,
        behavior: 'instant'
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
            resultNode.style.display = "none";
        });
        imagesContainer.classList.add('favorites-shown');
        activateNav('favorites');
        scrolTop();
        updateDom(toPosition, targetList, imagesContainer);
    }
    else
        alert("Your Favorites Section is Either Empty or we've Run into Error.\nPlease TRY again!");
}

const showResultsSection = (toPosition, targetList, imagesContainer, status = null) => {
    if (imagesContainer.classList.contains('favorites-shown') || status != null) {
        document.querySelectorAll('.card').forEach((resultNode) => {
            resultNode.style.display = "none";
        });
        imagesContainer.classList.remove('favorites-shown');
        activateNav('home');
        scrolTop();
        updateDom(toPosition, targetList, imagesContainer);
    }
}

export { updateDom, showFavoritesSection, showResultsSection };