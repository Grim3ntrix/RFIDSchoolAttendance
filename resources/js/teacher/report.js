export function reports() {
    const sectionElement       = document.getElementById('section');
    // const classScheduleElement = document.getElementById('class_schedule');
    const studentElement       = document.getElementById('student');
    const quarterElement       = document.getElementById('quarter');

    function setDefaultOptions() {
        // classScheduleElement.innerHTML          = '';
        // const defaultClassScheduleOption        = document.createElement('option');
        // defaultClassScheduleOption.value        = '';
        // defaultClassScheduleOption.textContent  = 'Select Class Schedule';
        // defaultClassScheduleOption.disabled     = true;
        // defaultClassScheduleOption.selected     = true;
        // classScheduleElement.appendChild(defaultClassScheduleOption);

        studentElement.innerHTML         = '';
        const defaultStudentOption       = document.createElement('option');
        defaultStudentOption.value       = '';
        defaultStudentOption.textContent = 'Select Student';
        defaultStudentOption.disabled    = true;
        defaultStudentOption.selected    = true;
        studentElement.appendChild(defaultStudentOption);

        quarterElement.innerHTML                = '';
        const defaultquarterElementOption       = document.createElement('option');
        defaultquarterElementOption.value       = '';
        defaultquarterElementOption.textContent = 'Select Quarter';
        defaultquarterElementOption.disabled    = true;
        defaultquarterElementOption.selected    = true;
        quarterElement.appendChild(defaultquarterElementOption);
    }

    setDefaultOptions();

    if (sectionElement) {
        sectionElement.innerHTML            = '';
        const defaultSectionOption          = document.createElement('option');
        defaultSectionOption.value          = '';
        defaultSectionOption.textContent    = 'Select Section';
        defaultSectionOption.disabled       = true;
        defaultSectionOption.selected       = true;
        sectionElement.appendChild(defaultSectionOption);

        // Sections

        axios.get(`/teacher/sections-record`)
        .then(response => {
            const sectionsData = response.data;

            sectionsData.forEach(sectionData => {
                const option        = document.createElement('option');
                option.value        = sectionData.id;
                option.textContent  = sectionData.section_name;
                sectionElement.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching sections:', error);
        });

        sectionElement.addEventListener('change', function() {
            const selectedSectionId = this.value;
            setDefaultOptions();

            if (selectedSectionId) {
                // axios.get(`/teacher/class-schedules/${selectedSectionId}`)
                // .then(response => {
                //     const classSchedules = response.data;

                //     classSchedules.forEach(scheduleData => {
                //         const option = document.createElement('option');
                //         option.value = scheduleData.id;

                //         const formattedStartTime = convertToAmPm(scheduleData.start_time);
                //         const formattedEndTime   = convertToAmPm(scheduleData.end_time);
                //         const abbreviatedDays    = getAbbreviatedDays(scheduleData.days_of_week);

                //         option.textContent = `${scheduleData.subject} (${scheduleData.subject_code}) - ${abbreviatedDays} (${formattedStartTime} - ${formattedEndTime})`;
                //         classScheduleElement.appendChild(option);
                //     });
                // })
                // .catch(error => {
                //     console.error('Error fetching class schedules:', error);
                // });

                // Students

                axios.get(`/teacher/students/${selectedSectionId}`)
                .then(response => {
                    const students = response.data;

                    studentElement.innerHTML         = '';
                    const defaultStudentOption       = document.createElement('option');
                    defaultStudentOption.value       = '';
                    defaultStudentOption.textContent = 'Select Student';
                    defaultStudentOption.disabled    = true;
                    defaultStudentOption.selected    = true;
                    studentElement.appendChild(defaultStudentOption);

                    students.forEach(student => {
                        const option = document.createElement('option');
                        option.value = student.id;
                        option.textContent = `${student.first_name} ${student.last_name} ${student.middle_name ?? ''} ${student.name_extension ?? ''}`;
                        studentElement.appendChild(option);
                    });
                })
                .catch(error => {
                    console.error('Error fetching students:', error);
                });

                // Quarters

                axios.get(`/teacher/quarters`)
                .then(response => {
                    const quarters = response.data.quarters;

                    quarters.forEach(quarter => {
                        const option = document.createElement('option');
                        option.value = student.id;
                        option.textContent = `${quarter.quarter_name}`;
                        quarterElement.appendChild(option);
                    });
                })
                .catch(error => {
                    console.error('Error fetching students:', error);
                });

            }
        });


    }

    // function convertToAmPm(time) {
    //     const [hours, minutes] = time.split(':');
    //     const suffix = hours >= 12 ? 'PM' : 'AM';
    //     const adjustedHours = hours % 12 || 12; // Convert to 12-hour format
    //     return `${adjustedHours}:${minutes} ${suffix}`;
    // }

    // const dayAbbreviations = {
    //     "Monday": "M",
    //     "Tuesday": "T",
    //     "Wednesday": "Wed",
    //     "Thursday": "Th",
    //     "Friday": "F",
    //     "Saturday": "Sat",
    //     "Sunday": "Sun"
    // };

    // function getAbbreviatedDays(daysOfWeek) {
    //     return daysOfWeek.map(day => dayAbbreviations[day.day_name]).join('');
    // }
}
