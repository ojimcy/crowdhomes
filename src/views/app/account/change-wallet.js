import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Label,
  FormGroup,
  CardHeader,
  CardFooter,
  Card,
  CardBody,
  Row,
  CustomInput,
} from "reactstrap";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import { refreshUserInfo, updateProfile } from "redux/actions";
import { NotificationManager } from "components/common/react-notifications";
import ConnectWalletModal from "./ConnectWalletModal";

import { useAccount, useProvider, useWaitForTransaction } from "wagmi";
import useBlockchain from "blockchain/useBlockchain";
import { Colxx } from "components/common/CustomBootstrap";

const ChangeWallet = ({ currentAccount }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showConnectWalletModal, setShowConnectWalletModal] = useState(false);
  const { isConnected, address } = useAccount();
  const { premiumContract, systemContract, erc20Contract } = useBlockchain();
  const provider = useProvider()

  const changeWallet = async (values) => {
    let tx = await premiumContract.changeWallet(currentAccount.id, values.walletAddress)
    let receipt = await provider.waitForTransaction(tx.hash, 1, 45000)
    if (!receipt || !receipt.blockNumber) {
      NotificationManager.error('Unable to determine transaction status', 5000)
      return
    }

    NotificationManager.success('Wallet changed', 5000)
  }

  const initialValues = {
    withdrawalAddress: currentAccount.walletAddress || address,
    newWallet: "",
  };
  return (
    <Row>
      <Colxx md={6}>
        <Card>
          <CardHeader>
            <h6 className="top-callout">Add Multiple Accounts</h6>
          </CardHeader>

          <Formik initialValues={initialValues} onSubmit={changeWallet}>
            {({ errors, touched }) => (
              <Form className="av-tooltip tooltip-label-bottom">
                <CardBody>
                  <FormGroup className="form-group has-float-label">
                    <Label>Current Wallet Address</Label>
                    <CustomInput
                      type="text"
                      className="form-control"
                      defaultValue={currentAccount.walletAddress}
                    />
                  </FormGroup>

                  <FormGroup className="form-group has-float-label">
                    <Label>Wallet Address</Label>
                    <Field
                      className="form-control"
                      name="withdrawalAddress"
                      required
                    />
                    {errors.withdrawalAddress && touched.withdrawalAddress && (
                      <div className="invalid-feedback d-block">
                        {errors.withdrawalAddress}
                      </div>
                    )}
                  </FormGroup>
                </CardBody>

                <CardFooter>
                  {isConnected ? (
                    <Button
                      type="submit"
                      color="primary"
                      className={`btn-shadow btn-multiple-state ${
                        isLoading ? "show-spinner" : ""
                      }`}
                      size="lg"
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">Submit</span>
                    </Button>
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
                </CardFooter>
              </Form>
            )}
          </Formik>
        </Card>
      </Colxx>
    </Row>
  );
};

const mapStateToProps = ({ appData, authUser }) => {
  const { loading, updateProfileSuccessMessage } = appData;
  const { currentAccount } = authUser;
  return {
    loading,
    updateProfileSuccessMessage,
    currentAccount,
  };
};

export default connect(mapStateToProps, {
  updateProfileAction: updateProfile,
  updateUserInfoAction: refreshUserInfo,
})(ChangeWallet);
