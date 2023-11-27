const initialState = {
    user: null,
    isAuthenticated: false,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
            ...state,
            user: action.payload,
            isAuthenticated: !!action.payload, 
        };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                isAuthenticated: false,
            };
        default:
        return state;
    }
};
  
export default authReducer;
  