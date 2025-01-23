// หน้า index.html
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

// หน้า deduction.html
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

// หน้า result.html
const totalIncome = parseFloat(localStorage.getItem('totalIncome'));
const status = localStorage.getItem('status');
const children = parseInt(localStorage.getItem('children'));
const personalDeduction = parseInt(localStorage.getItem('personalDeduction'));

let familyDeduction = 0;
if (status === 'married_joint') {
    familyDeduction += 60000;
}
familyDeduction += children * 30000;

const totalDeduction = personalDeduction + familyDeduction;
const taxableIncome = totalIncome - totalDeduction;

let tax = 0;
if (taxableIncome > 0) {
    if (taxableIncome <= 150000) {
        tax = 0;
    } else if (taxableIncome <= 300000) {
        tax = (taxableIncome - 150000) * 0.05;
    } else if (taxableIncome <= 500000) {
        tax = (taxableIncome - 300000) * 0.10 + 7500;
    } else if (taxableIncome <= 1000000) {
        tax = (taxableIncome - 500000) * 0.20 + 27500;
    } else {
        tax = (taxableIncome - 1000000) * 0.30 + 127500;
    }
}

document.getElementById('result').innerHTML = `
    <p>รายได้รวม: ${totalIncome.toFixed(2)} บาท</p>
    <p>ค่าลดหย่อนรวม: ${totalDeduction.toFixed(2)} บาท</p>
    <p>รายได้สุทธิ: ${taxableIncome.toFixed(2)} บาท</p>
    <p>ภาษีที่ต้องจ่าย: ${tax.toFixed(2)} บาท</p>
`;
