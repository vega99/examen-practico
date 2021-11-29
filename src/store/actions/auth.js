import { SET_LOADING } from "./data";

export const LOG_OUT = "LOG_OUT";
export const LOG_IN = "LOG_IN";

const API = "http://localhost/examen_tecnico/questions_services/index.php";

export const login = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING, isLoading: true });
      const resp = await fetch(`${API}/users/api/login`, {
        method: "POST",
        headers: {
          "QUESTIONS-API-KEY": "kEy$al26Questions",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // console.log(resp)
      const response = await resp.json();
      if (!resp.ok) {
        dispatch({ type: SET_LOADING, isLoading: false });
        throw new Error("Algo falló, intentalo más tarde");
      }
      if (response.status === "success") {
        localStorage.setItem("userQA", JSON.stringify(response.data));
        dispatch({ type: LOG_IN, user: response.data });
        dispatch({ type: SET_LOADING, isLoading: false });
        return response;
      } else {
        dispatch({ type: SET_LOADING, isLoading: false });
        throw new Error(response.message);
      }
    } catch (error) {
      throw error;
    }
  };
};

export const registerUser = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING, isLoading: true });
      const resp = await fetch(`${API}/users/api/web_users`, {
        method: "POST",
        headers: {
          "QUESTIONS-API-KEY": "kEy$al26Questions",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });      
      if (!resp.ok) {
        dispatch({ type: SET_LOADING, isLoading: false });
        throw new Error("Algo falló, intentalo más tarde");
      }

      dispatch({ type: SET_LOADING, isLoading: false });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    try {
      // dispatch(deleteStorage());
      localStorage.removeItem("userQA");
      dispatch({ type: LOG_OUT });
    } catch (error) {
      throw new Error("Algo Salió mal");
    }
  };
};
