// เก็บข้อมูลใน LocalStorage
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
        window.location.href = 'tax-calculation-step2.html';
    });
}

// ฟอร์มลดหย่อน
const deductionForm = document.getElementById('deductionForm');
if (deductionForm) {
    deductionForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const parentDeduction = Number(document.getElementById('parentDeduction').value);
        const personalDeduction = 60000; // ลดหย่อนส่วนบุคคล
        const totalDeduction = personalDeduction + parentDeduction;

        saveToStorage('deductionData', { personalDeduction, parentDeduction, totalDeduction });
        window.location.href = 'result.html';
    });
}

// หน้าผลลัพธ์
const resultPage = document.getElementById('totalIncome');
if (resultPage) {
    const { totalIncome } = getFromStorage('incomeData');
    const { totalDeduction } = getFromStorage('deductionData');
    const taxableIncome = Math.max(0, totalIncome - totalDeduction);

    // คำนวณภาษีแบบขั้นบันได
    const taxRates = [
        { limit: 150000, rate: 0 },
        { limit: 300000, rate: 0.05 },
        { limit: 500000, rate: 0.1 },
        { limit: 750000, rate: 0.15 },
        { limit: 1000000, rate: 0.2 },
        { limit: 2000000, rate: 0.25 },
        { limit: 5000000, rate: 0.3 },
        { limit: Infinity, rate: 0.35 }
    ];

    let taxToPay = 0;
    let remainingIncome = taxableIncome;

    for (let i = 0; i < taxRates.length; i++) {
        const { limit, rate } = taxRates[i];
        if (remainingIncome > limit) {
            taxToPay += (limit - (taxRates[i - 1]?.limit || 0)) * rate;
        } else {
            taxToPay += remainingIncome * rate;
            break;
        }
        remainingIncome -= limit;
    }

    document.getElementById('totalIncome').textContent = totalIncome.toLocaleString();
    document.getElementById('deduction').textContent = totalDeduction.toLocaleString();
    document.getElementById('taxToPay').textContent = taxToPay.toLocaleString();
}
