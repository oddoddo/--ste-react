import React from "react";
import { useTranslation } from "react-i18next";

const AccountsHistory: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h2>입출금내역</h2>
    </div>
  );
};
export default AccountsHistory;
