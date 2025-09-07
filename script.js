// Єдина структура з усіма даними
const categories = {
  "SCHMIEDER KLINIK": {
    icon: "fa-hospital",
    data: {
      "Name": "",
      "Kostenträger-Nr.": "3491",
      "Kostenträger - Name / Ort": "SCHMIEDER KLINIK",
      "Von Objekt / Ort": "SCHM. GAILINGEN",
      "Nach Objekt / Ort": "SCHM. ALLENSBACH / MRT",
      "Statistik": "",
      "Zusatzfeld": "",
      "Tarif": "",
      "Zusatztext für Rechnung": ""
    },
    subOptions: [
      { label: "3 - Tragestuhl", tarif: "9211" },
      { label: "4 - gehfähig", tarif: "9111" },
      { label: "5 - Rollstuhl", tarif: "9711" }
    ]
  },
  "PRIVAT": {
    icon: "fa-user",
    data: {
      "Name": "",
      "Kostenträger-Nr.": "1",
      "Kostenträger - Name / Ort": "PRIVAT",
      "Von Objekt / Ort": "WHG",
      "Nach Objekt / Ort": "",
      "Statistik": "",
      "Zusatzfeld": "",
      "Tarif": "6600",
      "Zusatztext für Rechnung": ""
    }
  },
  "Hilfeleistung bzw. Tragehilfen/privat": {
    icon: "fa-hands-helping",
    data: {
      "Name": "",
      "Kostenträger-Nr.": "1",
      "Kostenträger - Name / Ort": "Hilfeleistung bzw. Tragehilfen/privat",
      "Von Objekt / Ort": "4204",
      "Nach Objekt / Ort": "WHG",
      "Statistik": "93",
      "Zusatzfeld": "",
      "Tarif": "2800",
      "Zusatztext für Rechnung": "HOCH HELFEN"
    }
  },
  "HAUSNOTRUF": {
    icon: "fa-phone-volume",
    data: {
      "Name": "",
      "Kostenträger-Nr.": "8",
      "Kostenträger - Name / Ort": "HAUSNOTRUF",
      "Von Objekt / Ort": "4204",
      "Nach Objekt / Ort": "WHG",
      "Statistik": "89",
      "Zusatzfeld": "8",
      "Tarif": "8609",
      "Zusatztext für Rechnung": "HNR NR."
    }
  },
  "ZFP Reichenau": {
    icon: "fa-clinic-medical",
    data: {
      "Name": "",
      "Kostenträger-Nr.": "2775",
      "Kostenträger - Name / Ort": "ZFP Reichenau",
      "Von Objekt / Ort": "ZFP ST. 92",
      "Nach Objekt / Ort": "",
      "Statistik": "",
      "Zusatzfeld": "",
      "Tarif": "9201",
      "Zusatztext für Rechnung": ""
    }
  },
  "LEERFAHRT": {
    icon: "fa-car-side",
    data: {
      "Name": "DIENSTFAHRT",
      "Kostenträger-Nr.": "9",
      "Kostenträger - Name / Ort": "LEERFAHRT",
      "Von Objekt / Ort": "4204",
      "Nach Objekt / Ort": "4202 / 4203 / 4205 / 4206",
      "Statistik": "91",
      "Zusatzfeld": "7",
      "Tarif": "Kein",
      "Zusatztext für Rechnung": ""
    }
  },
  "FEHLFAHRT": {
    icon: "fa-exclamation-triangle",
    data: {
      "Name": "FEHLFAHRT",
      "Kostenträger-Nr.": "9",
      "Kostenträger - Name / Ort": "LEERFAHRT",
      "Von Objekt / Ort": "4204",
      "Nach Objekt / Ort": "",
      "Statistik": "81",
      "Zusatzfeld": "6",
      "Tarif": "Kein",
      "Zusatztext für Rechnung": ""
    }
  },
  "KH - KONSTANZ": {
    icon: "fa-hospital-user",
    data: {
      "Name": "",
      "Kostenträger-Nr.": "1203",
      "Kostenträger - Name / Ort": "KH - KONSTANZ",
      "Von Objekt / Ort": "ZNA MED KONSTANZ",
      "Nach Objekt / Ort": "ZNA MED SINGEN",
      "Statistik": "21",
      "Zusatzfeld": "",
      "Tarif": "9201",
      "Zusatztext für Rechnung": ""
    }
  },
  "KH - SINGEN": {
    icon: "fa-hospital-symbol",
    data: {
      "Name": "",
      "Kostenträger-Nr.": "3214",
      "Kostenträger - Name / Ort": "KH - SINGEN",
      "Von Objekt / Ort": "ZNA MED SINGEN",
      "Nach Objekt / Ort": "ZNA MED KONSTANZ",
      "Statistik": "21",
      "Zusatzfeld": "",
      "Tarif": "9201",
      "Zusatztext für Rechnung": ""
    }
  }
};

