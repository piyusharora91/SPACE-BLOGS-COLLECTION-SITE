const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const savedConfirmed = document.querySelector('.saved-confirmed');
const loader = document.querySelector('.loader');

// NASA API 
const count = 20;
const apiKey = 'DEMO_KEY';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&&count=${count}`;

let resultsArray = [];

const updateDom = () => {
    resultsArray.forEach((result) => {
        // card Container
        const card = document.createElement('div');
        card.classList.add('card');

        //Link to wrap our Image
        const link = document.createElement('a');
        link.href = result.hdurl;
        link.title = 'View Full image';
        link.target = '_blank';
        //Image
        const image = document.createElement('img');
        image.src = result.url;
        image.alt = 'NASA picture of the Day!';
        image.loading = 'lazy';
        image.classList.add('card-img-top');

        // Card Body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        // Card Title
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = result.title;
        // Card Clickable Link
        const saveText = document.createElement('p');
        saveText.classList.add('clickable');
        saveText.textContent = 'Add To Favorites';
        // Card Text
        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.textContent = result.explanation;

        // card Footer
        const mutedTextContainer = document.createElement('small');
        mutedTextContainer.classList.add('text-muted');
        // Date info
        const date = document.createElement('strong');
        date.textContent = result.date;
        // Copyright holder info
        const copyrightResult = (result.copyright === undefined) ? '' : result.copyright;
        const holderInfo = document.createElement('span');
        holderInfo.textContent = ` ${copyrightResult}`;

        // Append
        mutedTextContainer.append(date, holderInfo);
        cardBody.append(cardTitle, saveText, cardText, mutedTextContainer);
        link.appendChild(image);
        card.append(link, cardBody);
        imagesContainer.appendChild(card);
    });
}

// Get 20 results from NASA API
const getNasaPictures = async () => {
    try {
        const response = await fetch(apiUrl);
        resultsArray = await response.json();
        updateDom();
    } catch (e) {
        // catch Errors here
        console.log('errors: ', e.message);
    }
}

//On Load
getNasaPictures();