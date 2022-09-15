import { Contract, ethers } from 'ethers';
import { useEffect, useState } from 'react';
import premiumAbi from './abi/premium';
import erc20Abi from './abi/erc20';
import systemAbi from './abi/system';
import { dfc, premium, system } from './contracts';
import { useAccount, useContract, useProvider, useSigner } from 'wagmi';

const useBlockchain = () => {
    const [premiumContract, setPremiumContract] = useState({});
    const [erc20Contract, setERC20Contract] = useState({});
    const [systemContract, setSystemContract] = useState({});

    const provider = useProvider()
    const {isConnected} = useAccount()

    const { data } = useSigner();
    // get the smart contract
   

    useEffect(() => {
        const fn = async () => {
            if(!isConnected) return
             // get the end user
            let c = new Contract(premium, premiumAbi, data);
            setPremiumContract(c);

            c = new Contract(dfc, erc20Abi, data);
            setERC20Contract(c);

            c = new Contract(system, systemAbi, data);
            setSystemContract(c);
        };
        fn();
    }, [
        setPremiumContract,
        setERC20Contract,
        setSystemContract,
        isConnected,
    ]);

    return {
        premiumContract,
        erc20Contract,
        systemContract,
    };
};
export default useBlockchain;
