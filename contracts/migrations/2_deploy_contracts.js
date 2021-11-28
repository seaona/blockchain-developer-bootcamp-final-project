const AdsManager = artifacts.require("./AdsManager");

module.exports = function(deployer) {
  deployer.deploy(AdsManager);
};
