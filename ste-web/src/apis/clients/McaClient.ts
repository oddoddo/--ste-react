import axios, { AxiosInstance } from "axios";
import {
  RQRS_CD_CODE,
  SVC_CD,
  TransferHeader,
} from "../../types/InterfaceTypes";
import { getGUID } from "../../utils";
import { TOKEN_NAME } from "../../store/reducers/authReducer";

const MCA_URL = process.env.REACT_APP_MCA_SERVER || "http://localhost:8000/";

const mca: AxiosInstance = axios.create({
  baseURL: MCA_URL,
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
});

mca.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_NAME);
    config.headers["Authorization"] = token ? `Bearer ${token}` : "";
    return config;
  },
  (error) => Promise.reject(error)
);

mca.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default mca;

export const getMcaHeader = (svc_cd: SVC_CD): TransferHeader => {
  return {
    rqrs_cd: RQRS_CD_CODE.REQUEST,
    svc_cd: svc_cd,
    guid: getGUID(),
    pub_ip: "127.0.0.1",
    pri_ip: "127.0.0.1",
    mac_addr: "ab:cd:ef:gh:ij",
    conn_media_cd: "cmeul",
  };
};
