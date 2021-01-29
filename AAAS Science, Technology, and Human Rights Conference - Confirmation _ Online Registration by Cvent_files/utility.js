var winPopup;
window.onfocus = ClosePopup;

// for printer friendly and email this page
var newWindow;
// debugger;

var _util = new function() {
    var m = document.location.pathname.match(/(.*\/Events)\/(\([0-9a-zA-Z]*\))*/i)
    var m1 = (m && m[1] != null ? m[1] : "");
    var m2 = (m && m[2] != null ? m[2] : "");

    if (m2 > "")
        m2 = "/" + m2;
    this.appRoot = m1 + m2;
}

function utility_GetAppRoot()
{
	return _util.appRoot;
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

function updateProfileImageIconSource(control_id) {
    if (control_id) control_id = '#' + control_id;
    var imgIcon = j$(control_id + ' [id$="imgProfileIcon"]');
    var location = j$(control_id + ' [id$="hdnTempFileLocation"]').val()
    var stubAndFileName = j$(control_id + ' [id$="hdnAnswFileStub"]').val();
    var imgStub = stubAndFileName.substring(0, stubAndFileName.indexOf('~')).replace(/-/g, '');
    var imgExt = stubAndFileName.substring(stubAndFileName.lastIndexOf('.'));
    imgIcon.attr('src', location + imgStub + imgExt);
}

function findValidationSummary() {
    var $summary = j$('[id*="ValidationSummary"]');
    if ($summary) $summary.attr('tabindex', -1).focus();
}

j$(function () { // functions for document.ready
    findValidationSummary();

    j$('[id*="btnNext"], [id*="btnFinish"]').each(function () {
        j$(this).click(function () {
            window.setTimeout(function () {
                j$('[id*="ValidationSummary"]').focus();
            }, 500);
        });
    });
});

function ValidateNumber(aFld)
{
	var s = aFld.value;
	if (!validateNumeric(s) && s.length > 0)
	{
		alert("Please enter a number");
		return false;
	}
	return true;
}

function  validateNumeric( strValue ) {
	var objRegExp  =  /(^-?\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)/;
	return objRegExp.test(strValue);
}

// for popup calendar
function GetDate(CtrlName)
{
	winPopup = window.open('/Events/Popup/Calendar.aspx?FormName=' + document.forms[0].name + '&CtrlName=' + CtrlName, 'winPopup', 'width=300,height=300,top=300,left=500,toolbars=no,scrollbars=no,status=no,resizable=no');
}

function GetDropDownDate(CtrlName) {
     var mmddyyyyClientId = CtrlName.split('-');
     var CtrlNValue = document.getElementById(mmddyyyyClientId[0]).value + "/" + document.getElementById(mmddyyyyClientId[1]).value + "/" + document.getElementById(mmddyyyyClientId[2]).value;
     var location = j$('select[id=' + mmddyyyyClientId[0] + ']').offset();
     var dateX = location.left;
     var dateY = location.top - j$(window).scrollTop() + 100;
     if ((dateY + 250) >= j$(window).height()) {
         dateY = j$(window).height() - 250;
     }
     winPopup = window.open('/Events/Popup/Calendar.aspx?FormName=' + document.forms[0].name + '&CtrlName=' + CtrlName + '&CtrlValue=' + CtrlNValue, 'winPopup', 'width=300,height=250,top=' + dateY + ',left=' + dateX + ',toolbars=no,scrollbars=no,status=no,resizable=no');
}

function GetEndDate(CtrlStartDate, CtrlEndDate) {

    var CtrlName = CtrlEndDate;

    var mmddyyyyEndDate = CtrlEndDate.split('-');
    var mmddyyyyClientId = CtrlStartDate.split('-');

    if (document.getElementById(mmddyyyyEndDate[0]).value != '--' || document.getElementById(mmddyyyyClientId[0]).value == '--') {
        mmddyyyyClientId = mmddyyyyEndDate;
    }
    var CtrlNValue = document.getElementById(mmddyyyyClientId[0]).value + "/" + document.getElementById(mmddyyyyClientId[1]).value + "/" + document.getElementById(mmddyyyyClientId[2]).value;
    var location = j$('select[id=' + mmddyyyyClientId[0] + ']').offset();
    var dateX = location.left;
    var dateY = location.top - j$(window).scrollTop() + 100;
    if ((dateY + 250) >= j$(window).height()) {
        dateY = j$(window).height() - 250;
    }
    winPopup = window.open('/Events/Popup/Calendar.aspx?FormName=' + document.forms[0].name + '&CtrlName=' + CtrlName + '&CtrlValue=' + CtrlNValue, 'winPopup', 'width=300,height=250,top=' + dateY + ',left=' + dateX + ',toolbars=no,scrollbars=no,status=no,resizable=no');
}

//popup airports
function GetAirport(Ctrl_APName, Ctrl_APCode)
{
	winPopup = window.open('/Events/Popup/Airports.aspx?FormName=' + document.forms[0].name + '&CtrAPName=' + Ctrl_APName + '&CtrAPCode=' + Ctrl_APCode ,  'winPopup', 'width=750,height=800,top=300,left=500,toolbars=no,scrollbars=yes,status=no,resizable=no');
}

// for popup email this page
function PopupEmailThisPage(PageID)
{
	winPopup = window.open('/Events/Popup/EmailPage.aspx?page=' + PageID, "winPopup", "width=650,height=400,top=300,left=500,toolbars=no,scrollbars=no,status=no,resizable=no");
}

function CheckWindow()
{
	if (winPopup != null)
	{
		winPopup.close()
	}
}

function ClosePopup()
{
	try
	{
	    if (winPopup && typeof(winPopup.closed) != "'unknown'" && !winPopup.closed)
	    {
		  winPopup.close();
	    }
	    if (newWindow && typeof(newWindow.closed) != "'unknown'" && !newWindow.closed)
	    {
		  newWindow.close();
	    }
	}
	catch(e)
	{
	}
}

// question framework function to make MC "N/A" and other regular choices mutually exclusive
function exclusivecheckbox(controlId) {
	var checkboxname = j$(controlId).parent().attr('name');
	if (checkboxname == null || checkboxname.indexOf('-', 0) < 0)
		return;
	var namePart = checkboxname.split('-');
	var part = namePart[1] == 1 ? 2 : 1;
	if (j$(controlId).attr('checked')) {
		j$('span[name=' + namePart[0] + '-' + part + ']').find('input:checkbox').removeAttr('checked');
	}
}

function exclusive() {
	var checkboxname = j$(this).parent().attr('name');
	if (checkboxname == null || checkboxname.indexOf('-', 0) < 0)
		return;
	var namePart = checkboxname.split('-');
	var part = namePart[1] == 1 ? 2 : 1;
	if (this.checked) {
		j$(this).closest('ul').find('span[name=' + namePart[0] + '-' + part + ']').find('input:checkbox').removeAttr('checked')
	}
}

//j$(document).ready(function () {
//	j$(function () {
//		j$('input:checkbox').bind('change', exclusive);
//	});
//});

j$(function () {
	if (window.Sys && window.Sys.WebForms && window.Sys.WebForms.PageRequestManager) { //Page is having Script Manager.
		Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(function (sender, args) {
			//bind the function again in asynchronous post back.
			j$('input:checkbox').bind('change', exclusive);
		});
	}
});


// ============================= < CSS Class helper functions ===============================
// generic functions for changing style rules ***************************************
function GetStyleSheetClass(cssClassName)
{
	var ds = document.styleSheets;

	for(i = 0; ds.length > i; i++) {
	    dsi = ds[i];
	    try {
	        if (dsi.rules != undefined)
	            dsir = dsi.rules; //IE

	        else {

	            dsir = dsi.cssRules; //Mozilla, Firefox
	            if (dsir == null)
	                return null;
	        }
	        for (j = 0; dsir.length > j; j++) {
	            if (dsir[j].selectorText == undefined)
	                return;
	            var selectorText = dsir[j].selectorText.toLowerCase();
	            //document.writeln(selectorText + "\\");
	            if (selectorText.toLowerCase() == cssClassName.toLowerCase()) {
	                //for (si = 0;si < dsir[j].style.length; si++) {document.writeln(dsir[j].style[si] + "<br/>");}
	                return dsir[j];
	            }
	        }
	    } catch(ex) {
	        return null;
	    }
	}
    return null;
}

function ChangeStyleSheetRule(cssClassName,theRule,changeTo)
{
	var cssClass = GetStyleSheetClass(cssClassName);

	alert(cssClass);

	if (cssClass!= null)
	{
		cssClass.style[theRule] = changeTo;
	}
}

function GetStyleSheetRuleValue(cssClassName,theRule)
{
	var cssClass = GetStyleSheetClass(cssClassName);
	if (cssClass!= null)
	{
		return cssClass.style[theRule] ;
	}
	return "";
}

function CopyStyleSheetRule (fromClass, toClass, theRule)
{
	var fromValue = GetStyleSheetRuleValue(fromClass, theRule);
	if (fromValue > "")
	{
		ChangeStyleSheetRule(toClass, theRule, fromValue);
	}

}

	// specific function for changing style rules for html button ***************************************
	function ChangeHtmlButtonColorTheme(cssClassName,theRule,changeTo)
	{
		var cssTabBgrd1, ButtonReg;
		cssTabBgrd1 = GetStyleSheetClass("TD.TabBgrd1");
		ButtonReg = GetStyleSheetClass("SPAN.ButtonReg");

		if (cssTabBgrd1 == undefined || cssTabBgrd1 == null || ButtonReg == null)
			return;
		ButtonReg.style["color"] = cssTabBgrd1.style["color"];
		ButtonReg.style["backgroundColor"] = cssTabBgrd1.style["backgroundColor"];

	}
	// use generic functions to copy TabBgrd1 color theme to Calendar Header class
	function ChangeCalendarHeaderColorTheme(cssClassName,theRule,changeTo)
	{
		var cssTabBgrd1, CalendarHeader;
		cssTabBgrd1 = GetStyleSheetClass("TD.TabBgrd1");
		CalendarHeader = GetStyleSheetClass("Table.CalendarHeader");

		if (cssTabBgrd1 == null || CalendarHeader == null)
			return;
		CalendarHeader.style["color"] = cssTabBgrd1.style["color"];
		CalendarHeader.style["backgroundColor"] = cssTabBgrd1.style["backgroundColor"];
	}

	// use generic functions to copy TabBgrd1 color theme to Calendar Next Prev text class
	function ChangeCalendarNextPrevStyle(cssClassName,theRule,changeTo)
	{
		var cssTabBgrd1, CalendarNextPrevStyle;
		cssTabBgrd1 = GetStyleSheetClass("TD.TabBgrd1");
		CalendarNextPrevStyle = GetStyleSheetClass("Font.CalendarNextPrevStyle");

		if (cssTabBgrd1 == null || CalendarNextPrevStyle == null)
			return;
		CalendarNextPrevStyle.style["color"] = cssTabBgrd1.style["color"];
	}

	// use specific function to copy TabBgrd1 color theme to HTML button
	ChangeHtmlButtonColorTheme();
	// use specific function to copy TabBgrd1 color theme to calendar header
	ChangeCalendarHeaderColorTheme();
	// use specific function to copy TabBgrd1 color theme to calendar next prev style
	ChangeCalendarNextPrevStyle();

// ============================= CSS Class helper functions > ===============================


// function to populate day drop down based on the selected month and year when using drop down lists for month, day, year
	function FillDayLookup(ddlMonth, ddlDay, ddlYear)
	{
		var SelectedMonthDays;
		var SelectedMonth = parseInt(ddlMonth.value, 10);
		if (SelectedMonth == 0)
		{return;}
		var SelectedYear = parseInt(ddlYear.value, 10);

		switch (SelectedMonth)
		{
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:
				SelectedMonthDays = 31;
				break;
			case 4:
			case 6:
			case 9:
			case 11:
				SelectedMonthDays = 30;
				break;
			case 2:
				if (SelectedYear == 0)
				{SelectedMonthDays = 28;}
				else if (SelectedYear % 4 == 0)
				{SelectedMonthDays = 29;}
				else
				{SelectedMonthDays = 28;}
				break;
			default:
				SelectedMonthDays = 0;
				break;
		}

		if (SelectedMonthDays == 0)
		{return;}

		var CurrentMonthDays = ddlDay.options.length;

		if ((CurrentMonthDays) == SelectedMonthDays)
		{
			return;
		}
		else if (CurrentMonthDays <= SelectedMonthDays)
		{
			for (i=CurrentMonthDays+1; i<=SelectedMonthDays; i++)
			{
				var oDayOption = document.createElement("OPTION");
				oDayOption.value = i;
				oDayOption.text = i;
				ddlDay.options.add(oDayOption);
			}
		}
		else if (CurrentMonthDays > SelectedMonthDays)
		{
			for (i=CurrentMonthDays; i>=SelectedMonthDays; i--)
			{
				ddlDay.options.remove(i);
			}
		}
	}
// function to populate day drop down based on the selected month and year when using drop down lists for month, day, year

function Cvent_findElement(n, doc) {
  var p,i,x;
	if(!doc)
		doc=document;
	if(!(x=doc[n]) && doc.all)
		x=doc.all[n];
	for (i=0;!x&&i<doc.forms.length;i++)
	{
		x=doc.forms[i][n];
	}
	for(i=0; !x && doc.layers && i<doc.layers.length; i++)
	{
		x=Cvent_findElement(n,doc.layers[i].document);
	}
	if(!x && doc.getElementById)
		x=doc.getElementById(n);
	return x;
}

function ToggleDisplay(objName, sDisplay)
{
	if (!Cvent_findElement)
	{
		alert("include utility.js");
	}
	if (!sDisplay)
	{
		sDisplay = "";
	}
	var obj = Cvent_findElement(objName);

	if(obj != null)
	{
		if (obj.style.display == "none")
		{
			obj.style.display = sDisplay;
		}
		else
		{
			obj.style.display = "none";
		}

    if(jQuery)
    {
      jQuery(document).trigger('refresh-size');
    }
	}
}

//this function is used to set the
//default focus on a page to the very first control visible and active
function SetDefaultFocus() {
	var $window = j$(window);
	var docViewTop = $window.scrollTop();
	var docViewBottom = docViewTop + $window.height();
	try {
		// for each form
		for (var f = 0; f < document.forms.length; f++) {
			// for each element in each form
			for (var i = 0; i < document.forms[f].length; i++) {
				var formElementToFocus = document.forms[f][i];
				// if it's not a hidden element and it's not disabled
				if (formElementToFocus.type != "hidden" && formElementToFocus.disabled != true) {
					var $elem = j$(formElementToFocus);
					var elemTop = $elem.offset().top;
					var elemBottom = elemTop + $elem.height();
					formElementToFocus.focus();
					// if element is not present in the visible window, the page will scroll down {PROD-22168})
					if (elemBottom > docViewBottom) {
						setTimeout(function () {
							window.scrollTo(0, 0);
						}, 100); // set a timeout so that ie and ff can focus comfortably before the scroll
					}
					return;
				}
			} //eof sub-for
		} //eof main for
	} catch (e) {
	}
}

function SetFocus(focusElement) {
	j$("[name ='" + focusElement + "']").focus();
}

function DisableEnterKey(e) {
    var key;

    if (!e) {
        e = window.event;
    }

    if (e.keyCode) {
        key = e.keyCode;
    }
    else {
        key = e.which;
    }

    return (key != 13);
}

function trim(value) {
    var temp = value;
    var obj = /^([\s|\n|\r]*)([\W\w]*)([\s|\n|\r]*$)/mg;
    if (obj.test(temp)) { temp = temp.replace(obj, '$2'); }
    var obj = /  /g;
    while (temp.match(obj)) { temp = temp.replace(obj, ""); }
    return temp;
}
// Sortable table jquery plugin [used on guet side attendee, staff pages]

if (window.jQuery) {
    (function(j$) {
        jQuery.fn.makeSortable = function() {
            this.each(function(i_table, v_table) {
                var tbl = j$(this).addClass("jquery-tablesort");
                if (tbl.get()[0].tagName.toUpperCase() == "TABLE") {
                    j$("th > *:first-child", tbl).each(function(i_col, v_col) {
                        var th = j$(this);
                        th.click(function() {
                            if (!j$(this).hasClass('isNotSortable')) {
                                var not = tbl.find("td table *");
                                tbl.find("tbody").not(not).each(function(i_tbody, v_tbody) {
                                    var rows = j$(v_tbody).find("tr").not(not);
                                    var bak = [], sort_as = null;
                                    rows.each(function(i_row, v_row) {
                                        var td = bak[i_row] = j$(this).find("td").not(not).eq(i_col).text() + "";
                                        var type =
                                      (!isNaN(Date.parse(td)) ? "date"
                                      : (td !== null && !isNaN(Date.parse(td.split("-")[0])) ? "date_splitted"
                                        : (!isNaN(new Number(td)) ? "number"
                                          : (!isNaN(new Number(td.replace(/^\j$/, ""))) ? "currency"
                                            : "string"))));
                                        sort_as = (!!sort_as && sort_as != type ? "string" : type);
                                    });
                                    rows = rows.sort(function(a, b) {
                                        var va = j$(a).find("td").not(not).eq(i_col).text();
                                        var vb = j$(b).find("td").not(not).eq(i_col).text();
                                        if (sort_as == "date" || sort_as == "date_splitted" ) {
                                            va = sort_as == "date_splitted" ? Date.parse(va.split("-")[0]) : Date.parse(va);
                                            vb = sort_as == "date_splitted" ? Date.parse(vb.split("-")[0]) : Date.parse(vb);
                                            return (va < vb ? -1 : (va == vb ? 0 : 1));
                                        } else if (sort_as == "currency") {
                                            return (va.replace(/^\j$/, "") - vb.replace(/^\j$/, ""));
                                        } else if (sort_as == "number") {
                                            return (va - vb);
                                        } else if (sort_as == "string") {
                                            va = va.toString().toLowerCase();
                                            vb = vb.toString().toLowerCase();
                                            return (va < vb ? -1 : (va == vb ? 0 : 1));
                                        } else {
                                            return 0;
                                        }
                                    });
                                    var isAscendingMode = th.hasClass("sort-asc");
                                    j$(".sort-asc", tbl).not(not).removeClass("sort-asc");
                                    j$(".sort-desc", tbl).not(not).removeClass("sort-desc");
                                    var fnCheck = (function() {
                                        var areAllRowsEmpty = true;
                                        for (var i = 0; i < rows.size(); i++) {
                                            if (rows.eq(i).find("td").not(not).eq(i_col).text() != bak[i])
                                                return { retValue: false, isEmpty: areAllRowsEmpty };
                                            if (trim(bak[i]) != "") {
                                                areAllRowsEmpty = false;
                                            }
                                        }
                                        return { retValue: true, isEmpty: areAllRowsEmpty };
                                    })();

                                    if (fnCheck.retValue) {
                                        if (fnCheck.isEmpty) {
                                            if (isAscendingMode)
                                                th.removeClass("sort-asc").addClass("sort-desc");
                                            else
                                                th.removeClass("sort-desc").addClass("sort-asc");
                                        } else {
                                            rows = j$(rows.get().reverse());
                                            th.removeClass("sort-asc").addClass("sort-desc");
                                        }


                                    } else {
                                        th.removeClass("sort-desc").addClass("sort-asc");
                                    }
                                    j$(v_tbody).append(rows);
                                });
                                tbl.trigger('sort');
                            }
                        });
                    });
                    tbl.trigger('sort');
                }
            });
            return this;
        }
    })(jQuery);
}

function ShowModalPopup(triggerControId, pageUrl, width, height, bUsePartialIdMatch) {
    if (height == null)
        height = "300px";
    if (width == null)
        width = "270px";

    var dialogHtml = '<div id="dialog" style="height:' + height + ';width:' + width + ';overflow:auto; -webkit-overflow-scrolling:touch;">' +
                            '<iframe id="frame" class="frame" height="95%" width="90%"  frameborder="0" />' +
                         '</div>';  //create content for dialog div
    j$('#dialogContentHolder').html(dialogHtml);      //set content to contentHolderDiv
    //Added onComplete on Colorbox Plugin to fix prod issue #31877
    if (bUsePartialIdMatch) {
        j$("[id $='" + triggerControId + "']").colorbox({ inline: true, href: j$("#dialog"), onComplete: function() { j$('#cboxTitle').css('display', 'none'); } }, setFrame(pageUrl));    //create dialog by setting the frames src
    }
    else {
        j$('#' + triggerControId).colorbox({ inline: true, href: j$("#dialog"), onComplete: function() { j$('#cboxTitle').css('display', 'none'); } }, setFrame(pageUrl));     //create dialog by setting the frames src
    }
}

function ShowModalPopupForGreyBlacklist(triggerControId, pageUrl, width, height, submitterControlId) {
    if (height == null)
        height = "300px";
    if (width == null)
        width = "270px";

    var dialogHtml = '<div id="dialog" style="height:' + height + ';width:' + width + ';overflow:auto; -webkit-overflow-scrolling:touch;">' +
                            '<iframe id="frame" class="frame" height="95%" width="90%"  frameborder="0" />' +
                         '</div>';  //create content for dialog div
    j$('#dialogContentHolder').html(dialogHtml);      //set content to contentHolderDiv
    //Added onComplete on Colorbox Plugin to fix prod issue #31877
    j$('#' + triggerControId).colorbox({ inline: true, href: j$("#dialog"), onComplete: function () { j$('#cboxTitle').css('display', 'none'); }, onClosed: function () { eval(j$('#' + submitterControlId).attr('href')); } }, setFrame(pageUrl));     //create dialog by setting the frames src
}

function ShowModalPopupForAgendaCart(triggerControId, pageUrl, width, height) {
    if (height == null)
        height = "300px";
    if (width == null)
        width = "270px";

    var dialogHtml = '<div id="dialog" style="height:' + height + ';width:' + width + ';overflow:auto; -webkit-overflow-scrolling:touch;">' +
                            '<iframe id="frame" class="frame" height="95%" width="90%"  frameborder="0" />' +
                         '</div>';  //create content for dialog div
    j$('#dialogContentHolder').html(dialogHtml);      //set content to contentHolderDiv
    //Added onComplete on Colorbox Plugin to fix prod issue #31877
    j$('#' + triggerControId).colorbox({ inline: true, href: j$("#dialog"), onComplete: function () { j$('#cboxTitle').css('display', 'none'); }, onClosed: function () { __doPostBack('btnSessionRefresh', ''); } }, setFrame(pageUrl));      //create dialog by setting the frames src
}

//function desinged for summary and payment page
function CallPopupConfirm(btnId, hdnConID) {
    var bIsClickedAgain = false;
    if (hdnConID != null) {
        var hdnCon = document.getElementById(hdnConID);
        if (hdnCon != null) {
            if (hdnCon.value == "1") {
                bIsClickedAgain = true;
            }
            hdnCon.value = "1";
        }
    }
    j$.fn.colorbox.close();

    if(!bIsClickedAgain)
        j$('#' + btnId).click();
}

//function desinged for summary and payment page
function CallPopupCancel(btnId1) {
    if (btnId1 != null) {
        document.getElementById(btnId1).removeAttribute("onclick");
    }
    j$.fn.colorbox.close();
    clickedCount = 0; //reset clicked count when press cancel
    j$('.overlay').remove();
    j$('div.register-btn-bottom').removeClass('finish-registration');
    return false;
}

function ShowSFModalPopup(triggerControId, width, height, markup) {
    if (height == null)
        height = "300px";
    if (width == null)
        width = "400px";
    var dialogHtml = '<div id="dialog" style="height:' + height + ';width:' + width + ';overflow:auto;" class="frame">' + markup +
                         '</div>';  //create content for dialog div

    j$('#dialogContentHolder').html(dialogHtml);      //set content to contentHolderDiv

    j$('#dummyDialogBtn').colorbox({ inline: true, href: j$("#dialog"), escKey: false, overlayClose: false });     //create dialog by setting the frames
}

function CloseSFModalPopup(btnId1, btnId2) {
    if (btnId1 != null) {
        document.getElementById(btnId1).removeAttribute("onclick");
    }
    if (btnId2 != null) {
        document.getElementById(btnId2).removeAttribute("onclick");
    }
    j$.fn.colorbox.close();
    return false;
}

function ShowApplyDiscountModalPopup(triggerControId, width, height, markup) {
    if (height == null)
        height = "300px";
    if (width == null)
        width = "400px";
    var dialogHtml = '<div id="dialog" style="height:' + height + ';width:' + width + ';overflow:auto; -webkit-overflow-scrolling:touch;" class="frame">' + markup +
                         '</div>';  //create content for dialog div

    j$('#dialogContentHolder').html(dialogHtml);      //set content to contentHolderDiv

    j$('#dummyDialogBtnForDiscount').colorbox({ inline: true, href: j$("#dialog"), escKey: false, overlayClose: false });     //create dialog by setting the frames
}

function CallApplyDiscountPopupSave(sDscntCode, bIsBulkReg, sRegCartStub, nRegCartStatusId, hdnAttendeeListID) {
    if (hdnAttendeeListID != null) {
        var hdnAttendeeList = document.getElementById(hdnAttendeeListID);
        if (hdnAttendeeList != null) {
            j$('table#tblRCA input[type=checkbox]:checked').each(function (i) {
                hdnAttendeeList.value = hdnAttendeeList.value + this.value + ",";
            });
        }
    }
    PageMethods.ApplyDiscountCodeFromPopup(sDscntCode, bIsBulkReg, sRegCartStub, nRegCartStatusId, hdnAttendeeList.value, hdnAttendeeListID, OnApplyDiscountSuccess, null);
    return false;
}

function OnApplyDiscountSuccess(result) {
    if (result != "") {
        var array = result.split(";");
        var div = document.getElementById('divError');
        var p = document.getElementById('pError');
        div.style.display = '';
        p.innerHTML = array[0];

        if(jQuery)
        {
          jQuery(document).trigger('refresh-size');
        }
        var hdnAttendeeList = document.getElementById(array[1]);
        hdnAttendeeList.value = "";
    }
    else {
        j$.fn.colorbox.close();
        document.aspnetForm.submit();
    }
}

function CallApplyDiscountPopupCancel(btnId1) {
    j$.fn.colorbox.close();
    return false;
}

function OpenSingleChoicePopup(pageURL) {
    winPopup = window.open(pageURL + '&FormName=' + document.forms[0].name, "window1", "width=500px,height=520px,top=300,left=500,toolbars=no,scrollbars=no,status=no,resizable=yes");
}

function setFrame(pageUrl) {
    j$('.frame').attr('src', pageUrl)
}

function ShowSingleChoicePopUp(triggerControId, pageUrl, width, height) {
    j$('#' + triggerControId).colorbox({ iframe: true, href: pageUrl, innerWidth: width, innerHeight: height });
}

function ShowForgotPwdPopUp(triggerControId, pageUrl, width, height) {
    j$('#' + triggerControId).colorbox({ iframe: true, href: pageUrl, innerWidth: width, innerHeight: height });
}

function ShowDocumentAttachmentPopUp(triggerControId, pageUrl, width, height) {
    j$('#' + triggerControId).colorbox({ iframe: true, href: pageUrl, innerWidth: width, innerHeight: height });
}


var MRSessionTimeoutID;

//Session Timout due to Inactivity Methods
var MRSessionTimeoutValue = 59;  // 59
var MRSessionTimeoutOffset = 19; //40
function StartSessionTimer(sSmmFromStub) {
    // disable the timer if document is in the frame
    if (window.top.location != document.location) {
        return;
    }
    set_cookie("MRTimeout", (new Date()).toUTCString(), null);
    MRSessionTimeoutID = window.setTimeout("SessionTimeoutPopup('" + sSmmFromStub + "')", 60000 * (MRSessionTimeoutValue - MRSessionTimeoutOffset));
}

function set_cookie(name, value, expirationDate) {
    document.cookie = name + "=" + value + ";path=/;" + (expirationDate == null ? "" : "expires=" + expirationDate.toUTCString());
}

function get_cookie(Name) {
    var search = Name + "="
    var returnvalue = "";
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search)
        // if cookie exists
        if (offset != -1) {
            offset += search.length
            // set index of beginning of value
            end = document.cookie.indexOf(";", offset);
            // set index of end of cookie value
            if (end == -1) end = document.cookie.length;
            returnvalue = unescape(document.cookie.substring(offset, end))
        }
    }
    return returnvalue;
}

