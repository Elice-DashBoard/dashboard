import React, { useEffect, useState } from "react";
import API from "../api/API";
import ENDPOINT from "../api/ENDPOINT";
import { styled } from "styled-components";

const Cocktail = () => {
  const [cocktails, setCocktails] = useState([]);
  console.table(cocktails);

  useEffect(() => {
    API(`${ENDPOINT.COCKTAILS}`, "GET")
      .then((res) => {
        console.log(res);
        setCocktails(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <LayoutContainer>
        <CocktailUl>
          {cocktails &&
            cocktails.slice(0, 20).map((cocktail, index) => (
              <li key={cocktail._id}>
                <InfoUl>
                  <CategoryLi>{cocktail.category}</CategoryLi>
                  <NameLi>{cocktail.name}</NameLi>
                  <ImageLi>
                    <CocktailImage
                      src={cocktail.image}
                      alt={`${cocktail.name} 이미지입니다.`}
                    />
                  </ImageLi>
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
`;

const InfoUl = styled.ul`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NameLi = styled.li`
  font-size: var(--fs-sm);
  font-weight: 700;
`;

const ImageLi = styled.li``;

const CocktailImage = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 2rem;
`;

const CategoryLi = styled.li`
  font-size: var(--fs-sm);
  color: blueviolet;
`;
