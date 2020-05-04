// Это функция открывает меню сайта
let downs = document.querySelectorAll('.down');
downs.forEach((down) => {
    down.addEventListener('click', turnIcon)
  }

);

function turnIcon(e) {
  e.preventDefault();
  this.style.transform += 'rotate(180deg)';
  console.log(this.parentElement.nextElementSibling.classList.toggle('hidden'));
};

// ===================================================

// Это функция для поиска

let search = document.querySelector('.search');

search.addEventListener('click', () => {
  search.previousElementSibling.classList.toggle('hidden-search')
})