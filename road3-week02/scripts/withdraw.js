// scripts/withdraw.js

const hre = require("hardhat");
const abi = require("../artifacts/contracts/BuyMeACoffee.sol/BuyMeACoffee.json");

const CryptoJS = require("crypto-js")
const pwd = process.env.ABCDE
const encrypted = process.env.EFGHI
var bytes = CryptoJS.AES.decrypt(encrypted, pwd);
const decrypted = bytes.toString(CryptoJS.enc.Utf8)

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const GOERLI_API_KEY = "qzPSnUKOmdYwIa-5-yA80f_uq4Z6PcYE";
const PRIVATE_KEY = decrypted;

async function getBalance(provider, address) {
	const balanceBigInt = await provider.getBalance(address);
	return hre.ethers.utils.formatEther(balanceBigInt);
}

async function main() {
	// Get the contract that has been deployed to Goerli.
	const contractAddress = "0x566d7890a7639b909fa069fa22bdf42732913978";
	const contractABI = abi.abi;

	// Get the node connection and wallet connection.
	const provider = new hre.ethers.providers.AlchemyProvider("goerli", GOERLI_API_KEY);

	// Ensure that signer is the SAME address as the original contract deployer,
	// or else this script will fail with an error.
	const signer = new hre.ethers.Wallet(PRIVATE_KEY, provider);

	// Instantiate connected contract.
	const buyMeACoffee = new hre.ethers.Contract(contractAddress, contractABI, signer);

	// Check starting balances.
	console.log("current balance of owner: ", await getBalance(provider, signer.address), "ETH");
	const contractBalance = await getBalance(provider, buyMeACoffee.address);
	console.log("current balance of contract: ", await getBalance(provider, buyMeACoffee.address), "ETH");

	// Withdraw funds if there are funds to withdraw.
	if (contractBalance !== "0.0") {
		console.log("withdrawing funds..")
		const withdrawTxn = await buyMeACoffee.withdrawTips();
		await withdrawTxn.wait();
	} else {
		console.log("no funds to withdraw!");
	}

	// Check ending balance.
	console.log("current balance of owner: ", await getBalance(provider, signer.address), "ETH");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});