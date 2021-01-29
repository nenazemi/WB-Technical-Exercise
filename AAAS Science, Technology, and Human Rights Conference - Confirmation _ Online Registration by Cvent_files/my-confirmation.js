j$(document).ready(function () {
    
    var index = 0;
    //if guests are more or equal to 5 collapse the reg details of all guests else they will be always expanded
    if (j$('div.registrant-container').length > 5) {
        j$('div.registrant-container').each(function() {
            if (index > 0) {
                j$(this).find('div.registrant-content-info').addClass('hidden').slideUp();
                j$(this).find('span.open-close-indicator').html('+');
            }
            index++;
        });
    }

    j$('div.reg-action-button').hoverIntent({
        over: function () {
            j$(this).children('ul.confirmation-dropdown-menu').slideDown();
        },
        timeout: 200,
        out: function () {
            j$(this).children('ul.confirmation-dropdown-menu').slideUp();
        }
    });

    j$('a.registrant-name-link').click(function (e) {
        e.preventDefault();

        var registrantContent = j$(this).parent('h3.guest-name').siblings('div.registrant-content-info');
        var changeIndicator = j$(this).children('span.registrant-open-close').children('span.open-close-indicator');
        if (registrantContent.hasClass('hidden')) {
            registrantContent.removeClass('hidden').slideDown();
            changeIndicator.html('-');
        } else {
            registrantContent.addClass('hidden').slideUp();
            changeIndicator.html('+');
        }

    });

    j$('a.show-all-registrants').click(function (e) {
        e.preventDefault();
        j$('div.registrant-container').each(function () {
            j$(this).find('div.registrant-content-info.hidden').removeClass('hidden').slideDown();
            j$(this).find('span.open-close-indicator').html('-')
        });

    });

    j$('a.close-all-registrants').click(function (e) {
        e.preventDefault();
        j$('div.registrant-container').each(function () {
            j$(this).find('div.registrant-content-info').addClass('hidden').slideUp();
            j$(this).find('span.open-close-indicator').html('+')
        });

    });



});