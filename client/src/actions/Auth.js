import * as api from "../components/Api/Api";
import { setCurrentUser } from "./currentUser";

export const signup = (authData, navigate) => async(dispatch) => {
    try {
        const { data } = await api.signUp(authData);
        dispatch({ type: "AUTH", data });
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
        navigate("/transactions");
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
};

export const login = (authData, navigate) => async(dispatch) => {
    try {
        const { data } = await api.logIn(authData);
        dispatch({ type: "AUTH", data });
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
        navigate("/transactions");
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
};
export const fetchAllUsers = () => async(dispatch) => {
    try {
        const { data } = await api.fetchAllUsers();
        dispatch({ type: "FETCH_USERS", payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const getCurrentUser = (id) => async(dispatch) => {
    try {
        const { data } = await api.getUser(id);
        console.log("dtaaaaaa", data);
        dispatch({ type: "FETCH_USER", payload: data });
    } catch (error) {
        console.log(error);
    }
}