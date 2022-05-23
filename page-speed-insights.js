const websiteTestSection = document.getElementById('website-test-section');
const websiteTestAlert = document.getElementById('website-test-alert');
const urlTestInput = document.getElementById('url-test-input');
const form = document.getElementById("PageSpeed-API-Form"); 

form.addEventListener('submit', runWebsiteTest);

function checkURL() {
    const alert = document.getElementById('web-test-alert');
    if(alert) {
        websiteTestSection.removeChild(alert);
    }
    const UsersURL = urlTestInput.value;
    console.log(UsersURL);
    if(!UsersURL.startsWith("https://") || !UsersURL.startsWith("http://")) {
        websiteTestAlert.textContent = `Your URL needs to start with 'https://' or 'http://'`;
    }
}

function runWebsiteTest(event) {
    event.preventDefault();
    websiteTestAlert.textContent = "";

    const url = setUpQuery(urlTestInput.value);
    fetch(url)
        .then(response => response.json())
        .then(json => {
        console.log(json);

        const page = document.createElement('p');
        page.textContent = `Page tested: ${json.id}`;
        websiteTestSection.appendChild(page);

        //get the biggest weights
        const auditRefs = json.lighthouseResult.categories.performance.auditRefs;
        var weights = {};
        Object.entries(auditRefs).forEach(([key, value]) => {
            if(value.weight > 0) {
                weights[key] = value;
            }
        });

        console.log(weights);

        const audits = json.lighthouseResult.audits;
        Object.entries(weights).forEach(([key, value]) => {
            const p = document.createElement('p');
            p.textContent = `${audits[value.id].title}: ${audits[value.id].displayValue}`;
            websiteTestSection.appendChild(p);
        });
    });
}

//configure entered url with google page speed api link
function setUpQuery(url) {
    const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
    const parameters = {
        url: `?url=${url}`,
        key: "&key=AIzaSyDnOBcSj68rmhf8H08TZLhCSpw4exOrC64",
        strategy: "&strategy=mobile"
    };
    let query = api;
    for (key in parameters) {
        query += `${parameters[key]}`;
    }
    return query;
}

function loading() {

}