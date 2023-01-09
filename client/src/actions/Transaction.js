import * as api from "../components/Api/Api";
export const addTransaction = (questionData) => async(dispatch) => {
    try {
        const { data } = await api.postTransaction(questionData);
        console.log("addtransad", data)
        dispatch({ type: "ADD_TRANSACTION", payload: data });
        dispatch(allTransactions());
        // navigate("/");
    } catch (error) {
        console.log(error);
    }
};
export const allTransactions = () => async(dispatch) => {
    try {
        const { data } = await api.getAllTransactions();
        dispatch({ type: "GET_ALL_TRANSACTIONS", payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updateTransaction = (id,updateData) => async (dispatch) => {
  try {
    console.log("idddd",id)
    const { data } = api.updateTransaction(id,updateData);
    dispatch(allTransactions());
  } catch (error) {
    console.log(error);
  }
};

export const deleteTransaction = (id) => async (dispatch) => {
  try {
    console.log("idddd",id)
    const { data } = api.deleteTransaction(id);
    dispatch(allTransactions());
  } catch (error) {
    console.log(error);
  }
};