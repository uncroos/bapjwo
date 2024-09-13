package main

import "net/http"

func  mealHandler(w http.ResponseWriter, r *http.Request){
	mealType := r.URL.Path[len("/api/meal/"):]
}