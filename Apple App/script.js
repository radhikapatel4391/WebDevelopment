/**
 * Created by Radhika D Patel on 4/20/2016.
 */

//using ajax call i got app data and store it in two dimensional array (tabledata).
// First dimention data is image url and other is string which include name price and category.
//Sort the data using array sort function then display it on webpage using dynamic table
//on key press event, called function which recreate table data based on search text.


var tableRef;
var searchBox ;
var categoryCombo ;
var priceCombo ;
var chartRef;
var SearchData;
var tableData;


document.addEventListener('DOMContentLoaded', getData);

function getData() {

    tableRef = document.getElementById("gameTable");
    searchBox = document.getElementById("searchBox");
    categoryCombo =  document.getElementById("category");
    priceCombo =  document.getElementById("price");
    chartRef = document.getElementById('chart');
    searchBox.addEventListener("click",removeValue);
    var URL = "https://itunes.apple.com/us/rss/toppaidapplications/limit=100/json";
    makeAjaxCall(URL, "GET").then(successHandler, errorHandler);
}
//this function extract needed data from receive data(ajaxcall data). and store it in tabledata array which is two dimentional
function successHandler(data)
{
    objData = infoFromData(data);
    tableData = objData.allData;
    tableData.sort();
    SearchData = tableData.slice(0);//for future use;
    addDataInTable(tableData,tableRef);//show data in table
    chartData('Category');//draw chart 
    chartRef.selectedIndex=0;   
    var optionCategory = findCluster(objData.category);
    makeComboBox(optionCategory.clusterName,categoryCombo,'Category');
    var optionPrice = findCluster(objData.price);
    makeComboBox(optionPrice.clusterName,priceCombo,'Price',1111111);
}
function infoFromData(data) {
    var len = data.feed.entry.length; //make len global;
    var tableData = new Array(len); //make tableData global intentionally;
    var category = [];
    var price = [];
    var name = [];
    var image = [];
    for(var i=0; i < len; i++) {
        tableData[i] = new Array(4);
        //tableData[i][0] = category + " " + price + " " + name;
        tableData[i][0] = data.feed.entry[i].category.attributes.label;
        tableData[i][1] = data.feed.entry[i]["im:price"].label;
        tableData[i][2] = data.feed.entry[i]["im:name"].label;
        tableData[i][3] = (data.feed.entry[i]["im:image"][0].label) ;        
        category[i] = data.feed.entry[i].category.attributes.label;
        price[i] = data.feed.entry[i]["im:price"].label;
        name[i] = data.feed.entry[i]["im:name"].label;
        image[i] = (data.feed.entry[i]["im:image"][0].label) ;
    }
    var objData = {
        category:category,
        price:price,
        name:name,
        image:image,
        allData:tableData
    }
    return objData;
}
function addDataInTable(tableData,tableRef)
{   
    tableRef.innerHTML = "";
    var temp;
    var len = tableData.length;
    for(var i=0; i < len; i++) {
        temp = "&nbsp" + tableData[i][0]+ " " + tableData[i][1]+ " " + tableData[i][2] ;
        createRowforAppTable(tableData[i][3],temp);
    }
}
function searchResult(ref)
{
    SearchData = searchDataInTable();
   // console.log(SearchData);
    addDataInTable(SearchData,tableRef);
    if(ref.id == 'category') {
        cref = 'Price';
        chartRef.selectedIndex = 2;
    }else if(ref.id == 'price') {
        cref = 'Category';
        chartRef.selectedIndex = 1;
    }else{
        cref = chartRef.value;
    } 
    chartData(cref);
}
function searchDataInTable() {
    var categoryVlaue = categoryCombo.value.toLowerCase();
    var priceValue = parseFloat(priceCombo.value.slice(1));
    var searchBoxValue = searchBox.value.toLowerCase();   
    SearchData=[]; 
    var count = 0;
    var len = tableData.length;
    for(var i=0; i < len; i++) {
        var str = ("&nbsp" + tableData[i][0]+ " " + tableData[i][1]+ " " + tableData[i][2]).toLowerCase();
        var pricestr = parseFloat(tableData[i][1].slice(1));//console.log("typeof price",typeof pricestr);
        var categorystr = tableData[i][0].toLowerCase();//console.log(categoryVlaue);//
        //console.log(categorystr.search(categoryVlaue) > -1 , priceValue > pricestr, str.search(searchBoxValue) > -1);
        if(categorystr.search(categoryVlaue) > -1 && priceValue >= pricestr && str.search(searchBoxValue) > -1)
        {   
            SearchData[count] = tableData[i];
            count++;
        }
    }
    return SearchData;
}

