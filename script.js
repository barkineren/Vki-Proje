document.addEventListener("DOMContentLoaded", function () {
  // HTML'de belirtilen elemanları al
  const hesaplaButton = document.getElementById("hesapla");
  const temizleButton = document.getElementById("temizle");
  const verileriButton = document.getElementById("vtemizle");
  const kiloInput = document.getElementById("kilo");
  const boyInput = document.getElementById("boy");
  const sonucP = document.getElementById("sonuc");
  const gecmisSonuclarDiv = document.getElementById("gecmisSonuclar");

  // Hesapla butonuna tıklandığında gerçekleşecek olaylar
  hesaplaButton.addEventListener("click", function () {
    // Kullanıcının girdiği kilo ve boy değerlerini al
    const kilo = parseFloat(kiloInput.value);
    const boy = parseFloat(boyInput.value) / 100; // cm cinsinden olduğu için m cinsine dönüştürüyoruz

    // Geçerli kilo ve boy değerleri kontrolü
    if (!isNaN(kilo) && !isNaN(boy) && boy > 0) {
      // VKİ hesapla
      const vki = kilo / (boy * boy);
      let vkiSonucu = "VKİ: " + vki.toFixed(2) + " - ";

      // VKİ'ye göre durumu belirle
      if (vki < 18.5) {
        vkiSonucu += "Zayıf";
      } else if (vki >= 18.5 && vki <= 24.9) {
        vkiSonucu += "Normal";
      } else if (vki >= 25 && vki <= 29.9) {
        vkiSonucu += "Fazla Kilolu";
      } else if (vki >= 30 && vki <= 34.9) {
        vkiSonucu += "1. Derece Obezite";
      } else if (vki >= 35 && vki <= 39.9) {
        vkiSonucu += "2. Derece Obezite";
      } else {
        vkiSonucu += "3. Derece Obezite";
      }

      // Sonucu ekrana yazdır ve konsola logla
      sonucP.textContent = vkiSonucu;
      console.log(vkiSonucu);

      
      kaydetSonuc(kilo, boy, vki);
    } else {
      // Hatalı giriş durumunda uyarı göster
      sonucP.textContent = "Lütfen geçerli bir kilo ve boy değeri girin.";
    }
  });

  // Temizle butonuna tıklandığında gerçekleşecek olaylar
  temizleButton.addEventListener("click", function () {
    // Girdi alanlarını temizle ve sonucu sıfırla
    kiloInput.value = "";
    boyInput.value = "";
    sonucP.textContent = "";
  });

  // Verileri Temizle butonuna tıklandığında gerçekleşecek olaylar
  verileriButton.addEventListener("click", function () {
    // Geçmiş sonuçları temizle ve localStorage'ı sıfırla
    gecmisSonuclarDiv.innerHTML = "";
    localStorage.clear();
  });

  // Sayfa yüklendiğinde geçmiş sonuçları göster
  gosterGecmisSonuclar();
});

// Geçmiş sonuçları ekrana göster
function kaydetSonuc(kilo, boy, vki) {
  const gecmisSonuclar =
    JSON.parse(localStorage.getItem("gecmisSonuclar")) || [];
  const sonuc = {
    kilo,
    boy,
    vki,
    tarih: new Date().toLocaleString(),
  };
  gecmisSonuclar.push(sonuc);
  localStorage.setItem("gecmisSonuclar", JSON.stringify(gecmisSonuclar));
  gosterGecmisSonuclar();
}


function gosterGecmisSonuclar() {
  const gecmisSonuclar =
    JSON.parse(localStorage.getItem("gecmisSonuclar")) || [];
  const gecmisSonuclarDiv = document.getElementById("gecmisSonuclar");
  gecmisSonuclarDiv.innerHTML = "";

  // Eğer geçmiş sonuç yoksa uyarı göster
  if (gecmisSonuclar.length === 0) {
    gecmisSonuclarDiv.textContent = "Henüz kaydedilen sonuç yok.";
    return;
  }

  // Geçmiş sonuçları başlık olarak ekleyerek göster
  gecmisSonuclarDiv.innerHTML = "<h3>Geçmiş Sonuçlar</h3>";
  gecmisSonuclar.forEach((sonuc, index) => {
    // Her bir geçmiş sonucu için bilgileri göster
    gecmisSonuclarDiv.innerHTML += `
            <p><strong>Sonuç ${index + 1}:</strong></p>
            <p>Kilo: ${sonuc.kilo} kg</p>
            <p>Boy: ${sonuc.boy} m</p>
            <p>VKİ: ${sonuc.vki.toFixed(2)}</p>
            <p>Tarih: ${sonuc.tarih}</p>
            <hr>
        `;
  });
}
