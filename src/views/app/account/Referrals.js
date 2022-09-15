import React, { useState } from "react";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import { Card, CardBody, CardHeader, Table, Row } from "reactstrap";
import Breadcrumb from "containers/navs/Breadcrumb";
import "./profile.css";

const Referrals = () => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.account.referrals" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>

      <Card>
        <CardHeader>
          <p className="h2 mt-3">Referrals</p>
        </CardHeader>
        <CardBody>
          <Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Level</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                </tr>
              </tbody>
            </Table>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

export default Referrals;
