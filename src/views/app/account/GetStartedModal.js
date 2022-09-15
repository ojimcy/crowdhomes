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

import {
  useAccount,
  useContractWrite,
  useProvider,
  useWaitForTransaction,
} from "wagmi";
import useBlockchain from "blockchain/useBlockchain";
import { premium } from "blockchain/contracts";
import premiumContractAbi from "blockchain/abi/premium";

const GetStartedModal = ({ showModal, handleClose }) => {
  const submitted = useRef(false);
  const { address } = useAccount();
  const { premiumContract } = useBlockchain();
  const [args, setArgs] = useState([])

  const { data, write } = useContractWrite({
    addressOrName: premium,
    contractInterface: premiumContractAbi,
    functionName: "register",
    args
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    window.premiumContract = premiumContract;
  });

  const register = async (values) => {
    submitted.current = true;
    setArgs([values.referralID, values.uplineID, values.withdrawalAddress])
    const tx = write();

    //const receipt = await provider.waitForTransaction(tx.hash, 1, 45000);
    //console.log(receipt);

    NotificationManager.warning(
      updateProfileSuccessMessage,
      "Notice",
      3000,
      null,
      null,
      ""
    );
  };

  const initialValues = {
    referralID: 1,
    uplineID: 1,
    withdrawalAddress: address,
  };
  return (
    <Modal isOpen={showModal} toggle={handleClose}>
      <ModalHeader>Get Started</ModalHeader>

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

const mapStateToProps = ({ appData }) => {
  const { loading, updateProfileSuccessMessage } = appData;
  return {
    loading,
    updateProfileSuccessMessage,
  };
};

export default connect(mapStateToProps, {
  updateProfileAction: updateProfile,
  updateUserInfoAction: refreshUserInfo,
})(GetStartedModal);
