import React, { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AccountsMenus from "../../components/accounts/AccountsMenus";
import { RoutePath } from "../../components/common/Routers";
import BoxWrapper from "components/common/BoxWrap";
import { useMediaQuery, Button } from "@chakra-ui/react";

const Accounts: React.FC = () => {
  const { pathname } = useLocation();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [showOutlet, setShowOutlet] = useState(false);

  const handleNextClick = () => {
    setShowOutlet(true);
  };

  return (
    <>
      {pathname === RoutePath.ACCOUNTS ? (
        <Navigate to={RoutePath.ACCOUNTS_DEPOSIT} />
      ) : (
        <BoxWrapper>
          {isLargerThan768 ? (
            <>
              <AccountsMenus />
              <Outlet />
            </>
          ) : showOutlet ? (
            <Outlet />
          ) : (
            <>
              <AccountsMenus />
              <Button onClick={handleNextClick}>다음</Button>
            </>
          )}
        </BoxWrapper>
      )}
    </>
  );
};

export default Accounts;
