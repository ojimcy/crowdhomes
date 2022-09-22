import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
  ButtonGroup,
} from "reactstrap";
import { NotificationManager } from "components/common/react-notifications";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { setWeb3CurrentID } from "redux/auth/actions";
import useBlockchain from "blockchain/useBlockchain";
import { useAccount } from "wagmi";

const JoinArmyModal = ({ showModal, handleClose, accountID }) => {
  const { premiumContract, erc20Contract } = useBlockchain();
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [investmentMode, setInvestmentMode] = useState(1);
  const {address} = useAccount();

  const joinDFCArmy = async () => {
    try {
      setIsUpgrading(true);
      const fee = await premiumContract.getUpgradeFeeInToken();
      const balance = await erc20Contract.balanceOf(address);

      if (balance.lt(fee)) {
        NotificationManager.error("Insufficient Balance");
        return;
      }
      const allowance = await erc20Contract.allowance(
        address,
        premiumContract.address
      );

      if (parseInt(allowance) === 0) {
        const totalSupply = await erc20Contract.totalSupply();
        let approvalTx = await erc20Contract.approve(
          premiumContract.address,
          totalSupply
        );
        console.log(approvalTx);
        await provider.waitForTransaction(approvalTx.hash, 1, 45000);
      }

      const tx = await premiumContract.joinArmy(
        accountID,
        parseInt(Math.random() * 1000000)
      );
      console.log(tx.hash);
      NotificationManager.success("Transaction submitted");
    } catch (error) {
      console.error(error);
      NotificationManager.error("Error in processing transaction");
    } finally {
      setIsUpgrading(false);
    }
  };

  return (
    <Modal isOpen={showModal} toggle={handleClose}>
      <ModalHeader>Join DFC Army</ModalHeader>

      <ModalBody>
        <p className="call-out-text">
          Join DFC army program and enter into a world of unimaginable earnings
        </p>
        {/* <p>Keep Stake As</p>
        <ButtonGroup>
          <Button
            color="primary"
            onClick={() => setInvestmentMode(1)}
            active={investmentMode === 1}
          >
            USDT
          </Button>
          <Button
            color="primary"
            onClick={() => setInvestmentMode(2)}
            active={investmentMode === 2}
          >
            DFC
          </Button>
        </ButtonGroup> */}
      </ModalBody>

      <ModalFooter>
        <Button
          type="button"
          onClick={joinDFCArmy}
          color="primary"
          className={`btn-shadow btn-multiple-state ${
            isUpgrading ? "show-spinner" : ""
          }`}
          size="lg"
        >
          <span className="spinner d-inline-block">
            <span className="bounce1" />
            <span className="bounce2" />
            <span className="bounce3" />
          </span>
          <span className="label">Join Army</span>
        </Button>{" "}
        <Button color="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
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
  })(JoinArmyModal)
);
