import { saveFavorite, removeFavorite } from "./favoriteSectionMethods.js";
import returnElementId from "./returnElementId.js";

const createDomNodes = (item, page) => {
    // card Container
    const card = document.createElement('div');
    let idToSet = '';
    card.classList.add('card', `${page}-section`);
    idToSet = returnElementId(item.title);
    card.setAttribute('id', idToSet);

    //Link to wrap our Image
    const link = document.createElement('a');
    link.href = item.hdurl;
    link.title = 'View Full image';
    link.target = '_blank';
    //create Image/video element
    let mediaElement = '';
    if (item.media_type === 'video') {
        mediaElement = document.createElement('iframe');
        mediaElement.src = item.url;
    } else {
        mediaElement = document.createElement('div');
        mediaElement.style.backgroundImage = `url(${item.url})`;
        mediaElement.style.backgroundSize = 'cover';
        mediaElement.style.backgroundRepeat = 'no-repeat';
        mediaElement.style.backgroundPosition = 'center';
    }
    mediaElement.alt = 'NASA picture of the Day!';
    mediaElement.loading = 'lazy';
    mediaElement.classList.add('card-img-top');

    // Card Body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    // Card Clickable Link
    const saveText = document.createElement('p');
    saveText.classList.add('clickable', 'add-or-remove-to-favorite-button');
    if (page === 'results') {
        saveText.textContent = 'Add To Favorites';
        saveText.addEventListener('click', () => saveFavorite(item, item.url));
    } else {
        saveText.textContent = 'Remove Favorite';
        saveText.addEventListener('click', (e) => removeFavorite(e));
    }
    // Card Title
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = item.title;
    // Card Text
    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.textContent = item.explanation;

    // card Footer
    const mutedTextContainer = document.createElement('small');
    mutedTextContainer.classList.add('text-muted');
    // Date info
    const date = document.createElement('strong');
    date.textContent = item.date;
    // Copyright holder info
    const copyrightResult = (item.copyright === undefined) ? '' : item.copyright;
    const holderInfo = document.createElement('span');
    holderInfo.textContent = ` ${copyrightResult}`;

    // Append
    mutedTextContainer.append(date, holderInfo);
    cardBody.append(saveText, cardTitle, cardText, mutedTextContainer);
    link.appendChild(mediaElement);
    card.append(link, cardBody);

    return card;
}

export default createDomNodes;