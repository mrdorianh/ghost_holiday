var server = 'box5154.bluehost.com';
var server_backup = '162.241.224.35';
var port = 3306;
var dbName = 'dhcaptur_glholiday';
var username = 'dhcaptur_gltest';
var password = 'xxx';
var url_bck = 'jdbc:mysql://'+server_backup+':'+port+'/'+dbName;
var url_m = 'jdbc:mysql://'+server+':'+port+'/'+dbName;
var conn = null;

function doGet() {
//readData();

ScriptApp.newTrigger('readData')
.timeBased()
.everyMinutes(5)
.create();
}

function readData() {
   
  try {
    conn = Jdbc.getConnection(url_bck, username, password);
    console.log('Server IP successfull.');
  } catch (e) {
    // Logs an ERROR message.
    console.error(e);
    console.log('Falling back to domain name as server');
    conn = Jdbc.getConnection(url_m, username, password);
  }
  
 var stmt = conn.createStatement();
 var results = stmt.executeQuery('SELECT * FROM testglholiday');
 var metaData=results.getMetaData();
 var numCols = metaData.getColumnCount();
 var spreadsheet = SpreadsheetApp.getActive();
 var sheet = spreadsheet.getSheetByName('Client Entries');
 sheet.clearContents();
 var arr=[];

 for (var col = 0; col < numCols; col++) {
   arr.push(metaData.getColumnName(col + 1));
 }

 sheet.appendRow(arr);

while (results.next()) {
 arr=[];
 for (var col = 0; col < numCols; col++) {
   arr.push(results.getString(col + 1));
 }
 sheet.appendRow(arr);
}

results.close();
stmt.close();
sheet.autoResizeColumns(1, numCols+1);

}
var server = 'box5154.bluehost.com';
var server_backup = '162.241.224.35';
var port = 3306;
var dbName = 'dhcaptur_glholiday';
var username = 'dhcaptur_gltest';
var password = 'xxx';
var url_bck = 'jdbc:mysql://'+server_backup+':'+port+'/'+dbName;
var url_m = 'jdbc:mysql://'+server+':'+port+'/'+dbName;
var conn = null;

function doGet() {
//readData();

ScriptApp.newTrigger('readData')
.timeBased()
.everyMinutes(5)
.create();
}

function readData() {
   
  try {
    conn = Jdbc.getConnection(url_bck, username, password);
    console.log('Server IP successfull.');
  } catch (e) {
    // Logs an ERROR message.
    console.error(e);
    console.log('Falling back to domain name as server');
    conn = Jdbc.getConnection(url_m, username, password);
  }
  
 var stmt = conn.createStatement();
 var results = stmt.executeQuery('SELECT * FROM testglholiday');
 var metaData=results.getMetaData();
 var numCols = metaData.getColumnCount();
 var spreadsheet = SpreadsheetApp.getActive();
 var sheet = spreadsheet.getSheetByName('Client Entries');
 sheet.clearContents();
 var arr=[];

 for (var col = 0; col < numCols; col++) {
   arr.push(metaData.getColumnName(col + 1));
 }

 sheet.appendRow(arr);

while (results.next()) {
 arr=[];
 for (var col = 0; col < numCols; col++) {
   arr.push(results.getString(col + 1));
 }
 sheet.appendRow(arr);
}

results.close();
stmt.close();
sheet.autoResizeColumns(1, numCols+1);

}
