// เก็บข้อมูลระหว่างหน้า
const saveToStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const getFromStorage = (key) => JSON.parse(localStorage.getItem(key)) || {};

// ฟอร์มกรอกข้อมูลรายรับ
const incomeForm = document.getElementById('incomeForm');
if (incomeForm) {
    incomeForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const salary = Number(document.getElementById('salary').value);
        const bonus = Number(document.getElementById('bonus').value);
        const otherIncome = Number(document.getElementById('otherIncome').value);
        const totalIncome = salary * 12 + bonus + otherIncome;

        saveToStorage('incomeData', { salary, bonus, otherIncome, totalIncome });
        window.location.href = 'tax-calculation-step2.html'; // ไปหน้าถัดไป
    });
}

// หน้าผลลัพธ์
const resultPage = document.getElementById('totalIncome');
if (resultPage) {
    const { totalIncome } = getFromStorage('incomeData');
    const deduction = 60000; // ลดหย่อนส่วนบุคคล
    const taxableIncome = totalIncome - deduction;
    const taxRate = taxableIncome > 150000 ? 0.1 : 0; // ตัวอย่างอัตราภาษี
    const taxToPay = Math.max(0, taxableIncome * taxRate);

    document.getElementById('totalIncome').textContent = totalIncome.toLocaleString();
    document.getElementById('deduction').textContent = deduction.toLocaleString();
    document.getElementById('taxToPay').textContent = taxToPay.toLocaleString();
}
