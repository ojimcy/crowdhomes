const abi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "userID",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "level",
        "type": "uint256"
      }
    ],
    "name": "NewLevel",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "by",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "NewUpgrade",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "userID",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "fromID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "level",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "description",
        "type": "string"
      }
    ],
    "name": "Payout",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "userID",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "referralID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "PremiumReferralPayout",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Withdrawal",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "startIndex",
        "type": "uint256"
      }
    ],
    "name": "getAccounts",
    "outputs": [
      {
        "internalType": "uint256[20]",
        "name": "",
        "type": "uint256[20]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "getAccountsCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "userID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "level",
        "type": "uint256"
      }
    ],
    "name": "getDirectLegs",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "left",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "leftLevel",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "right",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "rightLevel",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "userID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "level",
        "type": "uint256"
      }
    ],
    "name": "getMatrixPayoutCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "userID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "part",
        "type": "uint256"
      }
    ],
    "name": "getMatrixUpline",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "userID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "callCount",
        "type": "uint256"
      }
    ],
    "name": "getPremiumSponsor",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "userID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "startIndex",
        "type": "uint256"
      }
    ],
    "name": "getReferrals",
    "outputs": [
      {
        "internalType": "uint256[20]",
        "name": "",
        "type": "uint256[20]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getUpgradeFeeInToken",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "userID",
        "type": "uint256"
      }
    ],
    "name": "getUser",
    "outputs": [
      {
        "internalType": "bool",
        "name": "registered",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "referralID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "uplineID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "premiumLevel",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "referralsCount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "userID",
        "type": "uint256"
      }
    ],
    "name": "isAccountIInPremium",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "lastID",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "premiumCounter",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "userID",
        "type": "uint256"
      }
    ],
    "name": "referralCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_referralID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_uplineID",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "register",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "dept",
        "type": "uint256"
      }
    ],
    "name": "setMaxtraversalDept",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "userID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "position",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "random",
        "type": "uint256"
      }
    ],
    "name": "upgradeReplacementAccount",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "userID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "random",
        "type": "uint256"
      }
    ],
    "name": "upgradeToPremium",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "userID",
        "type": "uint256"
      }
    ],
    "name": "userAddresses",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

export default abi
