import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TaxCalculator = () => {
  const [step, setStep] = useState(0); // จัดการขั้นตอน
  const [income, setIncome] = useState({ salary: 0, bonus: 0, other: 0 }); // รายรับ
  const [deductions, setDeductions] = useState({
    personal: 60000,
    parents: { father: false, mother: false },
    disabled: { father: false, mother: false, relative: false },
    children: { beforeYear2561: 0, afterYear2561: 0 },
    spouse: false, // คู่สมรสไม่มีรายได้
  }); // ลดหย่อน
  const [taxResult, setTaxResult] = useState(null); // ผลการคำนวณ

  // ตารางอัตราภาษีเงินได้บุคคลธรรมดา (ปี 2025)
  const taxRates = [
    { limit: 150000, rate: 0 }, // รายได้ไม่เกิน 150,000 บาท ไม่เสียภาษี
    { limit: 300000, rate: 0.05 }, // 5%
    { limit: 500000, rate: 0.1 }, // 10%
    { limit: 750000, rate: 0.15 }, // 15%
    { limit: 1000000, rate: 0.2 }, // 20%
    { limit: 2000000, rate: 0.25 }, // 25%
    { limit: 5000000, rate: 0.3 }, // 30%
    { limit: Infinity, rate: 0.35 }, // มากกว่า 5 ล้านบาท 35%
  ];

  // ฟังก์ชันคำนวณภาษี
  const calculateTax = () => {
    const totalIncome = income.salary + income.bonus + income.other; // รายรับรวม

    // คำนวณยอดลดหย่อน
    const parentDeduction = Object.values(deductions.parents).filter(Boolean)
      .length * 30000;
    const disabledDeduction = Object.values(deductions.disabled).filter(
      Boolean
    ).length * 60000;
    const childDeduction =
      deductions.children.beforeYear2561 * 30000 +
      deductions.children.afterYear2561 * 60000;
    const spouseDeduction = deductions.spouse ? 60000 : 0;

    const totalDeductions =
      deductions.personal +
      parentDeduction +
      disabledDeduction +
      childDeduction +
      spouseDeduction;

    const taxableIncome = Math.max(0, totalIncome - totalDeductions); // รายได้สุทธิที่ต้องเสียภาษี

    // คำนวณภาษีแบบขั้นบันได
    let tax = 0;
    let remainingIncome = taxableIncome;

    for (let i = 0; i < taxRates.length; i++) {
      const { limit, rate } = taxRates[i];
      if (remainingIncome <= 0) break;

      const previousLimit = i === 0 ? 0 : taxRates[i - 1].limit;
      const taxableAtThisRate = Math.min(remainingIncome, limit - previousLimit);

      tax += taxableAtThisRate * rate;
      remainingIncome -= taxableAtThisRate;
    }

    setTaxResult({
      totalIncome,
      totalDeductions,
      taxableIncome,
      tax,
    });

    setStep(4); // ไปยังหน้าผลลัพธ์
  };

  // ส่วนแสดงหน้าจอต่างๆ
  const renderHomePage = () => (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-8">คำนวณภาษีบุคคลธรรมดา</h1>
      <Button onClick={() => setStep(1)}>เริ่มคำนวณภาษี</Button>
    </div>
  );

  const renderIncomePage = () => (
    <Card className="w-[500px] mx-auto mt-10">
      <CardHeader>
        <CardTitle>กรอกรายรับของคุณ</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <Label>เงินเดือน (บาท)</Label>
            <Input
              type="number"
              value={income.salary}
              onChange={(e) =>
                setIncome({ ...income, salary: Number(e.target.value) })
              }
            />
          </div>
          <div>
            <Label>โบนัส (บาท)</Label>
            <Input
              type="number"
              value={income.bonus}
              onChange={(e) =>
                setIncome({ ...income, bonus: Number(e.target.value) })
              }
            />
          </div>
          <div>
            <Label>รายได้อื่นๆ (บาท)</Label>
            <Input
              type="number"
              value={income.other}
              onChange={(e) =>
                setIncome({ ...income, other: Number(e.target.value) })
              }
            />
          </div>
          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={() => setStep(0)}>
              ย้อนกลับ
            </Button>
            <Button onClick={() => setStep(2)}>ถัดไป</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderDeductionsPage = () => (
    <Card className="w-[600px] mx-auto mt-10">
      <CardHeader>
        <CardTitle>กรอกข้อมูลการลดหย่อน</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <Label>
              ลดหย่อนบิดา
              <Input
                type="checkbox"
                checked={deductions.parents.father}
                onChange={(e) =>
                  setDeductions({
                    ...deductions,
                    parents: { ...deductions.parents, father: e.target.checked },
                  })
                }
              />
            </Label>
          </div>
          <div>
            <Label>
              ลดหย่อนมารดา
              <Input
                type="checkbox"
                checked={deductions.parents.mother}
                onChange={(e) =>
                  setDeductions({
                    ...deductions,
                    parents: { ...deductions.parents, mother: e.target.checked },
                  })
                }
              />
            </Label>
          </div>
          <div>
            <Label>
              จำนวนบุตรเกิดก่อนปี 2561
              <Input
                type="number"
                value={deductions.children.beforeYear2561}
                onChange={(e) =>
                  setDeductions({
                    ...deductions,
                    children: {
                      ...deductions.children,
                      beforeYear2561: Number(e.target.value),
                    },
                  })
                }
              />
            </Label>
          </div>
          <div>
            <Label>
              จำนวนบุตรเกิดตั้งแต่ปี 2561
              <Input
                type="number"
                value={deductions.children.afterYear2561}
                onChange={(e) =>
                  setDeductions({
                    ...deductions,
                    children: {
                      ...deductions.children,
                      afterYear2561: Number(e.target.value),
                    },
                  })
                }
              />
            </Label>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={() => setStep(1)}>
            ย้อนกลับ
          </Button>
          <Button onClick={calculateTax}>คำนวณภาษี</Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderResultPage = () => (
    <Card className="w-[500px] mx-auto mt-10">
      <CardHeader>
        <CardTitle>ผลลัพธ์การคำนวณ</CardTitle>
      </CardHeader>
      <CardContent>
        <p>รายได้รวม: {taxResult?.totalIncome} บาท</p>
        <p>ลดหย่อนรวม: {taxResult?.totalDeductions} บาท</p>
        <p>รายได้สุทธิ: {taxResult?.taxableIncome} บาท</p>
        <p>ภาษีที่ต้องชำระ: {taxResult?.tax} บาท</p>
        <Button variant="outline" onClick={() => setStep(0)}>
          เริ่มใหม่
        </Button>
      </CardContent>
    </Card>
  );

  const pages = [
    renderHomePage(),
    renderIncomePage(),
    renderDeductionsPage(),
    renderResultPage,
  ];

  return <div className="container mx-auto p-4">{pages[step]}</div>;
};

export default TaxCalculator;
