document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const page = window.location.pathname;

  if (page.includes('result.html')) {
    const annualIncome = parseFloat(params.get('annualIncome') || 0);
    const bonus = parseFloat(params.get('bonus') || 0);
    const otherIncome = parseFloat(params.get('otherIncome') || 0);

    const father = parseFloat(params.get('father') || 0);
    const mother = parseFloat(params.get('mother') || 0);
    const maritalStatus = params.get('maritalStatus');
    const child1 = parseFloat(params.get('child1') || 0);
    const childrenBefore2018 = parseInt(params.get('childrenBefore2018') || 0);
    const childrenAfter2018 = parseInt(params.get('childrenAfter2018') || 0);
    const disabledFather = parseFloat(params.get('disabledFather') || 0);
    const disabledMother = parseFloat(params.get('disabledMother') || 0);
    const disabledRelative = parseFloat(params.get('disabledRelative') || 0);

    const totalIncome = annualIncome + bonus + otherIncome;
    const totalDeductions =
      60000 +
      father +
      mother +
      child1 +
      childrenBefore2018 * 30000 +
      childrenAfter2018 * 60000 +
      disabledFather +
      disabledMother +
      disabledRelative;

    const taxableIncome = totalIncome - totalDeductions;
    const taxAmount = taxableIncome > 0 ? taxableIncome * 0.1 : 0;

    document.getElementById('result').innerHTML = `
      <p>รายได้รวม: ${totalIncome.toFixed(2)} บาท</p>
      <p>ค่าลดหย่อน: ${totalDeductions.toFixed(2)} บาท</p>
      <p>ภาษีที่ต้องจ่าย: ${taxAmount.toFixed(2)} บาท</p>
    `;
  }
});
