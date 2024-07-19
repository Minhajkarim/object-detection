const map = L.map('map').setView([data[0].latitude, data[0].longitude], 14);

// Set up the OSM layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Define custom icons based on object type using Font Awesome
const getIcon = (objectType) => {
    let iconClass, iconColor;
    switch (objectType) {
        case 'Traffic Signal':
            iconClass = 'fa-icon fa-solid fa-location-dot';
            iconColor = '#1E90FF'; // Dodger Blue
            break;
        case 'Get in lane sign':
            iconClass = 'fa-icon fa-solid fa-location-dot';
            iconColor = '#FF4500'; // Orange Red
            break;
        case 'Street Light':
            iconClass = 'fa-icon fa-solid fa-location-dot';
            iconColor = '#32CD32'; // Lime Green
            break;
        case 'Speed Limit':
            iconClass = 'fa-icon fa-solid fa-location-dot';
            iconColor = '#FFD700'; // Gold
            break;
        case 'Pedestrian Crossing':
            iconClass = 'fa-icon fa-solid fa-location-dot';
            iconColor = '#8B0000'; // Dark Red
            break;
        case 'road cracks':
            iconClass = 'fa-icon fa-solid fa-location-dot';
            iconColor = '#000000'; // Black
            break;
        case 'potholes':
            iconClass = 'fa-icon fa-solid fa-location-dot';
            iconColor = '#FF6347'; // Black
            break;
        case 'Roundabout Ahead':
            iconClass = 'fa-icon fa-solid fa-location-dot';
            iconColor = '#FF8C00'; // Black
            break;
        case 'Hazard Marker':
                iconClass = 'fa-icon fa-solid fa-location-dot';
                iconColor = '#00FFFF'; // Aqua
                break;
        case 'LUCDR':
            iconClass = 'fa-icon fa-solid fa-location-dot';
            iconColor = '#708090'; // Slate Gray
            break;
        case 'Stop Sign':
                iconClass = 'fa-icon fa-solid fa-location-dot';
                iconColor = '#9400D3'; // Dark Violet
                break;
        case 'Yield Sign':
                    iconClass = 'fa-icon fa-solid fa-location-dot';
                    iconColor = '#6495ED'; // Cornflower Blue
                    break;
        case 'Parking Sign':
                    iconClass = 'fa-icon fa-solid fa-location-dot';
                    iconColor = '#7FFF00'; // Chartreuse
                    break;
        case 'Stop & Turn':
                    iconClass = 'fa-icon fa-solid fa-location-dot';
                    iconColor = '#FF69B4'; // Hot Pink
                    break;
        case 'No Entry':
                    iconClass = 'fa-icon fa-solid fa-location-dot';
                    iconColor = '#8B008B'; // Dark Magenta
                    break;
        case 'Multiple Chevrons Right':
                        iconClass = 'fa-icon fa-solid fa-location-dot';
                        iconColor = '#FF0000'; // Red
                        break;
        case 'U-turn Sign':
                        iconClass = 'fa-icon fa-solid fa-location-dot';
                        iconColor = '#800000'; // Maroon
                        break;
        case 'No Stopping Sign':
                        iconClass = 'fa-icon fa-solid fa-location-dot';
                        iconColor = '#BDB76B'; // Dark Khaki
                        break;
        case "Don't Turn":
                        iconClass = 'fa-icon fa-solid fa-location-dot';
                        iconColor = '#FF1493'; // Deep Pink
                        break;
        case 'Pass Either Side':
                        iconClass = 'fa-icon fa-solid fa-location-dot';
                        iconColor = '#8A2BE2'; // Blue Violet
                        break;
        case 'Tree':
                        iconClass = 'fa-icon fa-solid fa-location-dot';
                        iconColor = '#006400'; // Dark Green
                        break;
        
        // Add more cases as needed
        default:
            iconClass = 'fa fa-map-marker-alt';
            iconColor = 'black'; // Default color
            break;
    }
    return L.divIcon({
        html: `<i class="${iconClass}" style="color: ${iconColor};"></i>`,
        className: 'fa-icon',
        iconSize: [30, 30], // Adjust the iconSize as needed
        iconAnchor: [15, 15], // Adjust the iconAnchor as needed
        popupAnchor: [0, -15] // Adjust the popupAnchor as needed
    });
};

let markers = [];

// Function to clear all markers
function clearMarkers() {
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
}

// Function to add markers to the map with the corresponding icon
function addMarkers(filter) {
    clearMarkers();
    data.forEach(point => {
        if (filter === 'all' || point.object_type === filter) {
            const marker = L.marker([point.latitude, point.longitude], { icon: getIcon(point.object_type) }).addTo(map);
            const popupContent = `<strong>${point.object_name}</strong><br>
                                  <em>${point.object_type}</em><br>
                                  <img src="${point.image_path}" class="popup-image" alt="${point.object_name}">`;
            marker.bindPopup(popupContent);
            markers.push(marker);
        }
    });
}

// Initial display of all data
addMarkers('all');

// Event listener for the selector
document.getElementById('objectSelector').addEventListener('change', function() {
    const selectedValue = this.value;
    addMarkers(selectedValue);
});

