import React, { useEffect, useState } from "react";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { Card, CardBody, CardHeader, Label, Row } from "reactstrap";
import Breadcrumb from "containers/navs/Breadcrumb";
import MatrixNode from "./Node";
import { useAccount } from "wagmi";
import useBlockchain from "blockchain/useBlockchain";
import { BigNumber } from "ethers";

const Referrals = ({ currentAccount, match }) => {
  const { premiumContract } = useBlockchain();
  const {isConnected} = useAccount()

  const [rootNode, setRootNode] = useState(new MatrixNode());
  const [leftNode, setLeftNode] = useState(new MatrixNode());
  const [rightNode, setRightNode] = useState(new MatrixNode());

  const [accountID, setAccountID] = useState();
  const [level, setLevel] = useState();

  const [user, setUser] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || currentAccount.id;
    if (!isConnected || !id || !premiumContract) return;
    const fn = async () => {
      const params = new URLSearchParams(window.location.search);
      setAccountID(id);
      const user = await premiumContract.getUser(BigNumber.from(id));
      setUser(user);

      const level = params.get("level") || parseInt(user.premiumLevel);
      setLevel(params.get("level") || parseInt(user.premiumLevel));

      // block 1
      const rNode = new MatrixNode();
      rNode.level = parseInt(user.premiumLevel);
      await rNode.load(id, level, 1, premiumContract);
      setRootNode(rNode);

      const left = new MatrixNode();
      await left.load(rNode.left.id, level, 1, premiumContract);
      setLeftNode(left);

      const right = new MatrixNode();
      await right.load(rNode.right.id, level, 1, premiumContract);
      setRightNode(right);
    };
    fn();
  }, [premiumContract, isConnected, currentAccount]);

  function to(id, level) {
    return `?id=${id}&level=${level}`;
  }

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
                                </h5>
                            </div>
                            {rootNode.loaded ?
                            <div className="card-body table-border-style" data-controller="matrix">
                                <div className="container">
                                    <h1 className="level-1 rectangle" data-id="{{.Matrix.ID}}" data-target="matrix.account">
                                    <a href={to(rootNode.id, rootNode.level)} className="text-white">
                                                {rootNode.id}
                                                <span>({parseInt(user.premiumLevel)})</span>{' '}
                                            </a>
                                    </h1>
                                    <ol className="level-2-wrapper">
                                        <li>
                                            <h2 className="level-2 rectangle" data-target="matrix.account" data-id="{{.Matrix.Left.ID}}">
                                            {rootNode.left.id === 0 ? (
                                                            <span className="text-white">Empty</span>
                                                        ) :
                                                <a href={to(rootNode.left.id, level)} className="text-white">
                                                    {rootNode.left.id}
                                                    <span>({rootNode.left.level})</span>
                                                </a>
                                            }
                                            </h2>
                                            <ol className="level-3-wrapper">
                                                <li>
                                                    <h2
                                                        className="level-3 rectangle"
                                                        data-target="matrix.account"
                                                        data-id="{{.Matrix.Left.Left.ID}}"
                                                    >
                                                    {leftNode.left.id === 0 ? (
                                                            <span className="text-white">Empty</span>
                                                        ) :
                                                        <a href={to(leftNode.left.id, level)} className="text-white">
                                                            {leftNode.left.id}
                                                            <span>({leftNode.left.level})</span>
                                                        </a>
                                                    }
                                                    </h2>
                                                </li>
                                                <li>
                                                    <h2
                                                        className="level-3 rectangle"
                                                        data-target="matrix.account"
                                                        data-id="{{.Matrix.Left.Right.ID}}"
                                                    >
                                                    {leftNode.right.id === 0 ? (
                                                            <span className="text-white">Empty</span>
                                                        ) :
                                                        <a href={to(leftNode.right.id, level)} className="text-white">
                                                            {leftNode.right.id}
                                                            <span>({leftNode.right.level})</span>
                                                        </a>
                                                    }
                                                    </h2>
                                                </li>
                                            </ol>
                                        </li>
                                        <li>
                                            <h2 className="level-2 rectangle" data-target="matrix.account" data-id="{{.Matrix.Right.ID}}">
                                            {rootNode.right.id === 0 ? (
                                                            <span className="text-white">Empty</span>
                                                        ) :
                                                <a href={to(rootNode.right.id, level)} className="text-white">
                                                    {rootNode.right.id}
                                                    <span>({rootNode.right.level})</span>
                                                </a>
                                            }
                                            </h2>
                                            <ol className="level-3-wrapper">
                                                <li>
                                                    <h3
                                                        className="level-3 rectangle"
                                                        data-target="matrix.account"
                                                        data-id="{{.Matrix.Right.Left.ID}}"
                                                    >
                                                    {rightNode.left.id === 0 ? (
                                                            <span className="text-white">Empty</span>
                                                        ) :
                                                        <a href={to(rightNode.left.id, level)} className="text-white">
                                                            {rightNode.left.id}
                                                            <span>({rightNode.left.level})</span>
                                                        </a>
                                                    }
                                                    </h3>
                                                </li>
                                                <li>
                                                    <h3
                                                        className="level-3 rectangle"
                                                        data-target="matrix.account"
                                                        data-id="{{.Matrix.Right.Right.ID}}"
                                                    >
                                                        {rightNode.right.id === 0 ? (
                                                            <span className="text-white">Empty</span>
                                                        ) : (
                                                            <a href={to(rightNode.right.id, level)} className="text-white">
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
                            </div> : ''  }
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

export default injectIntl(connect(mapStateToProps, {})(Referrals));
