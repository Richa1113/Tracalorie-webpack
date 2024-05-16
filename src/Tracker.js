import Storage from "./Storage";

//class containing methods and properties of tracking calories
class CalorieTacker {
  constructor() {
    //prooperties of class constructor
    this._calorieLimit = Storage.getCalorieLimit();
    this._totalCalories = Storage.getTotalCalorie(0);
    this._meals = Storage.getMealLocalStorage();
    this._workouts = Storage.getWorkoutLocalStorage();

    //methods
    this._displayCloriesTotal();
    this._displayCloriesLimit();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayProgressBar();

    document.getElementById("limit").value = this._calorieLimit;
  }

  //public methods(API) of class
  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    Storage.updateTotalCalorie(this._totalCalories);
    Storage.setMealLocalStorage(meal);
    this._displayMealAdded(meal);
    this._render();
  }

  addworkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    Storage.updateTotalCalorie(this._totalCalories);
    Storage.setWorkoutLocalStorage(workout);
    this._displayWorkoutAdded(workout);
    this._render();
  }

  romoveMeal(id) {
    const index = this._meals.findIndex((meal) => meal.id === id);
    if (index !== -1) {
      const meal = this._meals[index];
      this._totalCalories -= meal.calories;
      Storage.updateTotalCalorie(this._totalCalories);
      Storage.deleteMealLocalStorage(meal);
      this._meals.splice(index, 1);
      this._render();
    }
  }

  removeWorkout(id) {
    const index = this._workouts.findIndex((workout) => workout.id === id);
    if (index !== -1) {
      const workout = this._workouts[index];
      this._totalCalories += workout.calories;
      Storage.updateTotalCalorie(this._totalCalories);
      Storage.deleteWorkoutLocalStorage(workout);
      this._workouts.splice(index, 1);
      this._render();
    }
  }

  setDailyLimit(limit) {
    this._calorieLimit = limit;
    // const caloreLimitShown = document.getElementById("calories-limit");
    // caloreLimitShown.innerHTML = limit;
    Storage.setCalorieLimit(limit);
    this._displayCloriesLimit();
    this._render();
  }

  // showMealAdded() {
  //   let meals = Storage.getMealLocalStorage();
  //   meals.forEach((meal) => {
  //     this._displayMealAdded(meal);
  //   });
  // }

  // showWorkoutAdded() {
  //   let workouts = Storage.getWorkoutLocalStorage();
  //   workouts.forEach((workout) => {
  //     this._displayWorkoutAdded(workout);
  //   });
  // }

  loadItems() {
    this._meals.forEach((meal) => this._displayMealAdded(meal));
    this._workouts.forEach((workout) => this._displayWorkoutAdded(workout));
  }

  resetTracker() {
    this._calorieLimit = 2000;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
    Storage.clearAll();
    this._render();
  }

  //private methhods
  _displayCloriesTotal() {
    const caloriesTotalEL = document.getElementById("calories-total");
    caloriesTotalEL.innerHTML = this._totalCalories;
  }

  _displayCloriesLimit() {
    const caloriesLimitEL = document.getElementById("calories-limit");
    caloriesLimitEL.innerHTML = this._calorieLimit;
  }

  _displayCaloriesConsumed() {
    const caloriesConsumedEL = document.getElementById("calories-consumed");
    const caloriesConsumed = this._meals.reduce((total, meal) => {
      total += meal.calories;
      return total;
    }, 0);
    caloriesConsumedEL.innerHTML = caloriesConsumed;
  }

  _displayCaloriesBurned() {
    const caloriesBurnedEL = document.getElementById("calories-burned");
    const caloriesBurned = this._workouts.reduce((total, workout) => {
      total += workout.calories;
      return total;
    }, 0);
    caloriesBurnedEL.innerHTML = caloriesBurned;
  }

  _displayCaloriesRemaining() {
    const caloriesRemainingEL = document.getElementById("calories-remaining");
    const progressBarEL = document.getElementById("calorie-progress");
    // const caloriesLimitEL = document.getElementById("calories-limit");
    // const caloriesTotalEL = document.getElementById("calories-total");
    // const caloriesRemaining = (caloriesLimitEL.textContent) - (caloriesTotalEL.textContent);
    const caloriesRemaining = this._calorieLimit - this._totalCalories;
    caloriesRemainingEL.innerHTML = caloriesRemaining;
    const node = caloriesRemainingEL.parentElement.parentElement;
    if (caloriesRemaining <= 0) {
      node.classList.remove("bg-light");
      node.classList.add("bg-danger");
      progressBarEL.classList.remove("bg-success");
      progressBarEL.classList.add("bg-danger");
    } else {
      node.classList.remove("bg-danger");
      node.classList.add("bg-light");
      progressBarEL.classList.remove("bg-danger");
      progressBarEL.classList.add("bg-success");
    }
  }

  _displayProgressBar() {
    const progressEL = document.getElementById("calorie-progress");
    const percentageWidth = (this._totalCalories / this._calorieLimit) * 100;
    const width = Math.min(percentageWidth, 100);
    progressEL.style.width = `${width}%`;
  }

  _displayMealAdded(meal) {
    const mealsEL = document.getElementById("meal-items");
    const mealEL = document.createElement("div");
    mealEL.classList.add("card", "my-2");
    mealEL.setAttribute("data-id", meal.id);
    mealEL.innerHTML = `<div class="card-body">
     <div class="d-flex align-items-center justify-content-between">
       <h4 class="mx-1">${meal.name}</h4>
       <div
         class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
       >
         ${meal.calories}
       </div>
       <button class="delete btn btn-danger btn-sm mx-2">
         <i class="fa-solid fa-xmark"></i>
       </button>
     </div>
   </div>`;
    mealsEL.appendChild(mealEL);
  }

  _displayWorkoutAdded(workout) {
    const workoutsEL = document.getElementById("workout-items");
    const workoutEL = document.createElement("div");
    workoutEL.classList.add("card", "my-2");
    workoutEL.setAttribute("data-id", workout.id);
    workoutEL.innerHTML = `<div class="card-body">
       <div class="d-flex align-items-center justify-content-between">
         <h4 class="mx-1">${workout.name}</h4>
         <div
           class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
         >
           ${workout.calories}
         </div>
         <button class="delete btn btn-danger btn-sm mx-2">
           <i class="fa-solid fa-xmark"></i>
         </button>
       </div>
     </div>`;
    workoutsEL.appendChild(workoutEL);
  }

  _render() {
    this._displayCloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayProgressBar();
  }
}

export default CalorieTacker;
