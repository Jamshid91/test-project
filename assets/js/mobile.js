const menuBurger = document.querySelector('.menu-burger');
const menu = document.querySelector('.menu');
const searchIcon = document.querySelector(".fas");
const searchInput = document.querySelector('.search-mobile-input');

menuBurger.addEventListener('click', () => {
  menu.classList.toggle('hidden')
})

searchIcon.addEventListener('click', () => {
  searchInput.classList.toggle('hidden')
})