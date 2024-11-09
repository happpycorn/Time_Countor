function doPost(e) {
  // 从请求中取得数据
  const params = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const columnName = params.columnName; // 指定的列名
  const data = params.data; // 要追加的数据
  
  // 找到列名对应的列号
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const columnIndex = headers.indexOf(columnName) + 1;

  if (columnIndex === 0) {
    return ContentService.createTextOutput(JSON.stringify({ "error": "Column not found." }))
                         .setMimeType(ContentService.MimeType.JSON);
  }

  // 找到该列的最底部的空行并插入数据
  const lastRow = sheet.getRange(1, columnIndex, sheet.getLastRow()).getValues()
                     .map(row => row[0])
                     .lastIndexOf('') + 1;
  const insertRow = lastRow > 0 ? lastRow + 1 : sheet.getLastRow() + 1;

  sheet.getRange(insertRow, columnIndex).setValue(data);

  return ContentService.createTextOutput(JSON.stringify({ "success": true }))
                       .setMimeType(ContentService.MimeType.JSON);
}