const express = require("express");
const cors = require("cors");
const { Book, scrapeYes24 } = require("./yes24/scrapping"); // YES24 스크래핑 함수
const { Cocktail, saveCocktailToDB } = require("./cocktail/cocktail"); // 칵테일 정보 저장 함수
const { Soccer, scrapeAndSaveSoccerData } = require("./soccer/soccer");
const { Movie, scrapeAndSaveMovieData } = require("./movie/movie");

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3001, () => console.log("Server listening on port 3001"));

// 서버 시작과 동시에 YES24 스크래핑을 실행
scrapeYes24();

// 서버 시작과 동시에 랜덤 칵테일 정보를 가져와 MongoDB에 저장
saveCocktailToDB();

// 서버 시작과 동시에 축구 정보를 가져와 MongoDB에 저장
scrapeAndSaveSoccerData();

// 서버 시작과 동시에 영화 정보를 가져와 MongoDB에 저장
scrapeAndSaveMovieData();

// YES24 베스트셀러 정보를 반환하는 API
app.get("/books", async (req, res) => {
  try {
    // 모든 책 데이터를 가져옵니다.
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// 저장된 칵테일 정보를 반환하는 API
app.get("/cocktails", async (req, res) => {
  try {
    // 모든 칵테일 데이터를 가져옵니다.
    const cocktails = await Cocktail.find();
    res.json(cocktails);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// 축구 정보를 반환하는 API
app.get("/soccer", async (req, res) => {
  try {
    // 모든 축구 데이터를 가져옵니다.
    const soccer = await Soccer.find();
    res.json(soccer);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// 박스오피스 정보를 반환하는 API
app.get("/movie", async (req, res) => {
  try {
    // 모든 축구 데이터를 가져옵니다.
    const movie = await Movie.find();
    res.json(movie);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});
