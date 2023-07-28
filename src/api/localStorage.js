export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
}

export const removeToken = () => {
  localStorage.removeItem('token');
}
