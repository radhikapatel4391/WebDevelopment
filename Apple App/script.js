/**
 * Created by Radhika D Patel on 4/20/2016.
 */

//using ajax call i got app data and store it in two dimensional array (tabledata).
// First dimention data is image url and other is string which include name price and category.
//Sort the data using array sort function then display it on webpage using dynamic table
//on key press event, called function which recreate table data based on search text.
var tableRef = document.getElementById("gameTable");
var serchBox = document.getElementById("serchBox");
document.addEventListener('DOMContentLoaded', getData);

function getData() {
    var URL = "https://itunes.apple.com/us/rss/toppaidapplications/limit=100/json";
    makeAjaxCall(URL, "GET").then(infoFromData, errorHandler);
}
//this function extract needed data from receive data(ajaxcall data). and store it in tabledata array which is two dimentional
function infoFromData(data) {
     len = data.feed.entry.length; //make len global;
     tableData = new Array(len); //make tableData global intentionally;
    for(var i=0; i < len; i++) {
        tableData[i]=new Array(2);
        tableData[i][0] = (" &nbsp " + category + " " + price + " " + name);
        var category = data.feed.entry[i].category.attributes.label;
        var price = data.feed.entry[i]["im:price"].label;
        var name = data.feed.entry[i]["im:name"].label;
        tableData[i][1] = (data.feed.entry[i]["im:image"][0].label) ;
    }
    addSortedDataInTable(tableData);
    
    
}

function addSortedDataInTable(tableData)
{
   // var len = tableData.length;
    tableData.sort();
    for(var i=0; i < len; i++) {
        createRowforwatherInfoTable(tableData[i][1],tableData[i][0]);
    }
}
function searchDataInTable() {
    //console.log("Hello I am called");
    serchBoxValue = serchBox.value;
    serchBoxValue.toLowerCase();
    tableRef.innerHTML = "";
    for(var i=0; i < len; i++) {
        var str = tableData[i][0].toLowerCase();
        if(str.search(serchBoxValue) > -1)
        {	
            createRowforAppTable(tableData[i][1],tableData[i][0] );
        }
        
    }
   

}

function createRowforAppTable(image, description) {

    var row = tableRef.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML =  '<img src= ' + image + ' class="img-thumbnail" alt='+name+ ' width="100" height="100"> ' ;
    cell2.innerHTML = description;
    // insertImg(cell1,image);
}

function errorHandler(statusCode){
    alert("Not able to present data due to error  ",statusCode);
}

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
                    console.log(respJson.feed.entry);
                    resolve(respJson);
                } else {
                    reject(xhr.status);
                }
            }
        }
    });
    return promiseObj;
}

serchBox.addEventListener("click",removeValue);


function removeValue() {

    serchBox.value = "";
   
}



/*function insertImg(rootNode,image)
{
    var img = document.createElement('img');
    img.src = "images/camera1.jpg";
    img.width = "100px";
    img.height = "100px";
    rootNode.appendChild(img);
    
}*/