const transactionReducer = (states = [], action) => {
    switch (action.type) {
        case "GET_ALL_TRANSACTIONS":
            return action.payload;
        case "UPDATE_ALL_TRANSACTIONS":
            return states.map((state) =>
                state._id === action.payload._id ? action.payload : state
            );

        default:
            return states;
    }
};
export default transactionReducer;