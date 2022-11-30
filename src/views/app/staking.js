import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { Row, Table } from "reactstrap";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Breadcrumb from "containers/navs/Breadcrumb";
import { useAccount } from "wagmi";
import useBlockchain from "blockchain/useBlockchain";
import StakingCard from "./staking/StakingCard";
import {
  ARMY_STAKE,
  DEFIPAY_BNB_POOL,
  DEFIPAY_POOL,
  DIAMOND_DFC_POOL,
  DIAMOND_USDT_POOL,
  GOLD_DFC_POOL,
  GOLD_USDT_POOL,
  SILVER_DFC_POOL,
  SILVER_USDT_POOL,
} from "blockchain/contracts";
import { ethers } from "ethers";

const Staking = ({ match, currentAccount, history }) => {
  const { isConnected } = useAccount();
  const {
    premiumContract,
    systemContract,
    erc20Contract,
    farmContract,
    correctNetwork,
  } = useBlockchain();
  const [stakes, setStakes] = useState([]);

  let allStakes = [];

  useEffect(() => {
    if (!isConnected || !erc20Contract || !correctNetwork) return;
    const fn = async () => {
      window.systemContract = systemContract;
      window.premiumContract = premiumContract;

      allStakes = [];

      await fetchStakes(DEFIPAY_BNB_POOL, 18, "BNB");
      await fetchStakes(DEFIPAY_POOL, 8, "DFC");
      await fetchStakes(ARMY_STAKE, 18, "USDT");

      await fetchStakes(DIAMOND_USDT_POOL, 18, "USDT");
      await fetchStakes(DIAMOND_DFC_POOL, 8, "DFC");

      await fetchStakes(SILVER_USDT_POOL, 18, "USDT");
      await fetchStakes(SILVER_DFC_POOL, 8, "DFC");

      await fetchStakes(GOLD_USDT_POOL, 18, "USDT");
      await fetchStakes(GOLD_DFC_POOL, 8, "DFC");

      setStakes(allStakes);
    };

    const fetchStakes = async (poolID, decimals, preservationMode) => {
      let stakeCountReq = await farmContract.stakeCount(
        currentAccount.id,
        poolID
      );
      let stakeCount = parseInt(stakeCountReq);
      for (let i = 0; i < stakeCount; i++) {
        let stake = await farmContract.stakeInfo(currentAccount.id, poolID, i);
        const amount = ethers.utils.formatUnits(stake.amount, decimals);
        console.log(parseInt(stake.amount), decimals, amount)
        allStakes.push({
          i,
          amount: parseFloat(amount),
          apr: parseInt(stake.apr),
          startDate: new Date(parseInt(stake.startDate) * 1000).toDateString(),
          unstaked: stake.unstaked,
          preservationMode: preservationMode,
        });
      }
    };

    try {
      fn();
    } catch (error) {
      console.error(error);
    }
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
            Stake a minimum of $100 worth of DFC and earn upto 25% per annum.
          </p>
        </Colxx>

        <Colxx className="icon-cards-row" md="12">
          <Row>
            <Colxx md="4" xxs="12">
              <StakingCard
                pkg={"DIAMOND"}
                maturityPeriod={6}
                interestRate={10}
                usdtPool={DIAMOND_USDT_POOL}
                dfcPool={DIAMOND_DFC_POOL}
              />
            </Colxx>
            <Colxx md="4" xxs="12">
              <StakingCard
                pkg={"SILVER"}
                maturityPeriod={9}
                interestRate={15}
                usdtPool={SILVER_USDT_POOL}
                dfcPool={SILVER_DFC_POOL}
              />
            </Colxx>
            <Colxx md="4" xxs="12">
              <StakingCard
                pkg={"DIAMOND"}
                maturityPeriod={12}
                interestRate={25}
                usdtPool={GOLD_USDT_POOL}
                dfcPool={GOLD_DFC_POOL}
              />
            </Colxx>
          </Row>
        </Colxx>
      </Row>

      <Row>
        <Table>
          <thead>
            <tr>
              <td>S/N</td>
              <td>Kind</td>
              <td>Amount</td>
              <td>RIO</td>
              <td>Start Date</td>
            </tr>
          </thead>
          <tbody>
            {stakes.map((stake, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{stake.preservationMode}</td>
                  <td>{stake.amount}</td>
                  <td>{stake.apr}</td>
                  <td>{stake.startDate}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>
    </>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { currentAccount } = authUser;
  return { currentAccount };
};
export default injectIntl(connect(mapStateToProps, {})(Staking));
