

// Fetch API để lấy danh sách bài hát
fetch('https://localhost:7220/api/SoundCloudStorage/tracks')
  .then(response => response.json())
  .then(tracks => {
    const musicDiv = document.querySelector('.music'); // Tìm thẻ div có class "music"
    
    // Nếu không có bài hát nào, hiển thị thông báo
    if (tracks.length === 0) {
      musicDiv.innerHTML = '<p>Không có bài hát nào được lưu.</p>';
    } else {
      // Tạo bảng để hiển thị danh sách bài hát
      const table = document.createElement('table');
      table.classList.add('track-table');
      
      const thead = document.createElement('thead');
      const headerRow = document.createElement('tr');
      
      // Thêm tiêu đề bảng
      headerRow.innerHTML = `
        <th>Ảnh bìa</th>
        <th>Tên bài hát</th>
        <th>Nghệ sĩ</th>
        <th>Phát nhạc</th>
      `;
      thead.appendChild(headerRow);
      table.appendChild(thead);
      
      const tbody = document.createElement('tbody');
      
      // Thêm các bài hát vào bảng
      tracks.forEach(track => {
        const row = document.createElement('tr');
        
        // Ảnh bìa
        const imageCell = document.createElement('td');
        const img = document.createElement('img');
        img.src = track.artworkUrl;
        img.alt = track.title;
        img.classList.add('track-image');
        imageCell.appendChild(img);
        
        // Tên bài hát
        const titleCell = document.createElement('td');
        titleCell.textContent = track.title;
        
        // Nghệ sĩ
        const artistCell = document.createElement('td');
        artistCell.textContent = track.artist;
        
        // Phát nhạc
        const audioCell = document.createElement('td');
        const audio = document.createElement('audio');
        audio.controls = true;
        audio.src = track.streamUrl;
        audioCell.appendChild(audio);
        
        row.appendChild(imageCell);
        row.appendChild(titleCell);
        row.appendChild(artistCell);
        row.appendChild(audioCell);
        
        tbody.appendChild(row);
      });
      
      table.appendChild(tbody);
      musicDiv.appendChild(table); // Thêm bảng vào div có class "music"
    }
  })
  .catch(error => {
    console.error('❌ Lỗi khi lấy danh sách bài hát:', error);
  });

