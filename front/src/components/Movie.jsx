import React, { useState, useEffect } from "react";
import API from "../api/API";
import ENDPOINT from "../api/ENDPOINT";
import { styled } from "styled-components";

const Movie = () => {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    API(`${ENDPOINT.MOVIE}`, "GET")
      .then((res) => {
        setMovieList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <MovieCarousel id="movieCarousel" onWheel={handleMouseWheel}>
        {movieList.map((movie, index) => (
          <SlideMovie key={movie._id}>
            <MovieImg
              src={movie.img}
              alt={`${movie.title}의 포스터입니다.`}
            />
            <ImgCover>
              <MovieRank>{movie.rank}</MovieRank>
            </ImgCover>
            <MovieTitle className="ellipsis">{movie.title}</MovieTitle>
          </SlideMovie>
        ))}
      </MovieCarousel>
    </>
  );
};

export default Movie;

const MovieCarousel = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  gap: 1rem;
  position: relative;
  overflow-x: scroll;

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

const SlideMovie = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f4f4f4;
  border-radius: 1rem;
  padding: 0 0.4rem;
`;

const MovieRank = styled.span`
  font-size: var(--fs-md);
  font-weight: 700;
  /* color: #7353ea; */
  position: absolute;
  left: 1rem;
  top: 0.6rem;
  color: #ffffff;

  /* -webkit-text-fill-color: transparent; 
  -webkit-text-stroke: 1px black; */
`;

const MovieImg = styled.img`
  width: 20rem;
  height: 30rem;
  border-radius: 1rem;
`;

const MovieTitle = styled.p`
  font-size: var(--fs-sm);
  font-weight: 700;
  text-align: center;
  width: 100%;
  line-height: 3rem;
`;

const ImgCover = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background: linear-gradient(rgb(60, 60, 60) 0%, rgba(60, 60, 60, 0) 20%);
`;
