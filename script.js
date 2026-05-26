body, html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    overflow: hidden;
}

#header {
    text-align: center;
    background: #2c3e50;
    color: white;
    padding: 12px 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    position: relative;
    z-index: 1000;
}

#header h2 {
    margin: 0;
    font-size: 1.4rem;
}

#header h3 {
    margin: 5px 0 0 0;
    font-size: 1.1rem;
    color: #2ecc71; /* Warna hijau segar bertema pendidikan dasar */
}

#header p {
    margin: 5px 0 0 0;
    font-size: 0.85rem;
    color: #bdc3c7;
}

#map {
    width: 100%;
    height: calc(100vh - 95px); /* Memotong tinggi agar pas di bawah header */
}
