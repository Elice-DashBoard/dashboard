import React, { useEffect, useState } from "react";
import API from "../api/API";
import ENDPOINT from "../api/ENDPOINT";
import styled from "styled-components";

const Soccer = () => {
  const [soccer, setSoccer] = useState([]);
  // console.table(soccer);

  useEffect(() => {
    API(`${ENDPOINT.SOCCER}`, "GET")
      .then((res) => {
        setSoccer(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <LayoutContainer>
      <Table>
        <thead>
          <tr>
            <th id="th">순위</th>
            <th id="th">팀</th>
            <th></th>
            <th id="th">경기</th>
            <th id="th">승</th>
            <th id="th">무</th>
            <th id="th">패</th>
            <th id="th">득점</th>
            <th id="th">실점</th>
            <th id="th">득실차</th>
            <th id="th">승점</th>
          </tr>
        </thead>
        <tbody>
          {soccer.map((team) => (
            <tr key={team._id}>
              <td>
                <RankStrong>{team.rank}</RankStrong>
              </td>
              <td>
                <EmblemImg
                  src={team.emblem}
                  alt={`${team.name}팀의 엠블럼입니다.`}
                />
              </td>
              <td>
                <NameStrong>{team.name}</NameStrong>
              </td>
              <td>{team.matchesPlayed}</td>
              <td>{team.wins}</td>
              <td>{team.draws}</td>
              <td>{team.losses}</td>
              <td>{team.goalsFor}</td>
              <td>{team.goalsAgainst}</td>
              <td>{team.goalDifference}</td>
              <td>
                <PointsStrong>{team.points}</PointsStrong>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </LayoutContainer>
  );
};

export default Soccer;

const LayoutContainer = styled.div`
  height: 30rem;
  overflow-y: scroll;
  padding-right: 1rem;

  &::-webkit-scrollbar {
    width: 1rem;
  }
  &::-webkit-scrollbar-thumb {
    background: #ff6f61;
    border-radius: 2.5rem;
  }
  &::-webkit-scrollbar-track {
    /* background: transparent; */
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 0.5rem;
    border-bottom: 1px solid #ccc;
    text-align: center;
    vertical-align: middle;
    font-size: var(--fs-sm);
    min-width: 4rem;
    white-space: nowrap;
  }

  th {
    background-color: #767676;
    height: 3rem;
    color: #ffffff;
    font-weight: 700;
    padding: initial;
    font-size: inherit;
    position: sticky;
    top: 0;

    &#th {
      width: 4rem;
      white-space: nowrap;
    }
  }
`;

const EmblemImg = styled.img`
  width: 2rem;
  height: 2rem;
  margin: 0 auto;
`;

const Strong = styled.strong`
  display: block;
  font-weight: 700;
`;

const RankStrong = styled(Strong)``;
const NameStrong = styled(Strong)`
  text-align: left;
`;
const PointsStrong = styled(Strong)``;
