function formatSalary(salary) {
    return '$' + salary.toLocaleString();
}

function renderAllPlayers(playersToRender) {
    const container = document.getElementById('all-players');
    const list = document.createElement('div');
    list.className = 'players-list';
    
    playersToRender.forEach(player => {
        const card = document.createElement('div');
        card.className = 'player-card';
        
        card.innerHTML = `
            <div class="player-info">
                <h3>${player.name}</h3>
                <p><strong>Position:</strong> ${player.position}</p>
                <p><strong>Era:</strong> ${player.era}</p>
                <p><strong>Salary:</strong> ${formatSalary(player.salary)}</p>
            </div>
            <button class="add-to-team-btn" data-player-id="${player.id}">Add to Team</button>
        `;
        
        const btn = card.querySelector('.add-to-team-btn');
        btn.addEventListener('click', () => {
            console.log('Player clicked:', player);
        });
        
        list.appendChild(card);
    });
    
    const oldList = container.querySelector('.players-list');
    if (oldList) {
        oldList.remove();
    }
    
    container.appendChild(list);
}

document.addEventListener('DOMContentLoaded', () => {
    renderAllPlayers(players);
});
