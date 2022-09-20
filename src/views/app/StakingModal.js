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


const StakingModal = ({
  showModal,
  handleClose,
  title,
  currentAccount,
  packages,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hash, setHash] = useState();
  const submitted = useRef(false);
  const { isConnected, address } = useAccount();
  const { premiumContract, systemContract, erc20Contract } = useBlockchain();
  const { isSuccess: txSuccess, error: txError } = useWaitForTransaction({
    confirmations: 1,
    hash,
  });

  const [dfcBalance, setDfcBalance] = useState(0);

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

  useEffect(() => {
    if (!isConnected || !erc20Contract) return;
    const fn = async () => {
      window.systemContract = systemContract;
      window.premiumContract = premiumContract;
      try {
        const dfcBalance = await erc20Contract.balanceOf(address);
        setDfcBalance(parseInt(dfcBalance.div(1e8)));
      } catch (error) {
        console.log(error);
      }
    };
    fn();
  }, [erc20Contract]);

  const handleStaking = async (values) => {
    setIsLoading(true);
    submitted.current = true;

    console.log(tx.hash);
  };

  const initialValues = {
    stakeAmount: currentAccount.id || 0,
    dfcBalance: dfcBalance,
  };
  return (
    <Modal isOpen={showModal} toggle={handleClose}>
      <ModalHeader>{title || "Stake DFC"}</ModalHeader>

      <Formik initialValues={initialValues} onSubmit={handleStaking}>
        {({ errors, touched }) => (
          <Form className="av-tooltip tooltip-label-bottom">
            <ModalBody>
              <FormGroup className="form-group has-float-label">
                <Label>Wallet Balance</Label>
                <Field
                  className="form-control"
                  name="dfcBalance"
                  value={dfcBalance}
                />
              </FormGroup>

              <FormGroup className="form-group has-float-label">
                <Label>Stake Amount</Label>
                <Field
                  className="form-control"
                  name="stakeAmaount"
                  required
                  placeholder="Enter amount of DFC"
                />
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
                <span className="label">Stake</span>
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
})(StakingModal);
