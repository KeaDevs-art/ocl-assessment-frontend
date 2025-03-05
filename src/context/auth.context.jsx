// context/AuthContext.js
import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import authReducer from "./authReducer";
import setAuthToken from "../utils/setAuthToken.util";

// Initial state
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  error: null,
};

// Create context
export const AuthContext = createContext(initialState);

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user
  useEffect(() => {
    const loadUser = async () => {
      if (localStorage.token) {
        setAuthToken(localStorage.token);

        try {
          const res = await axios.get("http://localhost:4500/api/users/me");

          dispatch({
            type: "USER_LOADED",
            payload: res.data,
          });
        } catch (err) {
          dispatch({ type: "AUTH_ERROR" });
        }
      } else {
        dispatch({ type: "AUTH_ERROR" });
      }
    };

    loadUser();
  }, []);

  // Register user
  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        "http://localhost:4500/api/users/register",
        formData,
        config
      );

      dispatch({
        type: "REGISTER_SUCCESS",
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: "REGISTER_FAIL",
        payload: err.response.data.message,
      });
    }
  };

  // Login user
  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        "http://localhost:4500/api/users/login",
        formData,
        config
      );

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: "LOGIN_FAIL",
        payload: err.response.data.message,
      });
    }
  };

  // Logout
  const logout = () => dispatch({ type: "LOGOUT" });

  // Add favorite city
  const addFavoriteCity = async (city) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        "http://localhost:4500/api/users/favorites",
        { city },
        config
      );

      dispatch({
        type: "UPDATE_FAVORITES",
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: "FAVORITES_ERROR",
        payload: err.response.data.message,
      });
    }
  };

  // Remove favorite city
  const removeFavoriteCity = async (cityName) => {
    try {
      const res = await axios.delete(`/api/users/favorites/${cityName}`);

      dispatch({
        type: "UPDATE_FAVORITES",
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: "FAVORITES_ERROR",
        payload: err.response.data.message,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        login,
        logout,
        addFavoriteCity,
        removeFavoriteCity,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