function SessionTimeoutPopup(sSmmFromStub) {
    // check if there are activities from other broswer instances/tabs
    var latm = get_cookie("MRlatm");
    if (latm.length > 0) {
        var dLmt = new Date(latm);
        var dNow = new Date((new Date()).toUTCString());
        var cTimer = new Date(get_cookie("MRTimeout"));
        if (((dNow.getTime() - dLmt.getTime()) < (60000 * (MRSessionTimeoutValue - MRSessionTimeoutOffset)))
                &&
            ((dNow.getTime() - cTimer.getTime()) < (60000 * (MRSessionTimeoutValue - MRSessionTimeoutOffset)))) {
            return;
        }
    }
    var getPageSize = function() {
        var xScroll, yScroll;
        if (window.innerHeight && window.scrollMaxY) {
            xScroll = window.innerWidth + window.scrollMaxX;
            yScroll = window.innerHeight + window.scrollMaxY;
        } else if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac
            xScroll = document.body.scrollWidth;
            yScroll = document.body.scrollHeight;
        } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
            xScroll = document.body.offsetWidth;
            yScroll = document.body.offsetHeight;
        }

        var windowWidth, windowHeight;

        if (self.innerHeight) {	// all except Explorer
            if (document.documentElement.clientWidth) {
                windowWidth = document.documentElement.clientWidth;
            } else {
                windowWidth = self.innerWidth;
            }
            windowHeight = self.innerHeight;
        } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
            windowWidth = document.documentElement.clientWidth;
            windowHeight = document.documentElement.clientHeight;
        } else if (document.body) { // other Explorers
            windowWidth = document.body.clientWidth;
            windowHeight = document.body.clientHeight;
        }

        // for small pages with total height less then height of the viewport
        if (yScroll < windowHeight) {
            pageHeight = windowHeight;
        } else {
            pageHeight = yScroll;
        }

        // for small pages with total width less then width of the viewport
        if (xScroll < windowWidth) {
            pageWidth = xScroll;
        } else {
            pageWidth = windowWidth;
        }
        //////////   Added width limit as stupid IE looses opacity when you increase the width of the box beyound certain limit.
        if (Prototype.Browser.IE && xScroll > 1500)
            xScroll = 1500;

        return [xScroll, pageHeight];
        //return [pageWidth, pageHeight];
    };

    //Parent div(transparent) to make the backgroud grayed out
    window.focus();
    var divTag = document.getElementById("divSession");
    var divParent = document.getElementById("divParent")

    if (divParent == null) {
        divParent = document.createElement("div");
        divParent.id = "divParent";
        divParent.className = "transparentDiv";
        divTag = document.createElement("div");
        divTag.id = "divSession";
        divTag.setAttribute("align", "center");
        divTag.className = "dynamicDiv";
        divTag.innerHTML = "<table cellspacing='0' cellpadding='0' style='width:100%;border-style:none;'>"
                        + "<tr height='20%'><td style='border:1px solid black; padding-left:10px;text-align:center'><img src='/a/images/cvent_logo.gif' /></td></tr>"
                        + "<tr height='20%'><td align='center' class='FormSubSecHeadCenter' style='font-size:16px;border-left: 1px solid black;border-right: 1px solid black;color:#303030;'><br/>This session is about to expire.<br/></td></tr>"
                        + "<tr height='60%'><td class='FormLabelNoTextAlignWidth' align='center' style='font-size:14px;;border-left: 1px solid black;border-right: 1px solid black; border-bottom:1px solid black;color:#303030;' >Click <b>Continue</b> to continue with this session and complete the form.<br/>Click <b>Close</b> to end this session and exit this form.<br/><br/></br><br/><br/><input type='image' id='btn_Continue' OnClick='ContinueSession(\"" + sSmmFromStub + "\")' src='/a/images/button_continue.gif' />&nbsp;&nbsp;&nbsp;<input  type='image' id='btn_logout' OnClick='LogoutSession(\"" + sSmmFromStub + "\")' src='/a/images/button_close.gif'/><br/><br/></td></tr>"
                        + "</table>";
        document.body.appendChild(divParent);
        var pageSize = getPageSize();
        divParent.style.width = pageSize[0];
        divParent.style.height = pageSize[1];
        document.body.appendChild(divTag);

        if(jQuery)
        {
          jQuery(document).trigger('refresh-size');
        }
    }
    else {
        divParent.style.display = "block";
        divTag.style.display = "block";

        if(jQuery)
        {
          jQuery(document).trigger('refresh-size');
        }
    }

    //Setting the width and height of the div.
    if (typeof(document.viewport) != "undefined") {
        var arrayPageScroll = document.viewport.getScrollOffsets();
        var divTop = 100; var divLeft = 300;
        $(divTag).setStyle(
        {
            top: (arrayPageScroll.top + divTop) + 'px',
            left: (arrayPageScroll.left + divLeft) + 'px'
        }
     );
    }

    // start second timer for automatically close window 1 min later
    window.setTimeout('if (document.getElementById("divSession").style.display != "none") RedirectToLogin(\"' + sSmmFromStub + '\");', 60000);
}

