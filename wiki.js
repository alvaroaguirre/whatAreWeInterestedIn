
var link = "https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/"

var today = new Date();

var utc = today.getTime() + (today.getTimezoneOffset() * 60000);
today = new Date(utc + (3600000*-7));

var dd = String(today.getDate()-1).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '/' + mm + '/' + dd;
console.log(today)
link = link + today;

bgs = ['#254D32','#077187','#3D5A80','#88A2AA',
        '#5C573E','#514663', '#7C98B3','#786452','#995FA3','#5DA271',
        '#BFB5AF','#E15554','#66666E','#C57B57','#605C4E','#57886C'];

var col = bgs[Math.floor(Math.random() * bgs.length)];

document.body.style.backgroundColor = col;

var request = new XMLHttpRequest()

request.open('GET', link, true)
request.onload = function () {
  
    var data = JSON.parse(this.response)

    var views = 0;
    for (var i = 2; i<12; i++){

        var a = document.createElement('a');
        var url = document.createTextNode(data.items[0].articles[i].article.replace(/_/g, ' '));
        views += data.items[0].articles[i].views

        a.appendChild(url);
        a.title = data.items[0].articles[i].article.replace(/_/g, ' ');
        a.href = 'https://en.wikipedia.org/wiki/' + data.items[0].articles[i].article

        document.getElementById('top' + (i - 1)).innerHTML = a.title;
        document.getElementById('top' + (i - 1)).href = a.href;
        document.getElementById('top' + (i - 1)).target = "_blank;";
    }

    // Get range of views
    var avg_views = views/10

    for (var i = 2; i<12; i++){
        var relative_size = data.items[0].articles[i].views/avg_views
        var fsize = relative_size * 24 + 'pt'
        document.getElementById('top' + (i - 1)).style.fontSize = fsize;
    }

}

request.send()

