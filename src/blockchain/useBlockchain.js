import premiumAbi from "./abi/premium";
import erc20Abi from "./abi/erc20";
import teamAbi from "./abi/team";
import farmAbi from "./abi/farm";
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
    contractInterface: premiumAbi, //systemAbi,
    signerOrProvider: signerData,
  });

  const erc20Contract = useContract({
    addressOrName: dfc,
    contractInterface: erc20Abi,
    signerOrProvider: signerData,
  });

  const teamContract = useContract({
    addressOrName: premium,
    contractInterface: teamAbi,
    signerOrProvider: signerData,
  });

  const farmContract = useContract({
    addressOrName: premium,
    contractInterface: farmAbi,
    signerOrProvider: signerData,
  });

  return {
    premiumContract,
    erc20Contract,
    systemContract,
    teamContract,
    farmContract,
  };
};
export default useBlockchain;
