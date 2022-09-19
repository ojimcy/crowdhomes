import React, { useEffect, useState } from "react";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { Row } from "reactstrap";
import Breadcrumb from "containers/navs/Breadcrumb";
import MatrixNode from "./Node";
import { useAccount } from "wagmi";
import useBlockchain from "blockchain/useBlockchain";
import { BigNumber } from "ethers";
import "./matrix.scss";

const Matrix = ({ currentAccount, match }) => {
  const { premiumContract } = useBlockchain();
  const { isConnected } = useAccount();

  const [id, setId] = useState(currentAccount.id);
  const [level, setLevel] = useState(currentAccount.premiumLevel);
  const [rootNode, setRootNode] = useState(new MatrixNode());
  const [leftNode, setLeftNode] = useState(new MatrixNode());
  const [rightNode, setRightNode] = useState(new MatrixNode());

  const [user, setUser] = useState({});

  useEffect(() => {
    if (!isConnected || !id || !premiumContract) return;
    const fn = async () => {
      const id_ = id || currentAccount.id;
      const level_ = level || currentAccount.level;
      const user = await premiumContract.getUser(BigNumber.from(id_));
      setUser(user);

      // block 1
      const rNode = new MatrixNode();
      rNode.level = parseInt(user.premiumLevel);
      await rNode.load(id, level_, 1, premiumContract);
      setRootNode(rNode);

      const left = new MatrixNode();
      await left.load(rNode.left.id, level_, 1, premiumContract);
      setLeftNode(left);

      const right = new MatrixNode();
      await right.load(rNode.right.id, level_, 1, premiumContract);
      setRightNode(right);
    };
    fn();
  }, [premiumContract, isConnected, id, level]);

  const to = (id, level) => {
    setId(id);
    setLevel(level);
  };

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.army.matrix" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>

      <Row>
        <Colxx md={12}>
          <div className="card matrix">
            <div className="card-header">
              <h5>
                Matrix
                {level === "1" ? (
                  <small>
                    <a
                      onClick={() => {
                        setLevel(user.premiumLevel);
                      }}
                      href="#"
                    >
                      {" "}
                      Current Level
                    </a>
                  </small>
                ) : (
                  <small>
                    <a
                      href="#"
                      onClick={() => {
                        setLevel(1);
                      }}
                    >
                      {" "}
                      Base Matrix
                    </a>
                  </small>
                )}
              </h5>
            </div>
            {rootNode.loaded ? (
              <div className="card-body table-border-style tree">
                <div className="container">
                  <h1
                    className="level-1 rectangle"
                  >
                    <a
                      href="#"
                      onClick={() => to(rootNode.id, rootNode.level)}
                      className="text-white"
                    >
                      {rootNode.id}
                      <span>({parseInt(user.premiumLevel)})</span>{" "}
                    </a>
                  </h1>
                  <ol className="level-2-wrapper">
                    <li>
                      <h2
                        className="level-2 rectangle">
                        {rootNode.left.id === 0 ? (
                          <span className="text-white">Empty</span>
                        ) : (
                          <a
                            href="#"
                            onClick={() => to(rootNode.left.id, level)}
                            className="text-white"
                          >
                            {rootNode.left.id}
                            <span>({rootNode.left.level})</span>
                          </a>
                        )}
                      </h2>
                      <ol className="level-3-wrapper">
                        <li>
                          <h2
                            className="level-3 rectangle">
                            {leftNode.left.id === 0 ? (
                              <span className="text-white">Empty</span>
                            ) : (
                              <a
                                href="#"
                                onClick={() => to(leftNode.left.id, level)}
                                className="text-white"
                              >
                                {leftNode.left.id}
                                <span>({leftNode.left.level})</span>
                              </a>
                            )}
                          </h2>
                        </li>
                        <li>
                          <h2
                            className="level-3 rectangle">
                            {leftNode.right.id === 0 ? (
                              <span className="text-white">Empty</span>
                            ) : (
                              <a
                                href="#"
                                onClick={() => to(leftNode.right.id, level)}
                                className="text-white"
                              >
                                {leftNode.right.id}
                                <span>({leftNode.right.level})</span>
                              </a>
                            )}
                          </h2>
                        </li>
                      </ol>
                    </li>
                    <li>
                      <h2
                        className="level-2 rectangle">
                        {rootNode.right.id === 0 ? (
                          <span className="text-white">Empty</span>
                        ) : (
                          <a
                            href="#"
                            onClick={() => to(rootNode.right.id, level)}
                            className="text-white"
                          >
                            {rootNode.right.id}
                            <span>({rootNode.right.level})</span>
                          </a>
                        )}
                      </h2>
                      <ol className="level-3-wrapper">
                        <li>
                          <h3
                            className="level-3 rectangle">
                            {rightNode.left.id === 0 ? (
                              <span className="text-white">Empty</span>
                            ) : (
                              <a
                                href="#"
                                onClick={() => to(rightNode.left.id, level)}
                                className="text-white"
                              >
                                {rightNode.left.id}
                                <span>({rightNode.left.level})</span>
                              </a>
                            )}
                          </h3>
                        </li>
                        <li>
                          <h3
                            className="level-3 rectangle">
                            {rightNode.right.id === 0 ? (
                              <span className="text-white">Empty</span>
                            ) : (
                              <a
                                href="#"
                                onClick={() => to(rightNode.right.id, level)}
                                className="text-white"
                              >
                                {rightNode.right.id}
                                <span>({rightNode.right.level})</span>
                              </a>
                            )}
                          </h3>
                        </li>
                      </ol>
                    </li>
                  </ol>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </Colxx>
      </Row>
    </>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { currentAccount } = authUser;

  return {
    currentAccount,
  };
};

export default injectIntl(connect(mapStateToProps, {})(Matrix));
