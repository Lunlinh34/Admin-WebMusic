document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("music-save-container");
  
    if (!container) return;
  
    // Tạo nội dung UI
    const title = document.createElement("h2");
    title.textContent = "💾 Lưu danh sách nhạc từ SoundCloud";
    title.style.marginBottom = "20px";
  
    const message = document.createElement("p");
    message.style.marginTop = "20px";
    message.style.display = "none";
  
    const button = document.createElement("button");
    button.textContent = "Lưu nhạc từ SoundCloud";
    button.style.padding = "10px 20px";
    button.style.fontSize = "16px";
    button.style.cursor = "pointer";
    button.style.backgroundColor = "#4CAF50";
    button.style.color = "#fff";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.transition = "0.3s";
  
    container.style.padding = "40px";
    container.style.textAlign = "center";
    container.appendChild(title);
    container.appendChild(button);
    container.appendChild(message);
  
    // Hàm xử lý lưu nhạc
    async function saveMusic() {
      message.style.display = "none";
      button.disabled = true;
      button.textContent = "Đang lưu...";
      button.style.cursor = "not-allowed";
      button.style.backgroundColor = "#999";
  
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          message.textContent = "⚠️ Bạn cần đăng nhập để thực hiện thao tác này.";
          message.style.color = "red";
          message.style.display = "block";
          return;
        }
  
        const response = await fetch("https://localhost:7220/api/SoundCloudStorage/save", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await response.text();
  
        if (response.ok) {
          message.textContent = data || "🎉 Đã lưu thành công danh sách nhạc từ SoundCloud!";
          message.style.color = "green";
        } else {
          message.textContent = "❌ Không thể lưu nhạc: " + data;
          message.style.color = "red";
        }
      } catch (err) {
        console.error("❌ Lỗi:", err);
        message.textContent = "❌ Không thể kết nối máy chủ!";
        message.style.color = "red";
      } finally {
        button.disabled = false;
        button.textContent = "Lưu nhạc từ SoundCloud";
        button.style.cursor = "pointer";
        button.style.backgroundColor = "#4CAF50";
        message.style.display = "block";
      }
    }
  
    // Gắn sự kiện click
    button.addEventListener("click", saveMusic);
  });
  