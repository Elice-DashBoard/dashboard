import React, { useState, useEffect } from "react";
import API from "../api/API";
import ENDPOINT from "../api/ENDPOINT";
import { styled } from "styled-components";

const Movie = () => {
  const [movieList, setMovieList] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    API(`${ENDPOINT.MOVIE}`, "GET")
      .then((res) => {
        setMovieList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleNextSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide + 1) % Math.ceil(movieList.length / 2)
    );
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? Math.ceil(movieList.length / 2) - 1 : prevSlide - 1
    );
  };

  const renderMoviesInSlide = (startIndex) => {
    return movieList.slice(startIndex, startIndex + 2).map((movie) => (
      <SlideMovie key={movie._id}>
        <MovieRank>{movie.rank}</MovieRank>
        <MovieImg
          src={movie.img}
          alt={`${movie.title}의 포스터입니다.`}
          onClick={() => {
            console.log("클릭!");
          }}
        />
        <MovieTitle className="ellipsis">{movie.title}</MovieTitle>
      </SlideMovie>
    ));
  };

  return (
    <>
      <MovieCarousel>
        <ControlButton onClick={handlePrevSlide} className="prev">
          ◀
        </ControlButton>
        {movieList.length > 0 && <>{renderMoviesInSlide(currentSlide * 2)}</>}
        <ControlButton onClick={handleNextSlide} className="next">
          ▶
        </ControlButton>
      </MovieCarousel>
    </>
  );
};

export default Movie;

const MovieCarousel = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
  position: relative;
`;

const ControlButton = styled.button`
  position: absolute;
  color: #7353ea;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--fs-xl);
  cursor: pointer;

  &.prev {
    left: 0;
  }

  &.next {
    right: 0;
  }
`;

const SlideMovie = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  background: #f4f4f4;
  border-radius: 1rem;
  padding: 0.4rem;
`;

const MovieRank = styled.span`
  font-size: var(--fs-sm);
  font-weight: 700;
  color: #7353ea;
`;

const MovieImg = styled.img`
  width: 20rem;
  height: 30rem;
`;

const MovieTitle = styled.p`
  font-size: var(--fs-sm);
  font-weight: 700;
  text-align: center;
`;
