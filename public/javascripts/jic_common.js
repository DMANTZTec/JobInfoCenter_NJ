function fa_search()
{
    console.log("In fa_search()");
    var xhttp= new XMLHttpRequest();
    var url="http://localhost:3010/search";
    //var url="http://date.jsontest.com/";
    console.log(document.getElementById("jobsearchform").elements.namedItem("searchinput").value);
    var myarr={searchtext:document.getElementById("txt-search").value,operationtype:document.getElementById("hiddensearch").value};
    var params=JSON.stringify(myarr);
    //var params = "params" + "=" + document.getElementById("jobsearchform").elements.namedItem("searchinput").value ;
    //var params = "searchText" + "=" + "manager";
    console.log(params);
    var params="inputJsonStr" + "=" + params;
    /*var searchText1 = {
               operationType : document.getElementById("searchform").elements.namedItem("operation").value ,
               searchText : document.getElementById("searchform").elements.namedItem("searchtext").value
           };  
    var params = JSON.stringify(searchText1);*/

    xhttp.open("POST",url,true);
    xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function()
    {
        if ((this.readyState == 4) && (this.status == 200)) {
            console.log("after getting response" + xhttp.responseText);
            var my=JSON.parse(this.responseText);
            my1=my.docs;
            console.log(my.docs);
            document.getElementById('resultbox').innerHTML =null;
            for(i=0;i<my1.length;i++)
           {
              //  console.log("Current Date:" + my[i].date);
               document.getElementById('resultbox').innerHTML+= '<div class="row"style="border: 1px solid;">';
               document.getElementById('resultbox').innerHTML +='<input type="checkbox" class="checkbox" style="float:right;">';
                //document.getElementById('resultbox').innerHTML+="Id:"+my[i].id+"<br/>";
               // document.getElementById('resultbox').innerHTML+="Time:"+my.time+"<br/>";
                //document.getElementById('resultbox').innerHTML+="Date:"+my.date+"<br/>";
                //document.getElementById('resultbox').innerHTML+="Id:"+my[i].date+"<br/>";
              document.getElementById('resultbox').innerHTML+="ID:"+my1[i].id+"<br/>";
              document.getElementById('resultbox').innerHTML+="JOBTITLE:"+my1[i].jobtitle+"<br/>";
             document.getElementById('resultbox').innerHTML+="EDUCATION:"+my1[i].education+"<br/>";
               document.getElementById('resultbox').innerHTML+="EXPERIENCE:"+my1[i].experience+"<br/>";
               document.getElementById('resultbox').innerHTML+="SALARY:"+my1[i].salary+"<br/>";
               document.getElementById('resultbox').innerHTML+="QUALIFICATION:"+my1[i].qualification+"<br/>";
                document.getElementById('resultbox').innerHTML+="Jobdescription:"+my1[i].jobdescription+"<br/>";
                //document.getElementById('resultbox').innerHTML +='<input type="checkbox" class="checkbox style="float:right;">';
                //document.getElementById('resultbox').innerHTML +=  '</div>';
            }

            //document.getElementById('resultbox').innerHTML=xhttp.responseText;
            //console.log(xhttp.responseText);
            //alert(xhttp.responseText);
            // document.getElementById('demo').innerHTML=this.responseText;
        }
        else
        {}
    };
    console.log("before sending request");
    xhttp.send(params);
}
