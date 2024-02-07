import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import TopMenu from "../header/TopMenu";
import { useDispatch } from "react-redux";
import { changeMenuColor } from "../../store/reducers/extraReducer";
import { Box } from "@chakra-ui/react";

const Layout: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeMenuColor(false));
  }, [dispatch]);
  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      minH={"100vh"}
      bg={{ base: "white", lg: "back_bg" }}
      overflowX={"hidden"}
    >
      <TopMenu />
      <Box
        as="main"
        id="main"
        pos={"relative"}
        // display={"flex"}
        flexGrow={"1"}
        pt={"60px"}
        pb={{ base: "70px", lg: "0" }}
        maxW={{ base: "430px", lg: "100%" }}
        w={"100%"}
        mx={"auto"}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
