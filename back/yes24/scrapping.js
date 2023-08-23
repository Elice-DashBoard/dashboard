const axios = require("axios");
const fs = require("fs");
const iconv = require("iconv-lite");
const xlsx = require("xlsx");
const cron = require("node-cron");
const mongoose = require("mongoose");

// MongoDB와의 연결을 설정합니다.
mongoose.connect("mongodb://127.0.0.1:27017/dashboard", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MongoDB에 저장할 도서 정보의 스키마를 정의합니다.
const bookSchema = new mongoose.Schema({
  rank: Number,
  title: String,
  price: String,
});
const Book = mongoose.model("Book", bookSchema);

// YES24에서 베스트셀러 엑셀 파일을 다운로드하는 함수입니다.
async function downloadExcel() {
  // 베스트셀러 엑셀 파일의 URL
  const url =
    "https://www.yes24.com/24/category/bestsellerExcel?CategoryNumber=001&sumgb=07";

  // axios를 사용하여 해당 URL에서 데이터를 다운로드합니다.
  const response = await axios.get(url, { responseType: "arraybuffer" });

  // 다운로드한 엑셀 파일을 서버에 임시로 저장합니다.
  const filePath = "./yes24/best_0815.xls";
  fs.writeFileSync(filePath, response.data);

  return filePath; // 저장된 파일의 경로를 반환합니다.
}

// 엑셀 파일을 스크래핑하여 MongoDB에 저장하는 함수입니다.
async function scrapeYes24() {
  // 엑셀 파일을 다운로드합니다.
  const filePath = await downloadExcel();

  // 파일을 'binary' 형식으로 읽습니다.
  const binaryData = fs.readFileSync(filePath, "binary");

  // 'euc-kr'에서 'utf-8'로 인코딩을 변환합니다.
  const utf8Data = iconv.decode(Buffer.from(binaryData, "binary"), "euc-kr");

  // 변환된 데이터로부터 엑셀 워크북을 생성합니다.
  const workbook = xlsx.read(utf8Data, { type: "string" });

  // 첫 번째 워크시트의 이름을 가져옵니다.
  const sheetName = workbook.SheetNames[0];

  // 워크시트 데이터를 JSON 형식으로 변환합니다.
  const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  // JSON 형식의 데이터를 순회하며 MongoDB에 저장합니다.
  for (let row of data) {
    const filter = { rank: row["순위"] };
    const update = {
      rank: row["순위"],
      title: row["상품명"],
      price: row["판매가"],
    };
    const options = { upsert: true }; // 데이터가 없으면 새로운 데이터를 추가합니다.

    // 순위를 기준으로 데이터를 찾아 업데이트하거나, 없으면 새로 추가합니다.
    await Book.findOneAndUpdate(filter, update, options);
  }
  console.log("YES24: Data saved or updated successfully!");
}

// 매일 오전 10시에 스크래핑 작업을 수행하는 스케줄을 설정합니다.
cron.schedule("0 10 * * *", scrapeYes24);

module.exports = { Book, scrapeYes24 };
