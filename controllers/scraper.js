const { default: axios } = require('axios');
const cheerio = require('cheerio');

exports.scraper = (req, res) => {
  let site = 'https://www.octaveclothing.com/men';
  axios(site).then((ress) => {
    const html = ress.data;
    const $ = cheerio.load(html);
    let content = [];
    $(
      '#block-octave-content > div > div > div > div.view-content.row > div > div:nth-child(1)',
      html,
    ).each((i, e) => {
      let name = $(`div > div > a > h6`).text();
      content.push(name);
    });
    res.send(content); 
  });
};