function ContinueSession(sSmmFromStub) {
    new Ajax.Request(utility_GetAppRoot() + "/images/pix.aspx?img=0",
                    {
                        //postBody: '',
                        method: 'get',
                        //contentType: "application/json",
                        onSuccess: onSuccessRecieve.bindAsEventListener(this, sSmmFromStub),
                        onFailure: function(res) { RedirectToLogin(sSmmFromStub) }
                    });
    document.getElementById("divSession").style.display = "none";
    document.getElementById("divParent").style.display = "none";
    if(jQuery)
    {
      jQuery(document).trigger('refresh-size');
    }
}

function onSuccessRecieve(req, sSmmFromStub) {
    if (req.status == 200) {
        StartSessionTimer(sSmmFromStub);
    }
    else {
        RedirectToLogin(sSmmFromStub);
    }
}

function RedirectToLogin(sSmmFromStub) {
    var requestWebsiteStub = getQueryVariable('rwstub');
    var requestStub = getQueryVariable('requeststub');
    if (requestWebsiteStub == null) {
        new Ajax.Request(utility_GetAppRoot() + "/images/pix.aspx",
                {
                    postBody: '',
                    method: 'post',
                    //contentType: "text/html",
                    onSuccess: function (transport) { document.location = utility_GetAppRoot() + "/SMMForm/MeetingRequest/Logout.aspx?smm_form_stub=" + sSmmFromStub; },
                    onFailure: function (transport) { document.location = utility_GetAppRoot() + "/SMMForm/MeetingRequest/Logout.aspx?smm_form_stub=" + sSmmFromStub; }
                });
    }
    else {
        new Ajax.Request(utility_GetAppRoot() + "/images/pix.aspx",
               {
                   postBody: '',
                   method: 'post',
                   //contentType: "text/html",
                   onSuccess: function (transport) {
                       if (requestStub != null)
                           document.location = utility_GetAppRoot() + "/SMMForm/MeetingRequest/Logout.aspx?smm_form_stub=" + sSmmFromStub + "&rwstub=" + requestWebsiteStub + "&requeststub=" + requestStub;
                       else
                           document.location = utility_GetAppRoot() + "/SMMForm/MeetingRequest/Logout.aspx?smm_form_stub=" + sSmmFromStub + "&rwstub=" + requestWebsiteStub;
                   },
                   onFailure: function (transport) {
                       if (requestStub != null)
                           document.location = utility_GetAppRoot() + "/SMMForm/MeetingRequest/Logout.aspx?smm_form_stub=" + sSmmFromStub + "&rwstub=" + requestWebsiteStub + "&requeststub=" + requestStub;
                       else
                           document.location = utility_GetAppRoot() + "/SMMForm/MeetingRequest/Logout.aspx?smm_form_stub=" + sSmmFromStub + "&rwstub=" + requestWebsiteStub
                   }
               });
    }

}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
}

