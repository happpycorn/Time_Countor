function send() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const responseMessage = `${hours}:${minutes}:${seconds}`;
    const baseUrl = "https://script.google.com/macros/s/AKfycbzXbglJAxIi6cChwCzGjreoksuUcLoLcKxh7cFO7xIM-E4D7GXlARu3yU3C6IDW4T3y/exec"; // 替換為你的 Apps Script 部署網址
      
    const url = `${baseUrl}?columnName=Time&data=${encodeURIComponent(responseMessage)}`;
    
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