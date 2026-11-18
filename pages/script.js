// Constantes
const baseLanguage = navigator.userLanguage || navigator.language || 'en-EN';

// Changement de pages
function InitPageChangeButtons() {

    $('[data-topage]').on('click', function () {

        let pageName = $(this).attr('data-toPage');
        ShowPage(pageName);

    });

}

function ShowPage(pageName) {

    $('*[data-pagename]').each( function() {
        
        $(this).hide();

    });
    
    $('*[data-pagename="'+pageName+'"]').show();

}

// Changement de la langue
function InitChangeLanguageButtons(newLanguage) {

    $('[data-languageselector]').each( function () {;
        
        $(this).val(newLanguage);

        $(this).on('change', function () {
            
            var valueSelected = this.value;
            ChangeLanguage(valueSelected);
            
        });

    });

}

function ChangeLanguage(newLanguage) {

    $('[data-language]').each( function() {
        
        if ($(this).data('language') == newLanguage) {
            $(this).show();
        }
        else {
            $(this).hide();
        }

    });

}

// Au chargement de la page
$(document).ready(function(){

    InitPageChangeButtons();
    InitChangeLanguageButtons(baseLanguage);

    ChangeLanguage(baseLanguage);
    ShowPage('page1');

});