function LogoutSession(sSmmFromStub) {
  if (document.getElementById("divSession").style.display == "none") {
      return;
  }
  var requestWebsiteStub = getQueryVariable('rwstub');
  var requestStub = getQueryVariable('requeststub');
  var sUrl;

  sUrl = utility_GetAppRoot() + "/SMMForm/MeetingRequest/Logout.aspx?smm_form_stub=" + sSmmFromStub;
  if (requestWebsiteStub != null)
      sUrl = sUrl + "&rwstub=" + requestWebsiteStub;
  if (requestStub != null)
      sUrl = sUrl + "&requeststub=" + requestStub;
  window.location = sUrl;
}


/**************************************** controls ****************************************/
j$(document).ready(function () {

	var ua = j$.browser;

	// browser sniffing
	function sniff_the_browser() {
		if (ua.msie) {
			if (j$.browser.version == 6.0) { j$('body').addClass('ie6'); }
			else if (j$.browser.version == 7.0) { j$('body').addClass('ie7'); }
			else if (j$.browser.version == 8.0) { j$('body').addClass('ie8'); }
			else if (j$.browser.version == 9.0) { j$('body').addClass('ie9'); }
		}
		else if (ua.mozilla) { j$('body').addClass('firefox'); }
		else if (ua.opera) { j$('body').addClass('opera'); }

		// which webkit browser is it? chrome or safari?
		var userAgent = navigator.userAgent.toLowerCase();
		j$.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());

		if (j$.browser.chrome) {
			userAgent = userAgent.substring(userAgent.indexOf('chrome/') + 7);
			userAgent = userAgent.substring(0, userAgent.indexOf('.'));
			j$.browser.version = userAgent;
			j$.browser.safari = false;
			j$('body').removeClass('safari').addClass('chrome');
		}
		if (j$.browser.safari) {
			userAgent = userAgent.substring(userAgent.indexOf('safari/') + 7);
			userAgent = userAgent.substring(0, userAgent.indexOf('.'));
			j$.browser.version = userAgent;
			j$('body').addClass('safari');
		}
	};
	sniff_the_browser(); //execute

	// buttons - For Reg Matrix Redesign
	j$('.cv-button').each(function () {
		if (j$(this).hasClass('spelling')) {
			j$(this).button({
			}).removeAttr('role').removeClass('ui-corner-all').addClass('ui-corner-left ui-helper-reset').find('input').attr('role', 'button');
		}
		else if (j$(this).hasClass('language')) {
			j$(this).button({
				text: false,
				icons: { secondary: 'ui-icon-gear' }
			}).removeAttr('role').removeClass('ui-corner-all').addClass('ui-corner-right ui-helper-reset').find('input').attr('role', 'button');
		}
		else if (j$(this).hasClass('add-new')) {
			j$(this).button({
				icons: { primary: 'ui-icon-plusthick' }
			}).removeAttr('role').find('input').attr('role', 'button');
		}
		else if (j$(this).hasClass('add')) {
			j$(this).button({
				icons: { secondary: 'ui-icon-triangle-1-s' }
			}).removeAttr('role').find('input').attr('role', 'button');
		}
		else if (j$(this).hasClass('actions')) {
			j$(this).button({
				icons: { secondary: 'ui-icon-triangle-1-s' }
			}).removeAttr('role').find('input').attr('role', 'button');
		}
		else if (j$(this).hasClass('arrow-right')) {
			j$(this).button({
				text: false,
				icons: { secondary: 'ui-icon-carat-1-e' }
			}).removeAttr('role').find('input').attr('role', 'button');
			j$(this).find('label').addClass('ui-helper-hidden-accessible');
		}
		else if (j$(this).hasClass('arrow-left')) {
			j$(this).button({
				text: false,
				icons: { secondary: 'ui-icon-carat-1-w' }
			}).removeAttr('role').find('input').attr('role', 'button');
		}
		else if (j$(this).hasClass('search')) {
			j$(this).button({
				text: false,
				icons: { primary: 'ui-icon-search' }
			}).removeClass('ui-corner-all').addClass('ui-corner-right');
		}
		else {
			j$(this).button().removeAttr('role').find('input').attr('role', 'button');
		}
	});

	j$('.cv-wrapper').each(function () {
		if (j$(this).hasClass('cv-data-tag')) {
			j$(this).find('div').button({
				text: false,
				icons: { primary: 'ui-icon-tag' }
			}).addClass('ui-trigger').removeAttr('role').find('input').attr('role', 'button').addClass('ui-helper-reset');
		}
		else if (j$(this).hasClass('cv-html-editor')) {
			j$(this).find('input:button').button({
			}).addClass('ui-trigger');
		}
	});

	// focus state for form fields
	j$('input:text,input:password,input:radio,input:checkbox,textarea').focus(function () {
		j$(this).addClass('ui-state-focus');
	}).blur(function () {
		j$(this).removeClass('ui-state-focus');
	});
});

