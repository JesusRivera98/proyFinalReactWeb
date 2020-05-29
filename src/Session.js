var UserProfile = (function () {
    var full_name = "";

    var getName = function () {
        return full_name;    // Or pull this from cookie/localStorage
    };

    var setName = function (name) {
        full_name = name;
        setCookie("name", name, 1);
        // Also set this in cookie/localStorage
    };
    var setCookie = function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    };

    var getCookie = function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                console.log(c.substring(name.length, c.length));
                return c.substring(name.length, c.length);
            }
        }
        return "";
    };

    var checkCookie = function () {
        var user = getCookie("username");
        if (user !== "") {
            alert("Welcome again " + user);
        } else {
            user = prompt("Please enter your name:", "");
            if (user !== "" && user !== null) {
                setCookie("username", user, 365);
            }
        }
    };

    return {
        getName: getName,
        setName: setName,
        checkCookie: checkCookie,
        setCookie: setCookie,
        getCookie: getCookie
    }

})();

export default UserProfile;