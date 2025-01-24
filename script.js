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
    const insurance = parseFloat(document.getElementById('insurance').value || 0);
    const fund = parseFloat(document.getElementById('fund').value || 0);
    const donation = parseFloat(document.getElementById('donation').value || 0);

    // ค่าใช้จ่ายส่วนตัว 60,000 บาท
    const personalDeduction = 60000;

    // คำนวณค่าลดหย่อนจากบุตร
    const childrenDeduction = children * 30000;

    // คำนวณค่าลดหย่อนจากเบี้ยประกัน
    const insuranceDeduction = insurance;

    // คำนวณค่าลดหย่อนจากกองทุนสำรอง
    const fundDeduction = fund;

    // คำนวณค่าลดหย่อนจากการบริจาค
    const donationDeduction = donation;

    // คำนวณรวมลดหย่อนทั้งหมด
    const totalDeduction = personalDeduction + childrenDeduction + insuranceDeduction + fundDeduction + donationDeduction;

    // คำนวณรายได้สุทธิ
    const totalIncome = parseFloat(localStorage.getItem('totalIncome') || 0);
    const taxableIncome = totalIncome - totalDeduction;

    // คำนวณภาษี
    const tax = calculateTax(taxableIncome);

    // บันทึกข้อมูลทั้งหมดลง localStorage
    localStorage.setItem('taxableIncome', taxableIncome);
    localStorage.setItem('tax', tax);

    // แสดงผลลัพธ์
    window.location.href = 'result.html';
};

// คำนวณภาษีแบบขั้นบันได
function calculateTax(taxableIncome) {
    let tax = 0;
    if (taxableIncome > 0) {
        if (taxableIncome <= 150000) tax = 0;
        else if (taxableIncome <= 300000) tax = (taxableIncome - 150000) * 0.05;
        else if (taxableIncome <= 500000) tax = (300000 - 150000) * 0.05 + (taxableIncome - 300000) * 0.10;
        else if (taxableIncome <= 750000) tax = (300000 - 150000) * 0.05 + (500000 - 300000) * 0.10 + (taxableIncome - 500000) * 0.15;
        else if (taxableIncome <= 1000000) tax = (300000 - 150000) * 0.05 + (500000 - 300000) * 0.10 + (750000 - 500000) * 0.15 + (taxableIncome - 750000) * 0.20;
        else if (taxableIncome <= 2000000) tax = (300000 - 150000) * 0.05 + (500000 - 300000) * 0.10 + (750000 - 500000) * 0.15 + (1000000 - 750000) * 0.20 + (taxableIncome - 1000000) * 0.25;
        else tax = (300000 - 150000) * 0.05 + (500000 - 300000) * 0.10 + (750000 - 500000) * 0.15 + (1000000 - 750000) * 0.20 + (2000000 - 1000000) * 0.25 + (taxableIncome - 2000000) * 0.30;
    }
    return tax;
}

// แสดงผลลัพธ์ในหน้า result.html
window.onload = function () {
    const totalIncome = localStorage.getItem('totalIncome');
    const taxableIncome = localStorage.getItem('taxableIncome');
    const tax = localStorage.getItem('tax');

    const result = `
        <h2>ข้อมูลการคำนวณ</h2>
        <p><strong>รายได้รวม:</strong> ฿${totalIncome}</p>
        <p><strong>รายได้สุทธิ (หลังหักค่าลดหย่อน):</strong> ฿${taxableIncome}</p>
        <p><strong>ภาษีที่ต้องจ่าย:</strong> ฿${tax}</p>
    `;
    document.getElementById('result').innerHTML = result;
};
