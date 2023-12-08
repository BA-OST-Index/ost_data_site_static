var current_popup = void 0;

function setScrollToNone() {document.getElementsByTagName("html")[0].style = "";}
function setScrollToSmooth() {document.getElementsByTagName("html")[0].style = "scroll-behavior: smooth;";}

function removePopup(popup) {
    popup.hide();
    current_popup.popupEl.remove();
}

function showPopupByTooltipId(tooltip_id) {
    if (current_popup !== void 0) {
        removePopup(current_popup);
    }

    current_popup = new Popup({"title": "  ",
        "content": tooltip_data[tooltip_id],
        hideCallback: () => {
            setScrollToSmooth();
        },
    });
    setScrollToNone();
    current_popup.show();
    display_zhcn_element();
}