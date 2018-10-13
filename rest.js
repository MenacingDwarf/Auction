var mp = require('messagepack');
var Pusher = require('pusher');
const express = require('express');
var path = require('path');

server = express();
server.use(express.static(path.join(__dirname, 'public')));
server.set('view engine', 'ejs');

server.get('/',function(req,res){
    res.render('main', {mp: mp, lot1: lot_1, lot2: lot_2,lot3: lot_3});
});

var currentTimer = "00:20";

var lot_1 = {
	link: '/1',
	short: "Вельш-корги",
  	name: "Вельш-корги — породы пастушьих собак, происходящие из Уэльса. К уэльским корги относятся: Вельш-корги-кардиган — порода, появившаяся на изолированной территории Кардиганшира.",
  	url: 'http://dogipedia.ru/wp-content/uploads/2016/10/-%D0%BA%D0%BE%D1%80%D0%B3%D0%B8-%D0%BF%D0%B5%D0%BC%D0%B1%D1%80%D0%BE%D0%BA-e1476535744967.jpg',
  	url2: 'https://mir24.tv/uploaded/images/2018/February/f199ac15786fa91660231d19daf189bef7199085d04482f96a3095e73a5b1906.jpg',
	url3: 'https://www.ridus.ru/images/2018/6/8/776041/in_article_8638e85ef3.jpg',
  	price : 40000
};

var lot_2 = {
	link: '/2',
	short: "Французский бульдог",
    name: "Французский бульдог — порода собак. Некрупная, отличающаяся крупной, но короткой мордой, плоским раздвоенным носом, широкой раздвоенной верхней губой. Стоячие уши, широкие у основания и закругляющиеся сверху. Выступающие надбровные дуги отделены друг от друга глубокой бороздкой между глазами.",
    url: 'http://petsvillage.ru/wp-content/uploads/2016/09/french-buldog.jpg',
    url2: 'http://www.tinydog.ru/wp-content/uploads/2016/07/Sobaka-18.jpg',
    url3: 'http://vashipitomcy.ru/wp-content/uploads/_pu/18/91202095.jpg',
    price : 10000
};

var lot_3 = {
	link: '/3',
	short: "Акита-ину",
	name: "А́кита-ину — порода собак, появившаяся в провинции Акита на японском острове Хонсю, одна из шести в регистре японской кинологической организации по защите и сохранению исконно японских пород — Нихонкэн Ходзонкай. Другие названия: японская собака акита. Акита-ину является крупнейшей японской собакой из шпицеобразных.",
	url: 'https://natworld.info/wp-content/uploads/2014/12/-%D1%81%D1%82%D0%BE%D0%B9%D0%BA%D0%B0-%D0%90%D0%BA%D0%B8%D1%82%D1%8B-%D0%B8%D0%BD%D1%83-e1472737264449.jpg',
	url2: 'https://cdn.riastatic.com/photos/auto/content_marketing/0/76/7603/7603fx.jpg',
	url3: 'https://s10.stc.all.kpcdn.net/share/i/12/10455434/inx960x640.jpg',
	price : 30000
};

server.get('/1', function(req, res) {
	res.render('lot', {mp: mp, time: currentTimer, this_lot: mp.encode(lot_1), lot2: mp.encode(lot_2), lot3: mp.encode(lot_3)});
});

server.get('/2', function(req, res) {
	res.render('lot', {mp: mp, time: currentTimer,lot2: mp.encode(lot_1), this_lot: mp.encode(lot_2), lot3: mp.encode(lot_3)});
});

server.get('/3', function(req, res) {
	res.render('lot', {mp: mp, time: currentTimer,lot2: mp.encode(lot_1), lot3: mp.encode(lot_2), this_lot: mp.encode(lot_3)});
});

var pusher = new Pusher({
  appId: '616895',
  key: '405826115758c772ee2a',
  secret: 'dee18704a72df12f4182',
  cluster: 'eu',
  encrypted: true
});

startTimer();
function startTimer(){
	var arr = currentTimer.split(':');
	var minutes = arr[0];
	var seconds = arr[1];
	if (minutes == 0 && seconds == 0){
		console.log("Time left");
		return;
	}
	else seconds -= 1;
	currentTimer = formatTime(minutes) + ":" + formatTime(seconds)
	setTimeout(startTimer, 1000)
}

function formatTime(time){
	time = Number.parseInt(time);
	if (time < 10) return "0" + time
	else return time
}




server.listen(8080,
    () => console.log('Server UP!'));