
const xlsx = require('xlsx');
const admin = require('firebase-admin');
const serviceAccount = require('./path_to_your_service_account_key.json');
// ไฟล์อยู่ documents/firebase/filename.json



// เริ่มต้น Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// อ่านไฟล์ Excel
const workbook = xlsx.readFile('path_to_your_excel_file.xlsx');
const sheet_name_list = workbook.SheetNames;
const worksheet = workbook.Sheets[sheet_name_list[0]]; // อ่าน sheet แรก
const data = xlsx.utils.sheet_to_json(worksheet);

// อัปโหลดข้อมูลไปยัง Firebase
data.forEach(async (row, index) => {
  const docRef = db.collection('your_collection_name').doc(String(index));
  await docRef.set(row);
});

console.log('อัปโหลดข้อมูลเรียบร้อยแล้ว');




