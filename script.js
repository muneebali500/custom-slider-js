const customersList = document.getElementById(`customers`);
const customerEl = document.getElementById(`customer`);
const leftArrowBtn = document.getElementById(`left-btn`);
const rightArrowBtn = document.getElementById(`right-btn`);
const customers = document.querySelectorAll(`.customer`);
const circleContainer = document.getElementById(`circle-container`);

let prevElementIndex = 0;
let circleArr = ``;

////////////////// EVENT LISTENERS /////////////////////
leftArrowBtn.addEventListener(`click`, () => {
  handleSlide(`left`);
});

rightArrowBtn.addEventListener(`click`, () => {
  handleSlide(`right`);
});

window.addEventListener(`resize`, createCircles);
window.addEventListener(`load`, createCircles);

/////////////////// FUNCTIONS //////////////////////////
function calculateSlideAmount() {
  const customerElWidth = customerEl.clientWidth;
  const customerElGap = Number(
    getComputedStyle(customersList).gap.replace(/\D+/g, "")
  );

  const slideAmount = customerElWidth + customerElGap;
  return slideAmount;
}

///// circles are created according to their presence in viewport
function createCircles() {
  elementsInViewport = 0;
  customersList.scrollLeft = 0;

  customers.forEach((element) => {
    if (checkVisible(element)) {
      elementsInViewport += 1;
    }
  });

  circleContainer.innerHTML = ``;
  for (let i = elementsInViewport; i <= customers.length; i++) {
    const circle = document.createElement(`li`);
    circle.setAttribute(`class`, `circle`);

    circleContainer.appendChild(circle);
  }

  circleArr = document.querySelectorAll(`.circle`);
  circleArr[0].style.backgroundColor = `#fff`;

  circleArr.forEach((circle, currentElIndex) => {
    circle.addEventListener(`click`, () => {
      const diff = currentElIndex - prevElementIndex;
      customersList.scrollLeft += diff * calculateSlideAmount();
      prevElementIndex = currentElIndex;

      setCircleBgColor(currentElIndex);
    });
  });
}

function handleSlide(direction) {
  if (direction === `left`) {
    customersList.scrollLeft -= calculateSlideAmount();
    prevElementIndex -= prevElementIndex > 0 ? 1 : 0;
    setCircleBgColor(prevElementIndex);
  } else {
    customersList.scrollLeft += calculateSlideAmount();
    prevElementIndex += prevElementIndex < circleArr.length - 1 ? 1 : 0;
    setCircleBgColor(prevElementIndex);
  }
}

function setCircleBgColor(circleIndex) {
  circleArr.forEach((el, index) => {
    index === circleIndex
      ? (el.style.backgroundColor = `#fff`)
      : (el.style.backgroundColor = `transparent`);
  });
}

///// check how many elements are visible in viewport so to create circles accordingly
function checkVisible(elm) {
  const rect = elm.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
