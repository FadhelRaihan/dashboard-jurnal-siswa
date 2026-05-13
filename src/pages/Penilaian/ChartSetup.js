export const chartData = {
    labels: ['90-100', '89-80', '75-79', '<75'],
    datasets: [
        {
            label: 'Jumlah Siswa',
            data: [32, 19, 25, 10],
            backgroundColor: [
                '#8BAD73',    
                '#FF9249',    
                '#576A31',    
                '#D1495D'     
            ],
            borderColor: [
                '#8BAD73',
                '#FF9249',
                '#576A31',
                '#D1495D'
            ],
            borderWidth: 1,
            borderRadius: {
                topLeft: 10,
                topRight: 10,
                bottomLeft: 0,
                bottomRight: 0
              },
            barPercentage: 0.9, 
            categoryPercentage: 0.8, 
        }
    ]
};

export const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
        legend: {
            display:false,
            position: 'top',
            labels: {
                font: { size: 14 },
                color: '#333'
            }
        },
        title: {
            display: false,
            text: 'Distribusi Nilai',
            font: { size: 16, weight: 'bold' }
        },
        tooltip: {
            callbacks: {
                label: (context) => `Total Siswa: ${context.raw} Siswa`
            }
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: false,
                text: 'Jumlah Siswa',
                font: { weight: 'bold' }
            }
        },
        x: {
            title: {
                display: false,
                text: 'Range Nilai',
                font: { weight: 'bold' }
            }
        }
    }
};