import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Helmet } from "react-helmet";
import { isDesktop } from "react-device-detect";
import { useTranslation } from "react-i18next";

export type VerificationContextProps = {
  onVerification: (usage: VERIFICATION_USAGE) => void;
  idenToken: string;
  errorCode: string;
  errorMsg: string;
};

const VerificationContext = createContext<VerificationContextProps>(
  {} as VerificationContextProps
);

const verificationLibURL = process.env.REACT_APP_VERIFICATION_LIB_URL || "";
const apiServerURL = process.env.REACT_APP_API_SERVER || "";

const VerificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [idenToken, setIdenToken] = useState("");
  const [errorCode, setErrorCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { t } = useTranslation();
  const verifyResultHandler = (e: any) => {
    const res: any = JSON.parse(e);
    setErrorCode(res.resultCode7);
    if (res.resultCode === "2000") {
      setIdenToken(res.encryptMOKKeyToken.toString());
    } else {
      setErrorMsg(t(`verifyError.${res.resultCode}`) || t("verifyError.9999"));
    }
  };

  useEffect(() => {
    (window as any).krste = { verifyResultHandler };
    return () => {
      delete (window as any).krste.verifyResultHandler;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onVerification = useCallback((usage: VERIFICATION_USAGE) => {
    setErrorCode("");
    setIdenToken("");
    if (!verificationLibURL && !apiServerURL) {
      throw Error("Failed to read identity authentication script");
    }
    // @ts-ignore
    window.MOBILEOK.process(
      `${apiServerURL}/v1/users/verification/html/${usage}`,
      isDesktop ? "WB" : "MB",
      "window.krste.verifyResultHandler"
    );
  }, []);

  return (
    <VerificationContext.Provider
      value={{ onVerification, idenToken, errorCode, errorMsg }}
    >
      <Helmet>
        {verificationLibURL && <script src={verificationLibURL}></script>}
      </Helmet>
      {children}
    </VerificationContext.Provider>
  );
};
export default VerificationProvider;

export const useVerification = () => {
  const { onVerification, idenToken, errorCode, errorMsg } =
    useContext(VerificationContext);
  return useMemo(() => {
    return { onVerification, idenToken, errorCode, errorMsg };
  }, [onVerification, idenToken, errorCode, errorMsg]);
};

export enum VERIFICATION_USAGE {
  SIGN_UP = "signup",
  FIND_ID = "findid",
  RESET_PW = "resetpw",
}
