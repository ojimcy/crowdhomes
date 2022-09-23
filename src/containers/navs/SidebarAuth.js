import React, { useState } from "react";
import { NavItem } from "reactstrap";
import { injectIntl } from "react-intl";
import { setWeb3CurrentID } from "redux/auth/actions";
import { connect } from "react-redux";
import { useAccount } from "wagmi";
import SwitchAccountModal from "views/app/account/SwitchAccountModal";
import GetStartedModal from "views/app/account/GetStartedModal";
import ConnectWalletModal from "views/app/account/ConnectWalletModal";

const SidebarAuth = ({ currentAccount, setWeb3CurrentIDAction }) => {
  const { isConnected } = useAccount();
  const [showConnectWalletModal, setShowConnectWalletModal] = useState();
  const [showGetStartedModal, setShowGetStartedModal] = useState(false);
  const [showSwitchAccount, setShowSwitchAccount] = useState(false);

  const logout = () => {
    setWeb3CurrentIDAction({});
  };

  return (
    <>
      <SwitchAccountModal
        showModal={showSwitchAccount}
        handleClose={() => {
          setShowSwitchAccount(false);
        }}
      />
      {isConnected ? (
        <>
          {currentAccount.id > 0 ? (
            <>
              <NavItem>
                <a href="#" onClick={() => setShowSwitchAccount(true)}>
                  Switch Account
                </a>
              </NavItem>
              <NavItem>
                <a href="#" onClick={() => setShowGetStartedModal(true)}>
                  Add Account
                </a>
              </NavItem>

              <GetStartedModal
                title={"Add Account"}
                showModal={showGetStartedModal}
                handleClose={() => setShowGetStartedModal(false)}
              />
            </>
          ) : (
            <>
            <NavItem>
                <a href="#" onClick={() => setShowSwitchAccount(true)}>
                  Account Login
                </a>
              </NavItem>
              <NavItem>
                <a href="#" onClick={() => setShowSwitchAccount(true)}>
                  Get Started
                </a>
              </NavItem>
            </>
          )}
        </>
      ) : (
        <>
          <NavItem
            onClick={() => {
              setShowConnectWalletModal(true);
            }}
          >
            <a href="#">Connect</a>
          </NavItem>
          <ConnectWalletModal
            showModal={showConnectWalletModal}
            handleClose={() => setShowConnectWalletModal(false)}
          />
        </>
      )}
    </>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { currentAccount } = authUser;

  return {
    currentAccount,
  };
};

export default injectIntl(
  connect(mapStateToProps, {
    setWeb3CurrentIDAction: setWeb3CurrentID,
  })(SidebarAuth)
);
