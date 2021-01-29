(function () {
	try {
		if (null != window.opener) {
		    window.opener.document.body.className.toString();
		    window.opener.document.styleSheets.length.toString();
		}
		else if(window.top != window) {
		    window.top.document.body.className.toString();
		    window.top.document.styleSheets.length.toString();
		}
	}
	catch (e) {
		setDocumentDomain();
	}
})();

function embbedOpenerStyleSheets() {
    if (window.opener != null) {
        var styleCount = 0;
        var styleSheetLength = document.styleSheets.length;
        for (var n = 0; n < window.opener.document.styleSheets.length; n++) {
            if (window.opener.document.styleSheets[n].href != null) {
                if (styleSheetLength <= styleCount) {
                    appendStyleSheets(window.opener.document.styleSheets[n]);
                }
                else {
                    appendStyleSheets(window.opener.document.styleSheets[n], document.styleSheets[styleCount]);
                }
                styleCount++;
            }
        }
    }
    else if (window.top != null) {
        var styleCount = 0;
        var styleSheetLength = document.styleSheets.length;
        for (var n = 0; n < window.top.document.styleSheets.length; n++) {
            if (window.top.document.styleSheets[n].href != null) {
                if (styleSheetLength <= styleCount) {
                    appendStyleSheets(window.top.document.styleSheets[n]);
                }
                else {
                    appendStyleSheets(window.top.document.styleSheets[n], document.styleSheets[styleCount]);
                }
                styleCount++;
            }
        }
    }
}

function setDocumentDomain() {
	var parts = document.domain.split('.');
	if (parts.length > 2 && (parts[parts.length - 2].toLowerCase() === 'edu'
                             || parts[parts.length - 2].toLowerCase() === 'se'
                             || parts[parts.length - 2].toLowerCase() === 'co'
                             || parts[parts.length - 1].toLowerCase() === 'au')) {
	    document.domain = parts.slice(0, parts.length).join('.');
	}	
	else if (parts.length > 1) {
		document.domain = parts[parts.length - 2] + '.' + parts[parts.length - 1];
	}
}


function appendStyleSheets(srcStyleSheet,tgtStyleSheet)
{
    if(document.createStyleSheet)
	{
	    if(tgtStyleSheet)
	    {
	        tgtStyleSheet.href=srcStyleSheet.href;
	    }
	    else
	    {
	        document.createStyleSheet(srcStyleSheet.href);
	    }
	}
	else
	{
	    var hd=document.getElementsByTagName("head")[0];
	    var el=document.createElement("link");
	    el.href=srcStyleSheet.href;
	    el.type="text/css";
	    el.rel="stylesheet";
	    hd.appendChild(el);
	}
}


// Locked Header for Tables
if (window.jQuery) {
    jQuery.fn.lockHeader = function() {
        return this.each(function() {

            var table = j$(this);
            var tableContainer = j$(this).parent();

            if (table.height() < tableContainer.height()) {
                tableContainer.height(table.height());
                return;
            }


            var newHeader = this.id + "_header";
            var newHeaderContainer = this.id + "_headerContainer";
            var container = this.id + "_container";

            // Create the required DOM structure
            tableContainer.wrap("<div id=\"" + container + "\" style=\"text-align: left;\"></div>");
            tableContainer.before("<div id=\"" + newHeaderContainer + "\" style=\"overflow: hidden; position: relative; z-index: 1;\"><table id=\"" + newHeader + "\"><thead></thead></table></div>");

            // If no thead section is present make the first row as thead
            if (j$("#" + this.id + " > thead").length == 0) {
                j$("#" + this.id + " > tbody").before("<thead></thead>");
                j$("#" + this.id + " > thead").append(j$("#" + this.id + " > tbody > tr:first").remove());
                j$("#" + this.id + " > thead").html(j$("#" + this.id + " > thead").html().replace(/<td/g, "<th").replace(/<\/td>/g, "</th>"));
            }


            // Copy Contents from old header to new header
            j$("#" + newHeader + " > thead").html(j$("#" + this.id + " > thead").html());
            j$("#" + newHeader + " > thead > tr").append("<th></th>");

            // Make the new header width equal to the main table
            //          j$("#" + newHeader).css("width", table.width());

            // Assign header div width based on whether vertical scrollbar is present
            // Change height of div containing the table if table is smaller
            var sbWidth = getScrollbarWidth();
            tableContainer.css("width", tableContainer.width() + sbWidth);
            j$("#" + newHeader).css("width", tableContainer.width());

            var classname = table.attr("class");
            if (classname != null) {
                j$("#" + newHeader).addClass(classname);
            }

            j$("#" + this.id + " > thead > tr > th").each(function() {
                // Make head of main table hideable by enclosing the cells in divs
                // because IE won't let reduce the size of thead directly
                j$(this).html("<div style=\"height: 1px; width:" + j$(this).width() + "px; overflow: hidden;\"></div>");
            });

            var thCount = 0;
            j$("#" + this.id + " > thead > tr > th").each(function() {
                // Make each column of header table equal in width to corresponding column in main table
                j$("#" + newHeader + " > thead > tr > th:eq(" + thCount + ")").width(j$(this).width());
                thCount++;

            });

            j$("#" + newHeader + " > thead > tr > th:last").css("padding-left", "0px");
            j$("#" + newHeader + " > thead > tr > th:last").css("padding-right", "0px");
            j$("#" + newHeader + " > thead > tr > th:last").width(sbWidth);


            // attach scroll event handler
            if (table.width() > tableContainer.width()) {
                tableContainer.scroll(function() {
                    j$("#" + newHeaderContainer).scrollLeft(tableContainer.scrollLeft());
                });
            }

            // Copy CSS styles
            j$("#" + newHeaderContainer).css("background-color", tableContainer.css("background-color"));
            document.getElementById(newHeader).cellSpacing = this.cellSpacing;
            document.getElementById(newHeader).cellPadding = this.cellPadding;
            j$("#" + this.id + " > thead").css("visibility", "hidden");
            j$("#" + this.id + " > thead").css("height", "0px");
            j$("#" + this.id + " > thead").css("overflow", "hidden");
            table.css("margin-top", "-4px");

        });
    };
}

// calculate scrollbar width
function getScrollbarWidth() {
    var div = j$('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>');

    // Append our div, do our calculation and then remove it
    j$('body').append(div);
    var w1 = j$('div', div).innerWidth();
    div.css('overflow-y', 'scroll');
    var w2 = j$('div', div).innerWidth();
    j$(div).remove();
    return (w1 - w2);
}