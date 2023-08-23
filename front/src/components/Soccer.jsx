import React, { useEffect, useState } from "react";
import API from "../api/API";
import ENDPOINT from "../api/ENDPOINT";
import { styled } from "styled-components";

const Soccer = () => {
  const [soccer, setSoccer] = useState([]);
  console.table(soccer);

  useEffect(() => {
    API(`${ENDPOINT.SOCCER}`, "GET")
      .then((res) => {
        console.log(res);
        setSoccer(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <LayoutContainer>
        <SoccerUl>
          {soccer &&
            soccer.map((soccer) => (
              <li key={soccer._id}>
                <InfoUl>
                  <RankLi>{soccer.rank}</RankLi>
                  <EmblemLi>
                    <EmblemImg
                      src={soccer.emblem}
                      alt={`${soccer.name}팀의 엠블럼입니다.`}
                    />
                  </EmblemLi>
                  <NameLi>{soccer.name}</NameLi>
                </InfoUl>
              </li>
            ))}
        </SoccerUl>
      </LayoutContainer>
    </>
  );
};

export default Soccer;

const LayoutContainer = styled.div``;

const SoccerUl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InfoUl = styled.ul`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const RankLi = styled.li`
  font-size: var(--fs-sm);
  color: blueviolet;
`;

const NameLi = styled.li`
  font-size: var(--fs-sm);
  font-weight: 700;
`;

const EmblemLi = styled.li`
  color: lightcoral;
`;

const EmblemImg = styled.img`
  width: 2rem;
  height: 2rem;
`;
