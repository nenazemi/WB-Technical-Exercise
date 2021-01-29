function getNewRequiredFieldText(lblElement) {

	// if the element is something other than label (e.g. TD) because the form required class is on that element
	if ('label' !== lblElement.tagName.toLowerCase()) {
		var labels = j$(lblElement).find('label');
		if (labels.length === 1) {
			lblElement = labels[0];
		}
	}

	var value = "";

    if (lblElement.innerText) {
        value = lblElement.innerText;
        if (value != "" && value.indexOf("*") != 0)
            lblElement.innerText = "*" + lblElement.innerText;
    }
    else if (lblElement.textContent) {
        value = lblElement.textContent;
        if (value != "" && value.indexOf("*") < 0)
            lblElement.textContent = "*" + lblElement.textContent;
    }
    if (lblElement.innerHTML == "*") {
        lblElement.innerHTML = "";
    }
}

function modifyRequiredFields(cssClass) {
    var els = $$("." + cssClass);

    for (var i = 0; i < els.length; i++) {
        if (Element.hasClassName(els[i], cssClass)) {
            getNewRequiredFieldText(els[i]);
        }
    }
}

function onPageLoadModifyRequiredFields() {
    modifyRequiredFields("FormLabelReq");
}

function onPageLoadModifyRequiredFieldsForNewClass() {
    modifyRequiredFields("reg-required-field");
}

function onPageLoadModifyRequiredFieldsForNewClassRefactor() {
    j$('.reg-required-field').each(function addAsteriskToRequiredFieldLabel() {
        var label = j$(this);
        if (label.children().length > 0) {
            label = label.find('label').first();
        }

        var labelText = label.text();
        if (labelText != "" && labelText.indexOf("*") < 0) {
            label.text("*" + labelText);
        }
    });
}

function onPageLoadModifyRequiredFieldsRefactor() {
    j$('.FormLabelReq').each(function addAsteriskToRequiredFieldLabel() {
        var label = j$(this);
        if (label.children().length > 0) {
            label = label.find('label').first();
        }

        var labelText = label.text();
        if (labelText != "" && labelText.indexOf("*") < 0) {
            label.text("*" + labelText);
        }
    });
}