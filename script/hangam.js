$(document).ready(function() 
{
	const proverbs = ["BEZ PRACY NIE MA KOŁACZY","CUDZE CHWALICIE SWEGO NIE ZNACIE","DZIECI I RYBY GŁOSU NIE MAJĄ","NIE CHWAL DNIA PRZED ZACHODEM SŁOŃCA","LEPSZY WRÓBEL W GARŚCI NIŻ GOŁĄB NA DACHU"];
	const  films = ["TITANIC","RAMBO","SPIDER MAN","GWIEZDNE WOJNY","CHŁOPAKI NIE PŁACZĄ"];
	const sports = ["PIŁKA NOŻNA","KOSZYKÓWKA","SIATKÓWKA","GOLF","SKOKI NARCIARSKIE","LEKKOATLETYKA"];
	const letters = ['A','Ą','B','C','Ć','D','E','Ę','F','G','H','I','J','K','L','Ł','M','N','Ń','O','Ó','P','R','Q','S','Ś','T','U','V','W','X','Y','Z','Ź','Ż'];

	let letter = '';
	let chosen = '';

	for(i = 0; i < letters.length; i++)
	letter += '<div class="letter">'+letters[i]+'</div>';
	
	$('.letters').html(letter);

	$('header section > div').click(function() 
	{ 
		$('header section > div').removeClass('chosen').css('pointer-events', 'auto');
		$(this).addClass('chosen').css('pointer-events', 'none');
		chosen = $(this).html();
	});

	$('header > div').click(function()
	{ 
		if(chosen == '') $('header > p').fadeTo('100', 1);
		else
		{
			$('main').show("slow");
			$(this).html('KATEGORIA: '+chosen).css('opacity', '0.8').css('pointerEvents', 'none').css('margin-top', '60px').css('margin-bottom', '30px');
			$('header .info, header h2, header > p').hide();
			if(chosen == 'FILMY') chosen = films;
			if(chosen == 'SPORT') chosen = sports;
			if(chosen == 'PRZYSŁOWIA') chosen = proverbs;
			draw(chosen);
		}
	});

	let trials = 10;
	let img = 1;
	let word = '';
	let hiddenWord = '';

	function draw(chosen) 
	{
		let random = Math.floor(Math.random() * (chosen.length));
		word = chosen[random];
		for (i = 0; i < word.length; i++) {
			if (word.charAt(i) == " ") hiddenWord += " ";
			else hiddenWord += "_";
		}
		$('section.word').html(hiddenWord);
	}

	$('.letters').on('click', 'div.letter', function() 
	{ 
		let letter = $(this).html();
		let res = word.indexOf(letter);

		if(res != -1)
		{
			for(i = 0; i < word.length; i++)
			{
				if (word.charAt(i) == letter) 
				hiddenWord = hiddenWord.replaceAt(i, letter);
			}
			$('.word').html(hiddenWord);
			$(this).addClass('good');
		}
		else
		{
			$(this).addClass('bad');
			$('.hangman img').attr('src', './img/h'+(++img)+'.svg');
			$('.hangman div').html("LICZBA PRÓB: "+(--trials))
		}

		if(word == hiddenWord) end('Gratulacje, odgadłeś hasło!')
		else if(trials == 0) end('Niestety przegrałeś.<br> Poprawne hasło to '+word+'.')	
	});

	function end(message) 
	{
		$('.board').slideUp();
		$('header > p').fadeTo(100, 1).html(message + '<br>Jeżeli chcesz zagrać jeszcze to raz kliknij <a href="./">tutaj</a>').css('line-height', '50px');
	}


	String.prototype.replaceAt = function(index, replacement) 
	{
		return this.substring(0, index) + replacement + this.substring(index + replacement.length);
	}
});
