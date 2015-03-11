vgoogle.load("visualization", '1', {packages:['corechart']});
google.setOnLoadCallback(drawChart);

function drawChart() {
	var request = gapi.client.request({
	        'path': '/drive/v2/files',
	        'method': 'GET',
	        'params': {'maxResults': '1'}
	});
	var request = gapi.client.drive.files.get({
	    'fileId': '0B4IUoYeCenkjaXJXdGY1b3N3Szg'
	});
	request.execute(function(resp) {
		console.log('Title: ' + resp.title);
	    console.log('Description: ' + resp.description);
	    console.log('MIME type: ' + resp.mimeType);
	  });
	
  var query = new google.visualization.Query(
      'https://docs.google.com/spreadsheets/d/12roNN8tNqX1s0jMg-Om51wqzckUYX9iq0wVDemll2CI/gviz/tq?range=A23:B');
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