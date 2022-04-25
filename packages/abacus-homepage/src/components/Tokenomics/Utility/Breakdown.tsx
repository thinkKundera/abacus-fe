import { Media } from "abacus-ui"
import React, { FunctionComponent } from "react"
import styled from "styled-components"

const Container = styled.table`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
`

const TBody = styled.tbody`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const Row = styled.tr`
  display: flex;
  flex-direction: column;
  column-gap: 32px;
  row-gap: 16px;

  ${Media.md`
    flex-direction: row;
  `}
`

const RowHead = styled.th`
  width: 100%;
  font-size: 25px;
  font-weight: bold;
  flex: 1 0 auto;
  text-align: left;

  ${Media.md`
    width: 30%;
  `}
`

const RowHeadNumber = styled.span`
  color: ${({ theme }) => theme.colors.utility.green};
`

const RowData = styled.td`
  font-size: 22px;
`

const Breakdown: FunctionComponent = () => (
  <Container>
    <TBody>
      <Row>
        <RowHead>
          <RowHeadNumber>01.</RowHeadNumber>Revenue Share
        </RowHead>
        <RowData>
          90% of all ETH revenue generated by Abacus will be paid to veABC
          holders (in the form of ETH).
        </RowData>
      </Row>
      <Row>
        <RowHead>
          <RowHeadNumber>02.</RowHeadNumber>Gauge control
        </RowHead>
        <RowData>
          The epoch distribution gauge controls the premium size that the
          protocol offers to different NFT collections.
        </RowData>
      </Row>
      <Row>
        <RowHead>
          <RowHeadNumber>03.</RowHeadNumber>Governance
        </RowHead>
        <RowData>
          voting participation in Abacus governance decisions will be limited to
          veABC holders.
        </RowData>
      </Row>
    </TBody>
  </Container>
)

export { Breakdown }