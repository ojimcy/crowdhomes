import { Colxx } from "components/common/CustomBootstrap";
import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
} from "reactstrap";

import { useConnect } from "wagmi";

const ConnectWalletModal = ({ showModal, handleClose }) => {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  return (
    <Modal isOpen={showModal} toggle={handleClose}>
      <ModalHeader>Connect Wallet</ModalHeader>

      <ModalBody>
        <Row>
          {connectors.map((connector) => (
            <Colxx md="12" key={connector.id}>
              <Button
                className="m-2 btn-block"
                disabled={!connector.ready}
                onClick={() => connect({ connector })}
              >
                {connector.name === "Injected"
                  ? "TrustWallet/Injected"
                  : connector.name}
                {!connector.ready && " (unsupported)"}
                {isLoading &&
                  connector.id === pendingConnector?.id &&
                  " (connecting)"}
              </Button>
            </Colxx>
          ))}

          {error && <div>{error.message}</div>}
        </Row>
      </ModalBody>

      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConnectWalletModal;
