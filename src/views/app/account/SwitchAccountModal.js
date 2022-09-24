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
import { NotificationManager } from "components/common/react-notifications";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { setWeb3CurrentID } from "redux/auth/actions";
import useBlockchain from "blockchain/useBlockchain";
import { ethers } from "ethers";

const SwitchAccountModal = ({
  showModal,
  handleClose,
  setWeb3CurrentIDAction,
  currentAccount,
}) => {
  const submitted = useRef(false);
  const { premiumContract } = useBlockchain();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!submitted.current) return;
    NotificationManager.warning(
      updateProfileSuccessMessage,
      "Notice",
      3000,
      null,
      null,
      ""
    );

    handleClose();
    submitted.current = false;
  });

  const login = async (values) => {
    if (values.accountID <= 0) {
      NotificationManager.warning(
        "Invalid User ID",
        "Error",
        3000,
        null,
        null,
        ""
      );
    }
    setLoading(true);
    const user = await premiumContract.getUser(values.accountID);
    if (user.registered) {
      const walletAddress = await premiumContract.userAddresses(values.accountID);

      const userData = {
        id: values.accountID,
        registered: user.registered,
        premiumLevel: parseInt(user.premiumLevel),
        referralID: parseInt(user.referralID),
        uplineID: parseInt(user.uplineID),
        referralsCount: parseInt(user.referralsCount),
        walletAddress: walletAddress,
        totalEarnings: parseFloat(ethers.utils.formatEther(user.totalEarnings)).toFixed(2),
        role: 'user'
      };

      setWeb3CurrentIDAction(userData);
      NotificationManager.warning(
        "Login succeeded",
        "Success",
        3000,
        null,
        null,
        ""
      );
      handleClose();
    } else {
      NotificationManager.warning(
        "Invalid User ID",
        "Error",
        3000,
        null,
        null,
        ""
      );
    }
    setLoading(false);
  };
  const initialValues = {
    accountID: currentAccount.id || '',
  };
  return (
    <Modal isOpen={showModal} toggle={handleClose}>
      <ModalHeader>Switch Account</ModalHeader>

      <Formik initialValues={initialValues} onSubmit={login}>
        {({ errors, touched }) => (
          <Form className="av-tooltip tooltip-label-bottom">
            <ModalBody>
              <FormGroup className="form-group has-float-label">
                <Label>Account ID</Label>
                <Field className="form-control" name="accountID" required />
                {errors.accountID && touched.accountID && (
                  <div className="invalid-feedback d-block">
                    {errors.accountID}
                  </div>
                )}
              </FormGroup>
            </ModalBody>

            <ModalFooter>
              <Button
                type="submit"
                color="primary"
                className={`btn-shadow btn-multiple-state ${
                  loading ? "show-spinner" : ""
                }`}
                size="lg"
              >
                <span className="spinner d-inline-block">
                  <span className="bounce1" />
                  <span className="bounce2" />
                  <span className="bounce3" />
                </span>
                <span className="label">Login</span>
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

const mapStateToProps = ({ authUser }) => {
  const { currentAccount } = authUser;

  return {
    currentAccount,
  };
};

export default injectIntl(
  connect(mapStateToProps, {
    setWeb3CurrentIDAction: setWeb3CurrentID,
  })(SwitchAccountModal)
);
