import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/users/",
  timeout: 1000,
});

export const logInOrRegister = async (email, password, reg) => {
  let response = await api.post(reg ? "register/" : "login/", { email: email, password: password });
  if (response.status === 200 || response.status === 201) {
    const { username, token } = response.data;
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    return username;
  }
  return null;
};

export const userLogOut = async () => {
  let response = await api.post("logout/");
  if (response.status === 200) {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    return null;
  }
  alert("Something went wrong and logout failed");
};

export const userConfirmation = async () => {
  try {
    let token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      let response = await api.get("");
      if (response.status === 200) {
        return response.data.username;
      }
    }
    return null;
  } catch (err) {
    return null;
  }
};
