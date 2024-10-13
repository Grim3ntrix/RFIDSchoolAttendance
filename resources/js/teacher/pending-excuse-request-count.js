export function pendingExcuseRequestCount() {
    const teacherExcuseRequestPendingCountEl = document.getElementById('teacher-excuse-request-pending-count');
    
    if (teacherExcuseRequestPendingCountEl) {
        teacherExcuseRequestPendingCount();
    }
}

function teacherExcuseRequestPendingCount() {
    axios.get(`/teacher/count-pending-excuse-request`)
    .then(response => {
        const excuseRequestCount = response.data.pendingExcuseRequestCount;
        const teacherExcuseRequestPendingCountSpan = document.getElementById('teacher-excuse-request-pending-count');
        
        // Update the count and toggle visibility
        if (excuseRequestCount > 0) {
            teacherExcuseRequestPendingCountSpan.textContent = excuseRequestCount;
            teacherExcuseRequestPendingCountSpan.classList.remove('hidden'); // Show badge
        } else {
            teacherExcuseRequestPendingCountSpan.classList.add('hidden'); // Hide badge
        }
    })
    .catch(error => {
        console.error('There was an error getting the excuse request count:', error);
    });
}
