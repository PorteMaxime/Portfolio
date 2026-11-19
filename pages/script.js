// Constantes
const baseLanguage = (navigator.language || 'en').startsWith('fr') ? 'fr' : 'en';

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

// Changement theme clair / sombre
function InitThemeButton() {

    $('#ThemeButton').on('click', function () {

        const body = $('body');

        if (body.hasClass('light-theme')) {

            body.removeClass('light-theme').addClass('dark-theme');

            $(this).find('img').attr('src', '../res/ico/sun-regular-full.svg');
            $(this).attr('aria-label', 'Switch to light theme');

        }
        else {

            body.removeClass('dark-theme').addClass('light-theme');

            $(this).find('img').attr('src', '../res/ico/moon-regular-full.svg');
            $(this).attr('aria-label', 'Switch to dark theme');

        }

    });

}

// Au chargement de la page
$(document).ready( function () {

    InitPageChangeButtons();
    InitChangeLanguageButtons(baseLanguage);
    InitThemeButton();

    ChangeLanguage(baseLanguage);
    ShowPage('page1');

});
