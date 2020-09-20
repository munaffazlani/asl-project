import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import { message } from "antd";
import { clearToken } from "../../helpers/sessionUtils";
import actions from "./actions";
import { login, forgotpassword, changePassword } from "./requests";

export function* loginRequest() {
  yield takeEvery(actions.LOGIN_REQUEST, function* ({ payload, history }) {
    try {
      const response = yield call(login, payload);
      console.log(response.data[0]);
      if (response.status) {
        yield put({
          type: actions.LOGIN_SUCCESS,
          token: response.data[0].Usertoken,
        });
        message.success(response.message);
        history.push("/dashboard");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.LOGIN_ERROR });
    }
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function* (payload) {
    console.log(payload);
    if (localStorage.getItem("remember_me")) {
      yield sessionStorage.clear();
      yield localStorage.setItem("user_token", payload.token);
    } else {
      yield localStorage.clear();
      yield sessionStorage.setItem("user_token", payload.token);
    }
  });
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function* ({ history }) {
    yield clearToken();
    history.push("/login");
  });
}

export function* forgotPasswordSaga() {
  yield takeEvery(actions.FORGOT_PASSWORD, function* ({ payload }) {
    try {
      const response = yield call(forgotpassword, payload);
      if (response.status === 1) {
        message.success(response.message, 10);
      } else {
        message.error(response.message, 10);
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.LOGIN_ERROR });
    }
  });
}

export function* changePasswordSaga() {
  yield takeEvery(actions.CHANGE_PASSWORD, function* ({ payload, history }) {
    try {
      const response = yield call(changePassword, payload);
      if (response.status === 1) {
        message.success(response.message);
        history.push("/dashboard");
      }
      else{
        message.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  });
}

// export function* checkAuthorization() {
//   yield takeEvery(actions.CHECK_AUTHORIZATION, function* () {
//     const token = getToken().get("idToken");
//     if (token) {
//       yield put({
//         type: actions.LOGIN_SUCCESS,
//         token,
//         profile: "Profile",
//       });
//     }
//   });
// }

// export function* signupSuccess() {
//   yield takeEvery(actions.SIGNUP, function* ({ payload, history }) {
//     try {
//       yield put(authActions.globalLoaderHandler(true));
//       const response = yield call(signup, payload);
//       yield put({
//         type: actions.SIGNUP_SUCCESS,
//         email: response.data.email,
//       });
//       history.push({
//         pathname: `${process.env.PUBLIC_URL}/portal/verification`,
//         search: `?type=VERIFY&email=${response.data.email}`,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//     yield put(authActions.globalLoaderHandler(false));
//   });
// }

// export function* verification() {
//   yield takeEvery(actions.VERIFICATION, function* ({ payload, history }) {
//     try {
//       const response = yield call(verify, payload);
//       if (response.status) {
//         message.success(response.message);
//       }
//       const { type, email, code } = payload.type;
//       if (type === "RESET") {
//         history.push({
//           pathname: `${process.env.PUBLIC_URL}/portal/resetPassword`,
//           search: `?code=${code}&email=${email}`,
//         });
//       } else {
//         history.push(`${process.env.PUBLIC_URL}/portal/signin`);
//         history.replace({ state: "" });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   });
// }

// export function* resend() {
//   yield takeEvery(actions.RESEND, function* ({ payload }) {
//     try {
//       yield put(authActions.globalLoaderHandler(true));
//       const response = yield call(resendCode, payload);
//     } catch (error) {
//       console.log(error);
//     }
//     yield put(authActions.globalLoaderHandler(false));
//   });
// }
// export function* changePasswordSaga() {
//   yield takeEvery(actions.FORGOT_PASSWORD, function* ({ payload, history }) {
//     try {
//       yield put(authActions.globalLoaderHandler(true));
//       const response = yield forgotpassword(payload);
//       yield put({
//         type: actions.FORGOT_PASSWORD_SUCCESS,
//         email: payload.email,
//       });
//       history.push({
//         pathname: `${process.env.PUBLIC_URL}/portal/verification`,
//         search: `?type=RESET&email=${payload.email}`,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//     yield put(authActions.globalLoaderHandler(false));
//   });
// }

// export function* profileUpdate() {
//   yield takeEvery(actions.SAVE_PROFILE, function* ({ payload }) {
//     try {
//       yield put(authActions.globalLoaderHandler(true));
//       yield call(saveProfile, payload);
//       yield put({
//         type: actions.GET_PROFILE,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//     yield put(authActions.globalLoaderHandler(false));
//   });
// }

// export function* bioUpdate() {
//   yield takeEvery(actions.SAVE_BIO, function* ({ payload }) {
//     try {
//       yield put(authActions.globalLoaderHandler(true));
//       yield call(saveBio, payload);
//     } catch (error) {
//       console.log(error);
//     }
//     yield put(authActions.globalLoaderHandler(false));
//   });
// }

// export function* linksUpdate() {
//   yield takeEvery(actions.SAVE_LINKS, function* ({ payload }) {
//     try {
//       yield put(authActions.globalLoaderHandler(true));
//       const response = yield call(saveLinks, payload);
//       yield put({
//         type: actions.SAVE_LINKS_SUCCESS,
//         links: response.data.data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//     yield put(authActions.globalLoaderHandler(false));
//   });
// }

// export function* imageUpdate() {
//   yield takeEvery(actions.SAVE_IMAGE, function* ({ payload }) {
//     try {
//       yield put(authActions.globalLoaderHandler(true));
//       yield call(saveImage, payload);
//       yield put({
//         type: actions.GET_PROFILE,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//     yield put(authActions.globalLoaderHandler(false));
//   });
// }

// export function* logoUpdate() {
//   yield takeEvery(actions.SAVE_LOGO, function* ({ payload }) {
//     try {
//       yield put(authActions.globalLoaderHandler(true));
//       yield call(saveLogo, payload);
//       yield put({
//         type: actions.GET_PROFILE,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//     yield put(authActions.globalLoaderHandler(false));
//   });
// }

// export function* getProfileData() {
//   yield takeEvery(actions.GET_PROFILE, function* () {
//     try {
//       yield put(authActions.globalLoaderHandler(true));
//       const response = yield call(getProfile);
//       yield put({
//         type: actions.GET_PROFILE_SUCCESS,
//         payload: response.data.data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//     yield put(authActions.globalLoaderHandler(false));
//   });
// }

// export function* resetPassword() {
//   yield takeEvery(actions.CHANGE_PASSWORD, function* ({ payload, history }) {
//     try {
//       const response = yield resetpassword(payload);
//       history.push(`${process.env.PUBLIC_URL}/portal/signin`);
//     } catch (error) {
//       console.log(error);
//     }
//   });
// }

export default function* rootSaga() {
  yield all([
    // fork(resend),
    // fork(verification),
    // fork(signupSuccess),
    // fork(forgotPassword),
    // fork(checkAuthorization),
    fork(changePasswordSaga),
    fork(loginRequest),
    fork(loginSuccess),
    fork(forgotPasswordSaga),
    fork(logout),
    //fork(profileUpdate),
    // fork(getProfileData),
    // fork(bioUpdate),
    // fork(linksUpdate),
    // fork(imageUpdate),
    // fork(logoUpdate),
  ]);
}
