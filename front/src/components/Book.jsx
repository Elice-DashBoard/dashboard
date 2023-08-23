import React, { useEffect, useState } from "react";
import API from "../api/API";
import ENDPOINT from "./../api/ENDPOINT";
import { styled } from "styled-components";

const Book = () => {
  const [books, setBooks] = useState([]);
  console.table(books);

  useEffect(() => {
    API(`${ENDPOINT.BOOKS}`, "GET")
      .then((res) => {
        console.log(res);
        setBooks(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <LayoutContainer>
        <BookUl>
          {books &&
            books.map((book) => (
              <li key={book._id}>
                <InfoUl>
                  <RankLi>{book.rank}</RankLi>
                  <TitleLi>{book.title}</TitleLi>
                  <PriceLi>{book.price}</PriceLi>
                </InfoUl>
              </li>
            ))}
        </BookUl>
      </LayoutContainer>
    </>
  );
};

export default Book;

const LayoutContainer = styled.div``;

const BookUl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InfoUl = styled.ul`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  gap: 1rem;
`;

const RankLi = styled.li`
  /* box-shadow: inset 0 0 10px red;
  min-width: 2rem;
  text-align: center; */
  font-size: var(--fs-sm);
  color: blueviolet;
`;

const TitleLi = styled.li`
  font-size: var(--fs-sm);
  font-weight: 700;
`;

const PriceLi = styled.li`
  /* font-size: var(--fs-sm); */
  color: lightcoral;
`;
