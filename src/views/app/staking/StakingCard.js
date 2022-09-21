import React, { useState } from 'react'
import { useAccount } from 'wagmi';
import ConnectWalletModal from "../account/ConnectWalletModal";import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Input,
  InputGroup,
  InputGroupAddon,
  Row,
} from "reactstrap";
import StakingModal from "./StakingModal";
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

const StakingCard = ({pkg, currentAccount, interestRate, maturityPeriod}) => {
  const [stakingAmount, setStakingAmount] = useState(100);
  const [investmentMode, setInvestmentMode] = useState(1);
  const [showConnectWalletModal, setShowConnectWalletModal] = useState();
  const [showStakingModal, setShowStakingModal] = useState(false);
  const {isConnected} = useAccount()

  const takeMaxAmount = () => {};

  return <>
    <div className="icon-row-item mb-4">
                <Card>
                  <CardBody className="text-center">
                    <p className="lead text-center">{pkg}</p>
                    <i className="iconsminds-diamond" />
                    <ul className="list-unstyled ">
                      <li>
                        <p className="mb-2">
                          Interest Accrued: <h6 className="card-value">{interestRate}%</h6>
                        </p>
                      </li>
                      <li>
                        <p className=" mb-2">
                          Maturity Period:{" "}
                          <h6 className="card-value">{maturityPeriod} Months</h6>{" "}
                        </p>
                      </li>
                      <li>
                        <p className="lead text-center">
                          <InputGroup className="mb-3 mt-2">
                            <span className="input-group-text">$</span>

                            <Input value={stakingAmount} />

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
                        </p>
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
                            onClick={() => {
                              setShowStakingModal(true);
                              setPackages("diamond");
                            }}
                          >
                            Stake DFC Now
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
}

const mapStateToProps = ({ authUser }) => {
  const { currentAccount } = authUser;
  return { currentAccount };
};
export default injectIntl(connect(mapStateToProps, {})(StakingCard));
