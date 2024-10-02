import Swal from 'sweetalert2';

export function reports() {
    // console.log("Teacher report page function triggered.");

    const reportContainer = document.getElementById('reports-container');

    if (reportContainer) {
        // Make the Axios request to fetch sections
        axios.get('/teacher/sections-record')
            .then(response => {
                const sections = response.data;
                
                // Find the select element for sections
                const sectionSelect = document.getElementById('section');
                
                // Clear previous options
                sectionSelect.innerHTML = '<option selected disabled>Select Section</option>';
                
                // Populate with fetched sections
                sections.forEach(section => {
                    const option = document.createElement('option');
                    option.value = section.id;
                    option.textContent = section.section_name; // Assuming section_name exists
                    sectionSelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error fetching sections:', error);
                Swal.fire('Error', 'Could not load sections.', 'error');
            });
    }
}