//Used by service hub polling on identity confirmation pages
function CheckProgress(processStub, processingMessage, errorMessage, onGroupRegPage) {
  j$.blockUI({
  	css: {
  		'font-size': '26px',
  		border: 'none',
  		padding: '15px',
  		backgroundColor: '#000',
  		'-webkit-border-radius': '10px',
  		'-moz-border-radius': '10px',
  		opacity: '0.5',
  		color: '#FFFFFF'
  	},
  	message: processingMessage,
  	onBlock: function () {
  		j$(".blockPage").addClass("EvtProcessing text-header");
  	}
});

  var errorMsg = '<div id="custom-error" style="color:Red;" tabindex="-1"><ul><li>' + errorMessage + '</li></ul></div>'
  var nextButton = 'btnNext';
  if (typeof onGroupRegPage === "undefined") { } else if (onGroupRegPage == true) {
  nextButton = 'btnAddNext';
  }

  var cnt = 0;
  var i = setInterval(function () {
  	j$.ajax({
  		type: "POST",
  		contentType: "application/json; charset=utf-8",
  		url: '/Events/WS/PollIdentity.asmx/IsFinished',
  		data: "{'processStub': '" + processStub + "'}",
  		dataType: "json",
  		success: function (data) {
  			if (data.d) {
  				j$('#hdnProcessStub').val(processStub);
  				clearInterval(i);
  				if (onGroupRegPage == true) {
  					j$('#hdnTrigger').val('Next');
  				}
  				eval(j$('[id$="' + nextButton + '"]').attr('href')); //uncomment this to trigger a click
  				//also add skip logic
  			}
  			else if (cnt < 20) {
  				cnt++;
  				j$("div.blockMsg").append(".");
  			}
  			else {
  				clearInterval(i); j$.unblockUI();
  				j$('div.error-msg').html(errorMsg);
  			}
  		},
  		error: function (data) {
  			clearInterval(i); j$.unblockUI();
  			j$('div.error-msg').html(errorMsg);
  		}
  	})
  }, 3000);
}

