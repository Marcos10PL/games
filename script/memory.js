let pairs = 0;
let trials = 0;

$(document).ready(function() 
{
	const fields = ['fa-house', 'fa-cart-shopping', 'fa-computer', 'fa-book', 'fa-envelope', 'fa-bell', 'fa-house', 'fa-cart-shopping', 'fa-computer', 'fa-book', 'fa-envelope', 'fa-bell'];
	const randoms = []; 
	let nr = 0; 
	let x = true;

	for(j = 0; j < fields.length; j++)
	{
		do
		{
			let random = Math.floor(Math.random()*fields.length);
			x = true;

			for(i = 0; i < nr; i++) 
			if(randoms[i] == random) x = false;

			if(x == true)
			{
				nr++;
				randoms.push(random);
			}

		}while(x != true);
	}

	let field = '';

	for(i = 0; i < randoms.length; i++)
	field += '<div class="field"><i class="fa-solid '+fields[randoms[i]]+'"></i></div>';

	$('header > div').click(function() 
	{ 
		$('main').fadeIn();
		$(this).html('GRA TRWA').css('opacity', '0.8').css('pointerEvents', 'none').css('margin-top', '60px')
		$('header h2').hide();
		$('.board').html(field);
	});

	let visible = [];

	$('.board').on('click', 'div.field i', function() 
	{
		$(this).fadeTo(1, 1).parents('div').css('pointer-events', 'none');
		let field = $(this).attr('class');
		field = field.replace(' ', '.');
		visible.push(field);

		if(visible.length == 2)
		{
			$('div.field').css('pointer-events', 'none');
			if(visible[0] == visible[1])
			{
				$('i.'+visible[0]).parents('div')
				.delay(300).fadeTo(500, 0)
				.addClass('hidden')
				pairs++;
			}
			else
			{
				$('i.'+visible[0]).delay(600).fadeTo(500, 0);
				$('i.'+visible[1]).delay(600).fadeTo(500, 0);
			}
			visible = [];
			trials++;
			setTimeout('back()', '1000');
		}
	});
});

function back() 
{
	$('div.field').css('pointer-events', 'auto');
	$('div.field.hidden').css('pointer-events', 'none');
	$('main > p').html('Licznik: ' + trials);

	if (pairs == 6) {
		$('header > div').html('Koniec gry!');
		$('main').html('<p>Gratulacje, odnalazłeś wszystkie pary w ' + trials + ' ruchach.</p> Aby zagrać ponownie kliknij <a href="./">tutaj</a>').css('padding-top', '30px');
	}
}