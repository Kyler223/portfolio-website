const websiteTestSection = document.getElementById('website-test-section');
const websiteTestAlert = document.getElementById('website-test-alert');
const urlTestInput = document.getElementById('url-test-input');
const form = document.getElementById("PageSpeed-API-Form");
const label = document.getElementById('testing-page-label');

//stop form from reloading on submit
form.addEventListener('submit', formSubmit);
function formSubmit(event) {
    event.preventDefault();
}

function checkURL() {
    websiteTestAlert.textContent = "";
    var UsersURL = urlTestInput.value;
    console.log(UsersURL);
    var error = false;

    if(!UsersURL.includes('.')) {
        websiteTestAlert.textContent = `Your input does not contain '.'`;
        error = true;
    }

    if(UsersURL === '.') {
        websiteTestAlert.textContent = `Your input cannot be '.'`;
        error = true;
    }

    if(!UsersURL) {
        websiteTestAlert.textContent = `Your input is empty`;
        error = true;
    }

    if(!error) {
        runWebsiteTest();
    }

}

function runWebsiteTest() {
    console.log('Running: runWebsiteTest()');
    websiteTestAlert.textContent = '';
    const pageTested = document.getElementById('page-tested');
    const platformTested = document.getElementById('platform-tested');
    const environmentTested = document.getElementById('environment-tested');

    pageTested.textContent = '';
    platformTested.textContent = '';
    environmentTested.textContent = '';

    document.documentElement.style.setProperty('--metrics-display', 'block');
    document.documentElement.style.setProperty('--ring-opacity', .4);
    document.documentElement.style.setProperty('--loading-bar-and-label-opacity', 1);
    document.documentElement.style.setProperty('--green-bar-color', '#0DFFA6');

    //request json from api
    var UsersURL = urlTestInput.value;
    loading(UsersURL);
    if(!UsersURL.startsWith("https://") && !UsersURL.startsWith("http://")) {
        UsersURL = "http://" + UsersURL;
    }
    const url = setUpQuery(UsersURL);
    fetch(url)
        .then(response => response.json())
        .then(json => {

        if(json.id) {
            //done loading
            console.log(json);
    
            pageTested.textContent = `Page tested: ${json.id}`;
            platformTested.textContent = `Platform: ${json.lighthouseResult.configSettings.formFactor}`;
            environmentTested.textContent = `Environment: ${json.lighthouseResult.environment.networkUserAgent}`;
            
    
            const audits = json.lighthouseResult.audits;
            Object.entries(audits).forEach(([key, value]) => {
                if(key === 'first-contentful-paint') {setMetrics('FCP', value);}
                if(key === 'interactive') {setMetrics('TTI', value);}
                if(key === 'speed-index') {setMetrics('SI', value);}
                if(key === 'total-blocking-time') {setMetrics('TBT', value);}
                if(key === 'largest-contentful-paint') {setMetrics('LCP', value);}
                if(key === 'cumulative-layout-shift') {setMetrics('CLS', value);}
            });
            document.documentElement.style.setProperty('--ring-opacity', 1);
            document.documentElement.style.setProperty('--loading-bar-and-label-opacity', 0);
        }
        else {
            label.textContent = `ERROR could not reach: ${UsersURL}`;
            document.documentElement.style.setProperty('--green-bar-color', '#FF0D00');
        }
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

function loading(url) {
    label.textContent = `Testing Page: ${url}`;
}

function color(score) {
    var color = '';
    if(score >= .85) {
        color = 'green';
    }
    else if(score < .85 && score > .4) {
        color = 'yellow'
    }
    else {
        color = 'red'
    }

    return color
}

function crop(score) {
    var crop = '';
    score = score * 100;
    if(score < 33.33) {
        score = score * 3;
        score = score - 100;
        score = score * -1;
        crop = `clip-path: polygon(50% 51%,101% 101%,0% 101%,0% 0%,0% 0%,0% ${score}%)`
    }
    else if(score >= 33.33 && score < 66.66) {
        score = score - 33.33;
        score = score * 3;
        crop = `clip-path: polygon(50% 51%,101% 101%,0% 101%,0% 0%,101% 0%,${score}% 0%)`
    }
    else {
        score = score - 66.66;
        score = score * 3;
        crop = `clip-path: polygon(50% 51%,101% 101%,0% 101%,0% 0%,101% 0%,101% ${score}%)`
    }

    return crop;
}

function setMetrics(acronym, value) {
    const numberElem = document.getElementById(`${acronym}-number`);
    const colorElem = document.getElementById(`${acronym}-color`);
    const scoreElem = document.getElementById(`${acronym}-score`);

    numberElem.textContent = value.displayValue;
    colorElem.className += ` ring-${color(value.score)}`;
    colorElem.setAttribute('style', crop(value.score));
    scoreElem.textContent = `Score: ${value.score * 100}`;
    console.log(value);
}