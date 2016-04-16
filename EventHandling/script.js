/**
 * Created by Radhika D Patel on 4/15/2016.
 */
//task1
function firstRow()
{
    var divElem = document.getElementById("firstRowDiv");

    divElem.addEventListener("click", function(event){
        alert("Div is clicked!");//1.2 Put a click event on first div and that should say div is clicked
        var targetBtn = event.target;
        // event received from the button
        if (targetBtn.nodeName === "BUTTON"){
            alert("First Row button is clicked!");//1.1 First Row should alert First button is clicked
        } else {
            console.log("Clicked on something else")
        }
    });

}

//task 2 have a click event on first row div and its button and when button is clicked only button message should come
function stopPropogationTask()
{
    var divElem = document.getElementById("firstRowDiv");
    divElem.addEventListener("click", function (event) {
        alert("Div is clicked!");
    });
    var divBtn = divElem.getElementsByTagName("button");
    //console.log(divBtn);
    for (var inc = 0, len = divBtn.length; inc < len; inc++)
    {
        divBtn[inc].addEventListener("click", function (event)
        {
            var targetBtn = event.target;

            alert(targetBtn.innerHTML + "Button of Div is clicked");
            event.stopPropagation();
        })
    }
}

//task 3 when click on first row buttons it should alert only the index
function indexAlert()
{
    var divElem = document.getElementById("firstRowDiv");
    var divBtn = divElem.getElementsByTagName("button");
    for (var inc = 0, len = divBtn.length; inc < len; inc++)
    {
        divBtn[inc].addEventListener("click", function (event)
        {
            var targetBtn = event.target;

            alert(targetBtn.innerHTML);
        })
    }

}