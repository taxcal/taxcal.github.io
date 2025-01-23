// คำนวณรายได้รวม
document.getElementById('incomeForm').onsubmit = function (event) {
    event.preventDefault();
    const salary = parseFloat(document.getElementById('salary').value || 0);
    const bonus = parseFloat(document.getElementById('bonus').value || 0);
    const otherIncome = parseFloat(document.getElementById('otherIncome').value || 0);

    if (salary < 0 || bonus < 0 || otherIncome < 0) {
        alert("รายได้ไม่สามารถติดลบได้");
        return;
    }

    const totalIncome = salary + bonus + otherIncome;
    localStorage.setItem('totalIncome', totalIncome);
    window.location.href = 'deduction.html';
};

// คำนวณค่าลดหย่อน
document.getElementById('deductionForm').onsubmit = function (event) {
    event.preventDefault();
    const status = document.getElementById('status').value;
    const children = parseInt(document.getElementById('children').value || 0);
    const personalDeduction = 60000;

    if (children < 0) {
        alert("จำนวนลูกไม่สามารถติดลบได้");
        return;
    }

    localStorage.setItem('status', status);
    localStorage.setItem('children', children);
    localStorage.setItem('personalDeduction', personalDeduction);
    window.location.href = 'result.html';
};

// คำนวณภาษีแบบขั้นบันได
function calculateTax(taxableIncome) {
    let tax = 0;
    if (taxableIncome > 0) {
        if (taxableIncome <= 150000) tax = 0;
        else if (taxableIncome <= 300000) tax = (taxableIncome - 150000) * 0.05;
        else if (taxableIncome <= 500000) tax = (300000 - 150000) * 0.05 + (taxableIncome - 300000) * 0.10;
        else if (
