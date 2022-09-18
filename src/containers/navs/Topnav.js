import React, { useState } from "react";
import { injectIntl } from "react-intl";

import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import {
  setContainerClassnames,
  clickOnMobileMenu,
  logoutUser,
  changeLocale,
} from "redux/actions";

import { adminRoot } from "constants/defaultValues";

import { MobileMenuIcon, MenuIcon } from "components/svg";

import { useAccount, useDisconnect } from "wagmi";
import ConnectWalletModal from "views/app/account/ConnectWalletModal";
import SwitchAccountModal from "views/app/account/SwitchAccountModal";
import GetStartedModal from "views/app/account/GetStartedModal";

const TopNav = ({
  containerClassnames,
  menuClickCount,
  selectedMenuHasSubItems,
  setContainerClassnamesAction,
  clickOnMobileMenuAction,
  currentAccount,
}) => {
  const [showConnectWalletModal, setShowConnectWalletModal] = useState();
  const [showGetStartedModal, setShowGetStartedModal] = useState(false);
  const [showSwitchAccount, setShowSwitchAccount] = useState(false);
  const { address, isConnected } = useAccount();

  const { disconnect } = useDisconnect();

  const menuButtonClick = (e, _clickCount, _conClassnames) => {
    e.preventDefault();

    setTimeout(() => {
      const event = document.createEvent("HTMLEvents");
      event.initEvent("resize", false, false);
      window.dispatchEvent(event);
    }, 350);
    setContainerClassnamesAction(
      _clickCount + 1,
      _conClassnames,
      selectedMenuHasSubItems
    );
  };

  const mobileMenuButtonClick = (e, _containerClassnames) => {
    e.preventDefault();
    clickOnMobileMenuAction(_containerClassnames);
  };

  return (
    <nav className="navbar fixed-top">
      <div className="d-flex align-items-center navbar-left">
        <NavLink
          to="#"
          location={{}}
          className="menu-button d-none d-md-block"
          onClick={(e) =>
            menuButtonClick(e, menuClickCount, containerClassnames)
          }
        >
          <MenuIcon />
        </NavLink>
        <NavLink
          to="#"
          location={{}}
          className="menu-button-mobile d-xs-block d-sm-block d-md-none"
          onClick={(e) => mobileMenuButtonClick(e, containerClassnames)}
        >
          <MobileMenuIcon />
        </NavLink>
      </div>
      <NavLink className="navbar-logo" to={adminRoot}>
        <span>
          <img
            alt="Deficonnect"
            src="/assets/logos/deficonnect.png"
            className="logo-img"
          />
        </span>
      </NavLink>

      <div className="navbar-right">
        <div className="user d-inline-block">
          <UncontrolledDropdown className="dropdown-menu-right">
            <DropdownToggle className="p-0" color="empty">
              <span className="name mr-1">
                {isConnected ? (
                  <>
                    Connected to: {address.substring(0, 5)}...{address.substring(address.length-4, address.length-1)}
                    {currentAccount && currentAccount.registered ? (
                      <>{" | "}Account ID: {currentAccount.id}</>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  "Connect Wallet"
                )}
              </span>
            </DropdownToggle>
            <DropdownMenu className="mt-3" right>
              {isConnected ? (
                <>
                  <DropdownItem onClick={() => setShowSwitchAccount(true)}>
                    Switch Account
                  </DropdownItem>
                  <SwitchAccountModal
                    showModal={showSwitchAccount}
                    handleClose={() => {
                      setShowSwitchAccount(false);
                    }}
                  />

                  <DropdownItem onClick={() => setShowGetStartedModal(true)}>
                    Add Account
                  </DropdownItem>
                  <GetStartedModal title={'Add Account'}
                    showModal={showGetStartedModal}
                    handleClose={() => setShowGetStartedModal(false)}
                  />

                  <DropdownItem divider />
                  <DropdownItem onClick={() => disconnect()}>
                    Disconnect
                  </DropdownItem>
                </>
              ) : (
                <>
                  <ConnectWalletModal
                    showModal={showConnectWalletModal}
                    handleClose={() => setShowConnectWalletModal(false)}
                  />
                  <DropdownItem
                    onClick={() => {
                      setShowConnectWalletModal(true);
                    }}
                  >
                    Connect Wallet
                  </DropdownItem>
                </>
              )}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ menu, settings, authUser }) => {
  const { containerClassnames, menuClickCount, selectedMenuHasSubItems } = menu;
  const { locale } = settings;
  const { currentAccount } = authUser;
  return {
    containerClassnames,
    menuClickCount,
    selectedMenuHasSubItems,
    locale,
    currentAccount,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    setContainerClassnamesAction: setContainerClassnames,
    clickOnMobileMenuAction: clickOnMobileMenu,
    logoutUserAction: logoutUser,
    changeLocaleAction: changeLocale,
  })(TopNav)
);
