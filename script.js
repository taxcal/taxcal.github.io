// จัดการการแสดงหน้าต่าง ๆ
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach((link, index) => {
  link.addEventListener('click', () => {
    pages.forEach(page => page.classList.remove('active'));
    pages[index].classList.add('active');
  });
});

// เก็บข้อมูลจากฟอร์ม
const formData = {};

document.getElementById('income-form').addEventListener('input', () => {
  formData.salary = parseFloat(document.getElementById('salary').value) || 0;
  formData.bonus = parseFloat(document.getElementById('bonus').value) || 0;
  formData.freelance = parseFloat(document.getElementById('freelance').value) || 0;
});

document.getElementById('deductions-form').addEventListener('input', () => {
  formData.parentSupport = parseFloat(document.getElementById('parent-support').value) || 0;
  formData.insurance = parseFloat(document.getElementById('insurance').value) || 0;
  formData.funds = parseFloat(document.getElementById('funds').value) || 0;
});

document.getElementById('status-form').addEventListener('input', () => {
  formData.status = document.getElementById('status').value;
  formData.children = parseInt(document.getElementById('children').value) || 0;
});

// อัปเดตหน้าสรุป
document.getElementById('link-summary').addEventListener('click', () => {
  const totalIncome = (formData.salary || 0) + (formData.bonus || 0) + (formData.freelance || 0);
  const totalDeductions = (formData.parentSupport || 0) + (formData.insurance || 0) + (formData.funds || 0);
  const taxableIncome = totalIncome - totalDeductions;

  document.getElementById('summary-content').innerHTML = `
    <p><strong>รายได้รวมต่อปี:</strong> ${totalIncome.toLocaleString()} บาท</p>
    <p><strong>ค่าลดหย่อนภาษี:</strong> ${totalDeductions.toLocaleString()} บาท</p>
    <p><strong>สถานภาพ:</strong> ${formData.status || '-'}</p>
    <p><strong>จำนวนบุตร:</strong> ${formData.children || 0} คน</p>
    <p><strong>รายได้ที่ต้องเสียภาษี:</strong> ${taxableIncome.toLocaleString()} บาท</p>
  `;
});
