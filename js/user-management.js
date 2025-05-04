const API = 'https://localhost:7220/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');

  return token ? { Authorization: `Bearer ${token}` } : {};
};

const getAllUsers = async () => {
  try {
    const res = await axios.get(`${API}/auth/users`, {
      headers: getAuthHeader(),
    });
    return res.data;
  } catch (error) {
    console.error('Lỗi khi tải danh sách người dùng:', error);
    throw new Error('Không thể tải danh sách người dùng');
  }
};

const createUser = async ({ email, password }) => {
  try {
    const res = await axios.post(
      `${API}/auth/create`,
      { email, password },
      {
        headers: getAuthHeader(),
      }
    );
    return res.data;
  } catch (error) {
    console.error('Lỗi khi tạo người dùng:', error);
    throw new Error('Không thể tạo người dùng');
  }
};

const updateUser = async (id, { email }) => {
  try {
    const res = await axios.put(
      `${API}/auth/update`,
      { email },
      {
        headers: getAuthHeader(),
        params: { id },
      }
    );
    return res.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật người dùng:', error);
    throw new Error('Không thể cập nhật người dùng');
  }
};

const deleteUser = async (id) => {
  try {
    const res = await axios.delete(`${API}/auth/delete`, {
      headers: getAuthHeader(),
      params: { id },
    });
    return res.data;
  } catch (error) {
    console.error('Lỗi khi xoá người dùng:', error);
    throw new Error('Không thể xoá người dùng');
  }
};

const renderUserList = async (containerId) => {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  const title = document.createElement('h2');
  title.innerText = 'Quản lý người dùng';
  container.appendChild(title);

  const form = document.createElement('form');
  form.innerHTML = `
    <input name="email" placeholder="Email" required />
    <input name="password" type="password" placeholder="Password" required />
    <button type="submit">Thêm mới</button>
  `;
  container.appendChild(form);

  const table = document.createElement('table');
  table.border = '1';
  table.cellPadding = '10';
  table.cellSpacing = '0';

  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr>
      <th>ID</th>
      <th>Email</th>
      <th>Hành động</th>
    </tr>
  `;
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  table.appendChild(tbody);

  container.appendChild(table);

  let users = [];
  let editingUserId = null;

  const refreshTable = async () => {
    try {
      users = await getAllUsers();
      tbody.innerHTML = '';
      users.forEach((user) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${user.id}</td>
          <td>${user.email}</td>
          <td>
            <button class="edit-btn" data-id="${user.id}">Sửa</button>
            <button class="delete-btn" data-id="${user.id}">Xoá</button>
          </td>
        `;
        tbody.appendChild(row);
      });
    } catch (err) {
      alert('Lỗi khi tải danh sách người dùng. Vui lòng kiểm tra lại kết nối!');
      console.error(err);
    }
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = form.email.value;
    const password = form.password.value;

    try {
      if (editingUserId) {
        await updateUser(editingUserId, { email });
      } else {
        await createUser({ email, password });
      }

      editingUserId = null;
      form.reset();
      form.querySelector('button').innerText = 'Thêm mới';
      form.password.style.display = 'inline';
      await refreshTable();
    } catch (err) {
      alert('Lỗi khi lưu người dùng. Kiểm tra lại dữ liệu!');
      console.error(err);
    }
  });

  tbody.addEventListener('click', async (e) => {
    const id = e.target.dataset.id;
    if (e.target.classList.contains('edit-btn')) {
      const user = users.find((u) => u.id == id);
      form.email.value = user.email;
      form.password.style.display = 'none'; // không sửa password
      editingUserId = user.id;
      form.querySelector('button').innerText = 'Cập nhật';
    } else if (e.target.classList.contains('delete-btn')) {
      if (confirm('Bạn có chắc muốn xoá người dùng này không?')) {
        try {
          await deleteUser(id);
          await refreshTable();
        } catch (err) {
          alert('Lỗi khi xoá người dùng');
          console.error(err);
        }
      }
    }
  });

  await refreshTable();
};

window.addEventListener('DOMContentLoaded', () => {
  renderUserList('user-container');
});
