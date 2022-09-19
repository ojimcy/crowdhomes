import React from "react";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { Card, CardBody, CardHeader, Label, Row } from "reactstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Breadcrumb from "containers/navs/Breadcrumb";
import "./profile.css";

const HowItWorks = ({ currentAccount, match }) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.army.how-it-works" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Card>
          <CardBody>
            <Colxx md="12">
              <h6 className="top-callout mb-3">How Does it Work?</h6>
              <p className="top-callout-text">
                The steps to come on board this platform is enumerated below;
              </p>
              <ul className="list-styled">
                <li>
                  <p>
                    Convert your fiat currency to cryptocurrency using an
                    exchange.
                  </p>
                </li>
                <li>
                  <p>Swap your cryptocurrency to $DFC to fund your wallet.</p>
                </li>
                <li>
                  <p>From your DApp, logon to the website.</p>
                </li>
                <li>
                  <p>Choose a package that suits your needs.</p>
                </li>
                <li>
                  <p>Connect your wallet and commit your $DFC to the pool.</p>
                </li>
              </ul>
              <p>To become a DFC army, choos</p>
            </Colxx>
            <Row>
              <Colxx md={12}>
                <h6 className="top-callout mb-3">AVAILABLE PACKAGES</h6>
                <p>
                  There are three (3) packages under the RealFi Staking, these
                  include Diamond, Silver and the gold packages each of which
                  offers different rewards and incentives with varying maturity
                  periods.
                </p>
              </Colxx>

              <CardBody className="table-border-style">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>PACKAGES</th>
                        <th>DIAMOND</th>
                        <th>SILVER</th>
                        <th>GOLD</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Interest Accrued</td>
                        <td>10%</td>
                        <td>15%</td>
                        <td>40%</td>
                      </tr>
                      <tr>
                        <td>Maturity Period</td>
                        <td>6 months</td>
                        <td>9 months</td>
                        <td>1 year</td>
                      </tr>
                      <tr>
                        <td>Minimum Startup</td>
                        <td>100$</td>
                        <td>100$</td>
                        <td>100$</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Row>
            <Row>
              <Colxx md={12}>
                <h6 className="top-collaout mb-3">YIELD TABLE.</h6>
                <CardBody className="table-border-style">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>POOLED AMOUNT </th>
                          <th>DIAMOND</th>
                          <th>SILVER</th>
                          <th>GOLD</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>$100</td>
                          <td>$110</td>
                          <td>$115</td>
                          <td>$140</td>
                        </tr>
                        <tr>
                          <td>$1000</td>
                          <td>$1100</td>
                          <td>$1150</td>
                          <td>$1400</td>
                        </tr>
                        <tr>
                          <td>$10000</td>
                          <td>$11000</td>
                          <td>$11500</td>
                          <td>$14000</td>
                        </tr>
                        <tr>
                          <td>$20000</td>
                          <td>$22000</td>
                          <td>$23000</td>
                          <td>$28000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Colxx>
            </Row>
            <Row>
              <Colxx md={12}>
                <h6 className="top-callout mb-3">REFERRAL REWARDS</h6>
                <p>
                  With RealFi MLM the dream of earning passive income has become
                  a reality. For every successful sign up and activation, the
                  referrer earns 10% of the expected interest of the referral.
                  As an illustration, let’s say as a sales executive, your
                  client activates a twelve (12) months package with the total
                  sum of $10,000. your commission which is 10% of the expected
                  reward or 4% committed sum in this case amounts to $400.
                </p>
              </Colxx>
            </Row>
            <Row>
              <Colxx md={12}>
                <h6 className="top-callout mb-3">
                  {" "}
                  MULTI-LEVEL MARKETING (MLM)
                </h6>
                <p>
                  We have also introduced a multilevel marketing wing to help a
                  greater number of the populace earn from the massive
                  opportunities that abound in blockchain and real estate or
                  fast track their individual goals that concerns household and
                  household items. To qualify for the MLM package, you need to
                  activate a $100 package for a period of one year. For those
                  who decide to build a team and grow their community, the
                  system rewards you with several gifts at every level of
                  achievement ranging from cash rewards, cars and houses to
                  mention but a few. Under this scheme, the following are the
                  possible earnings that are available to all the participants.
                </p>
              </Colxx>
            </Row>
            <Row>
              <Colxx md={12}>
                <h6 className="top-callout mb-3">Referral Rewards</h6>
                <p>
                  For every referral you make into the MLM plan, the system pays
                  you a one-off 4% (ie. 10% of the expected earnings) of the
                  total sum contributed. That is to say that for every $100
                  contributed by a participant in your team (direct referral),
                  you get $4 in referral commission.
                </p>
              </Colxx>
            </Row>
            <Row>
              <Colxx md={12}>
                <h4 className="top-callout mb-3">Matrix Bonus</h4>
                <p>
                  With RealFi MLM the dream of earning passive income has become
                  a reality. For every successful sign up and activation, the
                  referrer earns 10% of the expected interest of the referral.
                  As an illustration, let’s say as a sales executive, your
                  client activates a twelve (12) months package with the total
                  sum of $10,000. your commission which is 10% of the expected
                  reward or 4% committed sum in this case amounts to $400.
                </p>

                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>LEVELS</th>
                        <th>MATRIX BONUS</th>
                        <th>TOTAL EARNINGS ($)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>L1</td>
                        <td>5*2</td>
                        <td>10</td>
                      </tr>
                      <tr>
                        <td>L2</td>
                        <td>7.5*4</td>
                        <td>30</td>
                      </tr>
                      <tr>
                        <td>L3</td>
                        <td>22.5*8</td>
                        <td>180</td>
                      </tr>
                      <tr>
                        <td>L4</td>
                        <td>135*4</td>
                        <td>540</td>
                      </tr>
                      <tr>
                        <td>L5</td>
                        <td>1620*4</td>
                        <td>6480</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Colxx>
            </Row>
            <Row>
              <Colxx md={12}>
                <h4 className="top-callout mb-3">Level Completion Bonus</h4>
                <p>
                  For every level completed, you get any of; cash rewards, car
                  or a house depending on the level. The tables below show the
                  levels and their rewards.
                </p>

                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>BONUS</th>
                        <th>L2</th>
                        <th>L3</th>
                        <th>L4</th>
                        <th>L5</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>CASH</td>
                        <td>10</td>
                        <td>630</td>
                        <td>NA</td>
                        <td>NA</td>
                      </tr>
                      <tr>
                        <td>CAR</td>
                        <td>NA</td>
                        <td>NA</td>
                        <td>CAR AWARD</td>
                        <td>NA</td>
                      </tr>
                      <tr>
                        <td>HOUSE</td>
                        <td>NA</td>
                        <td>NA</td>
                        <td>NA</td>
                        <td>HOUSE AWARD</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Colxx>
            </Row>

            <Row>
              <Colxx md={12}>
                <h6 className="top-callout mb-3">Stake Reward</h6>
                <p>
                  The initial staking of a $100 dollar into the pool that
                  qualified you to join the MLM package also earns you a staking
                  reward of 20% per annum. That is, in addition to all the MLM
                  rewards (referral bonus, matrix bonus, and level completion
                  bonus) you also earn a 20% return at the end of the 1 year
                  staking period.
                </p>
              </Colxx>
            </Row>
          </CardBody>
        </Card>
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

export default injectIntl(connect(mapStateToProps, {})(HowItWorks));
