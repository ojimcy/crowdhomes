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

const EditProfileModal = ({
  history,
  showModal,
  handleClose,
  currentUser,
  loading,
  updateProfileAction,
  updateProfileSuccessMessage,
  updateUserInfoAction,
}) => {
  const submitted = useRef(false);
  useEffect(() => {
    if (!updateProfileSuccessMessage || !submitted.current) return;
    NotificationManager.warning(
      updateProfileSuccessMessage,
      'Notice',
      3000,
      null,
      null,
      ''
    );

    updateUserInfoAction();
    handleClose();
    submitted.current = false;
  }, [updateProfileSuccessMessage]);

  const saveChanges = (values) => {
    submitted.current = true;
    if (loading) return;
    updateProfileAction(values, history);
  };
  const initialValues = {
    first_name: currentUser.first_name,
    last_name: currentUser.last_name,
    phone_number: currentUser.phone_number,
    withdrawal_addresss: currentUser.withdrawal_addresss,
  };
  return (
    <Modal isOpen={showModal} toggle={handleClose}>
      <ModalHeader>Edit Profile</ModalHeader>

      <Formik initialValues={initialValues} onSubmit={saveChanges}>
        {({ errors, touched }) => (
          <Form className="av-tooltip tooltip-label-bottom">
            <ModalBody>
              <FormGroup className="form-group has-float-label">
                <Label>First Name</Label>
                <Field className="form-control" name="first_name" required />
                {errors.first_name && touched.first_name && (
                  <div className="invalid-feedback d-block">
                    {errors.first_name}
                  </div>
                )}
              </FormGroup>

              <FormGroup className="form-group has-float-label">
                <Label>Last Name</Label>
                <Field className="form-control" name="last_name" required />
                {errors.last_name && touched.last_name && (
                  <div className="invalid-feedback d-block">
                    {errors.last_name}
                  </div>
                )}
              </FormGroup>

              <FormGroup className="form-group has-float-label">
                <Label>Phone Number</Label>
                <Field className="form-control" name="phone_number" required />
                {errors.phone_number && touched.phone_number && (
                  <div className="invalid-feedback d-block">
                    {errors.phone_number}
                  </div>
                )}
              </FormGroup>

              <FormGroup className="form-group has-float-label">
                <Label>Withdrawal Addresss</Label>
                <Field
                  className="form-control"
                  name="withdrawal_addresss"
                  required
                />
                {errors.withdrawal_addresss && touched.withdrawal_addresss && (
                  <div className="invalid-feedback d-block">
                    {errors.withdrawal_addresss}
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
                <span className="label">Save Changes</span>
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
})(EditProfileModal);
