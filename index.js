let quotesArray;

let primaryColors = [
  "mediumvioletred",
  "peachpuff",
  "darkcyan",
  "darkgreen",
  "darkred",
  "blue",
  "rebeccapurple"
];

let secondaryColors = [
  'hotpink',
  'goldenrod',
  'cyan',
  'lime',
  'indianred',
  'turquoise',
  'magenta'
];

let hoverColors = [
  'lightpink',
  'khaki',
  'lightcyan',
  'limegreen',
  'darksalmon',
  'paleturquoise',
  'mediumorchid'
]

$(document).ready(function () {
  getQuotes().then(() => {
    randomQuote()
  });
  
  $("#new-quote").on("click", randomQuote);
  
});

function getQuotes() {
  return $.ajax({
    headers: {
      Accept: 'application/json'
    },
    url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
    success: function (quoteData) {
      if (typeof quoteData === 'string')
      {
        quotesArray = JSON.parse(quoteData);
      }
    }          
  });
}

function randomQuote() {
  let colorIndex = Math.floor(Math.random() * 6);
  let quoteIndex = Math.floor(Math.random() * (quotesArray.quotes.length - 1));
  console.log(quotesArray.quotes[0])
 
  let currentQuote = quotesArray.quotes[quoteIndex].quote;
  
  let currentAuthor = quotesArray.quotes[quoteIndex].author;
  
  $('#text').text(currentQuote);
  $('#author').text(currentAuthor);
  
  $("body").css("background-color", primaryColors[colorIndex]);
  
  $("#quote-box").css("background-color", secondaryColors[colorIndex]);
  
  $("a").css("background-color", primaryColors[colorIndex]);
  
  $("a").hover(function()
    {
      $(this).css("background-color", hoverColors[colorIndex]);
  },
      function()
    {
      $(this).css("background-color", primaryColors[colorIndex]);
  });
  
  $('#tweet-quote').attr(
    'href',
    'https://twitter.com/intent/tweet?hashtags=quotes&text=' +
      encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
  );
}