export const createUser = (user) => (
  $.ajax({
    url: '/api/users',
    method: 'POST',
    data: { user }
  })
);

export const loginUser = (user) => (
  $.ajax({
    url: '/api/session',
    method: 'POST',
    data: { user }
  })
);

export const logoutUser = () => (
  $.ajax({
    url: '/api/session',
    method: 'DELETE'
  })
);