import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import TopNav from "containers/navs/Topnav";
import Sidebar from "containers/navs/Sidebar";
import Footer from "containers/navs/Footer";
import { NotificationManager } from "components/common/react-notifications";
import { useAccount } from "wagmi";
import useBlockchain from "blockchain/useBlockchain";
import { setWeb3CurrentID } from "redux/auth/actions";
import { ethers } from "ethers";

const AppLayout = ({
  containerClassnames,
  children,
  history,
  error,
  currentAccount,
  setWeb3CurrentIDAction,
}) => {
  const { address, isConnected } = useAccount();
  const { premiumContract } = useBlockchain();

  useEffect(() => {
    if (error) {
      NotificationManager.warning(error, "Error", 3000, null, null, "");
    }
  }, [error]);

  useEffect(() => {
    if (!(premiumContract && premiumContract.provider && isConnected)) return;
    if (currentAccount && currentAccount.registered) return;
    const fn = async () => {
      try {
        let userData = {};
        if (address) {
          const id = await premiumContract.getFirstAccountID(address);
          if (parseInt(id) === 0) return;

          const user = await premiumContract.getUser(id);
          if (user.registered) {
            userData = {
              id: parseInt(id),
              registered: user.registered,
              premiumLevel: parseInt(user.premiumLevel),
              referralID: parseInt(user.referralID),
              uplineID: parseInt(user.uplineID),
              referralsCount: parseInt(user.referralsCount),
              walletAddress: address,
              totalEarnings: parseFloat(
                ethers.utils.formatEther(user.totalEarnings)
              ).toFixed(2),
              role: 'user'
            };
          }
        }
        setWeb3CurrentIDAction(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fn();
  }, [address, currentAccount, premiumContract]);

  return (
    <div id="app-container" className={containerClassnames}>
      <TopNav history={history} />
      <Sidebar />
      <main>
        <div className="container-fluid">{children}</div>
      </main>
      <Footer />
    </div>
  );
};
const mapStateToProps = ({ menu, appData, authUser }) => {
  const { containerClassnames } = menu;
  const { error } = appData;
  const { currentAccount } = authUser;

  return { containerClassnames, error, currentAccount };
};
const mapActionToProps = { setWeb3CurrentIDAction: setWeb3CurrentID };

export default withRouter(
  connect(mapStateToProps, mapActionToProps)(AppLayout)
);
