import React from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Layout from "../layouts/Layout";
import LayoutHTS from "../layouts/LayoutHTS";
import Home from "../../pages/home/Home";
import { retryLazy } from "../../utils/LazyUtil";
import ExchangeWrapper from "../exchange/container/ExchangeWrapper";
import LandingLayout from "../layouts/LandingLayout";
import { useAuthState } from "../../hooks/useAuth";
import RootLayout from "../layouts/RootLayout";
import SignUpCompleted from "../../pages/register/SignUpCompleted";

const Dashboard = retryLazy(() => import("../../pages/dashboard/Dashboard"));
const Exchange = retryLazy(() => import("../../pages/exchange/Exchange"));
const NoMatch = retryLazy(() => import("../../pages/404"));
const Register = retryLazy(() => import("../../pages/register/Register"));
const Login = retryLazy(() => import("../../pages/login/Login"));
const TradeHistory = retryLazy(
  () => import("../../pages/trade_history/tradeHistory")
);
const SupportService = retryLazy(() => import("../../pages/support/Support"));
const Accounts = retryLazy(() => import("../../pages/accounts/Accounts"));
const AccountsDeposit = retryLazy(() => import("../../pages/accounts/deposit"));
const AccountsWithdrawal = retryLazy(
  () => import("../../pages/accounts/withdrawal")
);
const AccountsStDeposit = retryLazy(
  () => import("../../pages/accounts/st_deposit")
);
const AccountsStWithdrawal = retryLazy(
  () => import("../../pages/accounts/st_withdrawal")
);
const AccountsHistory = retryLazy(() => import("../../pages/accounts/history"));
const ResetPassword = retryLazy(
  () => import("../../pages/reset_password/ResetPassword")
);
const FindId = retryLazy(() => import("../../pages/find_id/FindId"));
const SignUp = retryLazy(() => import("pages/register/SignUp"));
const My = retryLazy(() => import("../../pages/my/My"));
const MyManagement = retryLazy(() => import("../../pages/my/management"));
const MyPrivacyAgreement = retryLazy(() => import("../../pages/my/privacy"));
const MyInvestorTendency = retryLazy(() => import("../../pages/my/tendency"));

export enum RoutePath {
  HOME = "/",
  DASHBOARD = "/dashboard",
  EXCHANGE = "/exchange",
  LOGIN = "/login",
  REGISTER = "/register",
  SIGNUP_COMPLETED = "/signup_completed",
  ACCOUNTS = "/accounts",
  ACCOUNTS_DEPOSIT = "/accounts/deposit",
  ACCOUNTS_WITHDRAWAL = "/accounts/withdrawal",
  ACCOUNTS_ST_DEPOSIT = "/accounts/st_deposit",
  ACCOUNTS_ST_WITHDRAWAL = "/accounts/st_withdrawal",
  ACCOUNTS_HISTORY = "/accounts/history",
  TRADE_HISTORY = "/tradehistory",
  SUPPORT = "/support",
  RESET_PASSWORD = "/reset_password",
  FIND_ID = "/find_id",
  MY = "/my",
  MY_MANAGEMENT = "/my/management",
  MY_PRIVACY_AGREEMENT = "/my/privacy_agreement",
  MY_INVESTOR_TENDENCY = "/my/investor_tendency",
}

const Routers = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path={RoutePath.HOME} element={<LandingLayout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NoMatch />} />
        </Route>

        <Route element={<Layout />}>
          <Route path={"dashboard"} element={<Dashboard />} />
          <Route path={"login"} element={<Login />} />
          <Route path={"exchange"} element={<ExchangeWrapper />}>
            <Route path=":symbol" element={<Exchange />} />
          </Route>
          <Route path={"support"} element={<SupportService />} />
          <Route path={"reset_password"} element={<ResetPassword />} />
          <Route path={"find_id"} element={<FindId />} />
          <Route path={"signup_completed"} element={<SignUpCompleted />} />
          <Route element={<LogoutWrapper />}>
            {/*Screen that cannot be viewed when login*/}
            <Route path={"register"} element={<Register />} />
            <Route path={"signup"} element={<SignUp />} />
          </Route>

          {/* <Route element={<LoginWrapper />}> */}
          {/* Screens that require login */}
          <Route path={"tradehistory"} element={<TradeHistory />} />
          <Route path={"accounts"} element={<Accounts />}>
            <Route path={"deposit"} element={<AccountsDeposit />} />
            <Route path={"withdrawal"} element={<AccountsWithdrawal />} />
            <Route path={"st_deposit"} element={<AccountsStDeposit />} />
            <Route path={"st_withdrawal"} element={<AccountsStWithdrawal />} />
            <Route path={"history"} element={<AccountsHistory />} />
          </Route>
          <Route path={"my"} element={<My />}>
            <Route path={"management"} element={<MyManagement />} />
            <Route
              path={"privacy_agreement"}
              element={<MyPrivacyAgreement />}
            />
            <Route
              path={"investor_tendency"}
              element={<MyInvestorTendency />}
            />
          </Route>
          {/* </Route> */}
        </Route>

        <Route path="hts" element={<LayoutHTS />}>
          <Route element={<LoginWrapper />}>
            {/* Screens that require login */}
            <Route path={"exchange"} element={<ExchangeWrapper />}>
              <Route path=":symbol" element={<Exchange />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default Routers;

const LoginWrapper = () => {
  const isLogin = useAuthState();
  const { pathname } = useLocation();
  return isLogin ? (
    <Outlet />
  ) : (
    <Navigate to={RoutePath.LOGIN} state={{ beforePath: pathname }} />
  );
};

const LogoutWrapper = () => {
  const isLogin = useAuthState();
  const { pathname } = useLocation();
  return isLogin ? (
    <Navigate to={RoutePath.HOME} state={{ beforePath: pathname }} />
  ) : (
    <Outlet />
  );
};
