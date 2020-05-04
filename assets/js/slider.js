// Start slider photo news
let buttons = document.querySelectorAll(".photos-slider button");

let [left, right] = buttons

let reviews = document.querySelectorAll(".img");
let i = 0;
left.addEventListener("click", moveLeft);
right.addEventListener("click", moveRight);



function moveLeft() {
  if (i == reviews.length - 1) {
    reviews[i].style.display = "none";
    i = 0;
    reviews[i].style.display = "block";
  } else {
    reviews[i].style.display = "none";
    reviews[i + 1].style.display = "block";
    i++
  }
};


function moveRight() {
  if (i == 0) {
    reviews[i].style.display = "none";
    i = reviews.length - 1;
    reviews[reviews.length - 1].style.display = "block";

  } else {
    reviews[i].style.display = "none";
    reviews[i - 1].style.display = "block";
    i--;
  }
};

setInterval(function () {
  moveLeft();
}, 4000);

// ************************************************************

// start slider video

let rightVideo = document.querySelector('.rightVideo');
let a = 0;


rightVideo.addEventListener('click', moveVideo);

function moveVideo() {
  let carousel = document.querySelector('.carousel');
  a = a - 313;
  if (a < -626) {
    a = 0;
  }
  carousel.style.left = a + 'px'
};

setInterval(function () {
  moveVideo()
}, 2000)