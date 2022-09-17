import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
  FormGroup,
} from "reactstrap";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import { refreshUserInfo, updateProfile } from "redux/actions";
import { NotificationManager } from "components/common/react-notifications";

import { useAccount, useProvider, useWaitForTransaction } from "wagmi";
import useBlockchain from "blockchain/useBlockchain";
import { sleep } from "helpers/sleeper";

const GetStartedModal = ({ showModal, handleClose, title, currentAccount }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hash, setHash] = useState();
  const submitted = useRef(false);
  const { address } = useAccount();
  const { premiumContract, systemContract } = useBlockchain();
  const { isSuccess: txSuccess, error: txError } = useWaitForTransaction({
    confirmations: 1,
    hash,
  });

  const provider = useProvider();

  useEffect(() => {
    window.systemContract = systemContract;
    window.premiumContract = premiumContract;
  }, [systemContract, premiumContract]);

  useEffect(() => {
    if (txSuccess) {
      setIsLoading(false);
      NotificationManager.warning(
        "Account created. Congratulations",
        "Notice",
        3000,
        null,
        null,
        ""
      );
    }
  }, [txSuccess]);

  useEffect(() => {
    if (txError) {
      setIsLoading(false);
      NotificationManager.warning(txError, "Notice", 3000, null, null, "");
    }
  }, [txError]);

  const register = async (values) => {
    setIsLoading(true);
    submitted.current = true;

    const tx = await premiumContract.register(
      values.referralID,
      values.uplineID,
      values.withdrawalAddress
    );

    console.log(tx.hash);

    let counter = 0;
    while (true) {
      let mintedTx = await provider.getTransaction(tx.hash);
      if (mintedTx) {
        console.log(mintedTx);
        setIsLoading(false);
        break;
      }
      if (counter > 6) {
        console.log("cannot resolve the transaction");
        setIsLoading(false);
        break;
      }
      await sleep(1000);
      counter++;
    }

    NotificationManager.warning(
      "Create account. Congratulations",
      "Notice",
      3000,
      null,
      null,
      ""
    );
  };

  const initialValues = {
    referralID: currentAccount.id || 1,
    uplineID: currentAccount.id || 1,
    withdrawalAddress: currentAccount.walletAddress || address,
  };
  return (
    <Modal isOpen={showModal} toggle={handleClose}>
      <ModalHeader>{title || "Get Started"}</ModalHeader>

      <Formik initialValues={initialValues} onSubmit={register}>
        {({ errors, touched }) => (
          <Form className="av-tooltip tooltip-label-bottom">
            <ModalBody>
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

              <FormGroup className="form-group has-float-label">
                <Label>Referral ID</Label>
                <Field className="form-control" name="referralID" required />
                {errors.referralID && touched.referralID && (
                  <div className="invalid-feedback d-block">
                    {errors.referralID}
                  </div>
                )}
              </FormGroup>

              <FormGroup className="form-group has-float-label">
                <Label>Upline ID</Label>
                <Field className="form-control" name="uplineID" required />
                {errors.uplineID && touched.uplineID && (
                  <div className="invalid-feedback d-block">
                    {errors.uplineID}
                  </div>
                )}
              </FormGroup>
            </ModalBody>

            <ModalFooter>
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
                <span className="label">Register</span>
              </Button>{" "}
              <Button color="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </Modal>
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
})(GetStartedModal);
