function startTaxCalculation() {
  document.body.innerHTML = `
    <header>
      <h1>ป้อนข้อมูลรายได้</h1>
    </header>
    <main>
      <form id="income-form">
        <label for="annual-income">รายได้ทั้งปี (บาท):</label>
        <input type="number" id="annual-income" required>
        
        <label for="bonus">โบนัส (บาท):</label>
        <input type="number" id="bonus" required>
        
        <label for="other-income">รายได้อื่นๆ (บาท):</label>
        <input type="number" id="other-income" required>
        
        <button type="button" onclick="showDeductions()">ถัดไป</button>
      </form>
    </main>
  `;
}

function showDeductions() {
  document.body.innerHTML = `
    <header>
      <h1>รายการลดหย่อนภาษี</h1>
    </header>
    <main>
      <form id="deduction-form">
        <label for="status">สถานะภาพ:</label>
        <select id="status" onchange="updateChildInputs()">
          <option value="โสด">โสด</option>
          <option value="คู่สมรสแยกยื่น">คู่สมรส (แยกยื่น)</option>
          <option value="หย่า">หย่า</option>
          <option value="คู่สมรสไม่มีเงินได้">คู่สมรสไม่มีเงินได้</option>
        </select>

        <label for="parents">บิดามารดา:</label>
        <select id="parents">
          <option value="0">ไม่มี</option>
          <option value="1">บิดามารดา 1 คน</option>
          <option value="2">บิดามารดา 2 คน</option>
        </select>

        <div id="child-deductions"></div>
        
        <button type="button" onclick="showResults()">สรุปผล</button>
      </form>
    </main>
  `;
}

function updateChildInputs() {
  const status = document.getElementById("status").value;
  const childDeductions = document.getElementById("child-deductions");

  if (status !== "โสด") {
    childDeductions.innerHTML = `
      <label for="child1">บุตรคนที่ 1:</label>
      <select id="child1" onchange="addChildFields()">
        <option value="ไม่มี">ไม่มี</option>
        <option value="มี">มี</option>
      </select>
    `;
  } else {
    childDeductions.innerHTML = "";
  }
}

function addChildFields() {
  const child1 = document.getElementById("child1").value;
  const childDeductions = document.getElementById("child-deductions");

  if (child1 === "มี") {
    childDeductions.innerHTML += `
      <label for="child2-before-2018">บุตรคนที่ 2 (เกิดก่อนปี 2561):</label>
      <input type="number" id="child2-before-2018" placeholder="จำนวนบุตร">
      
      <label for="child2-after-2018">บุตรที่เกิดตั้งแต่ปี 2561 เป็นต้นไป:</label>
      <input type="number" id="child2-after-2018" placeholder="จำนวนบุตร">
    `;
  }
}

function showResults() {
  const income = document.getElementById("annual-income").value;
  const bonus = document.getElementById("bonus").value;
  const otherIncome = document.getElementById("other-income").value;

  // Calculate Total Income
  const totalIncome = parseFloat(income) + parseFloat(bonus) + parseFloat(otherIncome);

  document.body.innerHTML = `
    <header>
      <h1>สรุปผล</h1>
    </header>
    <main>
      <div class="result">
        รายได้รวมทั้งหมด: ${totalIncome.toLocaleString()} บาท
      </div>
    </main>
  `;
}
