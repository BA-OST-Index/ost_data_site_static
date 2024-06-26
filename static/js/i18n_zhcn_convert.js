var ZHCN_CONVERSION_DB = undefined;

async function initZhcnConversionDB() {
    while (true) {
        try {
            ZHCN_CONVERSION_DB = await fetchAndProcessJson("https://ba-static.cnfast.top/public_data/main/i18n_zhcn_conversion/export/i18n_zhcn_all_min.json");
            break;
        } catch (err) {
            console.error(`Error initializing zhcn: ${err}`)
        }
    }
}

function _convertZhcn(element) {
    const currElement = element;

    // save the original content to a data attribute if not
    // (e.g. first time being inited)
    if (currElement.dataset.text === undefined) {
        let _innerHTML = currElement.innerHTML;
        _innerHTML = _innerHTML.replaceAll("'", "[single_quote]");
        currElement.dataset.text = encodeURIComponent(_innerHTML);
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
        case "all":
            _mode = 3;
            break;
        default:
            _mode = 0;
    }

    let temp = decodeURIComponent(currElement.dataset.text);
    temp = temp.replaceAll("&amp;", "&");
    temp = temp.replaceAll("[single_quote]", "'");

    for (const [key, values] of Object.entries(ZHCN_CONVERSION_DB)) {
        for (const entry of values) {
            for (const i of entry) {
                const searchStr = "{" + key + i + "}";

                let replaceStr;
                if (_mode === 3) {
                    replaceStr = entry[0] + " (zh_cn_jp) / " + entry[1] + " (zh_cn_cn) / " + entry[2] + " (zh_cn_jp) "
                }
                else {
                    replaceStr = entry[_mode];
                }

                temp = temp.replaceAll(searchStr, replaceStr);
            }
        }
    }
    currElement.innerHTML = temp;
}

function convertZhcn() {
    let allZhcnElements = document.getElementsByClassName("i18n-zhcn-text");

    if (ZHCN_CONVERSION_DB === undefined) {
        initZhcnConversionDB();
        return;
    }

    for (let i = 0; i < allZhcnElements.length; i++) {
        const currElement = allZhcnElements[i];
        _convertZhcn(currElement);
    }
    _convertZhcn(document.getElementsByTagName("title")[0]);
}