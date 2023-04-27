import React from "react";
import { ethers } from "ethers";

const Button = ({ account, setAccount }) => {
  const connectHandler = async () => {
    const accounts = await window.ethereum.request({
      method: `eth_requestAccounts`,
    });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);
  };
  return (
    <>
      {account ? (
        <button type="button" className="nav__connect">
          {account.slice(0, 6) + "..." + account.slice(38, 42)}
        </button>
      ) : (
        <button type="button" className="nav__connect" onClick={connectHandler}>
          Connect
        </button>
      )}
    </>
  );
};

export default Button;