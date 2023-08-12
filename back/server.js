// Express와 Mongoose 라이브러리를 import합니다.
const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const cors = require("cors"); // CORS 라이브러리를 가져옵니다.
const weather_API_KEY =
  // MongoDB와 연결합니다. 여기서 "board"는 데이터베이스의 이름입니다.
  mongoose.connect("mongodb://127.0.0.1:27017/dashboard", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
let db = mongoose.connection;

// 위에서 정의한 스키마를 이용해 MongoDB에 'board'라는 이름의 컬렉션을 생성합니다. 이 컬렉션에 접근할 때는 'Club' 모델을 사용합니다.
const Club = mongoose.model("boards", clubSchema);

// 3001 포트에서 서버를 시작합니다.
app.listen(3001, () => console.log("Server listening on port 3001"));
