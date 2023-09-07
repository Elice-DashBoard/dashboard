import React, { useEffect, useState } from "react";
import API from "../api/API";
import ENDPOINT from "../api/ENDPOINT";
import { styled } from "styled-components";

const Cocktail = () => {
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    API(`${ENDPOINT.COCKTAILS}`, "GET")
      .then((res) => {
        setCocktails(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <LayoutContainer>
        <CocktailUl>
          {cocktails &&
            cocktails
              .slice(cocktails.length - 1, cocktails.length)
              .map((cocktail, index) => (
                <li key={cocktail._id}>
                  <InfoUl>
                    <ImageLi>
                      <CocktailImage
                        src={cocktail.image}
                        alt={`${cocktail.name} 이미지입니다.`}
                      />
                    </ImageLi>
                    <CocktailInfoUl>
                      <H2>Today's Cocktail</H2>
                      <CategoryAndAlcoholic>
                        <Li>category : {cocktail.category}</Li>
                        <Li>
                          <strong className="highlight">
                            {cocktail.alcoholic}
                          </strong>
                        </Li>
                      </CategoryAndAlcoholic>
                      <Li>
                        name : <strong className="bold">{cocktail.name}</strong>
                      </Li>
                      <Li>glass : {cocktail.glass}</Li>
                      <Li className="ellipsis">
                        instructions : {cocktail.instructions}
                      </Li>
                    </CocktailInfoUl>
                  </InfoUl>
                </li>
              ))}
        </CocktailUl>
      </LayoutContainer>
    </>
  );
};

export default Cocktail;

const LayoutContainer = styled.div``;

const CocktailUl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 1rem;
  }
  &::-webkit-scrollbar-thumb {
    background: #ff6f61;
    border-radius: 2.5rem;
  }
  &::-webkit-scrollbar-track {
    /* background: transparent; */
  }
`;

const InfoUl = styled.ul`
  display: flex;
  gap: 1.5rem;
`;

const ImageLi = styled.li``;

const CocktailImage = styled.img`
  width: 16rem;
  height: 16rem;
  border-radius: 2rem;
`;

const CocktailInfoUl = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const H2 = styled.h2`
  font-size: var(--fs-md);
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(
    rgb(255, 111, 97, 0) 0%,
    rgba(255, 111, 97, 0.3) 100%
  );
  width: fit-content;
`;

const Li = styled.li`
  font-size: var(--fs-sm);
  font-weight: 500;
  white-space: nowrap;
  line-height: 1.6;

  & > strong.highlight {
    color: #ff6f61;
    font-weight: 700;
  }

  & > strong.bold {
    font-weight: 700;
    color: black;
  }

  &.ellipsis {
    white-space: normal;
  }
`;

const CategoryAndAlcoholic = styled.div`
  display: flex;
  gap: 1rem;
`;
