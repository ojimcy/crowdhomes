import React, { useState, useEffect } from 'react';
import { Row, Card, CardTitle, FormGroup, Label, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from 'redux/actions';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import { Formik, Form, Field } from 'formik';
import { NotificationManager } from 'components/common/react-notifications';

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your email address';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};

const Register = ({ history, loading, error, registerUserAction }) => {
  const [email] = useState('');
  const [username] = useState('');
  const [password] = useState('');
  const [firstName] = useState('');
  const [lastName] = useState('');
  const [phoneNumber] = useState('');
  const [referralId] = useState(''); // TODO: fetch from the url

  useEffect(() => {
    if (error) {
      NotificationManager.warning(
        error,
        'Registration Error',
        3000,
        null,
        null,
        ''
      );
    }
  }, [error]);

  const onUserRegister = (values) => {
    if (!loading) {
      registerUserAction(values, history);
    }
  };

  const initialValues = {
    email,
    username,
    password,
    firstName,
    lastName,
    phoneNumber,
    referralId,
  };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">WELCOME TO YOUR FINANCIAL FREEDOM</p>
            <p className="white mb-0">
              Please use this form to register. <br />
              If you are a member, please{' '}
              <NavLink to="/user/login" className="white">
                login
              </NavLink>
              .
            </p>
          </div>
          <div className="form-side">
            <NavLink to="/" className="white">
              <span className="logo-single" />
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="user.register" />
            </CardTitle>

            <Formik initialValues={initialValues} onSubmit={onUserRegister}>
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label  mb-4">
                    <Label>Referral ID</Label>
                    <Field className="form-control" name="referralId" />
                    {errors.referralId && touched.referralId && (
                      <div className="invalid-feedback d-block">
                        {errors.referralId}
                      </div>
                    )}
                  </FormGroup>

                  <FormGroup className="form-group has-float-label  mb-4">
                    <Label>First Name</Label>
                    <Field className="form-control" name="firstName" />
                    {errors.firstName && touched.firstName && (
                      <div className="invalid-feedback d-block">
                        {errors.firstName}
                      </div>
                    )}
                  </FormGroup>

                  <FormGroup className="form-group has-float-label  mb-4">
                    <Label>Last Name</Label>
                    <Field className="form-control" name="lastName" />
                    {errors.lastName && touched.lastName && (
                      <div className="invalid-feedback d-block">
                        {errors.lastName}
                      </div>
                    )}
                  </FormGroup>

                  <FormGroup className="form-group has-float-label  mb-4">
                    <Label>Phone Number</Label>
                    <Field className="form-control" name="phoneNumber" />
                  </FormGroup>

                  <FormGroup className="form-group has-float-label  mb-4">
                    <Label>
                      <IntlMessages id="user.email" />
                    </Label>
                    <Field
                      className="form-control"
                      name="email"
                      type="email"
                      validate={validateEmail}
                    />
                  </FormGroup>

                  <FormGroup className="form-group has-float-label  mb-4">
                    <Label>Username</Label>
                    <Field className="form-control" name="username" />
                  </FormGroup>

                  <FormGroup className="form-group has-float-label  mb-4">
                    <Label>
                      <IntlMessages
                        id="user.password"
                        defaultValue={password}
                      />
                    </Label>
                    <Field
                      className="form-control"
                      name="password"
                      type="password"
                    />
                  </FormGroup>

                  <div className="d-flex justify-content-end align-items-center">
                    <Button
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
                      <span className="label">
                        <IntlMessages id="user.register-button" />
                      </span>
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { loading, error } = authUser;
  return { loading, error };
};

export default connect(mapStateToProps, {
  registerUserAction: registerUser,
})(Register);
