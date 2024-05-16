import "@fortawesome/fontawesome-free/js/all";
import { Modal, Collapse } from "bootstrap";
import CalorieTacker from "./Tracker";
import { Meal, Workout } from "./Item";
import "./css/bootstrap.css";
import "./css/style.css";

//class containing methods of adding new item to the DOM
class App {
  constructor() {
    this._tracker = new CalorieTacker();
    this._callEventListners();
  }

  _callEventListners() {
    document
      .getElementById("meal-form")
      .addEventListener("submit", this._newItem.bind(this, "meal"));
    document
      .getElementById("workout-form")
      .addEventListener("submit", this._newItem.bind(this, "workout"));
    document
      .getElementById("meal-items")
      .addEventListener("click", this._removeItem.bind(this, "meal"));
    document
      .getElementById("workout-items")
      .addEventListener("click", this._removeItem.bind(this, "workout"));
    document
      .getElementById("filter-meals")
      .addEventListener("keyup", this._filterItem.bind(this, "meal"));
    document
      .getElementById("filter-workouts")
      .addEventListener("keyup", this._filterItem.bind(this, "workout"));
    document
      .getElementById("reset")
      .addEventListener("click", this._resetItem.bind(this));
    document
      .getElementById("limit-form")
      .addEventListener("submit", this._setDailyLimit.bind(this));

    this._tracker.loadItems();
    // this._tracker.showWorkoutAdded();
  }

  _newItem(type, e) {
    e.preventDefault();
    const name = document.getElementById(`${type}-name`);
    const calories = document.getElementById(`${type}-calories`);
    //check for null value
    if (name.value === "" || calories.value === "") {
      alert("Please enter the value");
      return;
    }

    if (type === "meal") {
      const meal = new Meal(name.value, +calories.value);
      this._tracker.addMeal(meal);
      //this._tracker._displayCaloriesConsumed();
    } else {
      const workout = new Workout(name.value, +calories.value);
      this._tracker.addworkout(workout);
      //this._tracker._displayCaloriesConsumed()
    }
    name.value = "";
    calories.value = "";

    const collapseItem = document.getElementById(`collapse-${type}`);
    const bsCollapse = new Collapse(collapseItem, {
      toggle: true,
    });
  }

  _removeItem(type, e) {
    e.preventDefault();
    if (
      e.target.classList.contains("delete") ||
      e.target.classList.contains("fa-xmark")
    ) {
      if (confirm("Are you sure?")) {
        const id = e.target.closest(".card").getAttribute("data-id");

        type === "meal"
          ? this._tracker.romoveMeal(id)
          : this._tracker.removeWorkout(id);

        e.target.closest(".card").remove();
      }
    }
  }

  _filterItem(type, e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll(`#${type}-items .card`).forEach((item) => {
      const name = item.firstElementChild.firstElementChild.textContent;
      if (name.toLowerCase().indexOf(text) !== -1) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  _resetItem() {
    this._tracker.resetTracker();
    document.getElementById("meal-items").innerHTML = "";
    document.getElementById("workout-items").innerHTML = "";
    document.getElementById("filter-meals").innerHTML = "";
    document.getElementById("filter-workouts").innerHTML = "";
  }

  _setDailyLimit(e) {
    e.preventDefault();
    const calorieLimitTaken = document.getElementById("limit");
    if (calorieLimitTaken.value === "") {
      alert("Please enter the value");
      return;
    }
    //caloreLimitShown.innerHTML =calorieLimitTaken.value;
    //or
    this._tracker.setDailyLimit(calorieLimitTaken.value);
    //this._tracker._calorieLimit = calorieLimitTaken.value;
    calorieLimitTaken.value = "";

    const modalEL = document.getElementById("limit-modal");
    const modal = Modal.getInstance(modalEL);
    modal.hide();
  }
}

const app = new App();
