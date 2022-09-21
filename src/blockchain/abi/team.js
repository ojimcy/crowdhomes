const abi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "ownerID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "teamID",
        "type": "uint256"
      }
    ],
    "name": "TeamCreated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_ownerID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_breakpoint",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_percentage",
        "type": "uint256"
      }
    ],
    "name": "creatTeam",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "teamInfo",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "ownerID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "membersCount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "unclearedEarnings",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalPayout",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "breakPoint",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "percentage",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
export default abi
