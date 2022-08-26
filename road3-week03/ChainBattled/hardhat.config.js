require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
const CryptoJS = require("crypto-js")
// const data = fs.readFileSync("./key.json").toString()
const pwd = process.env.ABCDE
const encrypted = process.env.EFGHI
var bytes = CryptoJS.AES.decrypt(encrypted, pwd);
const PRIVATE_KEY = bytes.toString(CryptoJS.enc.Utf8)

module.exports = {
  solidity: "0.8.10",
  networks: {
    mumbai: {
      url: process.env.TESTNET_RPC,
      accounts: [PRIVATE_KEY]
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  }
};