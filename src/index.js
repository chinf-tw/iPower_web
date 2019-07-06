import './sass/main/main.sass';
import Radar from './Radar.js';


// document.getElementById("Search").onclick = function(){
//     document.location.href = "team.html";
// };

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get("id");
const myChart = document.getElementById("myChart");

var data = {
    Titles: null,
    teamName: "",
    Contents: null,
    ctx: myChart
};
// Radar(data);
function team_info(){

    fetch("https://ipower.chinf.me/api/"+ myParam +"/team_info").then(function(response) {
        return response.json();
    }).then(function(myJson) {
        document.getElementById("money").innerHTML = myJson.money;
        // document.getElementById("fraction").innerHTML = myJson.fraction;
        // document.getElementById("prestige").innerHTML = myJson.prestige;

        // document.getElementById("money_expected").innerHTML = myJson.money;
        // document.getElementById("fraction_expected").innerHTML = myJson.fraction;
        // document.getElementById("prestige_expected").innerHTML = myJson.prestige;
        
    });

    fetch("https://ipower.chinf.me/api/"+ myParam +"/item").then(function(response) {
        return response.json();
    }).then(function(myJson) {
        const itemArray = myJson.quantity;
        const titleArray = myJson.title;
        for (let index = 0; index < itemArray.length; index++) {
            const element = itemArray[index];
            const titleName = titleArray[index];
            const id = "item" + index.toString();
            // const id_expected = "item_expected" + index.toString();
            const classID = "item_title" + index.toString();
            var titleElements = document.getElementsByClassName(classID);


            for (let i = 0; i < titleElements.length; i++) {
                titleElements[i].innerHTML = titleName;
            }
            document.getElementById(id).innerHTML = element;
            // document.getElementById(id_expected).innerHTML = element;
        }

        
    });

    fetch("https://ipower.chinf.me/api/"+ myParam +"/teamname").then(function(response) {
        return response.json();
    }).then(function(myJson) {
        document.getElementById("teamName").innerHTML = myJson.teamname;

        data.teamName = myJson.teamname;
        if (data.Contents != null){
            Radar(data);
        }
    });

    fetch("https://ipower.chinf.me/api/"+ myParam +"/ability").then(function(response) {
        return response.json();
    }).then(function(myJson) {
        const itemArray = myJson.quantity;
        const titleArray = myJson.title;
        var sum = 0;
        for (let index = 0; index < itemArray.length; index++) {
            const element = itemArray[index];
            const titleName = titleArray[index];
            const id = "ability" + index.toString();
            // const id_expected = "item_expected" + index.toString();
            const classID = "ability_title" + index.toString();
            var titleElements = document.getElementsByClassName(classID);
            sum += parseFloat(element);

            for (let i = 0; i < titleElements.length; i++) {
                titleElements[i].innerHTML = titleName;
            }
            document.getElementById(id).innerHTML = element;
            // document.getElementById(id_expected).innerHTML = element;
        }
        sum = sum.toFixed(3);
        document.getElementById("sum").innerHTML = sum;
        data.Contents = itemArray;
        data.Titles = titleArray;

        if (data.teamName != ""){
            Radar(data);
        }
    });
    
}
// var total_update = null;
function object_info(){
    var SelectItem = document.getElementById("SelectItem")
    var options = document.getElementById("SelectItem").options;
    
    
    fetch("https://ipower.chinf.me/fixed/itemTitle").then(function(response) {
        return response.json();
    }).then(function(myJson) {
        const title = myJson.title;
        const value = myJson.price;
        const id = myJson.item_id;
        
        // const quantity = myJson.quantity;
        // const price = myJson.price;
        for (let i = 0; i < title.length; i++) {
            options[i+1].text = title[i] + " " + value[i] + "";
            var obj = {
                item_number: options[i+1].value,
                title: title[i],
                item_id: id[i],
                value: value[i]
            }
            options[i+1].value = JSON.stringify(obj);
        }
    });
    // SelectItem.addEventListener("blur",function(){
    //     if (total_update == null) {
    //         clearInterval(total_update);
    //         total_update = null;
    //         total_update = setInterval(total_func,1000);
    //     }
    // });
    
    SelectItem.addEventListener("change",function(){
        
        total_func();
    });

    // SelectItem.addEventListener("change",function(){
    //     if (total_update == null) {
    //         clearInterval(total_update);
    //         total_update = null;
    //         total_update = setInterval(total_func,1000);
    //     }
    // });

    // SelectItem.addEventListener("focus",function(){
    //     if (total_update != null) {
    //         clearInterval(total_update);
    //         total_update = null;
    //     }
    // });
    
}

function total_func(){
    var json = JSON.parse(document.getElementById("SelectItem").value);
    var value = json.value
    var item_number = json.item_number
    var title = json.title 
    // var user_quantity_value = document.getElementById("user_quantity").value;
    const user_quantity_value = 1;
    // var item_quantity = document.getElementById("item_quantity");
    // var total = document.getElementById("total");
    // var formula = document.getElementById("formula");
    // var item_quantity = document.getElementById("item_quantity");
    
    var total_int = parseInt(user_quantity_value) * parseInt(value);
    
    // item_quantity.innerHTML = value + "元";
    expected_func(total_int,item_number,user_quantity_value,title);
}

function expected_func(total,item_number,user_quantity_value,title) {
    
    const money = document.getElementById("money").innerHTML;
    const id = "item" + item_number;
    const id_innHTML =  document.getElementById(id).innerHTML;

    
    var item_str  = title + "：" + id_innHTML + " -> " + (parseInt(id_innHTML) + parseInt(user_quantity_value)).toString();
    var money_str = "金錢：" + money + " -> " + (parseInt(money) - total).toString();
    
    money_str = expected_content_func(money_str);
    item_str = expected_content_func(item_str);

    document.getElementById("expected_content").innerHTML = money_str + item_str;
}

function expected_content_func(content){
    return `<div class="FontWhite">`+ content +`</div>`
}

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

    if (document.getElementById("SelectItem").value == ""){
        document.getElementById("prompt").innerHTML = "請選擇要購買的物品"
    }else{
        var json = JSON.parse(document.getElementById("SelectItem").value);
        postData('https://ipower.chinf.me/sendout', 
        {
            team_id: myParam,
            item_id: json.item_id
        }).then(function(data){
            if(data.returnValue < 0){
                document.getElementById("prompt").innerHTML = "你的錢不夠，不夠 " + data.returnValue + " 元"
            }else{
                document.location.href="https://ipower.chinf.me/done/?id=" + myParam;
            }
        })
    }
    
})


team_info();


object_info();
// expected_func();
