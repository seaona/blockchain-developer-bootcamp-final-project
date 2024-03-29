let BN = web3.utils.BN;
let AdsManager = artifacts.require("AdsManager");
let { catchRevert } = require("./exceptionsHelpers.js");
const { items: AdStruct, isDefined, isPayable, isType } = require("./ast-helper");

contract("AdsManager", function (accounts) {
  const [_owner, alice, bob] = accounts;
  const emptyAddress = "0x0000000000000000000000000000000000000000";

  const adId = 0;

  let instance;

  beforeEach(async () => {
    instance = await AdsManager.new();
  });

  describe("Variables", () => {
    it("should have an ads counter", async () => {
      assert.equal(typeof instance.adsCounter, 'function', "the contract has no ads counter");
    });

    it("should have an total area for advertisement available", async () => {
      assert.equal(typeof instance.totalAdAreaAvailable, 'function', "the contract has no totalAdAreaAvailable");
    });

    it("should have an total area already usedfor advertisement", async () => {
      assert.equal(typeof instance.totalAdAreaTaken, 'function', "the contract has no totalAdAreaTaken");
    });

    describe("enum State", () => {
      let enumState;
      before(() => {
        enumState = AdsManager.enums.State;
        assert(
          enumState,
          "The contract should define an Enum called State"
        );
      });

      it("should define `ForSale`", () => {
        assert(
          enumState.hasOwnProperty('ForSale'),
          "The enum does not have a `ForSale` value"
        );
      });

      it("should define `Sold`", () => {
        assert(
          enumState.hasOwnProperty('Sold'),
          "The enum does not have a `Sold` value"
        );
      });
    })

    describe("Ad struct", () => {
      let subjectStruct;

      before(() => {
        subjectStruct = AdStruct(AdsManager);
        assert(
          subjectStruct !== null, 
          "The contract should define an `Ad Struct`"
        );
      });

      it("should have a `state`", () => {
        assert(
          isDefined(subjectStruct)("state"), 
          "Struct Ad should have a `state` member"
        );
        assert(
          isType(subjectStruct)("state")("State"), 
          "`state` should be of type `State`"
        );
      });

      it("should have a `size`", () => {
        assert(
          isDefined(subjectStruct)("size"), 
          "Struct Ad should have a `size` member"
        );
        assert(
          isType(subjectStruct)("size")("Size"), 
          "`size` should be of type `Size`"
        );
      });

      it("should have a `brand`", () => {
        assert(
          isDefined(subjectStruct)("brand"), 
          "Struct Ad should have a `brand` member"
        );
        assert(
          isType(subjectStruct)("brand")("bytes32"), 
          "`brand` should be of type `bytes32`"
        );
      });

      
      it("should have an `owner`", () => {
        assert(
          isDefined(subjectStruct)("owner"), 
          "Struct Item should have a `owner` member"
        );
        assert(
          isType(subjectStruct)("owner")("address"), 
          "`owner` should be of type `address`"
        );
        assert(
          isPayable(subjectStruct)("owner"), 
          "`owner` should be payable"
        );
      });

      it("should have a `price`", () => {
        assert(
          isDefined(subjectStruct)("price"), 
          "Struct Ad should have a `price` member"
        );
        assert(
          isType(subjectStruct)("price")("uint256"), 
          "`price` should be of type `uint256`"
        );
      });
    });
  });

  describe("Use cases", () => {
    // Events Check

    it("should emit a SmallAdAreaAdded event when Small Ad Area is increased", async () => {
      let eventEmitted = false;
      const tx = instance.addSmallAdvertisementSpace({ from: _owner });
      await tx 
      .on('data', function(event){
        eventEmitted = true;
        console.log(event);
      })
      .on('error', console.error);
    });

    it("should emit a MediumAdAreaAdded event when Medium Ad Area is decreased", async () => {
      let eventEmitted = false;
      const tx = instance.addMediumAdvertisementSpace({ from: _owner });
      await tx 
      .on('data', function(event){
        eventEmitted = true;
        console.log(event);
      })
      .on('error', console.error);
    });

    it("should emit a BigAdAreaAdded event when Big Ad Area is decreased", async () => {
      let eventEmitted = false;
      const tx = instance.addBigAdvertisementSpace({ from: _owner });
      await tx 
      .on('data', function(event){
        eventEmitted = true;
        console.log(event);
      })
      .on('error', console.error);
    });


    it("should number of Ads increas by 3 after adding 3 types of Ad Spaces", async () => {
      await instance.addSmallAdvertisementSpace({ from: _owner });
      await instance.addMediumAdvertisementSpace({ from: _owner });
      await instance.addBigAdvertisementSpace({ from: _owner });
      const result = await instance.adsCounter.call();
      assert.equal(3, result.toNumber(), "Number of Ads spaces is incorrect");
    });
    
  });

});
