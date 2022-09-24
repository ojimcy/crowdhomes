import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { Button, Card, CardBody, Row } from "reactstrap";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Breadcrumb from "containers/navs/Breadcrumb";
import StakingModal from "./StakingModal";
import ConnectWalletModal from "./account/ConnectWalletModal";
import { useAccount } from "wagmi";
import useBlockchain from "blockchain/useBlockchain";

const Staking = ({ match, currentAccount, history }) => {
  const [showConnectWalletModal, setShowConnectWalletModal] = useState();
  const [showStakingModal, setShowStakingModal] = useState(false);
  const { isConnected, address } = useAccount();
  const { premiumContract, systemContract, erc20Contract } = useBlockchain();
  const [packages, setPackages] = useState("gold", "silver", "diamond");

  useEffect(() => {
    if (!isConnected || !erc20Contract) return;
    const fn = async () => {
      window.systemContract = systemContract;
      window.premiumContract = premiumContract;
      try {
        const dfcBalance = await erc20Contract.balanceOf(address);
        setDfcBalance(parseInt(dfcBalance.div(1e8)));
      } catch (error) {
        console.log(error);
      }
    };
    fn();
  }, [erc20Contract]);
  

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.staking" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx md="12">
          <h6 className="top-callout">DFC Staking</h6>
          <p className="top-callout-text">
            Stake a minimum of $100 worth of DFC and earn upto 20% per annum.
          </p>
        </Colxx>

        <Colxx className="icon-cards-row" md="12">
          <Row>
            <Colxx md="4" xxs="12">
              <div className="icon-row-item mb-4">
                <Card>
                  <CardBody className="text-center">
                    <p className="lead text-center">DIAMOND</p>
                    <i className="iconsminds-diamond" />
                    <ul className="list-unstyled ">
                      <li>
                        <p className="mb-2">
                          Interest Accrued: <h6 className="card-value">10%</h6>
                        </p>
                      </li>
                      <li>
                        <p className=" mb-2">
                          Maturity Period:{" "}
                          <h6 className="card-value">3 Months</h6>{" "}
                        </p>
                      </li>
                      <li>
                        <p className="lead text-center">$100</p>
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
            </Colxx>
            <Colxx md="4" xxs="12">
              <div className="icon-row-item mb-4">
                <Card>
                  <CardBody className="text-center">
                    <p className="lead text-center">SILVER</p>
                    <i className="iconsminds-diamond" />
                    <ul className="list-unstyled ">
                      <li>
                        <p className="mb-2">
                          Interest Accrued: <h6 className="card-value">15%</h6>
                        </p>
                      </li>
                      <li>
                        <p className=" mb-2">
                          Maturity Period:{" "}
                          <h6 className="card-value">6 Months</h6>{" "}
                        </p>
                      </li>
                      <li>
                        <p className="lead text-center">$100</p>
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
                              setPackages("silver");
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
            </Colxx>
            <Colxx md="4" xxs="12">
              <div className="icon-row-item mb-4">
                <Card>
                  <CardBody className="text-center">
                    <p className="lead text-center">GOLD</p>
                    <i className="iconsminds-diamond" />
                    <ul className="list-unstyled ">
                      <li>
                        <p className="mb-2">
                          Interest Accrued: <h6 className="card-value">25%</h6>
                        </p>
                      </li>
                      <li>
                        <p className=" mb-2">
                          Maturity Period:{" "}
                          <h6 className="card-value">12 Months</h6>{" "}
                        </p>
                      </li>
                      <li>
                        <p className="lead text-center">$100</p>
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
                              setPackages("gold");
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
            </Colxx>
          </Row>
        </Colxx>
      </Row>
    </>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { currentAccount } = authUser;
  return { currentAccount };
};
export default injectIntl(connect(mapStateToProps, {})(Staking));
