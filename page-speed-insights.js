const websiteTestSection = document.getElementById('website-test-section');
const websiteTestAlert = document.getElementById('website-test-alert');
const urlTestInput = document.getElementById('url-test-input');
const form = document.getElementById("PageSpeed-API-Form");

//loading bar
const loadingBar = document.getElementById("greenBar");
let stepValue = 0;
let id = '';

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
        //not working fetch
        //
        // fetch(UsersURL)
        // .then(response => {
        //   console.log('response.status: ', response.status);
        //   if(response.ok){
        //       runWebsiteTest();
        //   }
        //   else {
        //     websiteTestAlert.textContent = `Could not reach URL (Error Code ${response.status})`;
        //   }
        // })
        // .catch(err => {
        //   console.log(err);
        // });
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

    //request json from api
    var UsersURL = urlTestInput.value;
    loading(UsersURL);
    if(!UsersURL.startsWith("https://") || !UsersURL.startsWith("http://")) {
        UsersURL = "http://" + UsersURL;
    }
    const url = setUpQuery(UsersURL);
    fetch(url)
        .then(response => response.json())
        .then(json => {
        
        //done loading
        loadingBar.style.width = `100%`;
        stepValue = 100;
        clearInterval(id); 
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
    const label = document.getElementById('testing-page-label');
    label.textContent = `Testing Page: ${url}`;
    stepValue = 5;
    id = setInterval(frame, 1200);
  
    function frame() {
      if (stepValue >= 100) {
        clearInterval(id);
      }
      else {
        var random = Math.random() * (5 - 2.5) + 2.5;
        if(stepValue >= 70){
            random = Math.random() * (1.25 - .5) + .5;
        }
        if(stepValue >= 85){
            random = Math.random() * (0.625 - .25) + .25;
        }
        if(stepValue >= 95){
            random = Math.random() * (0.3125 - .125) + .125;
        }
        loadingBar.style.width = `${stepValue + random}%`;
        stepValue = stepValue + random;
      }
    }
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