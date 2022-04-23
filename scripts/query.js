(async () => {
    try {
	const fs = require('fs');
	const Web3 = require('web3');
	const HDWalletProvider = require("@truffle/hdwallet-provider");

	let provider = new HDWalletProvider(
		"0xa253b54a7db693c9cb03dc385a5bd78409188e6528a7c135f4d431d67fc21e66",
		"https://kovan.infura.io/v3/b0ccde3831824dc09cfc8873ff8c3e0e"
	);

	const artifactsPath = "contracts/build-info/Places.json";
	const constructorArgs = [] 

	const web3 = new Web3(provider);
        
	const metadata = JSON.parse(fs.readFileSync(artifactsPath, 'utf8'));

	let contract = new web3.eth.Contract(metadata.abi, "0x5D135C5E01A189524548d1A956847Cf192966Ab1");
	for (let i = 0; i < 255; i++) {
		contract.methods.retrieve(i % 16,(i - i % 16)/16).call(function(error, result) {
			console.log(result);
		});
    	};
	
	return
    } catch (e) {
        console.log(e.message)
    }
})()

