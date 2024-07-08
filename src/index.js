const xlsx = require('xlsx');
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');
const serviceAccount = require('./documents/firebase/testmartecmember-2f61fe5f675f.json');
// ไฟล์อยู่ documents/firebase/filename.json

// เริ่มต้น Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Validation pathfile Excel 
const filePath = path.join(__dirname, 'documents', 'excelfile', 'member.xlsx');

  if (fs.existsSync(filePath)) {
    // อ่านไฟล์ Excel
    const workbook = xlsx.readFile(filePath);
    const sheet_name_list = workbook.SheetNames;
    const worksheet = workbook.Sheets[sheet_name_list[0]]; // อ่าน sheet แรก
    const data = xlsx.utils.sheet_to_json(worksheet);
  } else {
  console.error(`File not found: ${filePath}`);
  }


// อัปโหลดข้อมูลไปยัง Firebase
// data.forEach(async (row, index) => {
//   const docRef = db.collection('members').doc(String(index));
//   await docRef.set(row);
// });

console.log('อัปโหลดข้อมูลเรียบร้อยแล้ว');




