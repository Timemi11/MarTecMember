const { excelDateToJSDate } = require('./excelDate.js');
 

// แปลงข้อมูลในแต่ละแถวให้เป็นสตริง และ แปลงวันที่
 function formatData(data) {
    // คืนค่า data ใหม่ที่มีการเปลี่ยน key แล้ว
    return data.map(row => {
        const newRow = {};
    
        for (let key in row) {
    
          if (row.hasOwnProperty(key) ) { //เช็คว่า key นี้มีอยู่ใน object หรือไม่
            let value = row[key];

            if ( (key === 'startDate' && value !== '') || (key === 'endDate' && value !== '') || (key === 'paymentDate' && value !== '')  ) {
              value = excelDateToJSDate(value); // แปลงวันที่
            }
            newRow[key] = String(value); // แปลงค่าเป็นสตริง
    
          }
        }
         return newRow; // คืนค่า row ใหม่
      });

 }


  module.exports = { formatData };