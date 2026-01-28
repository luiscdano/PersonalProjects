const inputText = document.getElementById("inputText");
const sizeSelect = document.getElementById("size");
const eccSelect = document.getElementById("ecc");
const btnGenerate = document.getElementById("btnGenerate");
const btnClear = document.getElementById("btnClear");
const qrCanvas = document.getElementById("qrCanvas");
const btnDownload = document.getElementById("btnDownload");
const statusEl = document.getElementById("status");
const fileNameInput = document.getElementById("fileName");
document.getElementById("year").textContent = new Date().getFullYear();

function setStatus(msg, ok = true) {
  statusEl.textContent = msg;
  statusEl.style.color = ok ? "var(--muted)" : "#ff6b6b";
}

function buildFileName() {
  const raw = fileNameInput.value.trim().replace(/\.png$/i, "");
  const cleaned = raw.replace(/[<>:"/\\|?*\x00-\x1F]/g, "").trim();
  return cleaned || "qr";
}

function enableDownload(enabled) {
  if (enabled) btnDownload.classList.remove("disabled");
  else btnDownload.classList.add("disabled");
}

async function generate() {
  const text = inputText.value.trim();
  if (!text) {
    setStatus("Escribe un enlace o texto antes de generar.", false);
    enableDownload(false);
    return;
  }

  const size = parseInt(sizeSelect.value, 10);
  const ecc = eccSelect.value;

  // Ajustar tamaño del canvas visualmente
  qrCanvas.width = size;
  qrCanvas.height = size;

  try {
    await QRCode.toCanvas(qrCanvas, text, {
      width: size,
      margin: 2, // importante: quiet zone
      errorCorrectionLevel: ecc,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    });

    // Crear enlace de descarga
    const dataUrl = qrCanvas.toDataURL("image/png");
    btnDownload.href = dataUrl;
    btnDownload.download = `${buildFileName()}.png`;

    setStatus("QR generado correctamente. Puedes descargarlo en PNG.");
    enableDownload(true);
  } catch (err) {
    console.error(err);
    setStatus("Error al generar el QR. Intenta nuevamente.", false);
    enableDownload(false);
  }
}

function clearAll() {
  inputText.value = "";
  const ctx = qrCanvas.getContext("2d");
  ctx.clearRect(0, 0, qrCanvas.width, qrCanvas.height);
  setStatus("Escribe un enlace y pulsa “Generar”.");
  enableDownload(false);
}

btnGenerate.addEventListener("click", generate);
btnClear.addEventListener("click", clearAll);

// Enter para generar
inputText.addEventListener("keydown", (e) => {
  if (e.key === "Enter") generate();
});

// Genera un QR demo (opcional): comenta si no lo quieres
// inputText.value = "https://drive.google.com/";
// generate();
