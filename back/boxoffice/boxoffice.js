const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.the-numbers.com/weekly-box-office-chart');

  const data = await page.evaluate(() => {
    const tbody = document.querySelector('#box_office_weekly_table tbody');
    const rows = tbody.querySelectorAll('tr');
    const extractedData = Array.from(rows).slice(0, 10).map(row => {
      const cells = row.querySelectorAll('td');

      // 배급사 링크 가져오기
      const distributorLink = cells[3].querySelector('a').href; 

      // 'distributor/' 뒷부분 가져오기, '-'를 ' '로 대체
      const distributorName = distributorLink.split('/').pop().replace('-', ' '); 
      
      return {
        rank: cells[0].innerText.trim(), // 순위
        title: cells[2].querySelector('a').innerText.trim(), // 영화 제목
        distributor: distributorName, // 배급사
        link: cells[2].querySelector('a').href, // 영화 제목 링크
      };
    });
    return extractedData;
  });

  for (const movie of data) {
    await page.goto(movie.link); // 각 링크로 이동
    const posterImgSrc = await page.$eval('#poster img', img => img.src); // poster ID의 img src 가져오기
    movie.posterImgSrc = posterImgSrc; // 가져온 img src를 객체에 추가
  }

  console.log(data); // 최종 결과 출력

  await browser.close();
})();
