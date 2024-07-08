const xlsx = require('xlsx');
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');
const { excelDateToJSDate } = require('./utils/excelDate.js');
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
    const data = xlsx.utils.sheet_to_json(worksheet,{ defval: "" });



    const formatData = data.map(row => {
      const newRow = {};
      for (let key in row) {
        if (row.hasOwnProperty(key)) {
          let value = row[key];
          if ( (key === 'startDate' && value) || (key === 'endDate' && value) || (key === 'paymentDate' && value)  ) {
            value = excelDateToJSDate(value); // แปลงวันที่
          }
          newRow[key] = String(value); // แปลงค่าเป็นสตริง
        }
      }
      return newRow;
    });


    // อัปโหลดข้อมูลไปยัง Firebase
    formatData.forEach(async (row) => {
      try {
        const docRef = await db.collection('members').add(row);
        await db.collection('users').doc("ULineId"+docRef.id).set({ businessId: docRef.id });
        console.log('Document written with ID: ', docRef.id);
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    });


    console.log('อัปโหลดข้อมูลเรียบร้อยแล้ว');

  } else {
  console.error(`File not found: ${filePath}`);
  }







