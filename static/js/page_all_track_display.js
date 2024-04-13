function setDefaultTrackBadgePreference() {
    localStorage.setItem("track_badge", "1");
}

function setTrackBadgeDisplayStatus(selectElement) {
    localStorage.setItem("track_badge", String(selectElement.value));

    displayTrackBadgeElement();
}

function displayTrackBadgeElement() {
    let status = localStorage.getItem("track_badge");
    if (status === null) {
        setDefaultTrackBadgePreference();
        status = "1";
    }

    if (status === "0") {
        setElementDisplay("page-all-track-badge", "none");
    }
    else if (status === "1") {
        setElementDisplay("page-all-track-badge-stats", "inline-block");
        setElementDisplay("page-all-track-badge-tags", "none");
    }
    else if (status === "2") {
        setElementDisplay("page-all-track-badge-stats", "none");
        setElementDisplay("page-all-track-badge-tags", "inline-block");
    }
}