setDocumentDomain();


function plannerRegDomainSupport() {
	var postSizeTarget = parent.postMessage ? parent : (parent.document.postMessage ? parent.document : undefined);
	//this is currently redundant since we always set this, but we should reevaluate how we handle this
    //for guest side reg at some point
	setDocumentDomain();

  postSizeTarget.postMessage('ready', '*');
}

jQuery(window).on('load', function postReady() {
  var postSizeTarget =  parent.postMessage ? parent : (parent.document.postMessage ? parent.document : undefined);

  postSizeTarget.postMessage('almost-ready', '*');
});



function resizeForPlannerReg()
{
  window.lastSentHeight = 0;
  var $ = jQuery;
  // sends content height via iframe
  function postSize(target, postAuto) {

   	if (typeof target !== 'undefined' && null !== target && document.body.scrollHeight) {
   	  var newHeight;
      if (j$("div#container").length !== 0) {
        // error page
        newHeight = j$("div#container").outerHeight(true);
      } else {
        // reg form
        newHeight = j$("div.middle").outerHeight() + j$("div.bottom").outerHeight() + j$("div.top").outerHeight();
      }

      var colorbox = $('#colorbox');
      if(postAuto) {
        target.postMessage('auto', '*');
      }
      else if (colorbox.length  && colorbox.is(':visible')) {
        //colorbox throws off our height measurements, and the popup can be bigger than the page
        var minHeight = colorbox.outerHeight();
        if (minHeight > newHeight ) {
          window.lastSentHeight = minHeight;
          target.postMessage(minHeight, '*');
        }
        //never set the container to newHeight because it is not reliable with popups open
        //EXCEPT when we've never set the height
        if(0 == window.lastSentHeight) {
          window.lastSentHeight = newHeight;
          target.postMessage(newHeight, '*');
        }
      }
 	    else if (newHeight !== window.lastSentHeight) {
 	        window.lastSentHeight = newHeight;
 	        target.postMessage(newHeight, '*');
 	    }
   	}
  };



  $('div.content').css('min-height', 'auto');

	var postSizeTarget = parent.postMessage ? parent : (parent.document.postMessage ? parent.document : undefined);

  var doPost = function() { postSize(postSizeTarget); };
  var doPostDeferred = function() { setTimeout(doPost, 0); };

  jQuery(document).delegate('.reg-matrix-btn a', 'click', function() { window.suppressIframeSizeRefresh = true;});


  if(window.addEventListener){
      window.addEventListener('unload', function() {
        if(!window.suppressIframeSizeRefresh) {
          postSize(postSizeTarget, true);
        }
      }, false);
  }

  $(document).ajaxComplete(doPost);
  $(document).on('refresh-size', doPostDeferred);

  $(document).ready(function(){
    if(typeof Sys === "undefined")
    {
      return;
    }
    if(Sys && Sys.WebForms && Sys.WebForms.PageRequestManager)
    {
      Sys.WebForms.PageRequestManager.getInstance().add_endRequest(doPostDeferred);
    }
  });

  var holder = $.fn.animate;

  //this function is being redefined in order to help resize the containing iframe in planner reg
  $.fn.animate = function(prop, speed, easing, callback) {
    //jQuery.speed is what handles the fact that you can use either an
    //options object or a set of three arguments
    var optall = jQuery.speed(speed, easing, callback);

    if(optall.complete)
    {
      var onComplete = optall.complete;
      optall.complete = function() {
        doPostDeferred();
        return onComplete.apply(this, arguments);
      }
    }
    else
    {
      optall.complete = doPostDeferred;
    }

    return holder.apply(this, [prop, optall]);
  };

  doPostDeferred();

}

