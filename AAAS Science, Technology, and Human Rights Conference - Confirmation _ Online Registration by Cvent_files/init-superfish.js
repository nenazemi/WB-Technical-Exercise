j$(document).ready(function () {
    // follow us bar
    j$('ul.sf-menu.follow-us').supersubs({
        minWidth: 12,
        maxWidth: 27,
        extraWidth: 1
    }).superfish({
        pathClass: 'current',
        pathLevels: 0,
        delay: 1000,
        animation: { height: 'show' },
        speed: 'fast',
        autoArrows: true,
        dropShadows: false,
        disableHI: false,
        onBeforeShow: function () {
            this.parent().removeClass("sfNoHover");
        },
        onHide: function () {
            this.parent().addClass("sfNoHover");
        }
    });

    // main navigation
    var navigation = j$('div.navigation ul').attr('class');
    var allLIs = j$('div.navigation.nav-multiple-tabs > ul.sf-menu.sf-navbar > li');
    j$(function () {
        if (navigation == 'sf-menu sf-navbar') {
            j$("div.navigation ul").superfish({
                hoverClass: 'sfHover',
                pathClass: 'current',
                pathLevels: 1,
                delay: 1500,
                animation: { opacity: 'show' },
                speed: 'fast',
                autoArrows: false,
                dropShadows: false,
                disableHI: true
            });
        }
        else {
            j$("div.navigation ul.sf-menu").supersubs({
                minWidth: 12,
                maxWidth: 27,
                extraWidth: 1
            }).superfish({
                hoverClass: 'sfHover',
                pathClass: 'current',
                pathLevels: 0,
                delay: 500,
                animation: { height: 'show' },
                speed: 'fast',
                autoArrows: false,
                dropShadows: false,
                disableHI: false
            });
        }
        j$('a.reg-link').click(function () {
            var page = j$(this).attr('href');
            window.location = page;
        });
        // prod-22030 fix
        allLIs.each(function (index) {
            var current = j$(this);
            if (current.attr('class') == 'subnav-register') {
                var $this = j$(this);
                var anchor = j$(this).find("a");
                j$(anchor, $this).hover(
                    function () {
                        $this.addClass("sfHover");
                        allLIs.not(".subnav-register").removeClass("sfHover");
                    }, function () {
                        $this.removeClass("sfHover");
                    }
                 );
            }
        });
    });
});