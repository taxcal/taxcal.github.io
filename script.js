document.getElementById('calculate-btn').addEventListener('click', function () {
  // รับข้อมูลจากฟอร์ม
  const income = parseFloat(document.getElementById('income').value) || 0;
  const deductions = parseFloat(document.getElementById('deductions').value) || 0;
  const children = parseInt(document.getElementById('children').value) || 0;

  // คำนวณค่าลดหย่อนเพิ่มเติม
  const childDeduction = children * 30000; // สมมติลดหย่อนได้บุตรละ 30,000 บาท
  const totalDeductions = deductions + childDeduction;

  // รายได้สุทธิ
  const taxableIncome = income - totalDeductions;

  // คำนวณภาษี (ตามอัตราก้าวหน้า)
  let tax = 0;
  if (taxableIncome > 5000000) tax += (taxableIncome - 5000000) * 0.35, taxableIncome = 5000000;
  if (taxableIncome > 2000000) tax += (taxableIncome - 2000000) * 0.3, taxableIncome = 2000000;
  if (taxableIncome > 1000000) tax += (taxableIncome - 1000000) * 0.25, taxableIncome = 1000000;
  if (taxableIncome > 750000) tax += (taxableIncome - 750000) * 0.2, taxableIncome = 750000;
  if (taxableIncome > 500000) tax += (taxableIncome - 500000) * 0.15, taxableIncome = 500000;
  if (taxableIncome > 300000) tax += (taxableIncome - 300000) * 0.1, taxableIncome = 300000;
  if (taxableIncome > 150000) tax += (taxableIncome - 150000) * 0.05;

  // แสดงผลลัพธ์
  document.getElementById('tax-amount').textContent = `ภาษีที่ต้องชำระ: ${tax.toLocaleString()} บาท`;
  document.getElementById('net-income').textContent = `รายได้สุทธิ: ${(income - tax).toLocaleString()} บาท`;
});
