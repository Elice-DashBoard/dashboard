const mongoose = require("mongoose");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const cron = require("node-cron");

// MongoDB 연결 설정
mongoose.connect("mongodb://127.0.0.1:27017/dashboard", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MongoDB에 저장할 축구 정보의 스키마를 정의
const soccerSchema = new mongoose.Schema(
  {
    rank: Number,
    emblem: String,
    name: String,
    matchesPlayed: Number,
    wins: Number,
    draws: Number,
    losses: Number,
    goalsFor: Number,
    goalsAgainst: Number,
    goalDifference: Number,
    points: Number,
  },
  { collection: "soccer" }
);
const Soccer = mongoose.model("Soccer", soccerSchema);

// 축구 정보 스크래핑 및 DB 저장
async function scrapeAndSaveSoccerData() {
  try {
    const data = await scrapeData(); // 스크랩한 데이터 얻기

    // 새로운 데이터 업데이트 또는 추가
    for (const item of data) {
      await Soccer.findOneAndUpdate(
        { name: item.name, emblem: item.emblem }, // 기준 필드
        {
          $set: {
            rank: item.rank,
            matchesPlayed: item.matchesPlayed,
            wins: item.wins,
            draws: item.draws,
            losses: item.losses,
            goalsFor: item.goalsFor,
            goalsAgainst: item.goalsAgainst,
            goalDifference: item.goalDifference,
            points: item.points,
          },
        },
        { upsert: true, new: true } // 데이터가 없으면 새로 생성, 업데이트 후 업데이트된 데이터 반환
      );
    }
    console.log("Soccer: Data saved or updated successfully!");
  } catch (error) {
    console.error("Error scraping and updating data:", error);
  }
}

// puppeteer
async function scrapeData() {
  // 브라우저를 실행 & 옵션으로 headless모드를 끌 수 있음
  const browser = await puppeteer.launch({
    headless: "new",
  });

  // 새로운 페이지 열기
  const page = await browser.newPage();
  // 페이지의 크기를 설정
  await page.setViewport({
    width: 1366,
    height: 768,
  });

  // 23-24 EPL 순위
  await page.goto("https://sports.daum.net/record/epl?season=20232024");

  // 페이지의 HTML을 가져오기
  const content = await page.content();

  // $에 cheerio를 로드하기
  const $ = cheerio.load(content);

  // 복사한 리스트의 Selector로 리스트를 모두 가져오기
  const lists = $("#recordList > div > div > table > tbody > tr");

  const data = [];

  // 모든 리스트를 순환
  lists.each((_, list) => {
    const rankElement = $(list).find("td.td_rank").text();

    // 정규표현식을 사용하여 숫자만 추출
    const rank = rankElement.match(/\d{1,2}/)[0];
    const emblem = $(list).find("td.td_name > a > div > img").attr("src");
    const name = $(list).find("td.td_name > a > span").text();

    const matchesPlayed = $(list).find("td:nth-child(3)").text();
    const wins = $(list).find("td:nth-child(4)").text();
    const draws = $(list).find("td:nth-child(5)").text();
    const losses = $(list).find("td:nth-child(6)").text();
    const goalsFor = $(list).find("td:nth-child(7)").text();
    const goalsAgainst = $(list).find("td:nth-child(8)").text();
    const goalDifference = $(list).find("td:nth-child(9)").text();
    const points = $(list).find("td:nth-child(10)").text();

    // 데이터를 배열에 추가
    data.push({
      rank,
      emblem,
      name,
      matchesPlayed,
      wins,
      draws,
      losses,
      goalsFor,
      goalsAgainst,
      goalDifference,
      points,
    });
  });
  // 브라우저를 종료
  browser.close();

  // console.log(data);

  return data;
}
// 매일 00:00 시와 12:00 시에 스크래핑 작업 실행
cron.schedule("0 0,12 * * *", async () => {
  // 스크래핑 및 데이터 저장 함수 호출
  await scrapeAndSaveSoccerData();
});

module.exports = { Soccer, scrapeAndSaveSoccerData };
