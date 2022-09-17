import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Row,
} from "reactstrap";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Breadcrumb from "containers/navs/Breadcrumb";
import GetStartedModal from "./account/GetStartedModal";
import ConnectWalletModal from "./account/ConnectWalletModal";
import { useAccount } from "wagmi";
import useBlockchain from "blockchain/useBlockchain";
import { NotificationManager } from "components/common/react-notifications";

const Dashboard = ({ match, currentAccount,history }) => {
  const [showConnectWalletModal, setShowConnectWalletModal] = useState();
  const [showGetStartedModal, setShowGetStartedModal] = useState(false);
  const { isConnected } = useAccount();
  const { premiumContract, systemContract } = useBlockchain();

  useEffect(() => {
    window.systemContract = systemContract;
    window.premiumContract = premiumContract;
  });

  const joinDFCArmy = async () => {
    const tx = await premiumContract.joinArmy(
      currentAccount.id,
      parseInt(Math.random() * 1000000)
    );
    console.log(tx.hash);
    NotificationManager.success("Transaction submitted");
  };

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.dashboard" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx md="12">
          <h6 className="top-callout">Welcome to Deficonnect RealFi</h6>
          <p className="top-callout-text">
            The real-world side of the Deficonnect project providing unlimited
            experience in the physical and the digital world with <br /> touch
            in Real Estate, Automobile, Health-care, Transportation, Health
            insurance and AgroFi.
          </p>
        </Colxx>

        <Colxx className="icon-cards-row" md="12">
          <Row>
            <Colxx md="3" xxs="12">
              <div className="icon-row-item mb-4">
                <Card>
                  <CardBody className="text-center">
                    <i className="iconsminds-dollar" />
                    <p className="card-text font-weight-semibold mb-0">
                      Total Vestment
                    </p>
                    <p className="lead text-center">$350,082</p>
                  </CardBody>
                </Card>
              </div>
            </Colxx>
            <Colxx md="3" xxs="12">
              <div className="icon-row-item mb-4">
                <Card>
                  <CardBody className="text-center">
                    <i className="iconsminds-dollar" />
                    <p className="card-text font-weight-semibold mb-0">
                      Current Projects Value (Approx)
                    </p>
                    <p className="lead text-center">$472,038</p>
                  </CardBody>
                </Card>
              </div>
            </Colxx>
            <Colxx md="3" xxs="12">
              <div className="icon-row-item mb-4">
                <Card>
                  <CardBody className="text-center">
                    <i className="iconsminds-dollar" />
                    <p className="card-text font-weight-semibold mb-0">
                      My Contribution
                    </p>
                    <p className="lead text-center">$0.0000</p>
                  </CardBody>
                </Card>
              </div>
            </Colxx>
            <Colxx md="3" xxs="12">
              <div className="icon-row-item mb-4">
                <Card>
                  <CardBody className="text-center">
                    <i className="iconsminds-dollar" />
                    <p className="card-text font-weight-semibold mb-0">
                      My Total Earnings
                    </p>
                    <p className="lead text-center">$0.0000</p>
                  </CardBody>
                </Card>
              </div>
            </Colxx>
          </Row>
        </Colxx>
      </Row>

      <Row className="mb-4">
        <Colxx md="12">
          <Card>
            <CardBody>
              <p className="top-callout-text">
                Tap into the enormous wealth opportunity in Deficonnect's
                RealFi.
              </p>
              <p>
                <GetStartedModal
                  showModal={showGetStartedModal}
                  handleClose={() => setShowGetStartedModal(false)}
                />

                {isConnected ? (
                  <>
                    {!currentAccount.registered ? (
                     <>
                     <Button
                        onClick={() => {
                          setShowGetStartedModal(true);
                        }}
                      >
                        Get Started Now
                      </Button>
                     </>
                    ) : (
                      <>
                        {!currentAccount.premiumLevel > 0 ? (
                          <Button onCanPlay={joinDFCArmy}>Join DFC Army</Button>
                        ) : (
                          <>
                          <span>
                            Congratulations! You're on your way to better days
                          </span> <br/>
                          <Button onClick={()=>{history.push('/army')}}>Go To Army Dashboard</Button>
                          </>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => {
                        setShowConnectWalletModal(true);
                      }}
                    >
                      Connect Wallet To Get Started
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
        </Colxx>
      </Row>

      <Row className="equal-height-container icon-cards-row mb-5">
        <Colxx xxs="12">
          <CardTitle className="text-center">
            <h1>Current Projects</h1>
          </CardTitle>
        </Colxx>

        <Colxx>
          <Row>
            <Colxx md="12" lg="6" className="col-item mb-4">
              <Card className="mb-4">
                <div className="position-relative">
                  <CardImg
                    top
                    height={350}
                    src="/assets/img/private-heaven.jpeg"
                    alt="Card image cap"
                  />
                  <Badge
                    color="primary"
                    pill
                    className="position-absolute badge-top-left"
                  >
                    ONGOING
                  </Badge>
                  <Badge
                    color="secondary"
                    pill
                    className="position-absolute badge-top-left-2"
                  >
                    Real Estate
                  </Badge>
                </div>
                <CardBody className="pt-5 pb-5 d-flex flex-lg-column flex-md-row flex-sm-row flex-column">
                  <div className="price-top-part">
                    <i className={`large-icon star`} />
                    <h5 className="mb-0 font-weight-semibold color-theme-1 mb-4">
                      Private Heaven
                    </h5>
                    <p className="text-large mb-2 text-default">
                      <a target="_blank" href="https://chegbehomes.com">
                        Chegbe Homes Limited
                      </a>
                    </p>
                  </div>
                  <div className="pl-3 pr-3 pt-3 pb-0 d-flex price-feature-list flex-column flex-grow-1">
                    <ul className="list-unstyled">
                      <li>
                        <p className="mb-3">Number of Units: 5</p>
                      </li>
                      <li>
                        <p className="mb-3">Value per Unit: $80,000</p>
                      </li>
                      <li>
                        <p>Location: Benue State, Nigeria</p>
                      </li>
                    </ul>
                    <div className="text-center">
                      <Button
                        onClick={() => {
                          window.open(
                            "https://chegbehomes.com/private-haven",
                            "_blank"
                          );
                        }}
                        className="btn btn-link btn-empty btn-lg"
                      >
                        Explore
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Colxx>

            <Colxx md="12" lg="6" className="col-item mb-4">
              <Card className="mb-4">
                <div className="position-relative">
                  <CardImg
                    top
                    height={350}
                    src="/assets/img/rice-farm.jpeg"
                    alt="Deficonnect Rice Farm"
                  />
                  <Badge
                    color="primary"
                    pill
                    className="position-absolute badge-top-left"
                  >
                    ONGOING
                  </Badge>
                  <Badge
                    color="secondary"
                    pill
                    className="position-absolute badge-top-left-2"
                  >
                    AgroFi
                  </Badge>
                </div>
                <CardBody className="pt-5 pb-5 d-flex flex-lg-column flex-md-row flex-sm-row flex-column">
                  <div className="price-top-part">
                    <i className={`large-icon star`} />
                    <h5 className="mb-0 font-weight-semibold color-theme-1 mb-4">
                      Rice Farm
                    </h5>
                    <p className="text-large mb-2 text-default">
                      <a target="_blank" href="https://deficonnect.tech/agrofi">
                        Deficonnect AgroFi
                      </a>
                    </p>
                  </div>
                  <div className="pl-3 pr-3 pt-3 pb-0 d-flex price-feature-list flex-column flex-grow-1">
                    <ul className="list-unstyled">
                      <li>
                        <p className="mb-3">Number of Units: 1</p>
                      </li>
                      <li>
                        <p className="mb-3">Value per Unit: $72,038</p>
                      </li>
                      <li>
                        <p>Location: Kura, Kano State, Nigeria</p>
                      </li>
                    </ul>
                    <div className="text-center">
                      <Button
                        onClick={() => {
                          window.open(
                            "https://deficonect.tech/agrofi",
                            "_blank"
                          );
                        }}
                        className="btn btn-link btn-empty btn-lg"
                      >
                        Explore
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
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
export default injectIntl(connect(mapStateToProps, {})(Dashboard));
