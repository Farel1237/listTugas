// tambah
const namaTugas = document.getElementById("nama_tugas");
const deadline = document.getElementById("deadline");
const keterangan = document.getElementById("keterangan");
const tambah = document.getElementById("tambah");

tambah.addEventListener("click", function () {
  let id = localStorage.getItem("counter");
  id = id ? parseInt(id) : 0;
  id++;
  if (namaTugas.value && deadline.value && keterangan.value) {
    localStorage.setItem(`namaTugas${id}`, namaTugas.value);
    localStorage.setItem(`deadline${id}`, deadline.value);
    localStorage.setItem(`keterangan${id}`, keterangan.value);
    localStorage.setItem("counter", id);
    alert("Data Berhasil Di tambahkan");
    location.href = "index.html";
  } else {
    alert("Data Gagal Di tambahkan");
    location.href = "index.html";
  }
});
