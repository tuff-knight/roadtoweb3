require("@nomicfoundation/hardhat-toolbox");


require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");

const CryptoJS = require("crypto-js")
// const data = fs.readFileSync("./key.json").toString()
const pwd = process.env.ABCDE
const encrypted = process.env.EFGHI
var bytes = CryptoJS.AES.decrypt(encrypted, pwd);
const decrypted = bytes.toString(CryptoJS.enc.Utf8)
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const GOERLI_URL = "https://eth-goerli.g.alchemy.com/v2/qzPSnUKOmdYwIa-5-yA80f_uq4Z6PcYE";
const PRIVATE_KEY = decrypted;


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: GOERLI_URL,
      accounts: [PRIVATE_KEY]
    }
  }
};
