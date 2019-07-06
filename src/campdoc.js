import "./sass/campdoc/main.sass"

fetch("https://ipower.chinf.me/fixed/campdoc_info").then(function(response) {
        return response.json();
    }).then(function(myJson) {
        document.getElementById("title").innerHTML = myJson.title;
        document.getElementById("note").innerHTML = myJson.note;
        document.getElementById("link").innerHTML = myJson.linkname;
        document.getElementById("link").href = myJson.link;
        document.getElementById("campdocImg").src = myJson.imglink;
    });