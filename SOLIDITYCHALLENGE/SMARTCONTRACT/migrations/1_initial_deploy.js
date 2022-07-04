const ChallengeSolidity = artifacts.require("ChallengeSolidity");

module.exports = function (deployer) {
  deployer.deploy(ChallengeSolidity);
};
