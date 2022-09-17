import premiumAbi from "./abi/premium";
import erc20Abi from "./abi/erc20";
import systemAbi from "./abi/system";
import { dfc, premium, system } from "./contracts";
import { useContract, useSigner } from "wagmi";

const useBlockchain = () => {
  const { data: signerData } = useSigner();
  const premiumContract = useContract({
    addressOrName: premium,
    contractInterface: premiumAbi,
    signerOrProvider: signerData,
  });

  const systemContract = useContract({
    addressOrName: system,
    contractInterface: systemAbi,
    signerOrProvider: signerData,
  });

  const erc20Contract = useContract({
    addressOrName: dfc,
    contractInterface: erc20Abi,
    signerOrProvider: signerData,
  });

  return {
    premiumContract,
    erc20Contract,
    systemContract,
  };
};
export default useBlockchain;
