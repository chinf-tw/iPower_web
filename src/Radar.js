import Chart from 'chart.js';


Chart.defaults.global.defaultFontSize = 14;
// var ctx = document.getElementById('myChart');



export default function ShowRadar(teamdata) {
    var data= {
        labels: teamdata.Titles,
        datasets: [{
            label: teamdata.teamName,
            data: teamdata.Contents,
        }]
    }
    var myRadarChart = new Chart(teamdata.ctx, {
        type: 'radar',
        data: data
    });
}