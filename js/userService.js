import axios from 'axios';
import { getAuthHeader } from './authService';

const API = 'https://localhost:7220/api';

// ✅ Lấy tất cả users
export const getAllUsers = async () => {
  const response = await axios.get(`${API}/auth/users`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

// ✅ Tạo user (chỉ cần email và password)
export const createUser = async ({ email, password }) => {
  const response = await axios.post(
    `${API}/auth/create`,
    { email, password },
    { headers: getAuthHeader() }
  );
  return response.data;
};

// ✅ Cập nhật user (hiện tại chỉ cập nhật email)
export const updateUser = async (id, { email }) => {
  const response = await axios.put(
    `${API}/auth/update`,
    { email },
    {
      headers: getAuthHeader(),
      params: { id }, // truyền qua query string
    }
  );
  return response.data;
};

// ✅ Xoá user theo id
export const deleteUser = async (id) => {
  const response = await axios.delete(`${API}/auth/delete`, {
    headers: getAuthHeader(),
    params: { id },
  });
  return response.data;
};
