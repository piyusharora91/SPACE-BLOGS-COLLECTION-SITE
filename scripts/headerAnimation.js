const header = document.getElementById('title-header');
const headerAnimationButton = document.getElementById('header-animation-button');

const headerAnimation = (e) => {
    e.preventDefault();
    headerAnimationButton.classList.toggle('rotate-button');
    header.classList.toggle('toggle-header-animation');
}

export default headerAnimation;