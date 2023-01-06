import { updateDom, showFavoritesSection, showResultsSection } from "./domRenderFunctions.js";

const favoritesNav = document.getElementById('favoritesNav');
const homeNav = document.getElementById('homeNav');
const loadNewNav = document.getElementById('loadNewNav');
const imagesContainer = document.querySelector('.images-container');
const loader = document.querySelector('.loader');

// NASA API 
const count = 20;
const apiKey = 'DEMO_KEY';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&&count=${count}`;

let resultsArray = [];
let favorites = {};

// Get 20 results from NASA API
const getNasaPictures = async () => {
    try {
        loader.classList.remove('hidden');
        const response = await fetch(apiUrl);
        resultsArray = await response.json();
        localStorage.setItem('loadedImages', JSON.stringify(resultsArray));
        updateDom('HOME', resultsArray, imagesContainer);
        loader.classList.add('hidden');
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
        getNasaPictures();
    }

    homeNav.addEventListener('click', () => showResultsSection('HOME', resultsArray, imagesContainer));
    favoritesNav.addEventListener('click', () => {
        favorites = JSON.parse(localStorage.getItem('favorites'));
        showFavoritesSection('FAVORITES', favorites, imagesContainer)
    });
    loadNewNav.addEventListener('click', () => {
        document.querySelectorAll('.results-section').forEach(card => card.remove());
        getNasaPictures();
    });
});