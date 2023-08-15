const mongoose = require("mongoose");
const fs = require("fs");
const iconv = require("iconv-lite");
const xlsx = require("xlsx");

// MongoDB 연결
mongoose.connect("mongodb://127.0.0.1:27017/dashboard", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// 스키마 및 모델 정의
const bookSchema = new mongoose.Schema({
  rank: Number,
  title: String,
  price: String,
});
const Book = mongoose.model("Book", bookSchema);

async function scrapeYes24() {
  // 파일을 'binary' 형식으로 읽습니다.
  const binaryData = fs.readFileSync("./yes24/best_0815.xls", "binary");

  // iconv-lite를 사용하여 'euc-kr'에서 'utf-8'로 인코딩을 변환합니다.
  const utf8Data = iconv.decode(Buffer.from(binaryData, "binary"), "euc-kr");

  // 변환된 데이터로부터 워크북을 만듭니다.
  const workbook = xlsx.read(utf8Data, { type: "string" });
  const sheetName = workbook.SheetNames[0];
  const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  // 읽은 데이터를 MongoDB에 저장 또는 업데이트
  for (let row of data) {
    const filter = { rank: row["순위"] };
    const update = {
      rank: row["순위"],
      title: row["상품명"],
      price: row["판매가"],
    };
    const options = { upsert: true }; // 이 옵션은 데이터가 없으면 새로운 데이터를 추가합니다.

    // 순위를 기준으로 데이터를 찾아 업데이트하거나, 없으면 새로 추가합니다.
    await Book.findOneAndUpdate(filter, update, options);
  }
  console.log("Data saved or updated successfully!");
}

module.exports = scrapeYes24;
