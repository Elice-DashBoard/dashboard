const puppeteer = require("puppeteer");
const cron = require('node-cron');
const mongoose = require("mongoose");

// MongoDB 연결 설정
mongoose.connect("mongodb://127.0.0.1:27017/dashboard", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MongoDB에 저장할 축구 정보의 스키마를 정의
const movieSchema = new mongoose.Schema({
  rank: Number,
  title: String,
  distributor: String,
  img: String,
});
const Movie = mongoose.model("Movie", movieSchema);

// 영화 정보 스크래핑 및 DB 저장
async function scrapeAndSaveMovieData() {
  try {
    const data = await scrapeData(); // 스크랩한 데이터 얻기

    // 새로운 데이터 업데이트 또는 추가
    for (const item of data) {
      await Movie.findOneAndUpdate(
        {
          title: item.title,
          distributor: item.distributor,
          img: item.posterImgSrc,
        }, // 기준 필드
        {
          $set: {
            rank: item.rank,
          },
        },
        { upsert: true, new: true } // 데이터가 없으면 새로 생성, 업데이트 후 업데이트된 데이터 반환
      );
    }
    console.log("Movie: Data saved or updated successfully!");
  } catch (error) {
    console.error("Error scraping and updating data:", error);
  }
}

const scrapeData = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.the-numbers.com/weekly-box-office-chart");

  const data = await page.evaluate(() => {
    const tbody = document.querySelector("#box_office_weekly_table tbody");
    const rows = tbody.querySelectorAll("tr");
    const extractedData = Array.from(rows)
      .slice(0, 10)
      .map((row) => {
        const cells = row.querySelectorAll("td");

        // 배급사 링크 가져오기
        const distributorLink = cells[3].querySelector("a").href;

        // 'distributor/' 뒷부분 가져오기, '-'를 ' '로 대체
        const distributorName = distributorLink
          .split("/")
          .pop()
          .replace("-", " ");

        return {
          rank: cells[0].innerText.trim(), // 순위
          title: cells[2].querySelector("a").innerText.trim(), // 영화 제목
          distributor: distributorName, // 배급사
          link: cells[2].querySelector("a").href, // 영화 제목 링크
        };
      });

    return extractedData;
  });

  const fetchImageLinks = data.map(async (movie) => {
    const newPage = await browser.newPage();
    await newPage.goto(movie.link); // 각 링크로 이동
    const posterImgSrc = await newPage.$eval("#poster img", (img) => img.src); // poster ID의 img src 가져오기
    movie.posterImgSrc = posterImgSrc; // 가져온 img src를 객체에 추가
    await newPage.close(); // 페이지 닫기
  });

  // 병렬적으로 이미지 링크들을 가져옴
  await Promise.all(fetchImageLinks);

  await browser.close();
  return data;
};

cron.schedule('0 9 * * 0', scrapeAndSaveMovieData);

module.exports = { Movie, scrapeAndSaveMovieData };
