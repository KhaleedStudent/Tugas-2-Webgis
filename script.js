// 1. Set kamera awal ke koordinat Kota Kediri
var map = L.map('map').setView([-7.817, 112.011], 13);

// 2. Tambahkan Peta Dasar (Basemap OpenStreetMap)
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// 3. Fitur Interaktif Wajib: Membuat Jendela Popup saat titik sekolah diklik
function onEachFeature(feature, layer) {
    if (feature.properties) {
        // !! PENTING: ganti kata 'nama', 'tingkat', dan 'alamat' di bawah sesuai nama kolom di tabel data QGIS kamu !!
        var namaSekolah = feature.properties.nama || feature.properties.NAMOBJ || "Gedung Sekolah";
        var tingkatan = feature.properties.tingkat || feature.properties.KETERANGAN || "Sekolah";
        var alamat = feature.properties.alamat || "Kota Kediri";
        
        var isiPopup = "<div style='font-size: 12px; line-height: 1.4;'>" +
                       "<strong style='font-size: 14px; color: #2c3e50;'>" + namaSekolah + "</strong><br>" +
                       "<b>Jenjang:</b> " + tingkatan.toUpperCase() + "<br>" +
                       "<b>Alamat/Lokasi:</b> " + alamat +
                       "</div>";
        
        layer.bindPopup(isiPopup);
    }
}

// 4. Pengaturan Warna Titik Tematik (SD = Kuning Emas, SMP = Biru)
function pointToLayerStyling(feature, latlng) {
    var jenjang = feature.properties.tingkat || feature.properties.KETERANGAN || "";
    
    var markerOptions = {
        radius: 7,
        fillColor: "#9b59b6", // Warna ungu sebagai cadangan
        color: "#fff",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.9
    };

    // Pengecekan kata kunci di dalam kolom tabel QGIS
    if (jenjang.toLowerCase().includes("sd")) {
        markerOptions.fillColor = "#f1c40f"; // Warna Kuning Emas untuk SD
    } else if (jenjang.toLowerCase().includes("smp")) {
        markerOptions.fillColor = "#2980b9"; // Warna Biru Tua untuk SMP
    }

    return L.circleMarker(latlng, markerOptions);
}

// 5. Masukkan Layer Poligon Batas Wilayah Kediri
var layerBatasWilayah = L.geoJSON(dataBatas, {
    style: {
        color: "#7f8c8d",
        weight: 1.5,
        fillColor: "#34495e",
        fillOpacity: 0.1
    }
}).addTo(map);

// 6. Masukkan Layer Titik Sekolah (SD & SMP)
var layerSekolah = L.geoJSON(dataSekolah, {
    pointToLayer: pointToLayerStyling,
    onEachFeature: onEachFeature
}).addTo(map);

// 7. Fitur Interaktif Wajib: Layer Toggle (Kontrol layer pojok kanan atas)
var baseMaps = {
    "Peta Dasar (OSM)": osm
};

var overlayMaps = {
    "Batas Wilayah Kediri": layerBatasWilayah,
    "Titik SD & SMP": layerSekolah
};

L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);