var postMessageHandlers = {
  'switch-domain' : plannerRegDomainSupport,
  'resize-for-planner-reg' : resizeForPlannerReg
};

function handlePostMessage(e) {
  var handler = postMessageHandlers[e.data];
  if("function" === typeof handler) {
    //DO NOT PASS e TO handler
    //ie8 has some bugs related to postmessage
    //to get around one bug you have to call the handler
    //with setTimeout. But the event loses almost
    //all of its properties so we need to copy the ones
    //that we need

    var args = {data: e.data};

    setTimeout( function(){ handler(args); }, 0);
  }
}


//change domain for planner reg
if(window.addEventListener){
        window.addEventListener('message', handlePostMessage, false);
}
else {
    window.attachEvent('onmessage', handlePostMessage); // for ie8
}


(function($) {
	$(document).ready(function() {
		if ($('div.cookie-disabled').length) {
			CheckCookies();

			$(document).on('click', '.cookie-disabled-btn-close', function () {
				HideCookieDisabledDiv();
			});

		}

		if ($('div.cookie-banner').length) {
		    CheckCookies();

		    $(document).on('click', '.cookie-banner-accept-btn', function () {
		        HideCookieBannerDiv();
		        j$.ajax({
		            type: "POST",
		            contentType: "application/json; charset=utf-8",
		            url: '/Events/WS/CookieBanner.asmx/SetCookieBannerFlag',
		            async: true,
		            dataType: "json",
		            success: function (data) {
		            },
		            error: function (data) {
		            },
		            complete: function (data) {
		            }
		        })
		    });
		}
	});

	function ShowCookieDisabledDiv() {
		$('div.cookie-disabled').show();
	}
	function HideCookieDisabledDiv() {
		$('div.cookie-disabled').hide();
	}

	function ShowCookieBannerDiv() {
	    var consentCookie = get_cookie('-cvt_cookieconsent-');
	    if (consentCookie.length > 0) {	        
	        $('div.cookie-banner').hide();
	    } else {	        
	        $('div.cookie-banner').show();
	    }
	    
	}
	function HideCookieBannerDiv() {
	    var dateNow = new Date();
	    var year = new Date().getFullYear() + 10;
	    var month = new Date().getMonth();
	    var day = new Date().getDate();
	    var expDate = new Date(year, month, day);	    
	    set_cookie('-cvt_cookieconsent-', 'dismiss', expDate);	    
	    $('div.cookie-banner').hide();
	}

	function CheckCookies() {
		var cookies = navigator.cookieEnabled ||
			("cookie" in document && (document.cookie.length > 0 || (document.cookie = "test").indexOf.call(document.cookie, "test") > -1));
		if (cookies) {
		    HideCookieDisabledDiv();
		    ShowCookieBannerDiv();
		} else {
		    ShowCookieDisabledDiv();
		    HideCookieBannerDiv();
		}
	}


})(jQuery);



