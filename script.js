document.addEventListener("DOMContentLoaded", function () {
  const hesaplaButton = document.getElementById("hesapla");
  const temizleButton = document.getElementById("temizle");
  const kaydetButton = document.getElementById("kaydet");
  const kiloInput = document.getElementById("kilo");
  const boyInput = document.getElementById("boy");
  const sonucP = document.getElementById("sonuc");
  const gecmisSonuclarDiv = document.getElementById("gecmisSonuclar");

  hesaplaButton.addEventListener("click", function () {
    const kilo = parseFloat(kiloInput.value);
    const boy = parseFloat(boyInput.value) / 100; // cm cinsinden olduğu için m cinsine dönüştürüyoruz

    if (!isNaN(kilo) && !isNaN(boy) && boy > 0) {
      const vki = kilo / (boy * boy);
      let vkiSonucu = "VKİ: " + vki.toFixed(2) + " - ";

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

      sonucP.textContent = vkiSonucu;
      console.log(vkiSonucu);

      // Geçmiş sonuçları kaydet
      kaydetSonuc(kilo, boy, vki);
    } else {
      sonucP.textContent = "Lütfen geçerli bir kilo ve boy değeri girin.";
    }
  });

  temizleButton.addEventListener("click", function () {
    kiloInput.value = "";
    boyInput.value = "";
    sonucP.textContent = "";
  });

  kaydetButton.addEventListener("click", function () {
    gecmisSonuclarDiv.innerHTML = ""; // Geçmiş sonuçları temizle
    localStorage.clear(); // localStorage'ı temizle
  });

  // Sayfa yüklendiğinde geçmiş sonuçları göster
  gosterGecmisSonuclar();
});

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

  if (gecmisSonuclar.length === 0) {
    gecmisSonuclarDiv.textContent = "Henüz kaydedilen sonuç yok.";
    return;
  }

  gecmisSonuclarDiv.innerHTML = "<h3>Geçmiş Sonuçlar</h3>";
  gecmisSonuclar.forEach((sonuc, index) => {
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
