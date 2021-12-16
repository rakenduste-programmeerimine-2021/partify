import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "signin", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    // window.location = '/login'
  }

  register(data) {
    return axios.post(
      API_URL + "signup",
      
        data,
      
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  getCurrentUser() {
    if (JSON.parse(localStorage.getItem("user"))) {
      return JSON.parse(localStorage.getItem("user"));
    }
  }

  /*getUser(){
        return JSON.parse()
    }*/
}

export default new AuthService();
