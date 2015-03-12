var clientId = '177980335969-cfretq6m4ms60rtlqpuia36997m24bg6.apps.googleusercontent.com';
var apiKey = ''; //AIzaSyBkAjmp2jWnaDdNKgfg_u11CetPKpe9LCg
var scopes = 'https://www.googleapis.com/auth/drive';


function handleClientLoad() {
	console.log("something");
    gapi.client.setApiKey(apiKey);
    window.setTimeout(checkAuth,1);
}

function checkAuth() {
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true},makeApiCall());
}

function makeApiCall() {  
    gapi.client.load('drive', 'v2', makeRequest);
	   
}

function makeRequest(){
	var request = gapi.client.drive.files.get({
		'fileId': '0B4IUoYeCenkjaXJXdGY1b3N3Szg'
	});
	request.execute(function(resp) {
		console.log('Title: ' + resp.title);
		console.log('Description: ' + resp.description);
		console.log('MIME type: ' + resp.mimeType);
	});
}

		
// function createNewFile(  ) {
// 	gapi.client.load('drive', 'v2', function() {
// 		var request = gapi.client.request({
// 			'path': '/drive/v2/files',
// 			'method': 'POST',
// 			'body':{
// 				"title" : "SoilData_15-03-11_1132_001.xls",
// 				"mimeType" : "application/excel",
// 				"description" : "soilMoisture",
// 				"convert" : "true"
// 			}
// 		});
// 		request.execute(function(resp) { console.log(resp); });
// 	});
// }
function loadVisualization(){
	google.load("visualization", '1', {packages:['corechart']});
	google.setOnLoadCallback(drawChart);
}

function drawChart() {
	var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/12roNN8tNqX1s0jMg-Om51wqzckUYX9iq0wVDemll2CI/gviz/tq?range=A23:B');
	query.send(handleQueryResponse);
}

function handleQueryResponse(response) {
	if (response.isError()) {
    	alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  	}
	var data = response.getDataTable();
	var options = {
		width: 1000,
		height: 563,
		hAxis: {
			title: 'Time (s)'
        },
        vAxis: {
			title: 'Voltage (V)'
        }
	};
	
	var chart = new google.visualization.LineChart(document.getElementById('columnchart'));
	chart.draw(data, options);
}
