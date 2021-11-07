import React, {
  FunctionComponent,
  useState,
  useEffect,
} from "react"
import Button from "@components/Button"
import {
  HorizontalListGroup
} from "@components/ListGroupMods"
import { ListGroupItem } from "shards-react"
import {
  VerticalContainer,
} from "../CurrentSession/CurrentSession.styles"
import { InputWithTitle } from "@components/Input"
import { useOnClaimPayout } from "@hooks/claim-pool"
import {useSetPayoutData, useClaimPayoutData} from '@state/miscData/hooks'
import _ from "lodash"
import { useActiveWeb3React } from "@hooks/index"
import { SmallUniversalContainer } from "@components/global.styles"
import ConnectWalletAlert from "@components/ConnectWalletAlert"
import { useWeb3Contract } from "@hooks/index"
import styled from 'styled-components'
import { Title } from "@components/global.styles"

const MaxWidthItem = styled(ListGroupItem)`
  width: 100%;
`

const ClaimPool: FunctionComponent = () => {
  const { account } = useActiveWeb3React()
  const [ethWithdrawalVal, setEthWithdrawalVal] = useState('')
  const [abcWithdrawalVal, setAbcWithdrawalVal] = useState('')
  const [isEthButtonTrigger, setIsEthButtonTrigger] = useState(true)
  const [isLoading, setLoading] = useState(false)
  const claimData = useClaimPayoutData()
  const setPayoutData = useSetPayoutData()

  const { onClaim, isPending } = useOnClaimPayout()

  const isEthPending = isPending && isEthButtonTrigger
  const isAbcPending = isPending && !isEthButtonTrigger

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      await setPayoutData(account)
      setLoading(false)
    }
    if (account !== null && account !== undefined && claimData === null) {
      loadData()
    }
  }, [account])

  if (!account) {
    return (
      <SmallUniversalContainer
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <ConnectWalletAlert />
      </SmallUniversalContainer>
    )
  }

  if (isLoading || claimData === null) {
    return (
      <SmallUniversalContainer
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        Loading... {/* TODO: find a loader */}
      </SmallUniversalContainer>
    )
  }

  return (
    <SmallUniversalContainer style={{ alignItems: "center" }}>
      <VerticalContainer style={{ maxWidth: 800 }}>
        <Title>Claim Rewards</Title>
        <HorizontalListGroup>
          <MaxWidthItem>
            <InputWithTitle
              title={"ETH Payout"}
              id={"ethPayout"}
              placeholder="0"
              value={claimData.ethPayout}
              disabled
            />
          </MaxWidthItem>
          <MaxWidthItem>
            <InputWithTitle
              title={"ABC Payout"}
              id={"abcPayout"}
              placeholder="0"
              value={claimData.abcPayout}
              disabled
            />
          </MaxWidthItem>
        </HorizontalListGroup>
        <HorizontalListGroup>
          <MaxWidthItem>
            <InputWithTitle
              title={"ETH Withdrawal Amount"}
              id={"ethWithdrawal"}
              placeholder="0"
              value={ethWithdrawalVal}
              onChange={(e) => setEthWithdrawalVal(e.target.value)}
            />
          </MaxWidthItem>
          <MaxWidthItem>
            <InputWithTitle
              title={"ABC Withdrawal Amount"}
              id={"abcWithdrawal"}
              placeholder="0"
              value={abcWithdrawalVal}
              onChange={(e) => setAbcWithdrawalVal(e.target.value)}
            />
          </MaxWidthItem>
        </HorizontalListGroup>
        <VerticalContainer style={{ marginTop: 35, alignItems: "center" }}>
          <HorizontalListGroup>
            <div
              style={{ padding: "0 8px", width: "100%" }}
              id={"claimEthButton"}
            >
              <Button
                disabled={isEthPending || ethWithdrawalVal === '' || isNaN(Number(ethWithdrawalVal))}
                style={{ width: "100%" }}
                type="button"
                onClick={() => {
                  onClaim(true, ethWithdrawalVal)
                  setIsEthButtonTrigger(true)
                }}
              >
                {isEthPending ? "Pending..." : "Claim ETH"}
              </Button>
            </div>
            <div
              style={{ padding: "0 8px", width: "100%" }}
              id={"claimAbcButton"}
            >
              <Button
                disabled={isAbcPending || abcWithdrawalVal === '' || isNaN(Number(abcWithdrawalVal))}
                style={{ width: "100%" }}
                type="button"
                onClick={() => {
                  onClaim(false, abcWithdrawalVal)
                  setIsEthButtonTrigger(false)
                }}
              >
                {isAbcPending ? "Pending..." : "Claim ABC"}
              </Button>
            </div>
          </HorizontalListGroup>
        </VerticalContainer>
      </VerticalContainer>
    </SmallUniversalContainer>
  )
}

export default ClaimPool