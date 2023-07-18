$(document).ready(function() 
{
    const attack = ["fa-hand", "fa-hand-fist", "fa-hand-scissors"];
    let userPkt = 0;
    let pcPkt = 0;
    let userAttack =''; 
    let pcAttack = '';
    let rounds = 3;
    let round = 1;

    // slider
    $(document).on('input', '#rounds', function() 
    {
        $('.slider').html($(this).val());
        rounds = $(this).val();
    });

    // start
    $('header div').click(function() 
    { 
        $(this).html('GRA TRWA')
               .css('opacity', '0.8')
               .css('pointerEvents', 'none')
               .css('margin-top', '60px');
        $('header h2, .info').hide();
        $('main').show('slow');
    });

    // choice attack
    $('.choice i.fa-solid').click(function()
    {   
        $('.choice').fadeTo(100, 0.4).css('pointer-events', 'none');
        round++;

        // user
        userAttack = $(this).attr('class').slice(9, 25);
        $(`.user i.${userAttack}`).css('display', 'inline-block')

        // pc
        const random = Math.floor(Math.random()*3);
        $(`.pc i.${attack[random]}`).css('display', 'inline-block')
        pcAttack = attack[random];

        // check
        if(pcAttack == userAttack) $('main > h3').html('Nikt nie zdobywa punktu!');
        else if
        ((userAttack=='fa-hand' && pcAttack=='fa-hand-scissors')||(userAttack=='fa-hand-scissors' && pcAttack=='fa-hand-fist')||(userAttack=='fa-hand-fist' && pcAttack=='fa-hand'))
        {
            pcPkt++;
            $('main > h3').html('Punkt dla komputera!');
        }
        else
        {
            userPkt++;
            $('main > h3').html('Punkt dla Ciebie!');
        }

        setTimeout(() => change_result(), 1000);
        
        if(rounds == userPkt) setTimeout(() => end('Wygrałeś!'), 2700); 
        else if(rounds == pcPkt) setTimeout(() => end('Przegrałeś') , 2700); 
        else setTimeout(() => back(), 2000);

    });

    const end = message => 
    {
        $('.end').show(300).html(`<p>${message}</p>Aby zagrać ponownie <a href="./">kliknij tutaj</a>`);
        $('main').css('pointer-events', 'none').fadeTo(1000, 0.1);
        $('header div').html('Koniec gry!');
    }
    
    const back = () => 
    {
        $('.board i:not(.fa-computer):not(.fa-user)').hide();
        $('main > h3').html('RUNDA ' + round);
        $('.choice').fadeTo(100, 1).css("pointer-events", "auto");
    }
    
    const change_result = () => $('.result').html(`TY ${userPkt}:${pcPkt} PC`);
});





