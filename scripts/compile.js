const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve('contracts', 'eth_place.sol');

const source = fs.readFileSync(inboxPath, 'utf8');

let input = {
  language: "Solidity",
  sources: {
    [inboxPath]: {
      content: source,
    },
  },

  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));

if (!fs.existsSync("contracts/build-info")) {
  console.log("Make build-info directory");
  fs.mkdir("contracts/build-info",function(err) {
    if(err) console.log(err)
  });
}

for (var contractName in output.contracts[inboxPath]) {
  console.log("Solidity compile contract: " + contractName);
  fs.writeFile("./contracts/build-info/" + contractName + ".json",JSON.stringify(output.contracts[inboxPath][contractName]), function(err) {
    if(err) console.log(err)
  });
}
