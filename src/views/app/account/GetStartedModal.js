import React, { useEffect, useRef } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
  FormGroup,
} from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import { refreshUserInfo, updateProfile } from 'redux/actions';
import { NotificationManager } from 'components/common/react-notifications';

const GetStartedModal = ({
  history,
  showModal,
  handleClose,
  loading
}) => {
  const submitted = useRef(false);

  useEffect(() => {
    if (!submitted.current) return;
    NotificationManager.warning(
      updateProfileSuccessMessage,
      'Notice',
      3000,
      null,
      null,
      ''
    );

    handleClose();
    submitted.current = false;
  });

  const register = (values) => {
    submitted.current = true;
    if (loading) return;
    updateProfileAction(values, history);
  };
  const initialValues = {
    referral_id: 1,
    withdrawal_address: 'currentUser.withdrawal_address',
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
                <Field className="form-control" name="withdrawal_address" required />
                {errors.withdrawal_address && touched.withdrawal_address && (
                  <div className="invalid-feedback d-block">
                    {errors.withdrawal_address}
                  </div>
                )}
              </FormGroup>

              <FormGroup className="form-group has-float-label">
                <Label>Referral ID</Label>
                <Field className="form-control" name="referral_id" required />
                {errors.referral_id && touched.referral_id && (
                  <div className="invalid-feedback d-block">
                    {errors.referral_id}
                  </div>
                )}
              </FormGroup>
            </ModalBody>

            <ModalFooter>
              <Button
                type="submit"
                color="primary"
                className={`btn-shadow btn-multiple-state ${
                  loading ? 'show-spinner' : ''
                }`}
                size="lg"
              >
                <span className="spinner d-inline-block">
                  <span className="bounce1" />
                  <span className="bounce2" />
                  <span className="bounce3" />
                </span>
                <span className="label">Register</span>
              </Button>{' '}
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
