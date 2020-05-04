let btnText = document.querySelector('.btn-text');
let newsTexts = document.querySelectorAll('.news-text');
let j = 0;


btnText.addEventListener('click', moveLeftText);

function moveLeftText() {
  if (j == newsTexts.length - 1) {
    newsTexts[j].style.display = "none";
    j = 0;
    newsTexts[j].style.display = "block";
  } else {
    newsTexts[j].style.display = "none";
    newsTexts[j + 1].style.display = "block";
    j++
  }
}

setInterval(function () {
  moveLeftText()
}, 3000)