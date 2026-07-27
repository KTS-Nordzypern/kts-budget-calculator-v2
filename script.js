// ==========================================
// KTS Budget- & Renditerechner
// ==========================================

function formatEuro(value){

    return new Intl.NumberFormat("de-DE",{
        style:"currency",
        currency:"EUR",
        minimumFractionDigits:2
    }).format(value);

}

document.addEventListener("DOMContentLoaded",()=>{

    const usage=document.getElementById("usage");
    const rentField=document.getElementById("rentField");

    function toggleRent(){

        if(!usage||!rentField) return;

        if(usage.value==="investment"){

            rentField.style.display="block";

        }else{

            rentField.style.display="none";

            const rent=document.getElementById("rent");

            if(rent) rent.value="";

        }

    }

    toggleRent();

    if(usage){

        usage.addEventListener("change",toggleRent);

    }

});

function calc(){

    const purchasePrice=Number(document.getElementById("price").value);

    if(!purchasePrice||purchasePrice<=0){

        alert("Bitte geben Sie einen Kaufpreis ein.");

        return;

    }

    const usage=document.getElementById("usage").value;

    const monthlyRent=Number(document.getElementById("rent").value)||0;

    const stampDuty=purchasePrice*0.005;

    const transferStage1=purchasePrice*0.06;

    const transferStage2=purchasePrice*0.03;

    const vat=purchasePrice*0.05;

    const ministryFee=600;

    const municipalityFee=150;

    const stage1Total=
        purchasePrice+
        stampDuty+
        transferStage1+
        ministryFee;

    const stage2Total=
        transferStage2+
        vat+
        municipalityFee;

    const totalBudget=
        stage1Total+
        stage2Total;

    let resultHTML=`
    <div class="result-card">

    <h2 class="result-title">
        Ihre Nebenkostenübersicht
    </h2>

    <div class="stage">

        <h3>Phase 1 – Beim Kaufvertrag</h3>

        <div class="cost-row">

            <div class="cost-left">

                <div class="cost-title">
                    Stempelsteuer
                    <span class="info" onclick="toggleInfo('stampInfo')">i</span>
                </div>

            </div>

            <div class="cost-right">
                ${formatEuro(stampDuty)}
            </div>

        </div>

        <div id="stampInfo" class="info-box">

            <strong>Stempelsteuer</strong><br><br>

            Die Stempelsteuer beträgt standardmäßig
            <strong>0,5 % des Kaufpreises</strong>.

        </div>

        <div class="cost-row">

            <div class="cost-left">

                <div class="cost-title">
                    Grundbuchgebühr (1. Teil)
                    <span class="info" onclick="toggleInfo('transferInfo')">i</span>
                </div>

                <div class="cost-description">
                    6 % des Kaufpreises
                </div>

            </div>

            <div class="cost-right">
                ${formatEuro(transferStage1)}
            </div>

        </div>

        <div id="transferInfo" class="info-box">

            <strong>Grundbuchgebühr</strong><br><br>

            In Phase 1 werden
            <strong>6 %</strong> der Grundbuchgebühr berechnet.

            Die restlichen
            <strong>3 %</strong>
            folgen in Phase 2.

        </div>

        <div class="cost-row">

            <div class="cost-left">

                <div class="cost-title">
                    Gebühr des Innenministeriums
                    <span class="info" onclick="toggleInfo('ministryInfo')">i</span>
                </div>

                <div class="cost-description">
                    Beispielwert
                </div>

            </div>

            <div class="cost-right">
                ${formatEuro(ministryFee)}
            </div>

        </div>

        <div id="ministryInfo" class="info-box">

            <strong>Gebühr des Innenministeriums</strong><br><br>

            Für den Rechner wird ein Beispielwert
            von <strong>600 €</strong> verwendet.

        </div>

        <div class="stage-total">

            <span>Zwischensumme Phase 1</span>

            <span>${formatEuro(stage1Total)}</span>

        </div>

    </div>
    <div class="stage">

    <h3>Phase 2 – Eigentumsübertragung</h3>

    <div class="cost-row">

        <div class="cost-left">

            <div class="cost-title">
                Grundbuchgebühr (2. Teil)
                <span class="info" onclick="toggleInfo('transfer2Info')">i</span>
            </div>

            <div class="cost-description">
                Restliche 3 % des Kaufpreises
            </div>

        </div>

        <div class="cost-right">
            ${formatEuro(transferStage2)}
        </div>

    </div>

    <div id="transfer2Info" class="info-box">

        <strong>Grundbuchgebühr (2. Teil)</strong><br><br>

        Nach Abschluss der Eigentumsübertragung werden die
        restlichen <strong>3 %</strong> fällig.

    </div>

    <div class="cost-row">

        <div class="cost-left">

            <div class="cost-title">
                Mehrwertsteuer (MwSt.)
                <span class="info" onclick="toggleInfo('vatInfo')">i</span>
            </div>

            <div class="cost-description">
                Standardmäßig 5 %
            </div>

        </div>

        <div class="cost-right">
            ${formatEuro(vat)}
        </div>

    </div>

    <div id="vatInfo" class="info-box">

        <strong>Mehrwertsteuer</strong><br><br>

        Für Neubauten wird in diesem Rechner
        ein Satz von <strong>5 %</strong> verwendet.

    </div>

    <div class="cost-row">

        <div class="cost-left">

            <div class="cost-title">
                Gemeindeabgabe
                <span class="info" onclick="toggleInfo('municipalityInfo')">i</span>
            </div>

            <div class="cost-description">
                Beispielwert
            </div>

        </div>

        <div class="cost-right">
            ${formatEuro(municipalityFee)}
        </div>

    </div>

    <div id="municipalityInfo" class="info-box">

        <strong>Gemeindeabgabe</strong><br><br>

        Je nach Gemeinde können zusätzliche Gebühren entstehen.

        Im Rechner wird hierfür ein Beispielwert verwendet.

    </div>

    <div class="stage-total">

        <span>Zwischensumme Phase 2</span>

        <span>${formatEuro(stage2Total)}</span>

    </div>

</div>

<div class="grand-total">

    <h2>Gesamtbudget</h2>

    <div class="price">
        ${formatEuro(totalBudget)}
    </div>

</div>
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

    Gebühren, Steuern und gesetzliche Regelungen können sich jederzeit ändern.

    Maßgeblich sind die Angaben Ihres Rechtsanwalts, Bauträgers und die zum Kaufzeitpunkt gültigen gesetzlichen Bestimmungen.

</div>

`;

document.getElementById("result").innerHTML = resultHTML;
}

function toggleInfo(id){

    const box = document.getElementById(id);

    if(box){

        box.classList.toggle("show");

    }

}
