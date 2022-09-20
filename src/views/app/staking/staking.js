import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import {
  Row,
} from "reactstrap";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Breadcrumb from "containers/navs/Breadcrumb";
import { useAccount } from "wagmi";
import useBlockchain from "blockchain/useBlockchain";
import StakingCard from "./StakingCard";

const Staking = ({ match, currentAccount, history }) => {
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
            Stake a minimum of $10 worth of DFC and earn upto 25% per annum.
          </p>
        </Colxx>

        <Colxx className="icon-cards-row" md="12">
          <Row>
            <Colxx md="4" xxs="12">
              <StakingCard pkg={'DIAMOND'} interestRate={10} maturityPeriod={6}/>
            </Colxx>
            <Colxx md="4" xxs="12">
            <StakingCard pkg={'SILVER'} interestRate={9} maturityPeriod={15}/>
            </Colxx>
            <Colxx md="4" xxs="12">
            <StakingCard pkg={'GOLD'} interestRate={12} maturityPeriod={12}/>
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
