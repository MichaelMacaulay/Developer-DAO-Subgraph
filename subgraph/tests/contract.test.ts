import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { DelegateChanged } from "../generated/schema"
import { DelegateChanged as DelegateChangedEvent } from "../generated/Contract/Contract"
import { handleDelegateChanged } from "../src/contract"
import { createDelegateChangedEvent } from "./contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let delegator = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let fromDelegate = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let toDelegate = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newDelegateChangedEvent = createDelegateChangedEvent(
      delegator,
      fromDelegate,
      toDelegate
    )
    handleDelegateChanged(newDelegateChangedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("DelegateChanged created and stored", () => {
    assert.entityCount("DelegateChanged", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "DelegateChanged",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "delegator",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "DelegateChanged",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "fromDelegate",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "DelegateChanged",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "toDelegate",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
