import { useCallback, useState } from "react";

const AccountStatus = () => {
  const [isLoading, setIsLoading] = useState(false);
  const connectWallet = useCallback(() => {
    try {
      setIsLoading(true);
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setIsLoading(false), 300);
    }
  }, []);

  return isLoading ? (
    <button className="btn btn-ghost loading"></button>
  ) : (
    <button className="btn btn-ghost" onClick={connectWallet}>
      Connect Wallet
    </button>
  );
};

export default AccountStatus;
