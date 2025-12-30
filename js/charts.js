// Chart Initialization
const initCharts = () => {
    // Shared Chart Options
    // Shared Chart Options
    const isMobile = window.innerWidth <= 768;
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false, // Allow CSS to control height or use aspect ratio logic
        aspectRatio: isMobile ? 1.5 : 2.5, // Taller on mobile
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)'
                },
                ticks: {
                    color: '#64748B',
                    font: {
                        size: 11
                    }
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#64748B',
                    font: {
                        size: 11
                    },
                    maxRotation: isMobile ? 45 : 0, // Rotate labels less on mobile if possible, or allow default
                    minRotation: isMobile ? 45 : 0
                }
            }
        }
    };

    // 1. Sales Chart (Line)
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    const salesGradient = salesCtx.createLinearGradient(0, 0, 0, 400);
    salesGradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)');
    salesGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

    new Chart(salesCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Revenue',
                data: dashboardData.analytics.salesData,
                borderColor: '#3B82F6',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                backgroundColor: salesGradient,
                pointBackgroundColor: '#3B82F6',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: chartOptions
    });

    // 2. User Growth Chart (Bar)
    const userGrowthCtx = document.getElementById('userGrowthChart').getContext('2d');
    new Chart(userGrowthCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Users',
                data: dashboardData.analytics.userGrowth,
                backgroundColor: '#8B5CF6',
                borderRadius: 6,
                hoverBackgroundColor: '#7C3AED'
            }]
        },
        options: {
            ...chartOptions,
            plugins: {
                legend: { display: false }
            }
        }
    });

    // 3. Order Status Chart (Doughnut)
    const orderStatusCtx = document.getElementById('orderStatusChart').getContext('2d');
    new Chart(orderStatusCtx, {
        type: 'doughnut',
        data: {
            labels: ['Paid', 'Pending', 'Failed'],
            datasets: [{
                data: dashboardData.analytics.orderStatus,
                backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.5,
            cutout: '65%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#94A3B8',
                        padding: 15,
                        usePointStyle: true,
                        font: {
                            size: 11
                        }
                    }
                }
            }
        }
    });

    // 4. Analytics Mini Charts
    const miniChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            y: { display: false },
            x: { display: false }
        },
        elements: {
            point: { radius: 0 },
            line: { borderWidth: 2 }
        }
    };

    // Conversion Rate Mini Chart
    const conversionCtx = document.getElementById('conversionChart');
    if (conversionCtx) {
        new Chart(conversionCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['', '', '', '', '', '', ''],
                datasets: [{
                    data: [2.8, 3.1, 2.9, 3.3, 3.0, 3.2, 3.24],
                    borderColor: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: miniChartOptions
        });
    }

    // AOV Mini Chart
    const aovCtx = document.getElementById('aovChart');
    if (aovCtx) {
        new Chart(aovCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['', '', '', '', '', '', ''],
                datasets: [{
                    data: [200, 210, 205, 215, 208, 212, 218.5],
                    borderColor: '#3B82F6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: miniChartOptions
        });
    }

    // Retention Mini Chart
    const retentionCtx = document.getElementById('retentionChart');
    if (retentionCtx) {
        new Chart(retentionCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['', '', '', '', '', '', ''],
                datasets: [{
                    data: [72, 71, 70, 69, 70, 69, 68.5],
                    borderColor: '#EF4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: miniChartOptions
        });
    }

    // Sessions Mini Chart
    const sessionsCtx = document.getElementById('sessionsChart');
    if (sessionsCtx) {
        new Chart(sessionsCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['', '', '', '', '', '', ''],
                datasets: [{
                    data: [980, 1050, 1100, 1020, 1150, 1090, 1247],
                    backgroundColor: '#8B5CF6'
                }]
            },
            options: miniChartOptions
        });
    }

    // 5. Category Revenue Chart
    const categoryRevenueCtx = document.getElementById('categoryRevenueChart');
    if (categoryRevenueCtx) {
        new Chart(categoryRevenueCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Electronics', 'Clothing', 'Food', 'Books', 'Sports', 'Home'],
                datasets: [{
                    label: 'Revenue',
                    data: [28500, 19200, 15800, 12400, 9800, 14300],
                    backgroundColor: ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#06B6D4'],
                    borderRadius: 8
                }]
            },
            options: {
                ...chartOptions,
                plugins: { legend: { display: false } }
            }
        });
    }

    // 6. Traffic Source Chart
    const trafficSourceCtx = document.getElementById('trafficSourceChart');
    if (trafficSourceCtx) {
        new Chart(trafficSourceCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Direct', 'Organic', 'Social', 'Referral'],
                datasets: [{
                    data: [35, 30, 20, 15],
                    backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 1.5,
                cutout: '65%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#94A3B8',
                            padding: 15,
                            usePointStyle: true,
                            font: { size: 11 }
                        }
                    }
                }
            }
        });
    }
};
