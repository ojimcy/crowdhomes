import React, { useEffect, useState } from "react";
import { useAccount, useProvider } from "wagmi";
import ConnectWalletModal from "../account/ConnectWalletModal";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Input,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import StakingModal from "./StakingModal";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import useBlockchain from "blockchain/useBlockchain";
import { ethers } from "ethers";
import { NotificationManager } from "components/common/react-notifications";

const DefipayStakingCard = ({ currentAccount }) => {
  const [stakingAmount, setStakingAmount] = useState(5);
  const [investmentMode, setInvestmentMode] = useState(1);
  const [showConnectWalletModal, setShowConnectWalletModal] = useState();
  const [showStakingModal, setShowStakingModal] = useState(false);
  const { isConnected } = useAccount();
  const { defipayPoolContract } = useBlockchain();
  const [loading, setLoading] = useState(false);
  const provider = useProvider();

  useEffect(() => {
    window.defipayPoolContract = defipayPoolContract;
  });

  const takeMaxAmount = () => {};

  const stake = async () => {
    setLoading(true);
    try {
      if (parseFloat(stakingAmount) < 0.25 || parseFloat(stakingAmount) > 5) {
        window.alert("Amount must be a number between 0.5 and 5 BNB");
        return;
      }
      let amount = ethers.utils.parseEther(stakingAmount.toString());

      const tx = await defipayPoolContract.joinDefipayPool(
        currentAccount.id,
        currentAccount.referralID,
        { value: amount }
      );
      const receipt = await provider.waitForTransaction(tx.hash, 1, 45000);
      setLoading(false);
      if (!receipt || !receipt.blockNumber) {
        NotificationManager.error(
          "Transaction failed. Please try again later",
          "",
          5000
        );
      }

      NotificationManager.success("Transaction succeeded", "", 5000);
    } catch (error) {
      let msg;
      if (error.data && error.data.message) {
        msg = error.data.message;
        if (msg.indexOf("insufficient funds") > -1) {
          msg = "Insufficient funds";
          window.alert(msg);
        }
      }
      NotificationManager.warning(msg || "Transaction failed", "", 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="icon-row-item mb-4">
        <Card>
          <CardBody className="text-center">
            <p className="lead text-center">DEFIPAY POOL</p>
            <i className="iconsminds-diamond" />
            <ul className="list-unstyled ">
              <li>
                <p className="mb-2">
                  Interest Rate: <span className="card-value">100%</span>
                </p>
              </li>
              <li>
                <p className=" mb-2">
                  Maturity Period: <span className="card-value">3 Months</span>{" "}
                </p>
              </li>
              <li>
                <div className="lead text-center">
                  <InputGroup className="mb-3 mt-2">
                    <span className="input-group-text">BNB</span>

                    <Input
                      value={stakingAmount}
                      onChange={(e) => setStakingAmount(e.target.value)}
                    />

                    <InputGroupAddon addonType="append">
                      <Button
                        outline
                        color="secondary"
                        className=""
                        onClick={takeMaxAmount}
                      >
                        Max
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              </li>

              <li>
                <p>Keep Stake As</p>
                <ButtonGroup>
                  <Button
                    color="primary"
                    onClick={() => setInvestmentMode(2)}
                    active={investmentMode === 2}
                  >
                    DFC
                  </Button>
                </ButtonGroup>
              </li>
            </ul>

            <p>
              <StakingModal
                showModal={showStakingModal}
                handleClose={() => setShowStakingModal(false)}
              />

              {isConnected ? (
                <>
                  <Button
                    onClick={stake}
                    type="submit"
                    color="primary"
                    className={`btn-shadow btn-multiple-state ${
                      loading ? "show-spinner" : ""
                    }`}
                    size="lg"
                  >
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className="label">Stake DFC Now</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      setShowConnectWalletModal(true);
                    }}
                  >
                    Connect Wallet To Stake DFC
                  </Button>
                  <ConnectWalletModal
                    showModal={showConnectWalletModal}
                    handleClose={() => setShowConnectWalletModal(false)}
                  />
                </>
              )}
            </p>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { currentAccount } = authUser;
  return { currentAccount };
};
export default injectIntl(connect(mapStateToProps, {})(DefipayStakingCard));
