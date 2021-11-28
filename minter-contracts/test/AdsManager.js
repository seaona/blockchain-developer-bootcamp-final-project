let BN = web3.utils.BN;
let AdsManager = artifacts.require("AdsManager");
let { catchRevert } = require("./exceptionsHelpers.js");
const { items: AdStruct, isDefined, isPayable, isType } = require("./ast-helper");

contract("AdsManager", function (accounts) {
  const [_owner, alice, bob] = accounts;
  const emptyAddress = "0x0000000000000000000000000000000000000000";

  const price = "1000";
  const excessAmount = "2000";
  const name = "book";

  let instance;

  beforeEach(async () => {
    instance = await AdsManager.new();
  });

  describe("Variables", () => {
    it("should have an owner", async () => {
      assert.equal(typeof instance.owner, 'function', "the contract has no owner");
    });

    it("should have an operational state", async () => {
      assert.equal(typeof instance.operational, 'function', "the contract has no operational");
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

      it("should have an `id`", () => {
        assert(
          isDefined(subjectStruct)("id"), 
          "Struct Ad should have an `id` member"
        );
        assert(
          isType(subjectStruct)("id")("uint32"), 
          "`id` should be of type `uint32`"
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
          isType(subjectStruct)("brand")("string"), 
          "`brand` should be of type `string`"
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
});
