const SALARY_CAP = 154647000;
let totalSalary = 0;
let selectedPlayers = [];
let salaryChart = null;

function formatSalary(salary) {
    return '$' + salary.toLocaleString();

}

function renderAllPlayers(playersToRender) {
    const container = document.getElementById('all-players');
    const list = document.createElement('div');
    list.className = 'players-list';
    
    for (let i = 0; i < playersToRender.length; i++) {
        const player = playersToRender[i];
        const card = document.createElement('div');
        card.className = 'player-card';
        
        card.innerHTML = '<div class="player-info"><h3>' + player.name + '</h3><p><strong>Position:</strong> ' + player.position + '</p><p><strong>Era:</strong> ' + player.era + '</p><p><strong>Salary:</strong> ' + formatSalary(player.salary) + '</p></div><button class="add-to-team-btn">Add to Team</button>';
        
        const btn = card.querySelector('button');
        btn.onclick = function() {
            if (selectedPlayers.length === 15) {
                document.getElementById('messages').textContent = 'Roster is full (15 players max)';
                return;
            }
            
            if (totalSalary + player.salary > SALARY_CAP) {
                document.getElementById('messages').textContent = 'Cannot add this player: salary cap exceeded';
                return;
            }
            
            selectedPlayers.push(player);
            totalSalary = totalSalary + player.salary;
            document.getElementById('messages').textContent = '';
            renderMyTeam();
        };
        
        list.appendChild(card);
    }
    
    const oldList = container.querySelector('.players-list');
    if (oldList) {
        container.removeChild(oldList);
    }
    
    container.appendChild(list);
}

function updateSalaryChart() {
    const labels = [];
    const data = [];
    const colors = ['#E03A3E', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#E74C3C', '#3498DB', '#2ECC71', '#9B59B6', '#1ABC9C'];
    
    for (let i = 0; i < selectedPlayers.length; i++) {
        labels.push(selectedPlayers[i].name);
        data.push(selectedPlayers[i].salary);
    }
    
    const ctx = document.getElementById('salaryChart');
    
    if (salaryChart === null) {
        salaryChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors.slice(0, selectedPlayers.length)
                }]
            }
        });
    } else {
        salaryChart.data.labels = labels;
        salaryChart.data.datasets[0].data = data;
        salaryChart.data.datasets[0].backgroundColor = colors.slice(0, selectedPlayers.length);
        salaryChart.update();

    }
}

function renderMyTeam() {
    const teamBox = document.getElementById('team-players');
    
    if (selectedPlayers.length === 0) {
        teamBox.innerHTML = '<p>No players added yet.</p>';
    } else {
        let playerList = '';
        for (let i = 0; i < selectedPlayers.length; i++) {
            const p = selectedPlayers[i];
            if (i > 0) {
                playerList += ', ';
            }
            playerList += p.name + ' (' + p.position + ') - ' + formatSalary(p.salary);
        }
        teamBox.innerHTML = '<p>' + playerList + '</p>';
    }
    
    const totalsBox = document.getElementById('salary-totals');
    const remaining = SALARY_CAP - totalSalary;
    totalsBox.innerHTML = '<p>Total Salary: ' + formatSalary(totalSalary) + '</p><p>Remaining Cap: ' + formatSalary(remaining) + '</p>';
    
    updateSalaryChart();
}

window.onload = function() {
    document.getElementById('salary-cap-display').textContent = 'Cap: ' + formatSalary(SALARY_CAP);
    renderAllPlayers(players);
    renderMyTeam();
};
