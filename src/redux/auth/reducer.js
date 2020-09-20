import actions from "./actions";

const initialState = {
  userToken: null,
  user: null, 
  email: null,
  authorized: false,
  profile: {},
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        userToken: action.token,
        authorized: true,
      };
    case actions.CHECK_AUTHORIZATION:
      return {
        ...state,
        userToken: action.token,
      };
    case actions.GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
      };
    case actions.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
