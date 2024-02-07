import axios, { AxiosInstance } from "axios";
import { TOKEN_NAME } from "../../store/reducers/authReducer";

const API_URL = process.env.REACT_APP_API_SERVER || "http://localhost:8080/";
export const ApiVersion = "/v1";

const api: AxiosInstance = axios.create({
  baseURL: API_URL + ApiVersion,
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_NAME);
    config.headers["Authorization"] = token ? `Bearer ${token}` : "";
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default api;

export enum APICommonPath {
  GET_CODE = "/code",
  HEALTH_CHECK = "/healthcheck",
}
export enum APIUserPath {
  FIND_USER = "/users/my", //회원찾기
  SIGN_IN = "/users/signin", //로그인
  SIGN_UP = "/users/signup", //회원가입
  ID_CHECK = "/users/verification/idcheck", //ID중복체크
  FAVORITE = "/users/favorite", //즐겨찾기 종목 <get:조회,post:추가,delete:삭제>
  FIND_ID = "/users/find/id", //ID 찾기
  RESET_PW = "/users/find/pass", // 비밀번호 재설정
}
