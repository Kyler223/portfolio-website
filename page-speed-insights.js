function run() {
    const url = setUpQuery();
    fetch(url)
        .then(response => response.json())
        .then(json => {
        console.log(json);

        const websiteTestSection = document.getElementById('website-test-section');
        const page = document.createElement('p');
        page.textContent = `Page tested: ${json.id}`;
        websiteTestSection.appendChild(page);

        const jsonP = document.createElement('p');
        jsonP.textContent = `Speed Index: ${json.lighthouseResult.audits}`;
        websiteTestSection.appendChild(jsonP);
        });
}
  
function setUpQuery() {
// const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
// const parameters = {
//   url: '?url=https://developers.google.com',
//   key: "&key=AIzaSyDnOBcSj68rmhf8H08TZLhCSpw4exOrC64"
// };
// let query = `${api}?`;
// for (key in parameters) {
//   query += `${key}=${parameters[key]}`;
// }
// return query;
const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://kylernelson.dev&key=AIzaSyDnOBcSj68rmhf8H08TZLhCSpw4exOrC64&strategy=mobile&category=performance';
return api
}
run();