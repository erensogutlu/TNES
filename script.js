let harita, imlecIsaretci, grafik;
let aktifCizimler = [];
let hedefKoordinat = [39.9334, 32.8597];

const gucSlider = document.getElementById("gucKaydirici");
const ruzgarSlider = document.getElementById("ruzgarKaydirici");
const analizPaneli = document.getElementById("analizPaneli");
const logAkisi = document.getElementById("logAkisi");
const defconPanel = document.getElementById("defconPanel");

// başlatma
window.onload = () => {
	initHarita();
	initGrafik();
	saatBaslat();
	ekranaLogBas("TNES SİSTEMİ ÇALIŞTIRILIYOR...");
	ekranaLogBas("TÜRKİYE BÖLGESEL VERİ TABANI YÜKLENDİ.");
};

function initHarita() {
	harita = L.map("harita", {
		zoomControl: false,
		attributionControl: false,
		center: hedefKoordinat,
		zoom: 7,
	});

	L.tileLayer(
		"https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
	).addTo(harita);

	harita.on("mousemove", (e) => {
		document.getElementById("imlecLat").innerText = e.latlng.lat.toFixed(4);
		document.getElementById("imlecLng").innerText = e.latlng.lng.toFixed(4);
	});

	harita.on("click", (e) => {
		hedefKoordinat = [e.latlng.lat, e.latlng.lng];
		hedefIsaretle();
		ekranaLogBas(
			`TNES HEDEF GÜNCELLEME: ${hedefKoordinat[0].toFixed(
				2
			)}, ${hedefKoordinat[1].toFixed(2)}`
		);
	});

	hedefIsaretle();
}

function hedefIsaretle() {
	if (imlecIsaretci) harita.removeLayer(imlecIsaretci);
	imlecIsaretci = L.circleMarker(hedefKoordinat, {
		radius: 12,
		color: "#ff003c",
		weight: 2,
		fillColor: "#ff003c",
		fillOpacity: 0.2,
		className: "pulse-red",
	}).addTo(harita);
}

function initGrafik() {
	const ctx = document.getElementById("hasarGrafigi").getContext("2d");
	grafik = new Chart(ctx, {
		type: "doughnut",
		data: {
			labels: ["Ateş Topu", "Ağır Basınç", "Termal Yanık", "Hafif Hasar"],
			datasets: [
				{
					data: [10, 20, 40, 30],
					backgroundColor: ["#facc15", "#ef4444", "#f97316", "#475569"],
					borderWidth: 0,
					hoverOffset: 10,
				},
			],
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: { legend: { display: false } },
			cutout: "70%",
		},
	});
}

// analiz motoru
function etkiHesapla(kiloton) {
	const kt = parseFloat(kiloton);
	return {
		atesTopu: 0.15 * Math.pow(kt, 0.4),
		basinc20psi: 0.65 * Math.pow(kt, 0.33),
		basinc5psi: 1.5 * Math.pow(kt, 0.33),
		termal3derece: 1.8 * Math.pow(kt, 0.45),
		serpinti: 3.2 * Math.pow(kt, 0.45),
	};
}

document.getElementById("atesleButonu").onclick = () => {
	temizle();
	const guc = parseInt(gucSlider.value);
	const sonuclar = etkiHesapla(guc);
	const ruzgar = parseInt(ruzgarSlider.value);

	analizPaneli.style.opacity = "1";
	analizPaneli.style.pointerEvents = "auto";
	analizPaneli.style.transform = "translateX(0)";
	defconGuncelle(guc);

	cizimEkle(
		L.circle(hedefKoordinat, {
			color: "#facc15",
			fillColor: "#facc15",
			fillOpacity: 0.7,
			weight: 1,
			radius: sonuclar.atesTopu * 1000,
		})
	);
	cizimEkle(
		L.circle(hedefKoordinat, {
			color: "#ef4444",
			fillColor: "#ef4444",
			fillOpacity: 0.4,
			weight: 1,
			radius: sonuclar.basinc20psi * 1000,
		})
	);
	cizimEkle(
		L.circle(hedefKoordinat, {
			color: "#f97316",
			fillColor: "#f97316",
			fillOpacity: 0.2,
			weight: 1,
			radius: sonuclar.termal3derece * 1000,
		})
	);
	cizimEkle(
		L.circle(hedefKoordinat, {
			color: "#334155",
			fillColor: "#334155",
			fillOpacity: 0.1,
			weight: 1,
			radius: sonuclar.basinc5psi * 1000,
		})
	);

	serpintiCiz(sonuclar.serpinti, ruzgar, sonuclar.termal3derece);

	document.getElementById("v_kritik").innerText =
		sonuclar.basinc20psi.toFixed(2) + " km";
	const kayip = Math.floor(Math.pow(sonuclar.basinc5psi, 2) * Math.PI * 1800);
	document.getElementById("v_kayip").innerText = kayip.toLocaleString();
	document.getElementById("serpintiMenzil").innerText =
		sonuclar.serpinti.toFixed(1) + "km";

	grafik.data.datasets[0].data = [
		sonuclar.atesTopu,
		sonuclar.basinc20psi,
		sonuclar.termal3derece,
		sonuclar.basinc5psi,
	];
	grafik.update();

	harita.flyTo(hedefKoordinat, 10);
	ekranaLogBas(`TNES ANALİZ TAMAMLANDI. GÜÇ: ${gucSlider.value}kt.`);
};

