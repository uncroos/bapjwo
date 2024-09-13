document.getElementById("fetch-meal").addEventListener("click", () => {
  fetch("http://localhost:8080/meal")
    .then((response) => response.json())
    .then((data) => {
      const mealInfo = document.getElementById("meal-info");
      mealInfo.innerHTML = "";

      if (data.length === 0) {
        mealInfo.textContent = "급식 정보가 없습니다.";
      } else {
        data.forEach((meal) => {
          const mealDiv = document.createElement("div");
          mealDiv.textContent = `날짜: ${meal.MealDate}, 급식: ${meal.MealName}`;
          mealInfo.appendChild(mealDiv);
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching meal data:", error);
      document.getElementById("meal-info").textContent =
        "급식 정보를 불러오지 못했습니다.";
    });
});
