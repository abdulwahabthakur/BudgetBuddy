document.addEventListener("DOMContentLoaded", function () {

    const Products = {
        "1": { name: "Whole Wheat Bread 675g", category: "groceries" },
        "2": { name: "Eggs (18 pack) Large", category: "groceries" },
        "3": { name: "Medium cheddar cheese block (500g)", category: "groceries" },
        "4": { name: "Sony WH-1000XM5", category: "electronics" },
        "5": { name: "Samsung 55-inch 4K Smart TV", category: "electronics" },
        "6": { name: "Lysol Disinfectant Spray", category: "household" },
        "7": { name: "Nivea Body Lotion (625ml)", category: "personal-care" }
    };

    const PriceData = {
        "1": {
            "Walmart": { prices: [3.45, 3.68, 3.86, 3.89, 3.92], dates: ["2022-01-15", "2023-01-23", "2024-01-02", "2025-01-07", "2025-07-24"] },
            "Loblaws": { prices: [3.75, 3.77, 4.03, 4.08, 4.14], dates: ["2022-01-15", "2023-01-23", "2024-01-02", "2025-01-07", "2025-07-24"] },
            "Costco": { prices: [3.29, 3.53, 3.49, 3.73, 3.84], dates: ["2022-01-15", "2023-01-23", "2024-01-02", "2025-01-07", "2025-07-24"] }
        },
        "2": {
            "Walmart": { prices: [5.99, 6.35, 6.35, 6.71, 6.65], dates: ["2022-01-15", "2023-01-23", "2024-01-02", "2025-01-07", "2025-07-24"] },
            "Loblaws": { prices: [6.16, 6.36, 6.75, 7.14, 7.07], dates: ["2022-01-15", "2023-01-23", "2024-01-02", "2025-01-07", "2025-07-24"] },
            "Costco": { prices: [5.74, 5.77, 6.21, 6.56, 6.53], dates: ["2022-01-15", "2023-01-23", "2024-01-02", "2025-01-07", "2025-07-24"] }
        },
        "3": {
            "Walmart": { prices: [8.95, 9.47, 9.51, 9.8, 10.48], dates: ["2022-01-15", "2023-01-23", "2024-01-02", "2025-01-07", "2025-07-24"] },
            "Loblaws": { prices: [9.35, 9.54, 10.07, 10.74, 10.62], dates: ["2022-01-15", "2023-01-23", "2024-01-02", "2025-01-07", "2025-07-24"] },
            "Costco": { prices: [8.44, 8.65, 9.36, 9.32, 9.53], dates: ["2022-01-15", "2023-01-23", "2024-01-02", "2025-01-07", "2025-07-24"] }
        },
        "4": {
            "Walmart": { prices: [411.57, 412.51, 444.79, 455.04, 425.86], dates: ["2022-01-15", "2023-01-23", "2024-01-02", "2025-01-07", "2025-07-24"] },
            "Loblaws": { prices: [412.67, 446.44, 444.92, 463.77, 455.73], dates: ["2022-01-15", "2023-01-23", "2024-01-02", "2025-01-07", "2025-07-24"] },
            "Costco": { prices: [376.99, 389.08, 409.88, 416.63, 419.46], dates: ["2022-01-15", "2023-01-23", "2024-01-02", "2025-01-07", "2025-07-24"] }
        },
        "5": {
            "Walmart": { prices: [696.32, 732.71, 766.96, 797.86, 770.41], dates: ["2022-06-24", "2023-01-23", "2024-01-02", "2025-01-07", "2025-07-24"] },
            "Loblaws": { prices: [716.9, 764.06, 795.23, 799.25, 799.53], dates: ["2022-01-15", "2023-01-23", "2024-01-02", "2025-01-07", "2025-07-24"] },
            "Costco": { prices: [657.16, 692.18, 723.67, 765.72, 707.09], dates: ["2022-01-15", "2023-01-23", "2024-01-02", "2025-01-07", "2025-07-24"] }
        },
        "6": {
            "Walmart": { prices: [7.95, 8.36, 8.88, 9.08, 9.27], dates: ["2022-06-24", "2023-01-23", "2024-01-02", "2025-01-07", "2025-07-24"] },
            "Loblaws": { prices: [8.36, 8.92, 9.25, 9.28, 9.3], dates: ["2022-01-15", "2023-01-23", "2024-01-02", "2025-01-07", "2025-07-24"] },
            "Costco": { prices: [7.67, 8.00, 8.17, 8.53, 8.51], dates: ["2022-01-15", "2023-01-23", "2024-01-02", "2025-01-07", "2025-07-24"] }
        },
        "7": {
            "Walmart": { prices: [9.76, 10.42, 11.11, 11.19, 11.07], dates: ["2022-06-24", "2023-01-23", "2024-01-02", "2025-01-07", "2025-07-24"] },
            "Loblaws": { prices: [10.7, 11.10, 11.17, 11.43, 12.23], dates: ["2022-01-15", "2023-01-23", "2024-01-02", "2025-01-07", "2025-07-24"] },
            "Costco": { prices: [9.44, 10.14, 10.24, 10.83, 11.04], dates: ["2022-01-15", "2023-01-23", "2024-01-02", "2025-01-07", "2025-07-24"] }
        }
    };

    let priceChart, trendChart, comparisonChart;

    // 🔹 Navigation setup
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            showSection(section);
        });
    });

    function showSection(sectionName) {
        document.querySelectorAll('main section').forEach(section => section.style.display = 'none');
        document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
        document.getElementById(`${sectionName}-section`).style.display = 'block';
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');
    }

    // 🔹 Load price history
    window.loadPriceHistory = function () {
        const productId = document.getElementById('productSelect').value;
        if (!productId) {
            alert('Please select a product first');
            return;
        }

        const priceData = PriceData[productId];
        if (!priceData) {
            alert('Price data not available for this product yet.');
            return;
        }

        showCurrentPrices(priceData);
        showBudgetInsights(priceData, Products[productId].name);
        createPriceHistoryChart(priceData, Products[productId].name);
    };

    function showCurrentPrices(priceData) {
        const storePricesDiv = document.getElementById('storePrices');
        const priceComparisonDiv = document.getElementById('priceComparison');
        storePricesDiv.innerHTML = '';

        let bestPrice = Infinity, bestStore = '';
        let prices = [];

        Object.entries(priceData).forEach(([store, data]) => {
            const currentPrice = data.prices[data.prices.length - 1];
            prices.push({ store, price: currentPrice });
            if (currentPrice < bestPrice) {
                bestPrice = currentPrice;
                bestStore = store;
            }
        });

        prices.sort((a, b) => a.price - b.price);

        prices.forEach(({ store, price }) => {
            const priceDiv = document.createElement('div');
            priceDiv.className = 'store-price';
            priceDiv.innerHTML = `
                <span><strong>${store}</strong></span>
                <span style="font-weight: 600;">$${price.toFixed(2)}</span>
            `;
            storePricesDiv.appendChild(priceDiv);
        });

        const bestPriceDiv = document.createElement('div');
        bestPriceDiv.className = 'store-price best-price';
        bestPriceDiv.innerHTML = `
            <span>🏆 Best Deal: ${bestStore}</span>
            <span>$${bestPrice.toFixed(2)}</span>
        `;
        storePricesDiv.appendChild(bestPriceDiv);

        priceComparisonDiv.style.display = 'block';
    }

    function showBudgetInsights(priceData, productName) {
        const budgetDiv = document.getElementById('budgetCalculator');
        let insights = [];
        let maxSavings = 0;

        Object.entries(priceData).forEach(([store, data]) => {
            const prices = data.prices;
            if (prices.length > 1) {
                const priceChange = prices[prices.length - 1] - prices[0];
                const percentChange = (priceChange / prices[0]) * 100;

                if (priceChange < 0) {
                    const savings = Math.abs(priceChange);
                    maxSavings = Math.max(maxSavings, savings);
                    insights.push({
                        store,
                        savings: savings.toFixed(2),
                        percent: Math.abs(percentChange).toFixed(1),
                        trend: '📉'
                    });
                } else if (priceChange > 0) {
                    insights.push({
                        store,
                        savings: priceChange.toFixed(2),
                        percent: percentChange.toFixed(1),
                        trend: '📈'
                    });
                }
            }
        });

        let html = `<h3>Insights for ${productName}</h3>`;
        if (insights.length > 0) {
            insights.forEach(insight => {
                if (insight.trend === '📉') {
                    html += `
                        <div class="insight-item">
                            <span>${insight.trend} ${insight.store}: Price dropped</span>
                            <span class="savings-badge">-$${insight.savings} (${insight.percent}%)</span>
                        </div>
                    `;
                } else {
                    html += `
                        <div class="insight-item">
                            <span>${insight.trend} ${insight.store}: Price increased</span>
                            <span style="color: #d32f2f; font-weight: 600;">+$${insight.savings} (${insight.percent}%)</span>
                        </div>
                    `;
                }
            });

            if (maxSavings > 0) {
                html += `
                    <div class="alert alert-success" style="margin-top: 1rem;">
                        💡 Tip: You could save up to $${maxSavings.toFixed(2)} by shopping at the right store!
                    </div>
                `;
            }
        } else {
            html += '<div class="alert alert-info">Prices have been stable recently.</div>';
        }

        budgetDiv.innerHTML = html;
    }

    function createPriceHistoryChart(priceData, productName) {
        const ctx = document.getElementById('priceChart').getContext('2d');
        if (priceChart) priceChart.destroy();

        const datasets = Object.entries(priceData).map(([store, data], index) => {
            const colors = ['#667eea', '#f093fb', '#4facfe', '#43e97b', '#fa709a'];
            return {
                label: store,
                data: data.prices,
                borderColor: colors[index % colors.length],
                backgroundColor: colors[index % colors.length] + '20',
                tension: 0.4,
                fill: false,
                borderWidth: 2
            };
        });

        const labels = priceData[Object.keys(priceData)[0]].dates;

        priceChart = new Chart(ctx, {
            type: 'line',
            data: { labels, datasets },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { display: true, text: `Price History - ${productName}`, font: { size: 16, weight: 'bold' } },
                    legend: { position: 'bottom' }
                },
                scales: {
                    y: { title: { display: true, text: 'Price ($)' } }
                }
            }
        });
    }

    // 🔹 Trends
    window.loadCategoryTrends = function () {
        const category = document.getElementById('categorySelect').value;
        const trendData = {
            electronics: { years: ["2022-01-15", "2023-01-23", "2024-01-02", "2025-01-07", "2025-07-24"], avg_prices: [544.66, 572.5, 596.83, 615.83, 595.83] },
            groceries: { years: ["2022-01-15", "2023-01-23", "2024-01-02", "2025-01-07", "2025-07-24"], avg_prices: [6.00, 6.33, 6.44, 6.86, 6.83] },
            household: { years: ["2022-01-15", "2023-01-23", "2024-01-02", "2025-01-07", "2025-07-24"], avg_prices: [7.99, 8.43, 8.77, 8.96, 9.03] },
            personal_care: { years: ["2022-01-15", "2023-01-23", "2024-01-02", "2025-01-07", "2025-07-24"], avg_prices: [9.95, 10.55, 11.04, 11.15, 11.45] }
        }
        createTrendChart(trendData[category], category);
    };

    function createTrendChart(trendData, category) {
        const ctx = document.getElementById('trendChart').getContext('2d');
        if (trendChart) trendChart.destroy();

        trendChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: trendData.years,
                datasets: [{
                    label: 'Average Price',
                    data: trendData.avg_prices,
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { display: true, text: `${category.charAt(0).toUpperCase() + category.slice(1)} Price Trends`, font: { size: 16, weight: 'bold' } },
                    legend: { display: false }
                },
                scales: { y: { title: { display: true, text: 'Average Price ($)' } } }
            }
        });
    }

    // 🔹 Comparison
    window.comparePrices = function () {
        const productId = document.getElementById('comparisonProductSelect').value;
        if (!productId) {
            alert('Please select a product first');
            return;
        }

        const priceData = PriceData[productId];
        if (!priceData) {
            alert('Price data not available for this product yet.');
            return;
        }

        const productName = Products[productId].name;
        const comparisonData = {};
        Object.entries(priceData).forEach(([store, data]) => {
            comparisonData[store] = data.prices[data.prices.length - 1];
        });

        createComparisonChart(comparisonData, productName);
    };

    function createComparisonChart(comparisonData, productName) {
        const ctx = document.getElementById('comparisonChart').getContext('2d');
        if (comparisonChart) comparisonChart.destroy();

        const stores = Object.keys(comparisonData);
        const prices = Object.values(comparisonData);
        const minPrice = Math.min(...prices);

        const backgroundColors = prices.map(price =>
            price === minPrice ? '#00d007ff' : '#ca0000ff'
        );

        comparisonChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: stores,
                datasets: [{
                    label: 'Current Price',
                    data: prices,
                    backgroundColor: backgroundColors,
                    borderColor: backgroundColors,
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { display: true, text: `Store Comparison - ${productName}`, font: { size: 16, weight: 'bold' } },
                    legend: { display: false }
                },
                scales: { y: { title: { display: true, text: 'Price ($)' } } }
            }
        });
    }

    function linearRegression(x, y) {
    const n = x.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;

    for (let i = 0; i < n; i++) {
        sumX += x[i];
        sumY += y[i];
        sumXY += x[i] * y[i];
        sumXX += x[i] * x[i];
    }

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    return { slope, intercept };
    }

    function createPriceHistoryChart(priceData, productName) {
    const ctx = document.getElementById('priceChart').getContext('2d');
    if (priceChart) priceChart.destroy();

    // Step 1: Calculate average prices for each week
    const stores = Object.keys(priceData);
    const weeks = priceData[stores[0]].dates; // Assuming all stores have same dates
    const weekCount = weeks.length;
    const averagePrices = [];

    for (let i = 0; i < weekCount; i++) {
        let sum = 0;
        stores.forEach(store => {
            sum += priceData[store].prices[i];
        });
        averagePrices.push(sum / stores.length);
    }

    // Step 2: Convert weeks to numerical values (0,1,2,...)
    const xValues = weeks.map((_, index) => index);

    // Step 3: Perform linear regression
    const regression = linearRegression(xValues, averagePrices);
    const slope = regression.slope;
    const intercept = regression.intercept;

    // Step 4: Calculate trend line data
    const trendLine = xValues.map(x => slope * x + intercept);

    // Step 5: Create the chart with two datasets
    const datasets = [
        {
            label: 'Average Price',
            data: averagePrices,
            borderColor: '#667eea',
            backgroundColor: '#667eea20',
            tension: 0.4,
            fill: false,
            borderWidth: 2,
            pointRadius: 4
        },
        {
            label: `Trend (y = ${slope.toFixed(4)}x + ${intercept.toFixed(2)})`,
            data: trendLine,
            borderColor: '#ff6384',
            backgroundColor: 'transparent',
            tension: 0,
            fill: false,
            borderWidth: 2,
            borderDash: [5, 5],
            pointRadius: 0
        }
    ];

    priceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: weeks,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: `Average Price History with Trend - ${productName}`,
                    font: { size: 16, weight: 'bold' }
                },
                legend: { position: 'bottom' }
            },
            scales: {
                y: {
                    title: { display: true, text: 'Price ($)' }
                }
            }
        }
    });
    }


    // Default chart
    loadCategoryTrends();
});



function logout() {

            window.location.href = "login.html";
        }
