var superagent = require('superagent');
var cheerio = require('cheerio');
var fs = require('fs');
var array = [];

for (var i = 1; i < 300; i++) {
  getData(i);
}

function getData(index) {
  var url = 'http://www.bttiantang.com/?PageNo=' + index;
  superagent.get(url)
    .end(function (err, sres) {
      // 常规的错误处理
      if (err) {
        return next(err);
      }
      var $ = cheerio.load(sres.text);
      $('.ml .item.cl').each(function (idx, element) {
        var $element = $(element);
        var $el = $($element.find('a'));
        var name = $el.text();
        var img = $element.find('.litpic img');
        var score = Number($($element.find('.rt strong')).html()) * 10 + Number($($element.find('.rt .fm')).html());
        if (score > 75) {
          console.log(name + ' score is ' + score / 10 + '\n');
          array.push({
            name: name,
            score: score,
            href: $el.attr('href'),
            img: $(img).attr('src')
          });
        }
      });
      fs.writeFile('./data.json', JSON.stringify(array), function (err) {
        if (err) throw err;
      });
    });
}
