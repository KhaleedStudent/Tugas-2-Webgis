// 1. Mengatur titik fokus awal kamera peta ke arah Kota Kediri
var map = L.map('map').setView([-7.817, 112.011], 13);

// 2. Memanggil Peta Dasar (Basemap OpenStreetMap)
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// 3. Fungsi membuat Popup Interaktif ketika objek peta diklik
function infoPopup(feature, layer) {
    if (feature.properties) {
        var namaLokal = feature.properties.NAMOBJ || feature.properties.nama || "Lokasi Tanpa Nama";
        var infoBencana = feature.properties.KETERANGAN || "Kawasan Rawan Bencana";
        layer.bindPopup("<b>Nama Objek:</b> " + namaLokal + "<br><b>Status:</b> " + infoBencana);
    }
}

// 4. Memasukkan Layer Poligon Batas Wilayah Kediri ke Peta web
var layerBatas = L.geoJSON(dataBatas, {
    style: {
        color: "#2c3e50",
        weight: 2,
        fillColor: "#34495e",
        fillOpacity: 0.3
    },
    onEachFeature: infoPopup
}).addTo(map);

// 5. Memasukkan Layer Titik Bahaya Bencana ke Peta web
var layerTitik = L.geoJSON(dataTitik, {
    onEachFeature: infoPopup
}).addTo(map);

// 6. Fitur Kontrol Layer (Layer Toggle) di pojok kanan atas
var baseMaps = {
    "OpenStreetMap": osm
};

var overlayMaps = {
    "Batas Administrasi Kediri": layerBatas,
    "Titik Potensi Bencana": layerTitik
};

L.control.layers(baseMaps, overlayMaps).addTo(map);
