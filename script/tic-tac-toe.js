$(document).ready(function() 
{
    const xo = [1,2,3,4,5,6,7,8,9]
    let round = "x";
    let all = 0;

    // start
    $('header div').click(function() 
    { 
        $('main').show("slow");
        $(this).html('GRA TRWA')
               .css('opacity', '0.8')
               .css('pointerEvents', 'none')
               .css('margin-top', '60px')
        $('header h2').hide();
    });

    // field click
    $('.field').click(function() 
    { 
        all++;
        if(round == 'x')
        {
            $(this).html('<img src="../../img/tic-tac-toe/cross.svg" alt="cross">')
                   .css('pointerEvents', 'none');
            $('.info').html('Runda kółka!')
            round = 'o';
            xo[$(this).data('number')] = 'x';
        }
        else
        {
            $(this).html('<img src="../../img/tic-tac-toe/circle.svg" alt="circle">')
                   .css('pointerEvents', 'none');
            $('.info').html('Runda krzyżyka!')
            round = 'x'
            xo[$(this).data('number')] = 'o';
        }

        //end
        if(all == 9) end('Nikt nie wygrał!')

        if(
        (xo[0] == xo[1] && xo[1] == xo[2])||(xo[3] == xo[4] && xo[4] == xo[5])||
        (xo[6] == xo[7] && xo[7] == xo[8])||(xo[0] == xo[3] && xo[3] == xo[6])||
        (xo[1] == xo[4] && xo[4] == xo[7])||(xo[2] == xo[5] && xo[5] == xo[8])||
        (xo[0] == xo[4] && xo[4] == xo[8])||(xo[2] == xo[4] && xo[4] == xo[6]))
        {
            if(round =='o') end('Wygrywa krzyżyk!');
            else end('Wygrywa kółko!');
        }
    });

    // end message
    const end = message =>
    {
        $('header div').html('Koniec gry!');
        $('.board').fadeTo('200', '0.3').css('pointerEvents', 'none');
        $('.info').html(`${message}<br>Jeśli chcesz zagrać jeszcze raz kliknij <a href="./">tutaj`);
    }
});

