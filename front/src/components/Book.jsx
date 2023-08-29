import React, { useEffect, useState } from "react";
import API from "../api/API";
import ENDPOINT from "./../api/ENDPOINT";
import { styled } from "styled-components";

const Book = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    API(`${ENDPOINT.BOOKS}`, "GET")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <LayoutContainer>
        <Table>
          <thead>
            <tr>
              <th>순위</th>
              <th className="textAlign">제목</th>
              <th>가격</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>
                  <RankStrong>{book.rank}</RankStrong>
                </td>
                <td>
                  <NameStrong>{book.title}</NameStrong>
                </td>
                <td>{book.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </LayoutContainer>
    </>
  );
};

export default Book;

const LayoutContainer = styled.div`
  display: flex;
  height: 30rem;
  overflow-y: scroll;
  padding-right: 1rem;

  &::-webkit-scrollbar {
    width: 1rem;
    height: 1rem;
  }
  &::-webkit-scrollbar-thumb {
    background: #ff6f61;
    border-radius: 2.5rem;
  }
  &::-webkit-scrollbar-track {
    /* 배경 스타일링 추가 가능 */
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 0.5rem 0;
    border-bottom: 1px solid #ccc;
    text-align: center;
    vertical-align: middle;
    font-size: var(--fs-sm);
    min-width: 4rem;
    height: 3rem;
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

    &.th {
      width: 4rem;
      white-space: nowrap;
    }

    &.textAlign {
      text-align: left;
    }
  }
`;

const Strong = styled.strong`
  display: block;
  font-weight: 700;
`;

const RankStrong = styled(Strong)``;
const NameStrong = styled(Strong)`
  text-align: left;
`;
