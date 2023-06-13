"use strict";

// Selecting html elements
const taskInput = document.getElementById("taskInput");
const addBTN = document.getElementById("btn");
const subSection = document.querySelector(".sub-section");
const mainContent = document.querySelector(".main-content");

addBTN.addEventListener("click", function (e) {
  e.preventDefault();
  let taskInputValue = taskInput.value;
  const html = ` 
  <section class="flex items-center justify-between mx-auto ml-5 pb-3">
          <div class="flex items-center gap-2 md:gap-3">
            <div class="cicle-image">
              <img
                id="unchecked-circle"
                class="w-5 h-5 text-yellow-400"
                src="images/circle-regular.svg"
                alt="a cicle"
              />

              <img
                id="checked-circle"
                class="w-5 h-5 text-[#9336B4] hidden"
                src="images/circle-check-solid.svg"
                alt="a circle with a tick"
              />
            </div>

            <p class="text-xs md:text-base">${taskInputValue}</p>
          </div>
          <div class="mx-6">
            <img
              id="cross"
              class="w-6 h-6"
              src="images/cross.svg"
              alt="an X letter"
            />
          </div>
        </section>

`;
  // To check if input value is empty or not
  if (taskInputValue === "") {
    alert("Please put in a text!");
  } else {
    subSection.insertAdjacentHTML("beforeend", html);
    saveAddedTask();
  }
});

const changingElementStyle = function (target, circleType) {
  const clicked = target;
  const checkCircleType = clicked.parentElement.querySelector(`${circleType}`);
  clicked.classList.add("hidden");
  checkCircleType.classList.remove("hidden");
  const p = clicked.parentElement.nextElementSibling;
  p.classList.toggle("strikethrough-text");
};

subSection.addEventListener("click", function (e) {
  if (e.target.id === "unchecked-circle") {
    changingElementStyle(e.target, "#checked-circle");
    saveAddedTask();
  }
  if (e.target.id === "checked-circle") {
    changingElementStyle(e.target, "#unchecked-circle");
    saveAddedTask();
  }
  if (e.target.id === "cross") {
    e.target.parentElement.parentElement.remove();
    saveAddedTask();
  }
});

// Save Sub section contents in local storage
function saveAddedTask() {
  localStorage.setItem("addedTask", subSection.innerHTML);
}

// Get data from local storage
function showSavedTask() {
  const tasks = localStorage.getItem("addedTask");
  subSection.innerHTML = tasks;
}

showSavedTask();
