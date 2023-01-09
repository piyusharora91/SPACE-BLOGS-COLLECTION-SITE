import { updateDom, showFavoritesSection, showResultsSection } from "./domRenderFunctions.js";
import toggleHeader from "./headerAnimation.js";

const favoritesNav = document.getElementById('favoritesNav');
const homeNav = document.getElementById('homeNav');
const loadNewNav = document.getElementById('loadNewNav');
const imagesContainer = document.querySelector('.images-container');
const loader = document.querySelector('.loader');
const headerAnimationButton = document.getElementById('header-animation-button');

// NASA API 
const count = 20;
const apiKey = 'DEMO_KEY';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&&count=${count}`;

let resultsArray = [];
let favorites = {};

// Get 20 results from NASA API
const getNasaPictures = async (loadStatus) => {
    try {
        loader.classList.remove('hidden');
        const response = await fetch(apiUrl);
        resultsArray = await response.json();
        localStorage.setItem('loadedImages', JSON.stringify(resultsArray));
        loader.classList.add('hidden');
        (loadStatus === 'INITIAL_LOAD') ? updateDom('HOME', resultsArray, imagesContainer) :
            showResultsSection('HOME', resultsArray, imagesContainer, 'render_again');
    } catch (e) {
        // catch Errors here
        console.log('errors: ', e.message);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    //checks and loads a set of pages from local storage to dom
    if (localStorage.getItem('loadedImages')) {
        resultsArray = JSON.parse(localStorage.getItem('loadedImages'));
        updateDom('HOME', resultsArray, imagesContainer);
    } else {
        getNasaPictures('INITIAL_LOAD');
    }

    homeNav.addEventListener('click', () => showResultsSection('HOME', resultsArray, imagesContainer));
    favoritesNav.addEventListener('click', () => {
        favorites = JSON.parse(localStorage.getItem('favorites'));
        showFavoritesSection('FAVORITES', favorites, imagesContainer)
    });
    loadNewNav.addEventListener('click', async () => {
        getNasaPictures('NEW_LOAD');
    });
    headerAnimationButton.addEventListener('click', (e) => toggleHeader(e));
});