import { useCallback, useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

const AccountStatus = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const setAccountOrEnsDomain = async (account: string, provider) => {
    const ensAddress = await provider.lookupAddress(account);
    ensAddress ? setAccount(ensAddress) : setAccount(account);
  };

  const disconnectWallet = useCallback(() => {
    setAccount(null);
  }, []);

  const connectWallet = useCallback(async () => {
    try {
      setIsLoading(true);
      const web3Modal = new Web3Modal({
        cacheProvider: true,
      });
      const providerInstance = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(providerInstance);
      provider.on("disconnect", disconnectWallet);
      provider.on("accountsChanged", async (accounts: string[]) => {
        await setAccountOrEnsDomain(accounts[0], provider);
      });
      const accounts = await provider.listAccounts();
      await setAccountOrEnsDomain(accounts[0], provider);
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setIsLoading(false), 300);
    }
  }, [disconnectWallet]);

  useEffect(() => {
    const web3Modal = new Web3Modal({
      cacheProvider: true,
    });
    if (web3Modal.cachedProvider) connectWallet();
  }, [connectWallet]);

  return isLoading ? (
    <button className="ml-auto btn btn-ghost loading"></button>
  ) : account ? (
    <div className="ml-auto w-1/2 dropdown dropdown-hover dropdown-end">
      <label>
        <div className="px-4 text-right truncate">{account}</div>
      </label>
      <ul
        className="pt-4 shadow dropdown-content menu bg-base-100 rounded-box"
        tabIndex={0}
      >
        <li>
          <label className="btn btn-ghost" onClick={disconnectWallet}>
            Disconnect
          </label>
        </li>
      </ul>
    </div>
  ) : (
    <button
      className="ml-auto btn btn-ghost"
      onClick={() => void connectWallet()}
    >
      Connect Wallet
    </button>
  );
};

export default AccountStatus;
