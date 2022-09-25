// const request = require('request');
// const cheerio = require('cheerio');

// var jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// const { window } = new JSDOM();
// const { document } = (new JSDOM('')).window;
// global.document = document;

// var $ = jQuery = require('jquery')(window);
// request('https://www.flipkart.com/laptops/pr?sid=6bo,b5g&otracker=categorytree&fm=neo%2Fmerchandising&iid=M_b268e188-2a98-430a-9b8c-3290f46b7edf_1_372UD5BXDFYS_MC.34WHNYFH5V2Y&otracker=hp_rich_navigation_8_1.navigationCard.RICH_NAVIGATION_Electronics~Laptop%2Band%2BDesktop_34WHNYFH5V2Y&otracker1=hp_rich_navigation_PINNED_neo%2Fmerchandising_NA_NAV_EXPANDABLE_navigationCard_cc_8_L1_view-all&cid=34WHNYFH5V2Y', (error, response, html) => {
//     if (!error && response.statusCode == 200) {
//         $('._4rR01T').each((i, ele) => {
//             const heading = $(ele).text();
//             console.log(heading);
//         })

//     }
// })

const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');

// Write Headers
writeStream.write(`Title,Link,Date \n`);

request('http://codedemos.com/sampleblog', (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);

    $('.post-preview').each((i, el) => {
      const title = $(el)
        .find('.post-title')
        .text()
        .replace(/\s\s+/g, '');
      const link = $(el)
        .find('a')
        .attr('href');
      const date = $(el)
        .find('.post-date')
        .text()
        .replace(/,/, '');
      writeStream.write(`${title}, ${link}, ${date} \n`);
    });

    console.log('Scraping Done...');
  }
});