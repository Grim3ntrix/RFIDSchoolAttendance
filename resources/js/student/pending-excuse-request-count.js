export function StudentPendingExcuseRequestCount() {
    // console.log("Student excuse request count function triggered.");

    const studentExcuseRequestPendingCountEl = document.getElementById('student-excuse-request-pending-count');
    if (studentExcuseRequestPendingCountEl) {
        studentExcuseRequestPendingCount();
    }
}

function studentExcuseRequestPendingCount()
{
    axios.get(`/student/count-pending-excuse-request`)
    .then(response => {
        const excuseRequestCount = response.data.pendingExcuseRequestCount;
        const techerExcuseRequestPendingCountSpan = document.getElementById('student-excuse-request-pending-count');
        
        // Set the count and toggle visibility based on its value
        if (excuseRequestCount > 0) {
            techerExcuseRequestPendingCountSpan.textContent = excuseRequestCount;
            techerExcuseRequestPendingCountSpan.classList.remove('hidden'); // Show badge
        } else {
            techerExcuseRequestPendingCountSpan.classList.add('hidden'); // Hide badge
        }
    })
    .catch(error => {
        console.error('There was an error getting the excuse request count:', error);
    });
}

