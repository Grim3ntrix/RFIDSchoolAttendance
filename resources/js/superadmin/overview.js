export function overview() {
    // console.log("Overview initialized!");

    const totalPreRegisteredEl    = document.getElementById('total-pre-registered');
    const totalRegisteredEl       = document.getElementById('total-registered');
    const totalTeachersEl         = document.getElementById('total-teachers');

    if (totalPreRegisteredEl) {
        axios.get(`/superadmin/total-pre-registered`)
        .then(response => {
            const totalPreRegistered = response.data.preRegisteredTeacher;
            totalPreRegisteredEl.textContent = totalPreRegistered  ?? '0';
        })
        .catch(error => {
            console.error('Error fetching pre-registered teachers:', error);
        });
    }

    if (totalRegisteredEl) {
        axios.get(`/superadmin/total-registered`)
        .then(response => {
            const totalRegistered = response.data.registered;
            totalRegisteredEl.textContent = totalRegistered  ?? '0';
        })
        .catch(error => {
            console.error('Error fetching registered teachers:', error);
        });
    }

    if (totalTeachersEl) {
        axios.get(`/superadmin/total-teachers`)
        .then(response => {
            const totalTeacher = response.data.teachers;
            totalTeachersEl.textContent = totalTeacher  ?? '0';
        })
        .catch(error => {
            console.error('Error fetching teachers:', error);
        });
    }
}