// DOM елементи
const resetBtn = document.getElementById("reset-button");
const topContainer = document.getElementById("top-button");
const subOptions = document.getElementById("sub-options");
const output = document.getElementById("output");
const otherContainer = document.getElementById("other-buttons");
const resetContainer = document.getElementById("reset-container");

// Універсальна функція створення кнопок
function createButton(text, iconClass, onClick, extraClass = "") {
  const btn = document.createElement("button");
  btn.className = `icon-button ${extraClass}`.trim();
  btn.innerHTML = iconClass ? `<i class="fas ${iconClass}"></i> ${text}` : text;
  if (onClick) btn.addEventListener("click", onClick);
  return btn;
}

// Очищення контейнерів
function clearContainers() {
  [topContainer, subOptions, output, otherContainer].forEach(c => c.innerHTML = "");
}

// Рендер категорії
function renderView(name) {
  clearContainers();
  resetContainer.style.display = "block";

  const category = categories[name];
  topContainer.appendChild(
    createButton(name === "SCHMIEDER KLINIK" ? "KLINIKEN SCHMIEDER" : name, category.icon, null, "selected")
  );

  if (category.subOptions) {
    category.subOptions.forEach(opt => {
      subOptions.appendChild(
        createButton(opt.label, null, () => renderSubSelection(opt, category.data))
      );
    });
  } else {
    renderTable(category.data);
  }
}

// Рендер підкатегорії
function renderSubSelection(option, baseData) {
  subOptions.innerHTML = "";
  subOptions.appendChild(createButton(option.label, null, null, "sub-selected"));
  renderTable({ ...baseData, "Tarif": option.tarif });
}

// Рендер таблиці
function renderTable(entry) {
  const fields = [
    "Name", "Kostenträger-Nr.", "Kostenträger - Name / Ort",
    "Von Objekt / Ort", "Nach Objekt / Ort", "Statistik",
    "Zusatzfeld", "Tarif", "Zusatztext für Rechnung"
  ];

  output.innerHTML = `<div class="vertical-table">${
    fields
      .filter(f => entry[f] && entry[f].trim() !== "")
      .map(f => {
        const extraClass = (f === "Kostenträger-Nr." || f === "Tarif") ? "highlight" : "";
        return `<div class="row">
                  <div class="label">${f}</div>
                  <div class="value ${extraClass}">${entry[f]}</div>
                </div>`;
      }).join("")
  }</div>`;
}

// Скидання вибору
function resetView() {
  clearContainers();
  resetContainer.style.display = "none";
  Object.keys(categories).forEach(name => {
    otherContainer.appendChild(
      createButton(name, categories[name].icon, () => renderView(name))
    );
  });
}

// Події
resetBtn.addEventListener("click", resetView);

// Ініціалізація
resetView();

// Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service Worker registered'))
    .catch(err => console.error('Service Worker error:', err));
}
