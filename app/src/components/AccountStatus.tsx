import { useCallback, useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

const AccountStatus = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const connectWallet = useCallback(async () => {
    try {
      setIsLoading(true);
      const web3Modal = new Web3Modal();
      const instance = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(instance);
      const accounts = await provider.send("eth_accounts", []);
      const fetchedAccount = accounts[0];
      setAccount(fetchedAccount);
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setIsLoading(false), 300);
    }
  }, []);

  return isLoading ? (
    <button className="btn btn-ghost loading"></button>
  ) : account ? (
    <div className="font-bold">{account}</div>
  ) : (
    <button className="btn btn-ghost" onClick={() => void connectWallet()}>
      Connect Wallet
    </button>
  );
};

export default AccountStatus;
