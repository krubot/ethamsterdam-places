(async () => {
    try {
	const fs = require('fs');
	const Web3 = require('web3');
	const HDWalletProvider = require("@truffle/hdwallet-provider");

	let provider = new HDWalletProvider(
		"0xa253b54a7db693c9cb03dc385a5bd78409188e6528a7c135f4d431d67fc21e66",
		"wss://kovan.infura.io/ws/v3/b0ccde3831824dc09cfc8873ff8c3e0e"
	);

	const artifactsPath = "contracts/build-info/Places.json";
	const constructorArgs = []

	const web3 = new Web3(provider);

  const accounts = await web3.eth.getAccounts();

  console.log(accounts);

	const balance = await web3.eth.getBalance(accounts[0]);

	console.log(balance);

	const metadata = JSON.parse(fs.readFileSync(artifactsPath, 'utf8'));

	let contract = new web3.eth.Contract(metadata.abi);

	contract = contract.deploy({
            data: metadata.evm.bytecode.object,
            arguments: constructorArgs
        })

	const newContractInstance = await contract.send({
            from: accounts[0],
            gas: 1500000,
            gasPrice: '10000000000'
        })

        console.log('Contract deployed at address: ', newContractInstance.options.address)

    } catch (e) {
        console.log(e.message)
    }
})()
