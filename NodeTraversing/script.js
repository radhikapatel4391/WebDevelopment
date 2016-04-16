/**
 * Created by Radhika D Patel on 4/15/2016.
 */
var secRef = document.getElementsByTagName("section");
//1.Query DOM and alert how many section elements are there <<Show all possible way to get dom elements>>
function SectionFind()
{

    alert("No of Section are  " + secRef.length);

    //Finding HTML elements by id
    /*var idRef = document.getElementById("mainDiv");
     alert("I am using  document.getElementById(mainDiv)  " + idRef);

     //Finding HTML elements by class name
     var classNameRef = document.getElementsByClassName("section1");
     alert("I am using document.getElementsByClassName('section1')  " + classNameRef);

     //Finding HTML elements by CSS selectors
     var cssSelecRef =  document.querySelectorAll("section > span");
     alert("I am using CSS selectors document.querySelectorAll('section > span')  " + cssSelecRef);

     //Finding HTML elements by HTML object collections
     var htmlObjRef = document.title;
     alert("I am using HTML object collections document.title  " + htmlObjRef );
     */
}

//task2 2.Check if section has id attribute or not? If Not,set attribute called id with some random value.
function getSetAttribute()
{

    for (var inc = 0, len = secRef.length; inc < len; inc++) {
        if (!secRef[inc].hasAttribute('id')) {

            secRef[inc].setAttribute("id", 'secId'+ Math.round( (Math.random())*10) );
            console.log(secRef[inc].getAttribute('id'));
            var temp = document.getElementById("result");
            var br = document.createElement("br");
            temp.appendChild(br);
            temp.innerHTML = temp.innerHTML +   " section " + secRef[inc] + " has id :  " + secRef[inc].getAttribute('id');
        }
    }

}

// task3.Show how many div and button are present inside each section
function divBtnFind() {

    var numberOfBtn = [];
    var numberOfDiv = [];
    for (var inc = 0, len = secRef.length; inc < len; inc++) {
        var temp;
        temp = secRef[inc].getElementsByTagName("button");
        numberOfBtn[inc] = temp.length;
        temp = secRef[inc].getElementsByTagName("div");
        numberOfDiv[inc] = temp.length;
        temp = document.getElementById("result");
        var br = document.createElement("br");
        temp.appendChild(br);
        temp.innerHTML = temp.innerHTML +   " section " + secRef[inc].id + " has " + numberOfBtn[inc] + "  Buttons and " +  numberOfDiv[inc] + " Divisions.";
    }
}
//task 4 When button is clicked, change corresponding section span value
function changeSpan() {
    //you can set event Listener to section btn(first get section ref then find btn and then add event Listener) and then change span
    alert("Click on button Please!");
    var btnref = document.getElementsByTagName("button");
    for (var inc = 0, len = btnref.length; inc < len; inc++) {
        btnref[inc].addEventListener("click", function (event)
        {   console.log( event.path[1].childNodes[1].nodeName);
            for(i=0; i<event.path.length;i++)
            {
                if(event.path[i].nodeName == 'SECTION')
                {
                    for(j=0; j<event.path[i].childNodes.length; j++)
                    {
                        if(event.path[i].childNodes[j].nodeName == 'SPAN')
                        {
                            event.path[i].childNodes[j].innerHTML = "I have changed by  " + event.target.innerHTML + " Button.";
                            event.path[i].childNodes[j].style.color = 'red';
                        }
                    }
                }
            }
        })
    }
}