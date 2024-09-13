package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/rs/cors"
)

type Meal struct {
    MealDate string `json:"MLSV_YMD"`
    MealName string `json:"DDISH_NM"`
}

func mealHandler(w http.ResponseWriter, r *http.Request) {
    meals := []Meal{
        {MealDate: "20240914", MealName: "테스트 급식"},
    }

    w.Header().Set("Content-Type", "application/json")
    if err := json.NewEncoder(w).Encode(meals); err != nil {
        log.Printf("Error encoding meals: %v", err)
        http.Error(w, "Internal Server Error", http.StatusInternalServerError)
    }
}

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/meal", mealHandler)

    handler := cors.Default().Handler(mux)

    log.Println("Server is running on port 8080")
    log.Fatal(http.ListenAndServe(":8080", handler))
}
