function setElementDisplay(className, status) {
    var elements = document.getElementsByClassName(className);
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = status;
    }
}

/* https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript top answer*/
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/* ChatGPT generated */
async function fetchAndProcessJson(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch data: ' + response.statusText);
        }

        return response.json();
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error to propagate it further if needed
    }
}

// time_show.js
function addLeadingContent(obj, max_length, content) {
    return obj.toString().padStart(2, content)
}