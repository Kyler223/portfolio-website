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
    const UsersURL = urlTestInput.value;
    console.log(UsersURL);
    var error = false;

    if(!UsersURL.startsWith("https://") && !UsersURL.startsWith("http://")) {
        websiteTestAlert.textContent = `Your URL needs to start with 'https://' or 'http://'`;
        error = true;
    }

    if(!UsersURL.includes('.')) {
        websiteTestAlert.textContent = `Your input does not contain '.'`;
        error = true;
    }

    if(!UsersURL) {
        websiteTestAlert.textContent = `Your input is empty`;
        error = true;
    }

    // let response = await fetch(theURL);
    // console.log(response.status);
    console.log(`url error: ${error}`);
    if(!error){
        runWebsiteTest();
    }
}

function runWebsiteTest() {
    console.log('Running: runWebsiteTest()');
    websiteTestAlert.textContent = "";
    loading();

    //request json from api
    const url = setUpQuery(urlTestInput.value);
    fetch(url)
        .then(response => response.json())
        .then(json => {

        loadingBar.style.width = `100%`;
        stepValue = 100;
        clearInterval(id);   
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
    stepValue = 5;
    id = setInterval(frame, 1500);
  
    function frame() {
      if (stepValue >= 100) {
        clearInterval(id);
      }
      else {
        loadingBar.style.width = `${stepValue + 5}%`;
        stepValue = stepValue + 5;
      }
    }
}