function serpintiCiz(menzil, aci, genislik) {
	const radyan = (aci - 90) * (Math.PI / 180);
	const ucNokta = [
		hedefKoordinat[0] + (menzil / 111) * Math.sin(radyan),
		hedefKoordinat[1] + (menzil / 111) * Math.cos(radyan),
	];

	const serpinti = L.polygon(
		[
			hedefKoordinat,
			[hedefKoordinat[0] + genislik / 150, hedefKoordinat[1] - genislik / 150],
			ucNokta,
			[hedefKoordinat[0] - genislik / 150, hedefKoordinat[1] + genislik / 150],
		],
		{
			color: "#22c55e",
			fillColor: "#22c55e",
			fillOpacity: 0.15,
			weight: 1,
			dashArray: "10, 10",
		}
	).addTo(harita);
	aktifCizimler.push(serpinti);
}

function cizimEkle(katman) {
	katman.addTo(harita);
	aktifCizimler.push(katman);
}

function temizle() {
	aktifCizimler.forEach((c) => harita.removeLayer(c));
	aktifCizimler = [];
}

function defconGuncelle(guc) {
	const metin = document.getElementById("defconMetin");
	if (guc > 20000) {
		metin.innerText = "DEFCON 1";
		metin.className = "text-xl font-black text-neon-red animate-pulse";
		defconPanel.style.boxShadow = "0 0 20px rgba(255, 0, 60, 0.6)";
	} else if (guc > 5000) {
		metin.innerText = "DEFCON 2";
		metin.className = "text-xl font-black text-orange-600";
		defconPanel.style.boxShadow = "0 0 15px rgba(234, 88, 12, 0.4)";
	} else {
		metin.innerText = "DEFCON 3";
		metin.className = "text-xl font-black text-yellow-500";
		defconPanel.style.boxShadow = "none";
	}
}

function ekranaLogBas(mesaj) {
	const d = new Date();
	const ts =
		d.getHours().toString().padStart(2, "0") +
		":" +
		d.getMinutes().toString().padStart(2, "0") +
		":" +
		d.getSeconds().toString().padStart(2, "0");
	const div = document.createElement("div");
	div.innerHTML = `<span class="text-slate-600">[${ts}]</span> > ${mesaj}`;
	logAkisi.prepend(div);
}

function saatBaslat() {
	setInterval(() => {
		document.getElementById("canliSaat").innerText =
			new Date().toLocaleTimeString("tr-TR");
	}, 1000);
}

gucSlider.oninput = function () {
	const v = parseInt(this.value);
	document.getElementById("gucGosterge").innerText =
		v >= 1000 ? (v / 1000).toFixed(1) + " MT" : v + " kt";
};

ruzgarSlider.oninput = function () {
	const a = parseInt(this.value);
	const yonler = ["K", "KD", "D", "GD", "G", "GB", "B", "KB"];
	const yon = yonler[Math.round(a / 45) % 8];
	document.getElementById("ruzgarGosterge").innerText = `${a}° / ${yon}`;
};

document.getElementById("sehirSecici").onchange = function () {
	hedefKoordinat = this.value.split(",").map(Number);
	harita.flyTo(hedefKoordinat, 10);
	hedefIsaretle();
	ekranaLogBas(
		`TNES HEDEF ODAKLANDI: ${this.options[this.selectedIndex].text}`
	);
};
