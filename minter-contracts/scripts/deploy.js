async function main() {
    const AdsManager = await ethers.getContractFactory("AdsManager")
  
    // Start deployment, returning a promise that resolves to a contract object
    const AdsManagerInstance = await AdsManager.deploy()
    console.log("Contract deployed to address:", AdsManagerInstance.address)
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
  