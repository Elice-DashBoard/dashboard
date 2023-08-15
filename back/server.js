const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const scrapeYes24 = require("./yes24/scrapping"); // 스크래핑 함수를 가져옵니다.

const app = express();
app.use(cors());

// const Club = mongoose.model("boards", clubSchema);

app.listen(3001, () => console.log("Server listening on port 3001"));

// 서버 시작과 동시에 스크래핑을 실행하고 결과를 출력합니다.
scrapeYes24();
