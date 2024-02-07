import React from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Flex,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import {
  logout,
  saveUserInfo,
  useUserInfo,
} from "../../store/reducers/authReducer";
import { useDispatch } from "react-redux";
import { clearStock, saveCode } from "../../store/reducers/stockReducer";
import { MdSettings } from "react-icons/md";
import styled from "styled-components";

const TEMP_ACCOUNT1 = process.env.REACT_APP_TEST_ACCOUNT1 || "";
const TEMP_ACCOUNT2 = process.env.REACT_APP_TEST_ACCOUNT2 || "";

const TestLogin: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { account } = useUserInfo();
  const dispatch = useDispatch();

  const onLogin = (id: string) => {
    dispatch(clearStock());
    dispatch(saveUserInfo({ account: id, accountNumberPassword: "7890" }));
  };
  const onLogout = () => {
    dispatch(clearStock());
    dispatch(logout());
  };
  const onCode = (code: string) => {
    dispatch(saveCode(code));
  };
  return (
    <>
      <TempIcon aria-label="temp" icon={<MdSettings />} onClick={onOpen} />
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            관리자용 강제 로그인
          </DrawerHeader>
          <DrawerBody>
            <Flex flexDirection="column">
              <Flex flexDirection="column">
                <Button
                  variant={account === TEMP_ACCOUNT1 ? "buy" : "normal"}
                  onClick={() => onLogin(TEMP_ACCOUNT1)}
                >
                  {`로그인(계좌:${TEMP_ACCOUNT1})`}
                </Button>
                <Button
                  variant={account === TEMP_ACCOUNT2 ? "buy" : "normal"}
                  onClick={() => onLogin(TEMP_ACCOUNT2)}
                >
                  {`로그인(계좌:${TEMP_ACCOUNT2})`}
                </Button>
                <Button
                  variant={account === "36278333101" ? "buy" : "normal"}
                  onClick={() => onLogin("36278333101")}
                >
                  {`로그인(계좌:${36278333101})`}
                </Button>
                <Button
                  variant={account === "36278333102" ? "buy" : "normal"}
                  onClick={() => onLogin("36278333102")}
                >
                  {`로그인(계좌:${36278333102})`}
                </Button>
                <Button
                  variant={account === "36278333103" ? "buy" : "normal"}
                  onClick={() => onLogin("36278333103")}
                >
                  {`로그인(계좌:${36278333103})`}
                </Button>
                <Button
                  variant={account === "36278333104" ? "buy" : "normal"}
                  onClick={() => onLogin("36278333104")}
                >
                  {`로그인(계좌:${36278333104})`}
                </Button>
                <Button
                  mt={50}
                  variant="normal"
                  bg={"primary_3"}
                  onClick={onLogout}
                >
                  로그아웃
                </Button>
              </Flex>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default TestLogin;

const TempIcon = styled(IconButton)`
  opacity: 0.1;
  position: fixed;
  right: -10px;
  top: 1px;
  width: 10px;
  height: 10px;
  background: unset;
  &:hover {
    background: unset;
  }
`;
