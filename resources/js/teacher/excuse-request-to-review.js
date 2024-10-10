import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { DataTable } from "simple-datatables";
import Swal from 'sweetalert2';

dayjs.extend(utc);
dayjs.extend(timezone);

export function studentExcuseRequestToReview() {
    console.log("Teacher excuse request to review page function triggered.");

    const studentExcuseRequestToReviewContainer = document.getElementById('student-excuse-request-to-review-container');
    
    if (studentExcuseRequestToReviewContainer) {
        studentExcuseRequestToReviewDataTable();
    }
}

function studentExcuseRequestToReviewDataTable()
{
    axios.get(`/teacher/get-excuse-request-by-student-to-review`)
    .then(response => {
        const classScheduleByStudent = response.data;

        
    })
    .catch(error => {
        console.error("Error fetching student excuse request by student to review:", error);
    });
}