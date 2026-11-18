// Constantes
const baseLanguage = navigator.userLanguage || navigator.language || 'en-EN';

// Changement de pages
function InitPageChangeButtons() {

    $('[data-topage]').on('click', function () {

        let pageName = $(this).attr('data-topage');
        ShowPage(pageName);

    });

}

function ShowPage(pageName) {

    $('*[data-pagename]').hide();
    
    $('*[data-pagename="'+pageName+'"]').show();

}

// Changement de la langue
function InitChangeLanguageButtons(newLanguage) {

    $('[data-languageselector]').val(newLanguage);

    $('[data-languageselector]').on('change', function () {

        ChangeLanguage(this.value);

    });

}

function ChangeLanguage(newLanguage) {

    $('[data-language]').each( function () {

        $(this).toggle($(this).data('language') == newLanguage);

    });

}

// Au chargement de la page
$(document).ready( function () {

    InitPageChangeButtons();
    InitChangeLanguageButtons(baseLanguage);

    ChangeLanguage(baseLanguage);
    ShowPage('page1');

});
