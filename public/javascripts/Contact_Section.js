function contactdisplay()
{
    var element = document.getElementById("Contact_Section");
    element.style.display = "block";
}
function ContactSection()
{
    var emailRegex = /^[A-Za-z0-9._]*\@[A-Za-z]*\.[A-Za-z]{2,5}$/;
    var firstname = document.getElementById("Fname_text_box").value;
    var lastname = document.getElementById("Lname_box").value;
    var email = document.getElementById("Email_box").value;
    var country = document.getElementById("Country_box").value;
    var Subject = document.getElementById("Subject_box").value;
    if (firstname == "") {
        document.getElementById("errorBox").innerHTML = "enter the first name";
        return false;
    }
    else if (lastname == "") {
        document.getElementById("errorBox").innerHTML = "enter the last name";
        return false;
    }
    else if (email == "") {
        document.getElementById("errorBox").innerHTML = "enter the email";
        return false;
    }
    else if (!emailRegex.test(femail)) {
        document.getElementById("errorBox").innerHTML = "enter the valid email";
        return false;
    }
    else if (country == "") {
        document.getElementById("errorBox").innerHTML = "select one country";
        return false;
    }
    else if (Subject == "") {
        document.getElementById("errorBox").innerHTML = "enter the the text";
        return false;
    }
    else
    {
        var xhttp = new XMLHttpRequest();
        var url = "http://localhost:3010/Contact_Section";
        var registerReq = {
            firstname: document.getElementById("Fname_text_box").value,
            lastname: document.getElementById("Lname_box").value,
            email: document.getElementById("Email_box").value,
            country: document.getElementById("Country_box").value,
            subjct: document.getElementById("Subject_box").value
        };

        /*var registerReq={firstname: "teja",
            lastname: "golusula",
            email: "teja1@gmail.com",
            password: "Teja@22",

        };*/
        var params = JSON.stringify(registerReq);
        console.log(params);
        var params = "inputJsonStr" + "=" + params;
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.onreadystatechange = function () {
            if ((this.readyState == 4) && (this.status == 200)) {
                console.log("after getting response" + xhttp.responseText);
                var jsonresponse = JSON.parse(this.responseText);
            }
        };
        xhttp.send(params);
    }

}

    function resetform()
    {
        document.getElementById("contact").reset();
    }










