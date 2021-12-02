import axios from "axios"

const API_URL = "http://localhost:8080/api/auth/";

class AuthService{
    login(email, password) {
        return axios
            .post(API_URL + "signin", {
                email,
                password
            })
            .then(response => {
                if(response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data))
                }

                return response.data
            })
    }

    logout() {
        localStorage.removeItem("user")
    }

    register(firstName, lastName, userName, email, password, confirm_password, dateOfBirth, phone, gender) {
        return axios.post(API_URL + "signup", {
            firstName,
            lastName,
            userName,
            email,
            password,
            confirm_password,
            dateOfBirth,
            phone,
            gender
        }, {
            headers: {
                'Content-Type': 'application/json'
              }
        })
    }

    getCurrentUser(){
        return JSON.parse(localStorage.getItem("user"))
    }
}

export default new AuthService()