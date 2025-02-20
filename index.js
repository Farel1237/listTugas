let counter = localStorage.getItem("counter");
counter = counter ? parseInt(counter) : 0;

const konten = document.getElementById("konten");
let no = 1;
for (let i = 1; i <= counter; i++) {
  const nama_tugas_get = localStorage.getItem(`namaTugas${i}`);
  const deadline_get = localStorage.getItem(`deadline${i}`);
  const keterangan_get = localStorage.getItem(`keterangan${i}`);

  // Lewati jika data sudah dihapus (null)
  if (!nama_tugas_get || !deadline_get || !keterangan_get) continue;

  const tr = document.createElement("tr");

  // **Cek apakah tugas sudah selesai**
  let sudahSelesai = keterangan_get === "Selesai";
  tr.innerHTML = `
            <td class="border">${no++}</td>
            <td class="border">${nama_tugas_get}</td>
            <td class="border">${deadline_get}</td>
            <td class="border" id="status${i}">${keterangan_get}</td>
            <td class="border">
                ${
                  sudahSelesai
                    ? `<a class="hapus text-red-600 cursor-pointer" data-id="${i}">Hapus</a>`
                    : `<a id="ubah${i}" class="text-blue-600 cursor-pointer">Selesai</a>`
                }
            </td>`;

  konten.appendChild(tr);
}

// **Event listener untuk tombol "Selesai"**
document.addEventListener("click", function (event) {
  if (event.target.id.startsWith("ubah")) {
    let id = event.target.id.replace("ubah", "");
    localStorage.setItem(`keterangan${id}`, "Selesai");

    // **Update tampilan tanpa reload**
    document.getElementById(`status${id}`).innerText = "Selesai";

    // **Ganti tombol "Selesai" menjadi "Hapus"**
    event.target.insertAdjacentHTML(
      "afterend",
      `<a class="hapus text-red-600 cursor-pointer" data-id="${id}">Hapus</a>`
    );

    event.target.remove(); // Hapus tombol "Selesai"
  }
});

// **Event listener untuk tombol "Hapus"**
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("hapus")) {
    let id = event.target.getAttribute("data-id");
    let konfirmasi = confirm(
      "Apakah Anda yakin menghapus Tugas yang sudah selesai ini?"
    );
    if (konfirmasi) {
      localStorage.removeItem(`namaTugas${id}`);
      localStorage.removeItem(`deadline${id}`);
      localStorage.removeItem(`keterangan${id}`);

      event.target.closest("tr").remove();
      alert("Data berhasil dihapus!");
    }
  }
});
