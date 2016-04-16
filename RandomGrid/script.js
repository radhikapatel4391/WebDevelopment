/**
 * Created by Radhika D Patel on 4/15/2016.
 */
    var DisableFlagCounter=0;
    function getRandomArbitrary(min, max) {
        return (Math.random() * (max - min) + min);
    }
    function gridSize(min,max){
        var size={};
        size.x = Math.round(getRandomArbitrary(min, max));
        size.y = Math.round(getRandomArbitrary(min, max));
        return size;
    }

    function makeGrid(x,y) {
        DisableFlagCounter += (x*y);
        for (var i=0;i<x;i++)
        {   var div = document.createElement("DIV");
            for(var j=0;j<y; j++)
            {
                var btn = document.createElement("BUTTON");
                var t = document.createTextNode(Math.round(Math.random()*10));
                btn.appendChild(t);
                div.appendChild(btn);
            }

            document.getElementById("gridSection").appendChild(div);

        }

    }

    function randomGrid() {
        var min= Number(document.getElementById("minid").value);
        var max= Number(document.getElementById("maxid").value);
        var size = gridSize(min,max);
        var temp = document.getElementById("gridx");
        temp.innerHTML = size.x;
        temp = document.getElementById("gridy");
        temp.innerHTML = size.y;
        makeGrid(size.x,size.y);

    }

    function downBtnValue() {
        document.getElementById("start").setAttribute("disabled","disabled");
        var divElem = document.getElementById("gridSection");
        divElem.addEventListener("click", function(event){
            var targetBtn = event.target;
            // event received from the button
            if (targetBtn.nodeName === "BUTTON"){
                var count = parseInt(targetBtn.innerHTML,10);
                if (count >0){
                    count-- ;
                    targetBtn.innerHTML = count;

                }else{
                    targetBtn.setAttribute("disabled","disabled");
                    DisableFlagCounter -= 1;
                }
                if (DisableFlagCounter <1)
                {
                    alert("Game Over");
                }

            }
        });
    }
