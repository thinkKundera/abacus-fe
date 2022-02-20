import React, { FunctionComponent, useState } from "react"
import { Checkbox, Accordion, H2 } from "abacus-ui"
import styled from "styled-components"
import { SessionState } from "@state/sessionData/reducer"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`

const HR = styled.hr`
  margin: 18px 0px;
  margin-top: 6px;
  width: 100%;
  border-color: ${({ theme }) => theme.colors.core.border};
`

const statuses = [
  {
    label: "Vote",
    state: SessionState.Vote,
  },
  {
    label: "Weigh",
    state: SessionState.Weigh,
  },
  {
    label: "Set Final",
    state: SessionState.SetFinalAppraisal,
  },
  {
    label: "Harvest",
    state: SessionState.Harvest,
  },
  {
    label: "Claim",
    state: SessionState.Claim,
  },
  {
    label: "Complete",
    state: SessionState.Complete,
  },
]

type Order = "lth" | "htl" | null

type Range = "low_range" | "mid_range" | "high_range"

const ExploreFilters: FunctionComponent = () => {
  const [sessionStatuses, setSessionStatuses] = useState(new Set<number>())
  const [sortOrder, setSortOrder] = useState<Order>(null)
  const [ranges, setRanges] = useState(new Set<Range>())

  const toggleSessionState = (state: SessionState) => () =>
    setSessionStatuses((statuses) => {
      if (statuses.has(state)) {
        statuses.delete(state)
      } else {
        statuses.add(state)
      }
      return new Set(statuses)
    })

  const toggleRange = (state: Range) => () =>
    setRanges((ranges) => {
      if (ranges.has(state)) {
        ranges.delete(state)
      } else {
        ranges.add(state)
      }
      return new Set(ranges)
    })

  return (
    <Container>
      <H2 style={{ marginBottom: 8 }}>Explore</H2>
      <Accordion title="Status">
        {statuses.map((item) => (
          <Checkbox
            key={item.label}
            name={item.label}
            label={item.label}
            id={item.label}
            value={item.label}
            checked={sessionStatuses.has(item.state)}
            onChange={toggleSessionState(item.state)}
          />
        ))}
      </Accordion>
      <HR />
      <Accordion title="Bounty price">
        <Checkbox
          type="radio"
          name="sort_order"
          label="Low to High"
          id="Low to High"
          value="Low to High"
          checked={sortOrder === "lth"}
          onChange={() => setSortOrder("lth")}
        />
        <Checkbox
          type="radio"
          name="sort_order"
          label="High to Low"
          id="High to Low"
          value="High to Low"
          checked={sortOrder === "htl"}
          onChange={() => setSortOrder("htl")}
        />
      </Accordion>
      <HR />
      <Accordion title="Amount staked">
        <Checkbox
          name="low_range"
          label="Under 0.1Ξ"
          id="low_range"
          value="low_range"
          checked={ranges.has("low_range")}
          onChange={toggleRange("low_range")}
        />
        <Checkbox
          name="mid_range"
          label="0.1Ξ to 1Ξ"
          id="mid_range"
          value="mid_range"
          checked={ranges.has("mid_range")}
          onChange={toggleRange("mid_range")}
        />
        <Checkbox
          name="high_range"
          label="Over 1Ξ"
          id="high_range"
          value="high_range"
          checked={ranges.has("high_range")}
          onChange={toggleRange("high_range")}
        />
      </Accordion>
    </Container>
  )
}

export default ExploreFilters
