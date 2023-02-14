import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { Row, Table } from "reactstrap";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Breadcrumb from "containers/navs/Breadcrumb";
import useBlockchain from "blockchain/useBlockchain";
import StakingCard from "./StakingCard";
import {
  ARMY_STAKE,
  DFC_FARM,
  DIAMOND_DFC_POOL,
  DIAMOND_USDT_POOL,
  GOLD_DFC_POOL,
  GOLD_USDT_POOL,
  SILVER_DFC_POOL,
  SILVER_USDT_POOL,
  USDT_FARM,
} from "blockchain/contracts";
import { BigNumber, ethers } from "ethers";
import { useAccount } from "wagmi";

const Staking = ({ match, currentAccount }) => {
  const { farmContract } = useBlockchain();
  const [stakes, setStakes] = useState([]);
  const { isConnected } = useAccount();

  const stakesOut = []

  useEffect(() => {
    if (!currentAccount || currentAccount.id < 1 || !isConnected) return;
    window.farmContract = farmContract;
    window.ethers = ethers;

    const fn = async () => {
      try {
        await fetchStakes(ARMY_STAKE, USDT_FARM);
        await fetchStakes(DIAMOND_DFC_POOL, DFC_FARM);
        await fetchStakes(DIAMOND_USDT_POOL, USDT_FARM);
        await fetchStakes(SILVER_DFC_POOL, DFC_FARM);
        await fetchStakes(SILVER_USDT_POOL, USDT_FARM);
        await fetchStakes(GOLD_DFC_POOL, DFC_FARM);
        await fetchStakes(GOLD_USDT_POOL, USDT_FARM);

        setStakes(stakesOut)
      } catch (error) {
        console.log(error);
      }
    };

    const fetchStakes = async (_pool, preservationMode) => {
      const countStakeRes = await farmContract.stakeCount(
        currentAccount.id,
        _pool
      );
      const count = parseInt(countStakeRes);
      for (let i = 0; i < count; i++) {
        const stakeInfo = await farmContract.stakeInfo(
          currentAccount.id,
          _pool,
          i
        );
        let decimals = preservationMode == DFC_FARM ? 8 : 18;
        const mul = BigNumber.from([10]).pow(BigNumber.from([decimals]));
        const amount = stakeInfo.amount.div(mul);
        stakesOut.push({
          amount: parseInt(amount),
          startDate: new Date(
            parseInt(stakeInfo.startDate) * 1000
          ).toDateString(),
          apr: parseInt(stakeInfo.apr),
          unstaked: stakeInfo.unstaked,
          preservationMode: preservationMode == DFC_FARM ? "DFC" : "USDT",
        });
      }
    };

    fn();
  }, [currentAccount, isConnected]);

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
              <StakingCard
                pkg={"DIAMOND"}
                interestRate={5}
                maturityPeriod={6}
                usdtPool={DIAMOND_USDT_POOL}
                dfcPool={DIAMOND_DFC_POOL}
              />
            </Colxx>
            <Colxx md="4" xxs="12">
              <StakingCard
                pkg={"SILVER"}
                interestRate={10}
                maturityPeriod={9}
                usdtPool={SILVER_USDT_POOL}
                dfcPool={SILVER_DFC_POOL}
              />
            </Colxx>
            <Colxx md="4" xxs="12">
              <StakingCard
                usdtPool={GOLD_USDT_POOL}
                dfcPool={GOLD_DFC_POOL}
                pkg={"GOLD"}
                interestRate={15}
                maturityPeriod={12}
              />
            </Colxx>
          </Row>
        </Colxx>
      </Row>

      <Row>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Amount</th>
              <th>APR</th>
              <th>Preservation Mode</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {stakes.map((st, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{st.amount}</td>
                  <td>{st.apr}%</td>
                  <td>{st.preservationMode}</td>
                  <td>{st.startDate}</td>
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
