// ==========================================
// KTS Budget- & Renditerechner
// Teil 1 - Grundfunktionen & Berechnungen
// ==========================================

// Euro formatieren
function formatEuro(value) {
    return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2
    }).format(value);
}

// Miete nur bei Kapitalanlage anzeigen
document.addEventListener("DOMContentLoaded", () => {

    const usage = document.getElementById("usage");
    const rentField = document.getElementById("rentField");

    function toggleRentField() {

        if (usage.value === "investment") {
            rentField.style.display = "block";
        } else {
            rentField.style.display = "none";
            document.getElementById("rent").value = "";
        }

    }

    toggleRentField();

    usage.addEventListener("change", toggleRentField);

});

// Hauptfunktion
function calc() {

    const purchasePrice =
        Number(document.getElementById("price").value);

    if (!purchasePrice || purchasePrice <= 0) {

        alert("Bitte geben Sie einen Kaufpreis ein.");

        return;

    }

    const usage =
        document.getElementById("usage").value;

    const monthlyRent =
        Number(document.getElementById("rent").value) || 0;

    // ===== Gebühren =====

    const stampRate = 0.005;      // 0,5 %
    const transferStage1Rate = 0.06;
    const transferStage2Rate = 0.03;
    const vatRate = 0.05;

    const ministryFee = 600;

    // später noch dynamisch
    const municipalityFee = 150;

    const stampDuty =
        purchasePrice * stampRate;

    const transferStage1 =
        purchasePrice * transferStage1Rate;

    const transferStage2 =
        purchasePrice * transferStage2Rate;

    const vat =
        purchasePrice * vatRate;

    // ===== Summen =====

    const stage1Total =
        purchasePrice +
        stampDuty +
        transferStage1 +
        ministryFee;

    const stage2Total =
        transferStage2 +
        vat +
        municipalityFee;

    const totalBudget =
        stage1Total +
        stage2Total;
    // ===== Ergebnis HTML =====

    let resultHTML = `

    <div class="result-card">

        <h2 class="result-title">
            Ihre Nebenkostenübersicht
        </h2>

        <div class="stage">

            <h3>Stage 1 – Vertragsunterzeichnung</h3>

           <div class="cost-row">
    <div class="cost-left">
        <div class="cost-title">
            Stempelsteuer
            <span class="info" onclick="toggleInfo('stampInfo')">i</span>
        </div>

        <div id="stampInfo" class="info-box">
            <strong>Stempelsteuer</strong><br><br>
            Die Stempelsteuer fällt beim Kaufvertrag an und beträgt derzeit zwischen
            <strong>0,5 % und 1 %</strong> des Kaufpreises.
            Für diese Berechnung wird standardmäßig der niedrigste Satz von
            <strong>0,5 %</strong> verwendet.
        </div>

        <div class="cost-description">
            0,5 % des Kaufpreises
        </div>
    </div>
                    <div class="cost-description">
                        0,5–1 % (berechnet mit 0,5 %)
                    </div>
                </div>

                <div class="cost-right">
                    ${formatEuro(stampDuty)}
                </div>
            </div>

            <div class="cost-row">
                <div class="cost-left">
                    <div class="cost-title">
                      Grundbuchgebühr (1. Teil) <span class="info" onclick="toggleInfo('transferInfo')">i</span>
                    </div>

                    <div id="transferInfo" class="info-box">
    <strong>Grundbuchgebühr</strong><br><br>

    Die Grundbuchgebühr wird bei der Eigentumsübertragung fällig.

    Für eine bessere Übersicht wird sie in diesem Rechner in zwei
    Zahlungsphasen dargestellt.

    Zunächst werden <strong>6 %</strong> berechnet und später die
    restlichen <strong>3 %</strong>.
</div>

                   <div class="cost-description">
    6 % des Kaufpreises
</div>

                </div>

                <div class="cost-right">
                    ${formatEuro(transferStage1)}
                </div>

            </div>

            <div class="cost-row">

                <div class="cost-left">

                    <div class="cost-title">
                        Ministry of Interior Fee <span class="info">i</span>
                    </div>

                    <div class="cost-description">
                        Festbetrag
                    </div>

                </div>

                <div class="cost-right">
                    ${formatEuro(ministryFee)}
                </div>

            </div>

            <div class="stage-total">

                <span>Zwischensumme Stage 1</span>

                <span>${formatEuro(stage1Total)}</span>

            </div>

        </div>


        <div class="stage">

            <h3>Stage 2 – Eigentumsübertragung</h3>

            <div class="cost-row">

                <div class="cost-left">

                    <div class="cost-title">
                        Remaining Transfer Fee <span class="info">i</span>
                    </div>

                    <div class="cost-description">
                        3 %
                    </div>

                </div>

                <div class="cost-right">
                    ${formatEuro(transferStage2)}
                </div>

            </div>

            <div class="cost-row">

                <div class="cost-left">

                    <div class="cost-title">
                        VAT <span class="info">i</span>
                    </div>

                    <div class="cost-description">
                        Standardmäßig 5 %
                    </div>

                </div>

                <div class="cost-right">
                    ${formatEuro(vat)}
                </div>

            </div>

            <div class="cost-row">

                <div class="cost-left">

                    <div class="cost-title">
                        Municipality Contribution <span class="info">i</span>
                    </div>

                    <div class="cost-description">
                        Beispielwert
                    </div>

                </div>

                <div class="cost-right">
                    ${formatEuro(municipalityFee)}
                </div>

            </div>

            <div class="stage-total">

                <span>Zwischensumme Stage 2</span>

                <span>${formatEuro(stage2Total)}</span>

            </div>

        </div>
                <div class="grand-total">

            <h2>Gesamtbudget</h2>

            <div class="price">
                ${formatEuro(totalBudget)}
            </div>

        </div>
    `;

    // ============================
    // Rendite (nur Kapitalanlage)
    // ============================

    if (usage === "investment" && monthlyRent > 0) {

        const annualRent = monthlyRent * 12;

        const grossYield =
            ((annualRent / totalBudget) * 100).toFixed(2);

        resultHTML += `

        <div class="roi-box">

            <h3>Kapitalanlage</h3>

            <div class="cost-row">

                <div class="cost-left">

                    <div class="cost-title">
                        Erwartete Jahresmiete
                    </div>

                </div>

                <div class="cost-right">
                    ${formatEuro(annualRent)}
                </div>

            </div>

            <div class="cost-row">

                <div class="cost-left">

                    <div class="cost-title">
                        Bruttorendite
                    </div>

                </div>

                <div class="cost-right">
                    ${grossYield} %
                </div>

            </div>

        </div>

        `;

    }

    // ============================
    // Hinweis
    // ============================

    resultHTML += `

        <div class="notice">

            <strong>Hinweis</strong><br><br>

            Diese Berechnung dient ausschließlich einer ersten Orientierung.

            Gebühren, Steuern und gesetzliche Regelungen können sich ändern.

            Maßgeblich sind die zum Kaufzeitpunkt gültigen gesetzlichen Bestimmungen sowie die Angaben Ihres Rechtsanwalts und Bauträgers.

        </div>

    </div>

    `;

    document.getElementById("result").innerHTML = resultHTML;

}

function toggleInfo(id){

    const box = document.getElementById(id);

    box.classList.toggle("show");

}
