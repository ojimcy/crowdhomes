import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
  FormGroup,
  CustomInput,
} from "reactstrap";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import { refreshUserInfo, updateProfile } from "redux/actions";
import { NotificationManager } from "components/common/react-notifications";

import { useAccount, useProvider, useWaitForTransaction } from "wagmi";
import useBlockchain from "blockchain/useBlockchain";
import { sleep } from "helpers/sleeper";
import { setWeb3CurrentID } from "redux/auth/actions";
import { ethers } from "ethers";

const GetStartedModal = ({
  showModal,
  handleClose,
  title,
  currentAccount,
  setWeb3CurrentIDAction,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hash, setHash] = useState();
  const [settingUplineID, setSettingUplineID] = useState(false);
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
        7000,
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
    try {
      setIsLoading(true);
      submitted.current = true;

      let uplineID = values.uplineID;
      if (!settingUplineID) {
        uplineID = 0;
      }
      const tx = await premiumContract.register(
        values.referralID,
        uplineID,
        values.withdrawalAddress
      );

      const receipt = await provider.waitForTransaction(tx.hash, 1, 45000);
      if (!receipt) {
        setIsLoading(false);

        NotificationManager.error(
          `Account creation failed. Something went wrong`,
          "Error",
          3000,
          null,
          null,
          ""
        );
      }

      const id = parseInt(receipt.logs[0].topics[1]);
      const user = await premiumContract.getUser(id);
      if (user.registered) {
        const userData = {
          id,
          registered: user.registered,
          premiumLevel: parseInt(user.premiumLevel),
          referralID: parseInt(user.referralID),
          uplineID: parseInt(user.uplineID),
          referralsCount: parseInt(user.referralsCount),
          walletAddress: values.withdrawalAddress,
          totalEarnings: parseFloat(
            ethers.utils.formatEther(user.totalEarnings)
          ).toFixed(2),
        };

        setWeb3CurrentIDAction(userData);
      }

      handleClose();
      setIsLoading(false);

      NotificationManager.warning(
        `Create account. Congratulations! Your account ID is ${id}`,
        "Notice",
        3000,
        null,
        null,
        ""
      );
    } catch (error) {
      setIsLoading(false);

      NotificationManager.error(
        `Account creation failed. Something went wrong`,
        "Error",
        3000,
        null,
        null,
        ""
      );
      console.log(error);
    }
  };

  const initialValues = {
    referralID: currentAccount.id || localStorage.getItem("refID") || 1,
    uplineID:
      currentAccount.id ||
      localStorage.getItem("refID") ||
      currentAccount.id ||
      1,
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

              <FormGroup className="text-left">
                <CustomInput
                  value={settingUplineID}
                  onChange={(el) => setSettingUplineID(el.target.checked)}
                  type="checkbox"
                  id="settingUplineID"
                  label={"Set Matrix Parent ID"}
                />
              </FormGroup>

              {settingUplineID ? (
                <FormGroup className="form-group has-float-label">
                  <Label>Upline ID</Label>
                  <Field className="form-control" name="uplineID" required />
                  {errors.uplineID && touched.uplineID && (
                    <div className="invalid-feedback d-block">
                      {errors.uplineID}
                    </div>
                  )}
                </FormGroup>
              ) : (
                ""
              )}
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
  setWeb3CurrentIDAction: setWeb3CurrentID,
})(GetStartedModal);
