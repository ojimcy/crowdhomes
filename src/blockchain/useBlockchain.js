import premiumAbi from "./abi/premium";
import erc20Abi from "./abi/erc20";
import teamAbi from "./abi/team";
import farmAbi from "./abi/farm";
import defipayPoolAbi from "./abi/defipayPool";
import { dfc, premium, system } from "./contracts";
import { useAccount, useContract, useNetwork, useSigner } from "wagmi";

const useBlockchain = () => {
  const { isConnected } = useAccount();
  const network = useNetwork();
  let correctNetwork = {}
  if (isConnected && network && network.chain) {
    correctNetwork = [56, 97].indexOf(parseInt(network.chain.id)) > -1;
  }
  

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

  const defipayPoolContract = useContract({
    addressOrName: premium,
    contractInterface: defipayPoolAbi,
    signerOrProvider: signerData,
  });

  return {
    correctNetwork,
    premiumContract,
    erc20Contract,
    systemContract,
    teamContract,
    farmContract,
    defipayPoolContract,
  };
};
export default useBlockchain;
