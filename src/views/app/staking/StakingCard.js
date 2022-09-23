import React, { useState } from "react";
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

const StakingCard = ({
  pkg,
  currentAccount,
  interestRate,
  maturityPeriod,
  usdtPool,
  dfcPool,
}) => {
  const [stakingAmount, setStakingAmount] = useState(100);
  const [investmentMode, setInvestmentMode] = useState(1);
  const [showConnectWalletModal, setShowConnectWalletModal] = useState();
  const [showStakingModal, setShowStakingModal] = useState(false);
  const { isConnected, address } = useAccount();
  const { premiumContract, erc20Contract, farmContract } = useBlockchain();
  const [loading, setLoading] = useState(false);
  const provider = useProvider();

  const takeMaxAmount = () => {};

  const stake = async () => {
    setLoading(true);
    try {
      let poolID = investmentMode === 1 ? usdtPool : dfcPool;
      let amount = await premiumContract.getAmountFromDollar(
        ethers.utils.parseEther(stakingAmount.toString())
      );
      const dfcBalance = await erc20Contract.balanceOf(address);
      if (amount.gt(dfcBalance)) {
        NotificationManager.warning("Insufficient DFC balance", "", 5000);
        setLoading(false);
        return;
      }

      const tx = await farmContract.stake(
        currentAccount.id,
        ethers.utils.parseEther(stakingAmount.toString()),
        poolID
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
      NotificationManager.warning("Transaction failed", "", 3000);
      setLoading(false)
    }
  };

  return (
    <>
      <div className="icon-row-item mb-4">
        <Card>
          <CardBody className="text-center">
            <p className="lead text-center">{pkg}</p>
            <i className="iconsminds-diamond" />
            <ul className="list-unstyled ">
              <li>
                <p className="mb-2">
                  Interest Accrued:{" "}
                  <span className="card-value">{interestRate}%</span>
                </p>
              </li>
              <li>
                <p className=" mb-2">
                  Maturity Period:{" "}
                  <span className="card-value">{maturityPeriod} Months</span>{" "}
                </p>
              </li>
              <li>
                <div className="lead text-center">
                  <InputGroup className="mb-3 mt-2">
                    <span className="input-group-text">$</span>

                    <Input
                      value={stakingAmount}
                      onChange={(e) => setStakingAmount(e.value)}
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
export default injectIntl(connect(mapStateToProps, {})(StakingCard));
