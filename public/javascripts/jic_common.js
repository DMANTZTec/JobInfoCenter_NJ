/*function registration()
{
var xhttp = new XMLHttpRequest();
var url="http://localhost:3010/login";
var myarr = {logintype:"native",
    User: document.getElementById("userid").value,
    password: document.getElementById("pass").value
};
var params = JSON.stringify(myarr);
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
xhttp.send();
}*/

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
            var my1=my.docs;
            document.getElementById('resultbox').innerHTML =null;
            for(i=0;i<my1.length;i++)
            {
              //  console.log("Current Date:" + my[i].date);
                document.getElementById('resultbox').innerHTML+= '<div class="row"style="border: 1px solid;">'
                document.getElementById('resultbox').innerHTML +='<input type="checkbox" class="checkbox" style="float:right;">';
                //document.getElementById('resultbox').innerHTML+="Id:"+my[i].id+"<br/>";
               // document.getElementById('resultbox').innerHTML+="Time:"+my.time+"<br/>";
               // document.getElementById('resultbox').innerHTML+="Date:"+my.date+"<br/>";
                //document.getElementById('resultbox').innerHTML+="Id:"+my[i].date+"<br/>";
                document.getElementById('resultbox').innerHTML+="Jobtitle:"+my1[i].jobtitle+"<br/>";
                document.getElementById('resultbox').innerHTML+="Education:"+my1[i].education+"<br/>";
                document.getElementById('resultbox').innerHTML+="Salary:"+my1[i].salary+"<br/>";
                document.getElementById('resultbox').innerHTML+="Experience:"+my1[i].experience+"<br/>";
                document.getElementById('resultbox').innerHTML+="Qualification:"+my1[i].qualification+"<br/>";
                document.getElementById('resultbox').innerHTML+="Jobdescription:"+my1[i].jobdescription+"<br/>";
                document.getElementById('resultbox').innerHTML +='<input type="checkbox" class="checkbox style="float:right;">';
                document.getElementById('resultbox').innerHTML +=  '</div>';
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
    function loginform()
    {
    var ele = document.getElementById('login1');
    if(ele.style.display == 'none')
    {
        ele.style.display = 'block';
        document.getElementById('btn').style.display='none';
    }
    GenerateCaptcha();
    console.log("After Generate Captcha");
}

    function logout() {
        var  logintype = document.getElementById('currentuser_logintype').value;
        if (logintype == "facebook") {
            console.log("before calling fbLogout");
            fbLogout();
        }
       else if (logintype == "google") {
            console.log("before calling fbLogout");
            signOut();
        }
            console.log("Enter : logout()");
            var xhttp = new XMLHttpRequest();
            var url = "http://localhost:3010/logout";
            /*
            var logoutreq = {
                logintype: document.getElementById("currentuser_logintype").value,
                userid: document.getElementById("currentuser_userid").value
            };
            var params = JSON.stringify(logoutreq);

            console.log(params);
            */
            var params = "inputJsonStr" + "=" + params;
            xhttp.open("POST", url, true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.onreadystatechange = function () {
                if ((this.readyState == 4) && (this.status == 200)) {
                    console.log("after getting response" + xhttp.responseText);
                    //var my = JSON.parse(this.responseText);
                    //var el = document.getElementById('LogoutOption')
                    //var ele = document.getElementById('SignInIcon');
                    //if (el.style.display == 'none')
                      //  ele.style.display == 'block';
                }
            };
            //xhttp.send(params);
            xhttp.send();
    }
    function nativelogin()
    {
    var emailRegex = /^[A-Za-z0-9._]*\@[A-Za-z]*\.[A-Za-z]{2,5}$/;
    var lreg = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    femail = document.getElementById("userid").value;
    fpass = document.getElementById("pass").value;
    captch1 = document.getElementById("txtCompare").value;
    var str1 = removeSpaces(document.getElementById('txtCaptcha').value);
    var str2 = removeSpaces(document.getElementById('txtCompare').value);

    if (femail == "" || fpass == "") {
        document.getElementById('demo').innerHTML = "enter the email and password";
        return false;
    }
    else if (!emailRegex.test(femail)) {
        document.getElementById('demo').innerHTML = "enter the valid email";
        return false;
    }
    else if (!lreg.test(fpass)) {
        document.getElementById('demo').innerHTML = "enter the valid password";
        return false;
    }
    else if (captch1 == "") {
        document.getElementById('demo').innerHTML = "enter the captcha";
        return false;
    }
    else if (str1 != str2) {
        document.getElementById("demo").innerHTML = "please enter correct captchcode";
        return false;
    }

    else
    {
        console.log("before request");
        document.getElementById("btn").style.display='none';
        document.getElementById("login1").style.display='none';
        console.log("In checkform()");
        var xhttp = new XMLHttpRequest();
        var url="http://localhost:3010/login";
        var myarr = {logintype:"native",
            User: document.getElementById("userid").value,
            password: document.getElementById("pass").value
        };
        var params = JSON.stringify(myarr);
        console.log(params);
        var params = "inputJsonStr" + "=" + params;
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.onreadystatechange = function ()
        {
            if ((this.readyState == 4) && (this.status == 200)) {
                console.log("after getting response" + xhttp.responseText);
                var jsonresponse = JSON.parse(this.responseText);
                var logintype = jsonresponse.logintype;
                var userid = jsonresponse.result[0].usermailid;
                document.getElementById("currentuser_logintype").value = logintype;
                    document.getElementById("currentuser_userid").value = userid;
                document.getElementById("welcomeuser").innerHTML = "Welcome" + jsonresponse.result[0].usermailid + "  ";
                var el = document.getElementById('LogoutOption');
                var ele = document.getElementById('SignInIcon')
                if (el.style.display == 'none')
                {
                    el.style.display = 'block';
                }
            }
        };
        console.log("before sending request");
        xhttp.send(params);
    }
}
    function GenerateCaptcha() {
        var chr1 = Math.ceil(Math.random() * 10) + '';
        var chr2 = Math.ceil(Math.random() * 10) + '';
        var chr3 = Math.ceil(Math.random() * 10) + '';
        var str = new Array(4).join().replace(/(.|$)/g, function () {
            return ((Math.random() * 36) | 0).toString(36)[Math.random() < .5 ? "toString" : "toUpperCase"]();
        });
        var captchaCode = str + chr1 + ' ' + chr2 + ' ' + chr3;
        document.getElementById("txtCaptcha").value = captchaCode
    }

    /* Validating Captcha Function */

    /* Remove spaces from Captcha Code */
    function removeSpaces(string) {
        return string.split(' ').join('');
    }



    function onSuccess(googleUser) {
        document.getElementById('login1').style.display = 'none';
        document.getElementById('btn').style.display = 'none';
        //document.getElementById('aClassOfYourOwn').style.display='block';
        var profile = googleUser.getBasicProfile();
        var data = '';
        //data += '<ul>';
        //data += '<li><img src="' + profile.getImageUrl() + '"/></li>';
       // data += '<li>ID: ' + profile.getId() + '</li>';
        //data += '<li>Full Name: ' + profile.getName() + '</li>';
        //data += '<li>Given Name: ' + googleUser.getBasicProfile().getName() + '</li>';
        //data += '<li>Family Name: ' + profile.getFamilyName() + '</li>';
        //data += '<li>Email: ' + googleUser.getBasicProfile().getEmail() + '</li>';
        //data += '</ul>';
        //document.getElementsByClassName("aClassOfYourOwn")[0].innerHTML = data;
        googlemailid = profile.getEmail();
        googleuser = profile.getName();
        googleid = profile.getId();
        //document.getElementById('userData').innerHTML = facebookid;
        var xhttp = new XMLHttpRequest();
        var url="http://localhost:3010/login";
        var myarr = {
            logintype:"google",
            gusername: googleuser,
            gmailid: googlemailid,
            guserid: googleid };
        var params = JSON.stringify(myarr);
        console.log(params);
        var params = "inputJsonStr" + "=" + params;
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.onreadystatechange = function () {
            if ((this.readyState == 4) && (this.status == 200)) {
                console.log("after getting response" + xhttp.responseText);
                 var my = JSON.parse(this.responseText);
                var logintype = my.logintype;
                var userid = my.result[0].usermailid;
                document.getElementById("currentuser_logintype").value = logintype;
                document.getElementById("currentuser_userid").value = userid;
                document.getElementById("welcomeuser").innerHTML = "Welcome" + my.result[0].username;
                var el = document.getElementById('LogoutOption');
                if (el.style.display == 'none')
                {
                    el.style.display = 'block';
                }
            }
        };
        console.log("before sending request");
        xhttp.send(params);
    }

    function onFailure(error) {
        console.log(error);
    }

    function renderGoogleLoginOption() {
        gapi.signin2.render('googlelogin', {
            'scope': 'profile email',
            'longtitle': true,
            'theme': 'dark',
            'onsuccess': onSuccess,
            'onfailure': onFailure
        });
    }
function signOut() {
    //document.getElementById('gglg').setAttribute("onclick","onSignIn()");
    //document.getElementById('btn').style.display='none';
    //document.getElementById('aClassOfYourOwn').style.display="none";
    //document.getElementById('login1').style.display = "none";
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        document.getElementById('btn').style.display = "block";

    });
}


    window.fbAsyncInit = function () {
        console.log("In fbAsyncInit");
        // FB JavaScript SDK configuration and setup
        FB.init({
            appId: '1532496736796288', // FB App ID
            cookie: true,  // enable cookies to allow the server to access the session
            xfbml: true,  // parse social plugins on this page
            version: 'v2.8' // use graph api version 2.8
        });
        // Check whether the user already logged in
        FB.getLoginStatus(function (response) {
            if (response.status === 'connected')
            {
                //display user data
                getFbUserData();
            }
        });
    };
    // Load the JavaScript SDK asynchronously
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    // Facebook login with JavaScript SDK

    function fbLogin()
    {
        FB.login(function (response)
        {
            document.getElementById('btn').style.display = "none";
            document.getElementById('login1').style.display = "none";
           if (response.authResponse)
           {
                getFbUserData();
           }
            else
           {
                document.getElementById('status').innerHTML = 'User cancelled login or did not fully authorize.';
           }
        }, {scope: 'email'});
    }

    // Fetch the user profile data from facebook
    function getFbUserData() {

        FB.api('/me', {locale: 'en_US', fields: 'id,first_name,last_name,email,link,gender,locale,picture'},
            function (response) {

                document.getElementById('btn').style.display = "none";
                document.getElementById('login1').style.display = "none";
                // document.getElementById('SignInIcon').style.display = "none";
                document.getElementById('fbLink1').setAttribute("onclick", "fbLogout()");
                document.getElementById('fbLink1').innerHTML = 'Logout from Facebook';
                //document.getElementById('userData').innerHTML = 'Thanks for logging in, ' + response.first_name + '!';
               // document.getElementById('userData').innerHTML = '<p><b>FB ID:</b> '
                 //   + response.id + '</p><p><b>Name:</b> ' + response.first_name + ' '
                   // + response.last_name + '</p><p><b>Email:</b> '
                  //  + response.email + '</p><p><b>Gender:</b> '
                    //+ response.gender + '</p><p><b>Locale:</b> '
                    //+ response.locale + '</p><p><b>Picture:</b> <img src="'
                    //+ response.picture.data.url + '"/></p><p><b>FB Profile:</b> <a target="_blank" href="'
                   // + response.link + '">click to view profile</a></p>';
                facebookmailid = response.email;
                facebookuser = response.first_name  + response.last_name;
                facebookid = response.id;
                //document.getElementById('userData').innerHTML = facebookid;
                var xhttp = new XMLHttpRequest();
                var url="http://localhost:3010/login";
                var myarr = {
                    logintype:"facebook",
                    fbusername: facebookuser,
                    fbmailid: facebookmailid,
                    fbuserid: facebookid};
                var params = JSON.stringify(myarr);
                console.log(params);
                var params = "inputJsonStr" + "=" + params;
                xhttp.open("POST", url, true);
                xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhttp.onreadystatechange = function () {
                    if ((this.readyState == 4) && (this.status == 200)) {
                        console.log("after getting response" + xhttp.responseText);
                      var my = JSON.parse(this.responseText);

                        var logintype = my.logintype;
                        var userid = my.result[0].mailid;
                        console.log("TLOG : User Id from Login Response: " + userid);
                        document.getElementById("currentuser_logintype").value = logintype;
                        document.getElementById("currentuser_userid").value = userid;
                        document.getElementById("welcomeuser").innerHTML = "Welcome" + my.result[0].username + "  ";
                        var el = document.getElementById('LogoutOption');
                        if (el.style.display == 'none')
                        {
                            el.style.display = 'block';

                        }
                    }
                };
                console.log("before sending request");
                xhttp.send(params);
            });
    }
function fbLogout() {
    FB.logout(function () {
        document.getElementById('fbLink1').style.display = "none";
        document.getElementById('login1').style.display = "none";

        document.getElementById('fbLink').setAttribute("onclick", "fbLogin()");

        document.getElementById('fbLink').innerHTML = '<img src="../images/LoginWithFacebook.png"/>';
        document.getElementById('userData').innerHTML = '';
        document.getElementById('btn').style.display = "block";
        //document.getElementById('SignInIcon').style.display = "block";


        //document.getElementById('status').innerHTML = 'You have successfully logout from Facebook.';

    });
}
    // Logout from facebook


