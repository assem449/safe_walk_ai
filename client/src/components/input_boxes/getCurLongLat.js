const getLocation = (callback) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                callback([latitude, longitude]);
            },
            (error) => {
                console.error("Error getting location:", error);
                callback(null);
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser");
        callback(null);
    }
};

export default getLocation;
