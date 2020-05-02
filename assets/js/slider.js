let buttons = document.querySelectorAll(".reviews button");

let [left, right] = buttons
console.log(left, right)

let reviews = document.querySelectorAll(".review");
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
}


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
}

console.log(moveRight)

setInterval(function () {
  moveLeft();
}, 4000)

// ********************************************************************************
// *******************************************************************************