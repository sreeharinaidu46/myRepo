const getCurrentUser = (state = { data: null }, action) => {
    switch (action.type) {
        case "FETCH_USER":
            console.log("createdddd", action.payload)
            return action.payload;

        default:
            return state;
    }
};
export default getCurrentUser;