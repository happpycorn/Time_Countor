function doGet(e) {

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  var params = e.parameter;
  const columnName = params.columnName; // 指定的列名
  const data = params.data; // 要追加的数据
  
  // 找到列名对应的列号
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const columnIndex = headers.indexOf(columnName) + 1;

  if (columnIndex === 0) {
    return ContentService.createTextOutput(JSON.stringify({ "error": "Column not found." }))
                         .setMimeType(ContentService.MimeType.JSON);
  }

  // 向下遍歷該列，找到第一個空白的儲存格並插入資料
  let row = 2; // 從第2行開始，假設第1行是標題
  while (sheet.getRange(row, columnIndex).getValue() !== '') {
    row++;
  }

  sheet.getRange(row, columnIndex).setValue(data);

  return ContentService.createTextOutput(JSON.stringify({ "success": true }))
                        .setMimeType(ContentService.MimeType.JSON);
}
