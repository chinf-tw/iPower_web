import "./sass/allTeam/main.sass"

fetch("https://ipower.chinf.me/fixed/team_all").then(function(response) {
    return response.json();
}).then(async function(myJson) {
    const teamIDs = myJson.teamID;
    const teamNames = myJson.teamName;
    var temp = ""
    for (var i = 0; i < teamIDs.length; i++) {
        const teamID = teamIDs[i]
        const itemhtml = await itemHtml(teamID)
        const abilityhtml = await abilityHtml(teamID)
        const allSummary = await AllSummary(teamID)
        let money = 0
        

        await fetch(`https://ipower.chinf.me/api/${teamID}/team_info`).then(function(response) {
            return response.json();
        }).then(function(myJson) {
            money = myJson.money;
        });
        temp += `
        <div class="team_info borderWhite">
            <div class="title">${teamNames[i]}</div>
            <div class="left">
                <div>
                <span>金錢</span>
                <span>${money}</span>
                </div>
                <div>
                <span>能力總和</span>
                <span>${allSummary}</span>
                </div>
                ${abilityhtml}
            </div>
            <div class="right">
                ${itemhtml}
            </div>
        </div>
        `
        document.getElementById("allTeam").innerHTML = temp
    }
})
async function AllSummary(teamID) {
    var sum = 0.0
    await fetch(`https://ipower.chinf.me/api/${teamID}/AllSummary`).then(function(response){
        return response.json()
        
    }).then(function(myJson){
        sum = myJson.abilitySum
    })
    console.log(sum);
    return sum
}


async function itemHtml(teamID) {
    var html = ""
    await fetch(`https://ipower.chinf.me/api/${teamID}/item`).then(function(response) {
        return response.json();
    }).then(function(myJson){
        const Titles = myJson.title
        const Quantitys = myJson.quantity
        for (let index = 0; index < Titles.length; index++) {
            const title = Titles[index];
            const Quantity = Quantitys[index];
            html += `
            <div>
                <span>${title}</span>
                <span>${Quantity}</span>
            </div>
            `
        }
    })
    return html
}
async function abilityHtml(teamID) {
    var html = ""
    await fetch(`https://ipower.chinf.me/api/${teamID}/ability`).then(function(response) {
        return response.json();
    }).then(function(myJson){
        const Titles = myJson.title
        const Quantitys = myJson.quantity
        for (let index = 0; index < Titles.length; index++) {
            const title = Titles[index];
            const Quantity = Quantitys[index];
            html += `
            <div>
                <span>${title}</span>
                <span>${Quantity}</span>
            </div>
            `
        }
    })
    return html
}