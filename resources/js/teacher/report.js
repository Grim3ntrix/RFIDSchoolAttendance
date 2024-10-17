export function reports() {
    const sectionElement              = document.getElementById('section');
    const studentElement              = document.getElementById('student');
    const quarterElement              = document.getElementById('quarter');

    function setDefaultOptions() {

        // Reset students and quarters
        studentElement.innerHTML = '';
        const defaultStudentOption = document.createElement('option');
        defaultStudentOption.value = '';
        defaultStudentOption.textContent = 'Select Student';
        defaultStudentOption.disabled = true;
        defaultStudentOption.selected = true;
        studentElement.appendChild(defaultStudentOption);

        quarterElement.innerHTML = '';
        const defaultQuarterOption = document.createElement('option');
        defaultQuarterOption.value = '';
        defaultQuarterOption.textContent = 'Select Quarter';
        defaultQuarterOption.disabled = true;
        defaultQuarterOption.selected = true;
        quarterElement.appendChild(defaultQuarterOption);
    }

    setDefaultOptions();

    const defaultSectionOption          = document.createElement('option');
    defaultSectionOption.value          = '';
    defaultSectionOption.textContent    = 'Select Section';
    defaultSectionOption.disabled       = true;
    defaultSectionOption.selected       = true;
    sectionElement.appendChild(defaultSectionOption);

    if (sectionElement) {
        // Fetch Sections
        axios.get(`/teacher/sections-record`)
        .then(response => {

            const sectionsData = response.data;
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

        sectionElement.addEventListener('change', function () {
            const selectedSectionId = this.value;
            // Reset students and quarters only when a new section is selected
            setDefaultOptions();

            if (selectedSectionId) {
                // Fetch Students based on the selected section
                axios.get(`/teacher/students/${selectedSectionId}`)
                .then(response => {
                    const students = response.data;
                    students.forEach(student => {
                        const option = document.createElement('option');
                        option.value = student.id;
                        option.textContent = `${student.first_name} ${student.last_name}`;
                        studentElement.appendChild(option);
                    });
                })
                .catch(error => {
                    console.error('Error fetching students:', error);
                });

                // Fetch Quarters
                axios.get(`/teacher/quarters`)
                .then(response => {
                    const quarters = response.data.quarters;
                    quarters.forEach(quarter => {
                        const option = document.createElement('option');
                        option.value = quarter.id;
                        option.textContent = quarter.quarter_name;
                        quarterElement.appendChild(option);
                    });
                })
                .catch(error => {
                    console.error('Error fetching quarters:', error);
                });
            }
        });
    }


    const generateReportFormEl = document.getElementById('reports-form');
    if (generateReportFormEl) {
        reportsToGenerate();
    }
}

function reportsToGenerate() {
    // Select elements
    const sectionSelect     = document.getElementById('section');
    const studentSelect     = document.getElementById('student');
    const quarterSelect     = document.getElementById('quarter');
    const quarterStartInput = document.getElementById('quarter_start');
    const quarterEndInput   = document.getElementById('quarter_end');
    const generateReportBtn = document.getElementById('generate-report-btn');

    // Function to send data to the server
    const sendData = () => {
        // Validate inputs (optional but recommended)
        if (!sectionSelect.value || !studentSelect.value || !quarterSelect.value || !quarterStartInput.value || !quarterEndInput.value) {
            console.error('All fields must be filled.');
            alert('Please fill all the required fields.');
            return;
        }

        const data = {
            section: sectionSelect.value,
            student: studentSelect.value,
            quarter: quarterSelect.value,
            quarter_start: quarterStartInput.value,
            quarter_end: quarterEndInput.value
        };

        // Send POST request
        axios.post('/teacher/reports-to-generate', data)
        .then(response => {
            // Check if the response contains the correct pdf_url
            if (response.data && response.data.pdf_url) {
                // Redirect to the PDF URL to stream it
                window.open(response.data.pdf_url, '_blank'); // Opens the PDF in a new tab
            } else {
                console.error('No PDF URL returned from server.');
                alert('Failed to generate the report. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error fetching PDF:', error);
            alert('An error occurred while generating the report.');
        });
    };

    // Attach event listener to the button click
    generateReportBtn.addEventListener('click', sendData);
}
