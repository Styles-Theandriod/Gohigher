document.addEventListener("DOMContentLoaded", function (e) {
    e.preventDefault();
    let firstButton = document.querySelector(".btn-1");
    let secondButton = document.querySelector(".btn-2");
    let closeIcon = document.querySelector(".fa-close");
    let dashboard = document.querySelector(".dashboard");
    let settings = document.querySelector(".settings");
    let form = document.querySelector(".form");

    if (settings) {
      settings.addEventListener("click", function () {
        dashboard.style.display = "flex";
      });
    }

    if (firstButton) {
      firstButton.addEventListener("click", function () {
        firstButton.style.backgroundColor = "black";
        firstButton.style.color = "white";
        secondButton.style.backgroundColor = "transparent";
        secondButton.style.color = "black";
        form.style.display = "flex";
      });
    }

    if (secondButton) {
      secondButton.addEventListener("click", function () {
        firstButton.style.backgroundColor = "transparent";
        firstButton.style.color = "black";
        secondButton.style.backgroundColor = "black";
        secondButton.style.color = "white";
        form.style.display = "none";

      });
    }

    if (closeIcon) {
      closeIcon.addEventListener("click", function () {
        dashboard.style.display = "none";
      });
    }
  });





  // Array to hold transaction data
let transactions = [];

// Initialize Chart.js line chart
const ctx = document.getElementById('spending-chart').getContext('2d');
let chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],  // Labels will represent dates or entry order
        datasets: [
            {
                label: 'Income',
                data: [],
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                fill: true,
                tension: 0.3 // Adds a curve to the line
            },
            {
                label: 'Expense',
                data: [],
                borderColor: '#FF5733',
                backgroundColor: 'rgba(255, 87, 51, 0.2)',
                fill: true,
                tension: 0.3
            }
        ]
    },
    options: {
        responsive: true,
        animation: {
            duration: 1000, // Animation duration in milliseconds
            easing: 'easeInOutQuart' // Smooth animation effect
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Transaction Order'
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Amount'
                }
            }
        }
    }
});

// Function to update the chart with new data
function updateChart() {
    const incomeTotal = transactions
        .filter(item => item.type === 'income')
        .map(item => item.amount)
        .reduce((a, b) => a + b, 0);
    const expenseTotal = transactions
        .filter(item => item.type === 'expense')
        .map(item => item.amount)
        .reduce((a, b) => a + b, 0);

    // Push new data to the chart
    chart.data.labels.push(`Transaction ${transactions.length}`);
    chart.data.datasets[0].data.push(incomeTotal);
    chart.data.datasets[1].data.push(expenseTotal);

    // Update the chart to animate new points
    chart.update();
}

// Handle form submission
document.getElementById('transaction-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    // Add transaction to the array
    transactions.push({ description, amount, type });

    // Clear form fields
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';

    // Update transaction history table
    updateTransactionTable();

    // Update and animate chart
    updateChart();
});

// Function to update the transaction table
function updateTransactionTable() {
    const table = document.getElementById('transaction-history');
    table.innerHTML = `
        <tr>
            <th>Description</th>
            <th>Amounts</th>
            <th>Type</th>
        </tr>
    `; // Reset table header

    transactions.forEach(transaction => {
        const row = table.insertRow();
        row.innerHTML = `
            <td>${transaction.description}</td>
            <td>${transaction.amount}</td>
            <td>${transaction.type}</td>
        `;
    });
}
