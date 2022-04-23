const web3 = new Web3("https://kovan.optimism.io");

let ipfs;
let hash_array = []
let accounts = []

const contract_addr = '0xF3C67eB4e405A99Ad17a5A66bc2bBb5A45BB0b6B';

const colours = ["#ffffff","#e4e4e4","#888888","#222222","#ffa7d1","#e50000","#e59500","#a06a42","#e5d900","#94e044","#02be01","#00d3dd","#0083c7","#0000ea","#cf6ee4","#820080"];

const showAccount = document.getElementById('showAccount');

const places = document.querySelectorAll("div.place");

const RGBtoHEX = (color) => {
  return "#" + [...color.match(/\b(\d+)\b/g)]
    .map((digit) => {
      return parseInt(digit)
        .toString(16)
        .padStart(2, '0')
    })
    .join('');
};

document.getElementById('enableEthereumButton').addEventListener("click",async ()=>{
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    showAccount.innerHTML = accounts[0];
});

document.getElementById('submit').addEventListener("click",async ()=>{
    for (let i = 0; i < places.length; i++) {
        var abi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "i",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "j",
        "type": "uint256"
      }
    ],
    "name": "retrieve",
    "outputs": [
      {
        "internalType": "enum Places.Colour",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
        let contract = new web3.eth.Contract(abi, contract_addr);
        contract.methods.retrieve(i % 16,(i - i % 16)/16).call(function(error, result) {
	    let place = document.getElementById(places[i].id);
	    if (RGBtoHEX(place.style.backgroundColor) != colours[result]) {
		 var abi_price = [
  {
    "inputs": [],
    "name": "basePrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }];
		 let contract_price = new web3.eth.Contract(abi_price, contract_addr);
		 contract_price.methods.basePrice().call(function(error, result) {
	             console.log(result);
		     let colour_index = colours.indexOf(RGBtoHEX(place.style.backgroundColor));
                     let tx = ethereum.request({
                       method: 'eth_sendTransaction',
                       params: [
                       {
                       from: accounts[0],
                       to: contract_addr,
                       value: result,
                       data: web3.eth.abi.encodeFunctionCall({
                            name: 'store',
                            type: 'function',
                            inputs: [{
        "internalType": "enum Places.Colour",
        "name": "_colour",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "i",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "j",
        "type": "uint256"
      }]
                },[colour_index,i % 16,(i - i % 16)/16]),
            }
        ]
    });
		});
	    }
        });
    }
})

for (let i = 0; i < places.length; i++) {
    document.getElementById(places[i].id).addEventListener("click",async ()=>{
        let place = document.getElementById(places[i].id);
	let index = 0;
	for (let j = 0; j < colours.length; j++) {
            if (RGBtoHEX(place.style.backgroundColor) == colours[j]) {
                index = j;
		break
            }
	}
        if (index + 1 >= colours.length) {
            index = 0;
        } else {
            index = index + 1;
        }
        place.style.backgroundColor = colours[index];
    })
}

window.onload = async ()=>{
    for (let i = 0; i < places.length; i++) {
	var abi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "i",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "j",
        "type": "uint256"
      }
    ],
    "name": "retrieve",
    "outputs": [
      {
        "internalType": "enum Places.Colour",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
	let contract = new web3.eth.Contract(abi, contract_addr);
	contract.methods.retrieve(i % 16,(i - i % 16)/16).call(function(error, result) {
            document.getElementById(places[i].id).style.backgroundColor = colours[result];
	});
    }
    ethereum.request({
	    method: 'wallet_addEthereumChain',
	    params: [
		    {
			                chainId: '0x45',
            chainName: 'Optimistic Ethereum (Kovan)',
            rpcUrls: ['https://kovan.optimism.io'],
		    },
	    ],
    });
}