function createRowforAppTable(image, description) {
    var row = tableRef.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML =  '<img src= ' + image + ' class="img-thumbnail" alt='+name+ ' width="100" height="100"> ' ;
    cell2.innerHTML = description;
}
function sortByColumn(a, colIndex){
    a.sort(sortFunction);
    function sortFunction(a, b) { 
            if (a[colIndex] === b[colIndex]) {
                    return 0;
            }
            else {
                    return (a[colIndex] < b[colIndex]) ? -1 : 1;
            }       
    }
    return a;
}
function chartData(ref)
{  
    var k = ref == 'Category' ? 0 : 1;
    //chartRef.selectedIndex = k+1;
    var chartSearchData = SearchData.map(function(value,index) { return value[k];});
    var data = findCluster(chartSearchData);
    var len = data.clusterCount.length;
    var chartData=[];
   for(var i=0;i<len;i++)
   {
       chartData.push([data.clusterName[i],data.clusterCount[i]]);
   }
    drawHighChart(ref,chartData);
}
function drawHighChart(name,data)
{
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Chart'
        },
        tooltip: {
            pointFormat: '"Count" {point.y}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: name,
            colorByPoint: true,
            data: data
        }]
    });
}
function findCluster(data) {
    //console.log("I am array data which got",data);
    data.sort();
    var clusterName=[];
    var clusterCount=[];
    var arrlen = data.length;
    if(arrlen>1)
    {
        var preStr = data[0];
        var currentStr = data[1];
        var count = 1;
        var arrcounter=0;
        for(i=1;i<arrlen-1;i++)
        {
            if(currentStr===preStr)
            {
                count++;
            }
            else{
                clusterName.push(preStr);
                clusterCount.push(count);
                count=1;
                arrcounter++;
            }
            currentStr = data[i+1];
            preStr = data[i];
        }
        if(currentStr===preStr)
        {
            count++;

        }else{
            clusterName.push(preStr);
            clusterCount.push(count);
            count=1;
            arrcounter++;
            preStr = data[arrlen-1];
        }
        clusterName.push(preStr);
        clusterCount.push(count);
    }else if(arrlen==1)
    {
        clusterName.push(data[0]);
        clusterCount.push(1);
    }
    var cluster = {
        clusterName:clusterName,
        clusterCount:clusterCount
    }
    return cluster;

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
                    //console.log(respJson.feed.entry);
                    resolve(respJson);
                } else {
                    reject(xhr.status);
                }
            }
        }
    });
    return promiseObj;
}
function removeValue() {
    searchBox.value = "";
}
function makeComboBox(options,comboBoxRef,type,defValue) {
    // Create the <select>
    //theSelect = document.createElement('select');
// Give the <select> some attributes
    //theSelect.name = 'name_of_select';
   // theSelect.id = 'id_of_select';
    //theSelect.className = 'class_of_select';
// Define something to do onChange
   // theSelect.onchange = function () {
        // Do whatever you want to do when the select changes
        //alert('You selected option '+this.selectedIndex);
    //h};
// Add some <option>s
    var anOption = document.createElement('option');
    anOption.value = defValue ? defValue : "";
    anOption.innerHTML = type ? type : comboBoxRef.id;
    comboBoxRef.appendChild(anOption);
    numOptions = options.length;
    for (i = 0; i < numOptions; i++) {
         anOption = document.createElement('option');
        anOption.value = options[i];
        anOption.innerHTML = options[i];
        comboBoxRef.appendChild(anOption);
    }
// Add the <div> to the DOM, then add the <select> to the <div>
    //document.getElementById('container_for_select_container').appendChild(theContainer);
    //theContainer.appendChild(theSelect);

}


