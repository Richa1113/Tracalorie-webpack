//local storage class
class Storage {
  static getCalorieLimit(defaultLimit = 2000) {
    let calorieLimit;
    if (localStorage.getItem("calorieLimit") === null) {
      calorieLimit = 2000;
    } else {
      calorieLimit = +localStorage.getItem("calorieLimit");
    }
    return calorieLimit;
  }

  static setCalorieLimit(calorieLimit) {
    localStorage.setItem("calorieLimit", calorieLimit);
  }

  static getTotalCalorie(defaultCalories = 0) {
    let totalCalorie;
    if (localStorage.getItem("totalCalorie") === null) {
      totalCalorie = defaultCalories;
    } else {
      totalCalorie = +localStorage.getItem("totalCalorie");
    }
    return totalCalorie;
  }

  static updateTotalCalorie(totalCalorie) {
    localStorage.setItem("totalCalorie", totalCalorie);
  }

  static getMealLocalStorage() {
    let meals;
    if (localStorage.getItem("meals") === null) {
      meals = [];
    } else {
      meals = JSON.parse(localStorage.getItem("meals"));
    }
    return meals;
  }

  static setMealLocalStorage(meal) {
    let meals = Storage.getMealLocalStorage("meals");
    meals.push(meal);
    localStorage.setItem("meals", JSON.stringify(meals));
  }

  static getWorkoutLocalStorage() {
    let workouts;
    if (localStorage.getItem("workouts") === null) {
      workouts = [];
    } else {
      workouts = JSON.parse(localStorage.getItem("workouts"));
    }
    return workouts;
  }

  static setWorkoutLocalStorage(workout) {
    let workouts = Storage.getWorkoutLocalStorage("workouts");
    workouts.push(workout);
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }

  static deleteMealLocalStorage(item) {
    let meals = Storage.getMealLocalStorage();
    meals.forEach((meal, index) => {
      if (item.id === meal.id) {
        meals.splice(index, 1);
      }
    });
    localStorage.setItem("meals", JSON.stringify(meals));
  }

  static deleteWorkoutLocalStorage(item) {
    let workouts = Storage.getWorkoutLocalStorage();
    workouts.forEach((workout, index) => {
      if (item.id === workout.id) {
        workouts.splice(index, 1);
      }
    });
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }

  static clearAll() {
    // localStorage.removeItem("totalCalorie");
    // localStorage.removeItem("meals");
    // localStorage.removeItem("workouts");

    //if want to include calorieLimit too
    localStorage.clear();
  }
}

export default Storage;
