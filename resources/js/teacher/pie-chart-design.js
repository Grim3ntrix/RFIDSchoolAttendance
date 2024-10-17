import ApexCharts from 'apexcharts';

export const getChartOptions = (presentPercentage, latePercentage, absentPercentage, excusePercentage) => {
  return {
    series: [presentPercentage, latePercentage, absentPercentage, excusePercentage],
    colors: ["#3F83F8", "#E02424", "#6B7280", "#FBBF24"],
    chart: {
      height: 350,
      width: "100%",
      type: "pie",
    },
    stroke: {
      colors: ["white"],
      
    },
    plotOptions: {
      pie: {
        labels: {
          show: true,
        },
        size: "100%",
        dataLabels: {
          offset: -25,
        },
      },
    },
    labels: ["Present", "Late", "Absent", "Excused"],
    dataLabels: {
      enabled: true,
      style: {
        fontFamily: "Inter, sans-serif",
      },
    },
    legend: {
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
  };
};

let chart;

export const renderPieCharts = (presentPercentage = 0, latePercentage = 0, absentPercentage = 0, excusePercentage = 0) => {
  const pieChartContainer = document.getElementById("pie-chart-container");

  if (pieChartContainer && typeof ApexCharts !== 'undefined') {
    const total = presentPercentage + latePercentage + absentPercentage + excusePercentage;

    if (total > 0) {
      pieChartContainer.innerHTML = '';
      if (chart) {
        chart.updateOptions(getChartOptions(presentPercentage, latePercentage, absentPercentage, excusePercentage));
      } else {
        chart = new ApexCharts(pieChartContainer, getChartOptions(presentPercentage, latePercentage, absentPercentage, excusePercentage));
        chart.render();
      }
    } else {    
      if (chart) {
        chart.destroy();
        chart = null;
      }

      pieChartContainer.innerHTML = `
        <div class="flex flex-col items-center justify-center p-6 text-gray-600 font-sans">
          <h3 class="text-lg font-semibold font-inter">No Attendance Data Available</h3>
          <p class="mt-2 text-center text-sm font-inter">This may be due to no attendance data or an unselected section. Please select a section to view details.</p>
        </div>`;
      }
  }
};

// Export the function to be used in other modules
export function initializeSectionOption() {
  const sectionElement = document.getElementById('section-piechart');
  
  axios.get(`/teacher/sections-record`)
    .then(response => {
      const sectionsData = response.data;
      // Clear all options except the first default option
      sectionElement.innerHTML = '<option selected disabled value="">Section</option>'; // Optional: Add a default prompt

      sectionsData.forEach(sectionData => {
        const option = document.createElement('option');
        option.value = sectionData.id;
        option.textContent = sectionData.section_name;
        sectionElement.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error fetching sections:', error);
    });

  sectionElement.addEventListener('change', () => {
    const sectionId = sectionElement.value;
    // console.log('Selected section id:', sectionId);

    if (sectionId) {
      // Fetch Students based on the selected section
      axios.get(`/teacher/get-section/${sectionId}`)
        .then(response => {
          const total = response.data.total || 0; // Ensure total is a number
          const presentPercentage = response.data.presentPercentage || 0; // Fallback to 0
          const latePercentage = response.data.latePercentage || 0;
          const absentPercentage = response.data.absentPercentage || 0;
          const excusePercentage = response.data.excusePercentage || 0;

          // console.log('Attendance Data:', { total, presentPercentage, latePercentage, absentPercentage, excusePercentage });

          // Re-render the pie chart with new data
          renderPieCharts(presentPercentage, latePercentage, absentPercentage, excusePercentage);
        })
        .catch(error => {
          console.error('Error fetching section and attendance data:', error);
        });
    }
  });
}
