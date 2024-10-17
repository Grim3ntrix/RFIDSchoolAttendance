export function overview(totalPresent, totalLate, totalAbsent, totalExcuse) {
    // console.log("Overview initialized for student!");

    const totalPresentEl  = document.getElementById('total-present');
    const totalLateEl     = document.getElementById('total-late');
    const totalAbsentEl   = document.getElementById('total-absent');
    const totalExcuseEl   = document.getElementById('total-excuse');

    totalPresentEl.textContent = totalPresent;
    totalLateEl.textContent    = totalLate;
    totalAbsentEl.textContent  = totalAbsent;
    totalExcuseEl.textContent  = totalExcuse;
}

// Export the function to be used in other modules
export function initializeClassOption() {
    // console.log("Overview initialized for student option!");
    
    const classScheduleStudentOverviewEl = document.getElementById('class-schedule-student-overview');

    function convertToAmPm(time) {
        const [hours, minutes] = time.split(':');
        const suffix = hours >= 12 ? 'PM' : 'AM';
        const adjustedHours = hours % 12 || 12; // Adjust hours to 12-hour format
        return `${adjustedHours}:${minutes} ${suffix}`;
    }
    const dayAbbreviations = {
        "Monday":   "M",
        "Tuesday":  "T",
        "Wednesday":"Wed",
        "Thursday": "Th",
        "Friday":   "F",
        "Saturday": "Sat",
        "Sunday":   "Sun"
    };

    function getAbbreviatedDays(daysOfWeek) {
        return daysOfWeek.map(day => dayAbbreviations[day.day_name]).join('');
    }

    axios.get(`/student/class-schedule-select-for-overview`)
    .then(response => {
        const classSchedules = response.data.classScheduleStudentOverview;  
        const section = response.data.section;

        const sectionEl  = document.getElementById('section-name');
        sectionEl.textContent = `${section.grade_or_year_level}-${section.section_name}`;

        // Clear all options except the first default option
        classScheduleStudentOverviewEl.innerHTML = '<option selected disabled value="">Select a Class Schedule</option>'; // Optional: Add a default prompt

        classSchedules.forEach(schedule => {
            const startTime = convertToAmPm(schedule.start_time);
            const endTime   = convertToAmPm(schedule.end_time);

            const classSchedule = `${schedule.subject} (${schedule.subject_code}) - ${getAbbreviatedDays(schedule.days_of_week)} (${startTime}-${endTime})`
            const option = document.createElement('option');
            option.value = schedule.id;
            option.textContent = classSchedule;
            classScheduleStudentOverviewEl.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error fetching class schedule option:', error);
    });

    // Elements for start date, end date, and class schedule
    const startDate = document.getElementById('start-date');
    const endDate = document.getElementById('end-date');

    // Function to trigger Axios request
    const fetchAttendanceData = () => {
        const classScheduleId = classScheduleStudentOverviewEl.value;
        const startDateValue = startDate.value; // Capture start date value
        const endDateValue = endDate.value; // Capture end date value

        if (classScheduleId && startDateValue && endDateValue) {
            // console.log('Fetching attendance data with:', classScheduleId, startDateValue, endDateValue);
            axios.get(`/student/get-attendance-status-totals-by-student-overview`, {
                params: {
                    classScheduleId: classScheduleId,
                    startDate: startDateValue,
                    endDate: endDateValue
                }
            })
            .then(response => {
                const totalPresent = response.data.totalPresent;
                const totalLate    = response.data.totalLate;
                const totalAbsent  = response.data.totalAbsent;
                const totalExcuse  = response.data.totalExcuse;

                overview(totalPresent, totalLate, totalAbsent, totalExcuse);
            })
            .catch(error => {
                console.error('Error fetching attendance status totals data:', error);
            });
        }
    };

    // Event listener for class schedule selection
    classScheduleStudentOverviewEl.addEventListener('change', fetchAttendanceData);

    // Event listeners for date changes
    startDate.addEventListener('change', fetchAttendanceData);
    endDate.addEventListener('change', fetchAttendanceData);     
}
