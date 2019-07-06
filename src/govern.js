import "./sass/Govern/main.sass"



var clickID = [
    "money",
]

fetch("https://ipower.chinf.me/fixed/abilityTitle").then(function(response) {
        return response.json();
    }).then(function(myJson) {
        const IDArray = myJson.ability_id;
        const titleArray = myJson.title;

        var changing = document.getElementById("changing")
        var changingStr = ""


        
        for (let index = 0; index < IDArray.length; index++) {
            const id = IDArray[index];
            const title = titleArray[index];
            const str =   `<p>${title}&emsp;
                        <span id="${id}Int"></span>
                        &emsp;+&emsp;
                        <input type="text" id="${id}">
                        <div class="button" id="${id}_butt">送出</div>
                    </p>`
            changingStr += str
            clickID.push(id)
        }
        changing.innerHTML += changingStr

        fetch("https://ipower.chinf.me/fixed/team_all").then(function(response) {
            return response.json();
        }).then(function(myJson) {
            const teamIDs = myJson.teamID;
            const teamNames = myJson.teamName;
        
            var team_select = document.getElementById("team");
        
            for (let index = 0; index < teamIDs.length; index++) {
                const teamID = teamIDs[index];
                const teamName = teamNames[index];
        
                let newOption = document.createElement("option");
                newOption.value = teamID;
                newOption.text = teamName;
                team_select.add(newOption);
            }
            
        
            team_select.addEventListener("change",function(){
                info(team_select.value)    
            })
            info(team_select.value)
            
            for (const id of clickID) {
                const butt = id + "_butt"
                document.getElementById(butt).addEventListener("click",function(){
                    const teamID = document.getElementById("team").value
                    const value = document.getElementById(id).value
                    fetch(`https://ipower.chinf.me/governModify/${teamID}/${id}/${value}`).then(function(response) {
                        return response.json();
                    }).then(function(myJson) {
                        if (myJson.returnValue > 0){
                            info(teamID)
                            document.getElementById(id).value = ""
                        }
                    })
                })
            }
        });
        
    })
function info(teamID) {
    fetch("https://ipower.chinf.me/api/"+ teamID +"/team_info").then(function(response) {
        return response.json();
    }).then(function(myJson) {
        return myJson.money;
    }).then(function(money){
        document.getElementById("moneyInt").innerHTML = money
    })

    fetch("https://ipower.chinf.me/api/"+ teamID +"/ability").then(function(response) {
        return response.json();
    }).then(function(myJson) {
        const abilityArray = myJson.quantity;
        for (let index = 0; index < abilityArray.length; index++) {
            const ability = abilityArray[index];
            const id = "ability" + (index + 1).toString() + "Int";
            document.getElementById(id).innerHTML = ability
        }
    });
}

document.getElementById("clearAllMoney").addEventListener("click",function(){
    fetch("https://ipower.chinf.me/governClear").then(function(response){
        return response.json()
    }).then(function(myJson){
        if (myJson.returnValue > 0){
            info(document.getElementById("team").value)
            alert("金錢清除成功")
        }
    })
})



