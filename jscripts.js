var transactions = [];
var historyVisible = false;
var financeChart;

const API_URL = 'http://localhost:3000/api/transactions';

// Load data from server when page opens 
window.onload = function () {
    var ctx = document.getElementById('financeChart').getContext('2d');
    financeChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Income', 'Expenses'],
            datasets: [{
                label: 'Amount ($)',
                data: [0, 0],
                backgroundColor: ['#3fb950', '#f85149'],
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                y: { ticks: { color: '#8b949e' }, grid: { color: '#30363d' } },
                x: { ticks: { color: '#8b949e' }, grid: { color: '#30363d' } }
            }
        }
    });

    // Fetch existing transactions from the server
    fetch(API_URL)
        .then(function (res) { return res.json(); })
        .then(function (data) {
            transactions = data;
            updateSummary();
            updateChart();
        })
        .catch(function (err) {
            console.error('Could not load transactions from server:', err);
        });
};

//Add a transaction via POST
function addTransaction() {
    var description = document.getElementById('t-description').value;
    var amount = parseFloat(document.getElementById('t-amount').value);
    var type = document.getElementById('t-type').value;

    if (!description || isNaN(amount) || amount <= 0) {
        alert('Please fill in a description and a valid amount.');
        return;
    }

    var payload = {
        description: description,
        amount: amount,
        type: type
    };

    // Send POST request to the server instead of saving to localStorage
    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
        .then(function (res) {
            if (!res.ok) { throw new Error('Server rejected the transaction.'); }
            return res.json();
        })
        .then(function (newTransaction) {
            transactions.push(newTransaction);

            document.getElementById('t-description').value = '';
            document.getElementById('t-amount').value = '';

            updateSummary();
            updateChart();

            // If history panel is open, refresh it immediately
            if (historyVisible) { renderTransactions(); }
        })
        .catch(function (err) {
            console.error('Error adding transaction:', err);
            alert('Could not save transaction. Is the server running?');
        });
}

//Summary cards 
function updateSummary() {
    var totalIncome = 0;
    var totalExpenses = 0;

    for (var i = 0; i < transactions.length; i++) {
        if (transactions[i].type === 'income') {
            totalIncome += transactions[i].amount;
        } else {
            totalExpenses += transactions[i].amount;
        }
    }

    var balance = totalIncome - totalExpenses;

    document.getElementById('total-income').textContent = '$' + totalIncome.toFixed(2);
    document.getElementById('total-expenses').textContent = '$' + totalExpenses.toFixed(2);
    document.getElementById('net-balance').textContent = '$' + balance.toFixed(2);
}

// Bar chart 
function updateChart() {
    var totalIncome = 0;
    var totalExpenses = 0;

    for (var i = 0; i < transactions.length; i++) {
        if (transactions[i].type === 'income') {
            totalIncome += transactions[i].amount;
        } else {
            totalExpenses += transactions[i].amount;
        }
    }

    financeChart.data.datasets[0].data = [totalIncome, totalExpenses];
    financeChart.update();
}

// Transaction history list 
function renderTransactions() {
    var list = document.getElementById('transaction-list');
    list.innerHTML = '';

    if (transactions.length === 0) {
        list.innerHTML = '<p class="no-transactions">No transactions yet.</p>';
        return;
    }

    for (var i = transactions.length - 1; i >= 0; i--) {
        var t = transactions[i];
        var item = document.createElement('div');
        item.className = 'transaction-item';

        var sign = t.type === 'income' ? '+' : '-';

        item.innerHTML =
            '<div>' +
                '<div class="t-description">' + t.description + '</div>' +
                '<div class="t-date">' + t.date + '</div>' +
            '</div>' +
            '<div class="t-amount ' + t.type + '">' + sign + '$' + t.amount.toFixed(2) + '</div>';

        list.appendChild(item);
    }
}

// Toggle history panel
function toggleHistory() {
    var list = document.getElementById('transaction-list');
    var btn = document.querySelector('.toggle-btn');

    if (historyVisible) {
        list.style.display = 'none';
        btn.textContent = 'Show History';
        historyVisible = false;
    } else {
        list.style.display = 'flex';
        btn.textContent = 'Hide History';
        historyVisible = true;
        renderTransactions();
    }
}
