const API = "9da4db4b2cb844b4be2ae2006cd2dacb";

function getMealInfo(mealType, dateInputId, contentElementId) {
  const inputDate = document.getElementById(dateInputId).value;

  // 사용자가 날짜를 선택했는지 확인
  if (!inputDate) {
    document.getElementById(contentElementId).innerText =
      "날짜를 선택해주세요.";
    return;
  }

  const apiUrl = "https://open.neis.go.kr/hub/mealServiceDietInfo";
  const date = inputDate.replace(/-/g, "");
  const rydbrcjd = "B10";
  const key = API;
  const schoolCode = "7010738";
  s;

  fetch(
    `${apiUrl}?KEY=${key}&ATPT_OFCDC_SC_CODE=${rydbrcjd}&SD_SCHUL_CODE=${schoolCode}&MLSV_YMD=${date}&Type=json`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.mealServiceDietInfo && data.mealServiceDietInfo[1].row) {
        const meals = data.mealServiceDietInfo[1].row;
        const mealData = meals.find((meal) => meal.MMEAL_SC_CODE === mealType);
        const formattedMealData = mealData
          ? mealData.DDISH_NM.split("<br/>").join("\n")
          : "급식 정보가 없습니다.";
        document.getElementById(contentElementId).innerText = formattedMealData;
      } else {
        document.getElementById(contentElementId).innerText =
          "급식 정보가 없습니다.";
      }
    })
    .catch((error) => {
      console.error("API 호출 중 오류 발생:", error);
      document.getElementById(contentElementId).innerText =
        "급식 정보를 가져오는 데 실패했습니다.";
    });
}

function getBreakfastInfo() {
  getMealInfo("1", "breakfastDate", "breakfast-content");
}

function getLunchInfo() {
  getMealInfo("2", "lunchDate", "lunch-content");
}

function getDinnerInfo() {
  getMealInfo("3", "dinnerDate", "dinner-content");
}
