/**
 * All possible currencies.
 */
const CURRENCY_NOTES = [1, 2, 5, 10, 20, 50, 100, 200, 500, 2000]; // [2000, 500, 200, 100, 50, 10, 10, 5, 2, 1];

/**
 * @description - Calculate the minimum number of notes that can be given to the user.
 * 
 * @param {number} withdrawAmount - Amount user want to be despensed.
 */
function calculateTakeawayCurrencies(withdrawAmount) {
    let takeawayCurrencies = [];
    for (let i = 9; i >= 0; i--) {
        if (withdrawAmount >= CURRENCY_NOTES[i]) {
            takeawayCurrencies[i] = Math.floor(withdrawAmount / CURRENCY_NOTES[i]);
            withdrawAmount = withdrawAmount - takeawayCurrencies[i] * CURRENCY_NOTES[i];
        } else {
            takeawayCurrencies[i] = 0;
        }
    }
    // Generate the table after calculatin of notes.
    generateTakeawayTable(takeawayCurrencies);
}

/**
 * @description - It is used to generate the dynamic table.
 * 
 * @param {number []} takeawayCurrencies - Takeway curreny collection.
 */
function generateTakeawayTable(takeawayCurrencies) {
    if (takeawayCurrencies.length > 0) {
        let tbody = "";
        let totalNotes = 0;
        if (takeawayCurrencies.length > 0) {
            totalNotes = takeawayCurrencies.reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            });
        }
        // Create header.
        let theader = '<div class="table-responsive"><table class="table">\n';

        // Create rows and columns.
        for (let i = 0; i < takeawayCurrencies.length - 1; i++) {
            tbody += "<tr>";
            tbody += `<td>${takeawayCurrencies[i] + " Note of Rs " + CURRENCY_NOTES[i]}</td>`;
            tbody += `<td>${i !== takeawayCurrencies.length
                ? takeawayCurrencies[i + 1] + " Note of Rs " + CURRENCY_NOTES[i + 1]
                : takeawayCurrencies[i] + " Note of Rs " + CURRENCY_NOTES[i]}</td>`;
            if (i !== takeawayCurrencies.length - 2) {
                i = i + 1;
            }
            tbody += "</tr>\n";
        }
        tbody +=
            '<tr> <td class="bold-w">Total notes dispensed: ' +
            totalNotes +
            "</td><td></td></tr>";
        let tfooter = "</table></div>";
        document.getElementById("tblSummary").innerHTML =
            theader + tbody + tfooter;
    }
}

/**
 * @description - Dispense the money to the user.
 * 
 * @param {object} event - Form submit event.
 */
function dispenseMoney(event) {
    const withdrawAmount = parseInt(document.dispenseForm[0].value, 0);
    let errorNode = document.getElementById("error");
    // If valid amount, calculate the notes.
    if (withdrawAmount && withdrawAmount > 0) {
        document.getElementById("error").innerHTML = null;
        // Notes calculation.
        calculateTakeawayCurrencies(withdrawAmount);
    } else {
        // Error for invalid amount.
        if (withdrawAmount <= 0) {
            errorNode.innerHTML =
                "Oops! Please enter valid amount";
        } else { // Error for empty value.
            errorNode.innerHTML =
                "Oops! Please enter some amount.";
        }
        // Clear summary table.
        document.getElementById("tblSummary").innerHTML = null;
    }
    // Prevent the form from submitting so that it will not loose the state of page.
    event.preventDefault();
    return false;
}
