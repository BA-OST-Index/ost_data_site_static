let ZHCN_CONVERSION_DB = fetchAndProcessJson("https://ba-static.cnfast.top/public_data/main/i18n_zhcn_conversion/export/i18n_zhcn_all_min.json")

function convertZhcn() {
    let allZhcnElements = document.getElementsByClassName("i");

    if (ZHCN_CONVERSION_DB === undefined) {
        ZHCN_CONVERSION_DB = fetchAndProcessJson("https://ba-static.cnfast.top/public_data/main/i18n_zhcn_conversion/export/i18n_zhcn_all_min.json");
    }

    for (let i = 0; i < allZhcnElements.length; i++) {
        const currElement = allZhcnElements[i];

        // save the original content to a data attribute if not
        // (e.g. first time being inited)
        if (currElement.dataset.text === undefined) {
            currElement.dataset.text = currElement.innerHTML;
        }

        // ChatGPT generated the following code from here
        // and I modified to it to suit
        let _mode = localStorage.getItem("zh_cn");
        switch (_mode) {
            case "zh_cn_jp":
                _mode = 0;
                break;
            case "zh_cn_cn":
                _mode = 1;
                break;
            case "zh_cn_tw":
                _mode = 2;
                break;
            default:
                _mode = 0;
        }

        let temp = currElement.dataset.text;
        for (const [key, values] of Object.entries(ZHCN_CONVERSION_DB)) {
            for (const entry of values) {
                for (const i in entry) {
                    const searchStr = "{" + key + i + "}";
                    const replaceStr = "{" + key + entry[_mode] + "}";
                    temp = temp.replace(searchStr, replaceStr);
                }
            }
        }
        currElement.innerHTML = temp;
    }
}

addEventListener("DOMContentLoaded", function() {convertZhcn()});