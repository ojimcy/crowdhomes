import React, { useEffect, useState } from 'react';
import { Colxx } from "components/common/CustomBootstrap";
import { Button, Card, CardBody, CardHeader, CardTitle, Row } from 'reactstrap';
import useBlockchain from 'blockchain/useBlockchain';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { useAccount } from 'wagmi';

const Referrals = ({ currentAccount }) => {
    const { premiumContract } = useBlockchain();
    const {isConnected} = useAccount()
    const [referrals, setReferrals] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isConnected) return;
        const accountID = currentAccount.id;
        const fn = async () => {
            setLoading(true);
            const res = [];
            const referralIDs = await premiumContract.getReferrals(accountID, (currentPage - 1) * 10);
            console.log(referralIDs)

            if (referralIDs.length === 0) return;
            for (let i = 0; i < referralIDs.length; i++) {
                if (parseInt(referralIDs[i]) === 0) {
                    continue;
                }
                const user = await premiumContract.getUser(referralIDs[i]);
                res.push({ id: parseInt(referralIDs[i]), premiumLevel: parseInt(user.premiumLevel) });
            }
            setReferrals(res);

            const referralCount = parseInt(await premiumContract.referralCount(accountID));
            const rem = referralCount % 10;
            let pageCount = (referralCount - rem) / 10;
            if (rem > 0) pageCount += 1;
            setMaxPage(pageCount);
            setLoading(false);
        };
        fn();
    }, [currentAccount, premiumContract, currentPage, isConnected]);

    const upgradeDownline = async (id, i) => {
        setLoading(true);
        const tx = await premiumContract.joinArmy(id, parseInt(100000000 * Math.random()));
        await await provider.waitForTransaction(tx.hash, 1, 45000);
        const accsUp = [];
        referrals[i].premiumLevel = 1;
        for (let i = 0; i < referrals.length; i++) {
            accsUp.push({
                id: referrals[i].id,
                classicLevel: referrals[i].classicLevel,
                premiumLevel: referrals[i].premiumLevel
            });
        }
        setReferrals(accsUp);
        setLoading(false);
        window.alert('Done');
    };

    return (
        <>
            <Row>
                <Colxx md={12}>
                    <Card>
                        <CardHeader>
                            <CardTitle style={{paddingTop:10}}>My Referrals</CardTitle>

                            <div className="float-right">
                                {currentPage > 1 ? (
                                    <Button
                                        disabled={loading}
                                        onClick={() => {
                                            setCurrentPage(currentPage - 1);
                                        }}
                                    >
                                        {loading ? (
                                            <div className="spinner-border spinner-border-sm mr-1" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        ) : (
                                            'Previous'
                                        )}
                                    </Button>
                                ) : (
                                    ''
                                )}
                                {currentPage < maxPage ? (
                                    <Button
                                        disabled={loading}
                                        className="ml-5"
                                        onClick={() => {
                                            setCurrentPage(currentPage + 1);
                                        }}
                                    >
                                        {loading ? (
                                            <div className="spinner-border spinner-border-sm mr-1" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        ) : (
                                            'Next'
                                        )}
                                    </Button>
                                ) : (
                                    ''
                                )}
                            </div>
                        </CardHeader>
                        <CardBody className="table-border-style">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Level</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {referrals.map((directReferral, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{directReferral.id}</td>
                                                    <td>{directReferral.premiumLevel}</td>
                                                    <td>
                                                        {directReferral.premiumLevel > 0 ? (
                                                            <a href={`/matrix?id=${directReferral.id}`}>View</a>
                                                        ) : (
                                                            ''
                                                        )}
                                                        {directReferral.premiumLevel === 0 ? (
                                                            <button onClick={() => upgradeDownline(directReferral.id, i)}>
                                                                Upgrade to Premium
                                                            </button>
                                                        ) : (
                                                            ''
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </CardBody>
                    </Card>
                </Colxx>
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

export default injectIntl(connect(mapStateToProps, {})(Referrals));

