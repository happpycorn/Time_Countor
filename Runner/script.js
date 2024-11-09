function send() {
  const responseMessage = document.getElementById("gradeName").innerText+"-"+document.getElementById("number").innerText;
  const baseUrl = "https://script.google.com/macros/s/AKfycbzXbglJAxIi6cChwCzGjreoksuUcLoLcKxh7cFO7xIM-E4D7GXlARu3yU3C6IDW4T3y/exec"; // 替換為你的 Apps Script 部署網址
  const url = `${baseUrl}?columnName=Runner&data=${encodeURIComponent(responseMessage)}`;
  
  document.getElementById("number").innerText = "";

  fetch(url, {
    method: "GET"
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log("資料已成功新增！");
      } else {
        console.log("錯誤：" + (data.error || "無法新增資料"));
      }
    })
    .catch(error => {
      console.log("發送失敗：" + error.message);
    });
  
}

// 設置字母
function grade(letter) {
  document.getElementById("gradeName").innerText = letter;
}

// 設置數字
function number(num) {
  const numberElement = document.getElementById("number");
  numberElement.innerText += num;
}

// 清除數字
function clearNumber() {
  document.getElementById("number").innerText = "";
}