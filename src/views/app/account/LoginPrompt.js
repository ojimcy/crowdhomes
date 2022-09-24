import { Colxx } from "components/common/CustomBootstrap";
import React, { useState } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { Button, Row } from "reactstrap";
import { useAccount } from "wagmi";
import ConnectWalletModal from "./ConnectWalletModal";
import GetStartedModal from "./GetStartedModal";
import SwitchAccountModal from "./SwitchAccountModal";

const LoginPrompt = ({ currentAccount }) => {
  const [showConnectWalletModal, setShowConnectWalletModal] = useState();
  const [showGetStartedModal, setShowGetStartedModal] = useState(false);
  const [showSwitchAccount, setShowSwitchAccount] = useState(false);
  const { isConnected } = useAccount();

  if (currentAccount.id > 0) return null;

  return (
    <>
      <Row>
        <Colxx md={12} className="text-center">
          <h6>Please login to view this page</h6>
          {!isConnected ? (
            <>
              <Button onClick={() => setShowConnectWalletModal(true)}>
                Connect Wallet
              </Button>
              <ConnectWalletModal
                showModal={showConnectWalletModal}
                handleClose={() => setShowConnectWalletModal(false)}
              />
            </>
          ) : (
            <>
              <Button onClick={() => setShowSwitchAccount(true)}>
                Login to Continue
              </Button>
              <SwitchAccountModal
                showModal={showSwitchAccount}
                handleClose={() => {
                  setShowSwitchAccount(false);
                }}
              />

              <h6 className="mt-5">Don't have an account?</h6>
              <Button onClick={() => setShowGetStartedModal(true)}>
                Register
              </Button>
              <GetStartedModal
                title={"Get Started"}
                showModal={showGetStartedModal}
                handleClose={() => setShowGetStartedModal(false)}
              />
            </>
          )}
        </Colxx>
      </Row>
    </>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { currentAccount } = authUser;

  return {
    currentAccount,
  };
};

export default injectIntl(connect(mapStateToProps, {})(LoginPrompt));
