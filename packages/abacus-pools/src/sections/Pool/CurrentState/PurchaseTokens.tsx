import { useOnPurchaseTokens } from "@hooks/vaultFunc"
import { useEthToUSD } from "@state/application/hooks"
import { useGetPoolData, useTickets } from "@state/singlePoolData/hooks"
import {
  Button,
  Checkbox,
  Exa,
  Flex,
  Font,
  Input,
  Kilo,
  ProgressBar,
  ButtonType,
} from "abacus-ui"
import { Link } from "gatsby"
import React, { FunctionComponent, useMemo, useState } from "react"
import styled from "styled-components"

const UpperContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  grid-row-gap: 16px;
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`

const Title = styled(Exa)`
  justify-self: flex-start;
  width: max-content;
  font-family: "Bluu next";
  line-height: 46px;
  flex-grow: 1;
`

const CurrentTicket = styled(Kilo)`
  display: flex;
  gap: 4px;
  width: max-content;
  justify-content: flex-end;
  color: ${({ theme }) => theme.colors.core.primary};
`

const CurrentTicketValue = styled(Kilo)`
  color: ${({ theme }) => theme.colors.core.primary}60;
`

const ProgressLabel = styled.span`
  display: flex;
  color: ${({ theme }) => theme.colors.core["900"]};
`

const ProgressValue = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.core.primary};
`

const LockRadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 16px;
`

const LockRadioLabel = styled.label`
  ${Font("kilo")}
  font-size: 20px;
`

const LockRadioGroup = styled(Flex)`
  flex-wrap: wrap;
`

const CustomDurationButton = styled(Button)`
  display: block;
  border: 2px solid rgba(28, 35, 51, 0.04);
  border-radius: 70px;
  padding: 8px 14px;
  text-align: center;
  margin-right: 6px;
  margin-bottom: 12px;
`

const ConfirmButton = styled(Button)`
  width: 100%;
  padding: 22px;
  border-radius: 80px;
`

type PurchaseTokensProps = {
  refreshPoolData: () => void
}

const PurchaseTokens: FunctionComponent<PurchaseTokensProps> = ({
  refreshPoolData,
}) => {
  const [eth, setEth] = useState("")
  const [lockDuration, setLockDuration] = useState<number>(null)
  const [, setIsCustomDuration] = useState(false)
  const ethUSD = useEthToUSD(Number(eth))
  const { tokenPrice, nftName } = useGetPoolData()
  const { onPurchaseTokens, isPending } = useOnPurchaseTokens()
  const tickets = useTickets()
  const numTickets = tickets?.length ?? 0
  const percentTicketsSold = numTickets / 3000
  const numTokens = String(Number(eth) / Number(tokenPrice))

  const progressLabel = useMemo(() => {
    const percentForDislplay = Math.round(percentTicketsSold * 100)
    const numLeft = 3000 - numTickets
    return (
      <ProgressLabel>
        <ProgressValue>{percentForDislplay}</ProgressValue>% filled /&nbsp;
        <ProgressValue>{numLeft}</ProgressValue>&nbsp;tokens left
      </ProgressLabel>
    )
  }, [numTickets, percentTicketsSold])

  const purchaseTokens = async () => {
    const endDate = new Date().setDate(new Date().getDate() + lockDuration)
    const now = +new Date()
    const duration = (endDate - now) / 1000

    await onPurchaseTokens(numTokens, duration, async () => {
      // await getBalance()
      await refreshPoolData()
      setEth("")
    })
  }

  const confirmDisabled = !eth || !lockDuration || isPending

  return (
    <>
      <UpperContainer>
        <TitleContainer>
          <CurrentTicket>
            Current Ticket:
            <CurrentTicketValue>#{numTickets + 1}</CurrentTicketValue>
          </CurrentTicket>
          <Title>Purchase Tokens</Title>
        </TitleContainer>
        <ProgressBar progress={percentTicketsSold} label={progressLabel} />
      </UpperContainer>
      <Input
        type="number"
        name="from_eth"
        value={eth}
        onChange={setEth}
        label="From:"
        placeholder="0.00"
        pill="ETH"
      />
      <Input
        disabled
        type="number"
        name="to_eth"
        value={numTokens}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onChange={() => {}}
        label="To:"
        placeholder="0.00"
        pill={nftName}
        hint={`$${ethUSD}`}
      />
      <LockRadioContainer>
        <Flex
          style={{
            justifyContent: "space-between",
            flexWrap: "wrap",
            columnGap: "8px",
            rowGap: "16px",
          }}
        >
          <LockRadioLabel htmlFor="lock_duration">
            How long do you want to lock your deposit?
          </LockRadioLabel>
          <Link to="/learn-more">{"Learn More >"}</Link>
        </Flex>
        <LockRadioGroup>
          <Checkbox
            type="radio"
            name="lock_duration"
            label="7 Days"
            id="7_day_duration"
            value="7"
            checked={lockDuration === 7}
            onChange={() => setLockDuration(7)}
          />
          <Checkbox
            type="radio"
            name="lock_duration"
            label="14 Days"
            id="14_day_duration"
            value="14"
            checked={lockDuration === 14}
            onChange={() => setLockDuration(14)}
          />
          <Checkbox
            type="radio"
            name="lock_duration"
            label="21 Days"
            id="21_day_duration"
            value="21"
            checked={lockDuration === 21}
            onChange={() => setLockDuration(21)}
          />
          <Checkbox
            type="radio"
            name="lock_duration"
            label="30 Days"
            id="30_day_duration"
            value="30"
            checked={lockDuration === 30}
            onChange={() => setLockDuration(30)}
          />
          <CustomDurationButton
            buttonType={ButtonType.Clear}
            onClick={() => setIsCustomDuration(true)}
          >
            Custom
          </CustomDurationButton>
        </LockRadioGroup>
      </LockRadioContainer>
      <ConfirmButton disabled={confirmDisabled} onClick={purchaseTokens}>
        {isPending ? "Pending..." : "Confirm Purchase"}
      </ConfirmButton>
    </>
  )
}

export default PurchaseTokens