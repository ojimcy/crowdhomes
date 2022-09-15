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
import { NotificationManager } from 'components/common/react-notifications';

const SwitchAccountModal = ({
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

  const login = (values) => {
    console.log(values)
  };
  const initialValues = {
    accountID: 1,
  };
  return (
    <Modal isOpen={showModal} toggle={handleClose}>
      <ModalHeader>Get Started</ModalHeader>

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
                  loading ? 'show-spinner' : ''
                }`}
                size="lg"
              >
                <span className="spinner d-inline-block">
                  <span className="bounce1" />
                  <span className="bounce2" />
                  <span className="bounce3" />
                </span>
                <span className="label">Login</span>
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

export default SwitchAccountModal
