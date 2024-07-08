//  แปลงวันที่เป็น YYYY-MM-DD
 function excelDateToJSDate(serial) {
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);

    const year = date_info.getUTCFullYear();
    const month = ("0" + (date_info.getUTCMonth() + 1)).slice(-2);
    const day = ("0" + date_info.getUTCDate()).slice(-2);
  
    return `${year}-${month}-${day}`;
  }

  module.exports = { excelDateToJSDate };