class LeafletMap {

    constructor(containerId, center, zoom) {
        this.map = L.map(containerId).setView(center, zoom);
        this.initTileLayer();

    }

    initTileLayer() {
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> Joy Marie Yepes | Map'
        }).addTo(this.map);
    }

    addMarker(lat, long, message) {
        const marker = L.marker([lat, long]).addTo(this.map)
            .bindPopup(message);
    }

    
    loadMarkersFromJson(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.forEach(marker => {
                    this.addMarker(marker.latitude, marker.longitude, marker.message);
                });
            })
            .catch(error => console.error("Error Loading servers:", error));
    }


    

}
const Mymap = new LeafletMap('map', [8.361848, 124.868789], 16);


Mymap.loadMarkersFromJson('applet-2.json');

document.addEventListener('DOMContentLoaded', () => {
    Mymap.displayLogCount();
    Mymap.loadMarkersFromJson("applet-2.json");
});