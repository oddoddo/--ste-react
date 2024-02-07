import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type ScreenProps = {
  onNextScreen: () => void;
  onPrevScreen: () => void;
  onSetScreenNumber: (value: number) => void;
  inputId: string;
  inputPw: string;
  userNm: string;
  currentScreen: number;
  setInputId: React.Dispatch<React.SetStateAction<string>>;
  setInputPw: React.Dispatch<React.SetStateAction<string>>;
  setUserNm: React.Dispatch<React.SetStateAction<string>>;
  terms: Term[];
  setTerms: React.Dispatch<React.SetStateAction<Term[]>>;
  isTermAllChecked: boolean;
  isTermRequiredChecked: boolean;
};

const RegisterContext = createContext<ScreenProps>({
  currentScreen: 1,
} as ScreenProps);

const RegisterContextProvider: React.FC<{ children?: JSX.Element }> = ({
  children,
}) => {
  const [currentScreen, setCurrentScreen] = useState<number>(1);
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [userNm, setUserNm] = useState("");
  const [terms, setTerms] = useState<Term[]>(termList);
  const [isTermAllChecked, setTermAllChecked] = useState<boolean>(false);
  const [isTermRequiredChecked, setTermRequiredChecked] =
    useState<boolean>(false);

  useEffect(() => {
    const terms = termList.map((t) => ({ ...t }));
    setTerms(terms);
  }, []);

  useEffect(() => {
    const allCheck = terms.every((t) => t.checked);
    const requiredCheck = terms
      .filter((t) => t.required)
      .every((t) => t.checked);
    setTermAllChecked(allCheck);
    setTermRequiredChecked(requiredCheck);
  }, [terms]);

  const handleNextScreen = useCallback(() => {
    setCurrentScreen((prevScreen) => prevScreen + 1);
  }, []);

  const handlePrevScreen = useCallback(() => {
    if (currentScreen > 1) {
      setCurrentScreen((prevScreen) => prevScreen - 1);
    }
  }, [currentScreen]);

  return (
    <RegisterContext.Provider
      value={{
        onNextScreen: handleNextScreen,
        onPrevScreen: handlePrevScreen,
        onSetScreenNumber: setCurrentScreen,
        inputId,
        inputPw,
        userNm,
        setInputId,
        setInputPw,
        isTermAllChecked,
        isTermRequiredChecked,
        setUserNm,
        currentScreen,
        terms,
        setTerms,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};

export default RegisterContextProvider;

export const useRegister = () => {
  const {
    onNextScreen,
    onPrevScreen,
    onSetScreenNumber,
    inputId,
    inputPw,
    userNm,
    setInputId,
    setInputPw,
    setUserNm,
    currentScreen,
    isTermAllChecked,
    isTermRequiredChecked,
    terms,
    setTerms,
  } = useContext(RegisterContext);
  return useMemo(() => {
    return {
      onNextScreen,
      onPrevScreen,
      onSetScreenNumber,
      inputId,
      inputPw,
      userNm,
      setInputId,
      setInputPw,
      setUserNm,
      currentScreen,
      terms,
      setTerms,
      isTermAllChecked,
      isTermRequiredChecked,
    };
  }, [
    onNextScreen,
    onPrevScreen,
    onSetScreenNumber,
    inputId,
    inputPw,
    userNm,
    setInputId,
    setInputPw,
    setUserNm,
    currentScreen,
    terms,
    setTerms,
    isTermAllChecked,
    isTermRequiredChecked,
  ]);
};

export interface Term {
  id: number;
  label: string;
  modalContent: string;
  checked: boolean;
  required: boolean; // Add height property
}

const termList: Term[] = [
  {
    id: 0,
    label: "휴대폰 본인확인 서비스 약관동의",
    modalContent: "...",
    checked: false,
    required: true,
  },
  {
    id: 1,
    label: "서비스 이용약관",
    modalContent: "...",
    checked: false,
    required: true,
  },
  {
    id: 2,
    label: "개인정보 제3자 제공 동의",
    modalContent: "...",
    checked: false,
    required: true,
  },
  {
    id: 3,
    label: "개인 신용 정보 수집이용 동의",
    modalContent: "...",
    checked: false,
    required: true,
  },
  {
    id: 4,
    label: "(선택) 광고성 정보 동의",
    modalContent: "...",
    checked: false,
    required: false,
  },
];
