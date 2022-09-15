import React from "react";
import { Card, CardBody, Row } from "reactstrap";
import { Colxx, Separator } from "components/common/CustomBootstrap";

export const DashboardCard = () => {

    function copyLink(linkId) {
        
    }
  return (
    <>
      <Row className="icon-cards-row">
        <Colxx md="6" xxs="12">
          <div className="icon-row-item mb-4">
            <Card>
              <CardBody className="text-center">
                <i className="iconsminds-dollar" />
                <p className="card-text font-weight-semibold mb-0">
                  Wallet Ballance
                </p>
                <p className="lead text-center">$1203</p>
              </CardBody>
            </Card>
          </div>
        </Colxx>
        <Colxx md="6" xxs="12">
          <div className="icon-row-item mb-4">
            <Card>
              <CardBody className="text-center">
                <i className="iconsminds-dollar" />
                <p className="card-text font-weight-semibold mb-0">
                  Available Balance
                </p>
                <p className="lead text-center">$200</p>
              </CardBody>
            </Card>
          </div>
        </Colxx>
        <Colxx md="6" xxs="12">
          <div className="icon-row-item mb-4">
            <Card>
              <CardBody className="text-center">
                <i className="iconsminds-dollar" />
                <p className="card-text font-weight-semibold mb-0">
                  Deirect Referrals
                </p>
                <p className="lead text-center">3</p>
              </CardBody>
            </Card>
          </div>
        </Colxx>
      </Row>
      <Row>
        <div className="jumbotron">
          <h1 className="display-4">Congratulations!</h1>
          <p className="lead">Your account is 100% active</p>
          <hr className="my-4" />
          <p>
            Share your referral link to earn more
          </p>
          <div className="h5">Referral Link: </div> <a href="#" id="myLink" onClick={copyLink}>https://chegbehomes.com/auth/signup?ref=</a>
        </div>
      </Row>
      
    </>
  );
};
