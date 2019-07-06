import "./sass/campdoc/main.sass"

async function postData(url, data) {
    // Default options are marked with *
    const response = await fetch(url, {
        body: JSON.stringify(data),
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'content-type': 'application/json'
        },
        method: 'POST',
        mode: 'cors',
        redirect: 'follow',
        referrer: 'no-referrer',
    });
    return await response.json(); // 輸出成 json
}

document.getElementById("sendout").addEventListener("click",function(){
    var inputID = [
        "Title",
        "Note",
        "linkName",
        "Link",
        "ImgLink",
    ]
    var warning = document.getElementById("warning");
    var finaldata = {}
    notReady:{
        for(let ID of inputID){
            let IDElement = document.getElementById(ID).value
            if (IDElement == ""){
                warning.innerHTML = ID + "未輸入。";
                break notReady;
            }
            finaldata[ID] = IDElement
        }
        postData('https://ipower.chinf.me/campdocSendout',finaldata).then(function(data){
            if(data.returnValue > 0){
                document.location.href="https://ipower.chinf.me/campdoc"
            }else{
                warning.innerHTML = "後端有問題";
            }
        })
    }
})