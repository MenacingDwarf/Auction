var mp = require('messagepack');
const express = require('express');
var path = require('path');
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

server = express();
server.use(express.static(path.join(__dirname, 'public')));
server.set('view engine', 'ejs');

server.get('/',function(req,res){
    res.render('main', {mp: mp, lot1: mp.encode(lot_1), lot2: mp.encode(lot_2),lot3: mp.encode(lot_3)});
});

var lot_1 = {
	id: 1,
	link: '/1',
	time: "00:30",
	base_time: '00:30',
	short: "Вельш-корги",
  	name: "Вельш-корги — породы пастушьих собак, происходящие из Уэльса. К уэльским корги относятся: Вельш-корги-кардиган — порода, появившаяся на изолированной территории Кардиганшира.",
  	url: 'http://dogipedia.ru/wp-content/uploads/2016/10/-%D0%BA%D0%BE%D1%80%D0%B3%D0%B8-%D0%BF%D0%B5%D0%BC%D0%B1%D1%80%D0%BE%D0%BA-e1476535744967.jpg',
  	url2: 'https://mir24.tv/uploaded/images/2018/February/f199ac15786fa91660231d19daf189bef7199085d04482f96a3095e73a5b1906.jpg',
	url3: 'https://www.ridus.ru/images/2018/6/8/776041/in_article_8638e85ef3.jpg',
  	price : 40000
};

var lot_2 = {
	id: 2,
	link: '/2',
	time: '00:40',
	base_time: '00:40',
	short: "Французский бульдог",
    name: "Французский бульдог — порода собак. Некрупная, отличающаяся крупной, но короткой мордой, плоским раздвоенным носом, широкой раздвоенной верхней губой. Стоячие уши, широкие у основания и закругляющиеся сверху. Выступающие надбровные дуги отделены друг от друга глубокой бороздкой между глазами.",
    url: 'http://petsvillage.ru/wp-content/uploads/2016/09/french-buldog.jpg',
    url2: 'http://www.tinydog.ru/wp-content/uploads/2016/07/Sobaka-18.jpg',
    url3: 'http://vashipitomcy.ru/wp-content/uploads/_pu/18/91202095.jpg',
    price : 10000
};

var lot_3 = {
	id: 3,
	link: '/3',
	time: '00:20',
	base_time: '00:20',
	short: "Акита-ину",
	name: "А́кита-ину — порода собак, появившаяся в провинции Акита на японском острове Хонсю, одна из шести в регистре японской кинологической организации по защите и сохранению исконно японских пород — Нихонкэн Ходзонкай. Другие названия: японская собака акита. Акита-ину является крупнейшей японской собакой из шпицеобразных.",
	url: 'https://natworld.info/wp-content/uploads/2014/12/-%D1%81%D1%82%D0%BE%D0%B9%D0%BA%D0%B0-%D0%90%D0%BA%D0%B8%D1%82%D1%8B-%D0%B8%D0%BD%D1%83-e1472737264449.jpg',
	url2: 'https://cdn.riastatic.com/photos/auto/content_marketing/0/76/7603/7603fx.jpg',
	url3: 'https://s10.stc.all.kpcdn.net/share/i/12/10455434/inx960x640.jpg',
	price : 30000
};

server.get('/1', function(req, res) {
	res.render('lot', {mp: mp, this_lot: mp.encode(lot_1), lot2: mp.encode(lot_2), lot3: mp.encode(lot_3)});
});

server.get('/2', function(req, res) {
	res.render('lot', {mp: mp, lot2: mp.encode(lot_1), this_lot: mp.encode(lot_2), lot3: mp.encode(lot_3)});
});

server.get('/3', function(req, res) {
	res.render('lot', {mp: mp, lot2: mp.encode(lot_1), lot3: mp.encode(lot_2), this_lot: mp.encode(lot_3)});
});

server.post('/update/:id', urlencodedParser, function (req, res) {
  if (req.params.id == '1') {
    lot_1.price += Number(req.body.Price);
    lot_1.time = lot_1.base_time;
    res.redirect('/1');
  } else if (req.params.id == '2') {
    lot_2.price += Number(req.body.Price);
    lot_2.time = lot_2.base_time;
    res.redirect('/2');
  } else if (req.params.id == '3') {
    lot_3.price += Number(req.body.Price);
    lot_3.time = lot_3.base_time;
    res.redirect('/3');
  } 
  
})


var end_1 = false;
var end_2 = false;
var end_3 = false;

startTimer();
function startTimer(){
	var arr1 = lot_1.time.split(':');
	var arr2 = lot_2.time.split(':');
	var arr3 = lot_3.time.split(':');

	var minutes1 = arr1[0];
	var seconds1 = arr1[1];
	var minutes2 = arr2[0];
	var seconds2 = arr2[1];
	var minutes3 = arr3[0];
	var seconds3 = arr3[1];

	if (minutes1 == 0 && seconds1 == 0 && !end_1){
		console.log("Lot1 time left");
		end_1 = true;
	}
	else if (!end_1) seconds1 -=1;
	if (minutes2 == 0 && seconds2 == 0 && !end_2){
		console.log("Lot2 time left");
		end_2 = true;
	}
	else if (!end_2) seconds2 -=1;
	if (minutes3 == 0 && seconds3 == 0 && !end_3){
		console.log("Lot3 time left");
		end_3 = true;
	}
	else if (!end_3) seconds3 -= 1;
	lot_1.time = formatTime(minutes1) + ":" + formatTime(seconds1)
	lot_2.time = formatTime(minutes2) + ":" + formatTime(seconds2)
	lot_3.time = formatTime(minutes3) + ":" + formatTime(seconds3)
	setTimeout(startTimer, 1000)
}

function formatTime(time){
	time = Number.parseInt(time);
	if (time < 10) return "0" + time
	else return time
}




server.listen(8080,
    () => console.log('Server UP!'));