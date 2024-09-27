import { DataTable } from "simple-datatables";
import Swal from 'sweetalert2';

export function initializeGeofenceDatatable() {
    console.log("School Geofence Boundary  page function triggered.");

    const form = document.getElementById('add-school-geofence-boundary-form');

    if (form){
        form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission
    
        let formData = new FormData(form);
    
        axios.post('/superadmin/school-geofence-boundaries', formData)
            .then(response => {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 800,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
            
                Toast.fire({
                    icon: "success",
                    title: "School geofence boundary record added successfully!"
                });
            
                setTimeout(() => {
                    form.reset();
                    window.location.href = '/superadmin/school-geofence-boundaries';
                }, 800);
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
    
                    const errors = error.response.data.errors;
    
                    document.querySelectorAll('.error-message').forEach(el => el.remove()); // Hide Validation
    
                    for (let key in errors) {
                        let inputElement = document.getElementById(key);
                        let errorMessage = errors[key][0];
    
                        let errorElement = document.createElement('p');
                        errorElement.classList.add('text-red-500', 'text-xs', 'mt-1', 'error-message');
                        errorElement.innerText = errorMessage;
    
                        inputElement.after(errorElement);
                    }
                }
            });
        });
    }
}