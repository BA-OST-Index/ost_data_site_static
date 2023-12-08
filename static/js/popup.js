var currentPopup = void 0;

function setScrollToNone() {document.getElementsByTagName("html")[0].style = "";}
function setScrollToSmooth() {document.getElementsByTagName("html")[0].style = "scroll-behavior: smooth;";}

function removePopup(popup) {
    popup.hide();
    currentPopup.popupEl.remove();
}

function showPopupByTooltipId(tooltip_id) {
    if (currentPopup !== void 0) {
        removePopup(currentPopup);
    }

    currentPopup = new Popup({"title": "  ",
        "content": tooltip_data[tooltip_id],
        hideCallback: () => {
            setScrollToSmooth();
        },
    });
    setScrollToNone();
    currentPopup.show();
    displayZhcnString();
}