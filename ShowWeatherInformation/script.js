/**
 * Created by Radhika D Patel on 4/16/2016.
 */
//this has two phase.
// Phase1 create table.
//Phase2 Delete table.
//Phase1: based on search box value (cityName) makeajaxcall function called which gives weather information of city.
//Using these information dynamic table is created.
    //Phase2: given Click event on table.
    //Based on Click target(event.target) different function are called.
    //if target is checkbox then its find checkbox location(using different properties of event object) and update selectedRows array
//else alert value if its on cell of tbody and it has text value.

var tableBodyId = document.getElementById("tableBodyId");
var tableRef = document.getElementById("weatherInfoTable");
var selectAll = document.getElementById("selectAll");
var selectedRows=[]; //store row Index which used in deleteRow function


function removeValue() {

    document.getElementById("cityName").value = "";
}

//this function get data from text box(cityname) and based on value ,call function makeAjaxCall
function addWather() {
    var cityName = document.getElementById("cityName").value;
    var URL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=3a80e441d381a17a43c79a9261d3778a";
    makeAjaxCall(URL, "GET").then(infoFromData, errorHandler);
}

//this function extract information from data and call function for showing this information in table
function infoFromData(data) {
    createRowforwatherInfoTable(tableBodyId,data.name,data.weather[0].description);
}


//this function required data for column and ref of table body, return create row
function createRowforwatherInfoTable(tableBodyId,name,Description) {

    var row = tableBodyId.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell2.innerHTML = name;
    cell3.innerHTML = Description;
    createCheckBox(cell1);
}

//for given root its create checkbox
function createCheckBox(rootNode) {
    var x = document.createElement("INPUT");
    x.setAttribute("type", "checkbox");
    rootNode.appendChild(x);
}

//this function alert error if data not found or problem in data fetch
function errorHandler(statusCode){
    alert("Not able to present data due to error  ",statusCode);
}

//delete all simply remove table data
function deleteAllRow(tableBodyId) {
    tableBodyId.innerHTML = "";
}

//single row delete based on row id
function deleteRow(tableBodyId,rowId) {    
    tableBodyId.deleteRow(rowId-1);
}

//on delete button this will called if all selected then it will call deleteAllRow
// else it will call deleteRow

function deleteForTableFunction() {    
    if(tableBodyId.rows.length == selectedRows.length)//Check, is all row is selected??
    {
        deleteAllRow(tableBodyId);
        selectedRows = [];
        selectAll.checked = false;
        
    }else
    {
        selectedRows.sort(); //required because row index dynamically change so..without sort it will may give error index out of bound
        for(var i= 0;i<selectedRows.length;i++) {            
            deleteRow(tableBodyId,(selectedRows[i]-i));
        }
        selectedRows = [];
    }
}


tableRef.addEventListener("click", function(event) {
    if(event.target.nodeName == 'INPUT')
    {   if(event.target.checked) { //for true selection of Selected all
            if (event.target.parentNode.nodeName == 'TH') {
                selectedRows=[];
                var noOfRows = tableBodyId.rows.length;
                for(var i=0; i<noOfRows;i++)//Foe selected all, all checkbox must show checked so..
                {
                   tableBodyId.rows[i].cells[0].childNodes[0].checked = true;
                    selectedRows.push(i+1);
                }               
            } else {
                i = event.target.parentNode.parentNode.rowIndex; //got the index of cheked row
                selectedRows.push(i);
            }
        }else //for uncheked of Selected all
        {
            if (event.target.parentNode.nodeName == 'TH') {  
                selectedRows=[];
                 noOfRows = tableBodyId.rows.length;
                for( i=0; i<noOfRows;i++)
                {
                    tableBodyId.rows[i].cells[0].childNodes[0].checked = false;
                }
            } else {
                 i = event.target.parentNode.parentNode.rowIndex;
                var index = selectedRows.indexOf(i);
                selectedRows.splice(index, 1);    
            }
        }
    }else if(event.target.nodeName == 'TD'){
        
        if(event.target.childElementCount == 0) {  //if cell has text then only alert
            alert(event.target.innerHTML);
        }
    }
});

//This function make ajax call for data, based on url
function makeAjaxCall(url, methodType){
    var promiseObj = new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
        xhr.open(methodType, url, true);
        xhr.send();
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4){
                if (xhr.status === 200){
                    var resp = xhr.responseText;
                    var respJson = JSON.parse(resp);
                    console.log(respJson);
                    resolve(respJson);
                } else {
                    reject(xhr.status);
                }
            }
        }
    });
    return promiseObj;
}