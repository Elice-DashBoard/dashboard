const axios = require("axios");
const mongoose = require("mongoose");

// MongoDB 연결 설정
mongoose.connect("mongodb://127.0.0.1:27017/dashboard", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MongoDB에 저장할 칵테일 정보의 스키마를 정의합니다.
const cocktailSchema = new mongoose.Schema({
  name: String,
  category: String,
  alcoholic: String,
  glass: String,
  instructions: String,
  image: String,
  ingredients: Array,
});
const Cocktail = mongoose.model("Cocktail", cocktailSchema);

// thecocktaildb.com API에서 랜덤 칵테일 정보를 가져오는 함수입니다.
async function getRandomCocktail() {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

  // axios를 사용하여 API 호출
  const response = await axios.get(url);

  // API 응답으로부터 칵테일 정보 추출
  const cocktailData = response.data.drinks[0];

  // 칵테일 재료와 양 정보를 배열로 변환
  let ingredients = [];
  for (let i = 1; i <= 15; i++) {
    if (cocktailData[`strIngredient${i}`]) {
      ingredients.push({
        ingredient: cocktailData[`strIngredient${i}`],
        measure: cocktailData[`strMeasure${i}`],
      });
    }
  }

  return {
    name: cocktailData.strDrink,
    category: cocktailData.strCategory,
    alcoholic: cocktailData.strAlcoholic,
    glass: cocktailData.strGlass,
    instructions: cocktailData.strInstructions,
    image: cocktailData.strDrinkThumb,
    ingredients: ingredients,
  };
}

// 랜덤 칵테일 정보를 MongoDB에 저장하는 함수입니다.
async function saveCocktailToDB() {
  // 랜덤 칵테일 정보를 가져옵니다.
  const cocktail = await getRandomCocktail();

  // 가져온 정보를 MongoDB에 저장합니다.
  const newCocktail = new Cocktail(cocktail);
  await newCocktail.save();

  console.log("Cocktail saved successfully!");
}

module.exports = saveCocktailToDB;
