var clientId = '177980335969-cfretq6m4ms60rtlqpuia36997m24bg6.apps.googleusercontent.com';
var apiKey = 'AIzaSyBkAjmp2jWnaDdNKgfg_u11CetPKpe9LCg';
var scopes = 'https://www.googleapis.com/auth/drive';


function handleClientLoad() {
    gapi.client.setApiKey(apiKey);
    window.setTimeout(checkAuth,1);
}

function checkAuth() {
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false},makeApiCall());
}

function makeApiCall() {  
    gapi.client.load('drive', 'v2').then(function(){
    	var request = gapi.client.drive.files.get({
			'fileId': '1TPVCGDjMYoNBMqAvgBhq42xOJgXaRRBsHYsoOIbA_cY' //0B4IUoYeCenkjaXJXdGY1b3N3Szg
		});
		request.execute(function(resp) {
			console.log('Title: ' + resp.title);
			console.log('Description: ' + resp.description);
			console.log('MIME type: ' + resp.mimeType);
		});
    });
}

function loadVisualization(){
	google.load("visualization", '1', {packages:['corechart']});
	google.setOnLoadCallback(drawChart);
}

function drawChart() {
	var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1TPVCGDjMYoNBMqAvgBhq42xOJgXaRRBsHYsoOIbA_cY/gviz/tq?Range=A1:B');
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
