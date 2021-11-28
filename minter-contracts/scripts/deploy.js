async function main() {
    const NFTGenerator = await ethers.getContractFactory("NFTGenerator")
  
    // Start deployment, returning a promise that resolves to a contract object
    const NFTGeneratorInstance = await NFTGenerator.deploy()
    console.log("Contract deployed to address:", NFTGeneratorInstance.address)
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
  