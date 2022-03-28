// var msgTextArea = document.getElementById('message-input');
var defaultMsg = 'Dear Kyler Nelson,';
var buildingStr = ''
var increment = 0;
var afterMsgIncrement = 0;

var typing = setInterval(function () {
    if(defaultMsg[increment]){
        document.getElementById('message-input').focus();
        buildingStr = `${buildingStr}${defaultMsg[increment]}`;
        document.getElementById('message-input').value = buildingStr;
        increment++;
    }
    else {
        if(afterMsgIncrement === 0 || afterMsgIncrement === 1) {
            //this string may look wrong but this is the only way to go to the next line
            buildingStr = `${buildingStr}
`;
            document.getElementById('message-input').value = buildingStr;
            afterMsgIncrement++
        }
        else {
            clearInterval(typing);
        }
    }
}, 120)