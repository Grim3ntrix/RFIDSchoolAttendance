import dayjs from 'dayjs';

let lastLatitude = null;
let lastLongitude = null;

export function studentWatchPosition() {
    console.log("Student Watch Position page function triggered.");

    const geofenceBoundary = document.getElementById('student-watch-position');
    
    if (geofenceBoundary) {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude, accuracy } = position.coords;

                    // Only log if the position has changed significantly
                    if (lastLatitude !== latitude || lastLongitude !== longitude) {
                        lastLatitude = latitude;
                        lastLongitude = longitude;
                        
                        const formattedTime = dayjs(position.timestamp).format('YYYY-MM-DD HH:mm:ss');
                        
                        console.log(`Current Position: Latitude: ${latitude}, Longitude: ${longitude}, Accuracy: ${accuracy} meters`);
                        console.log(`Timestamp: ${formattedTime}`);

                        // Make the Axios request to store the location in the backend
                        axios.post('/student/student-locations', {
                            latitude: latitude,
                            longitude: longitude,
                        })
                        .then(response => {
                            console.log('Location stored successfully:', response.data);
                        })
                        .catch(error => {
                            console.error('Error storing location:', error);
                        });
                    }
                },
                (error) => {
                    console.error(`Error getting location: Code: ${error.code}, Message: ${error.message}`);
                },
                {
                    enableHighAccuracy: true,
                    maximumAge: 0,
                    timeout: 60000, // 1 minute timeout to trigger error
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    } else {
        console.warn("Geofence boundary element not found.");
    }
}
