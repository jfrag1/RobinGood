const updateUserBuyingPower = (userId, delta) => (
  $.ajax({
    url: `/api/users/${userId}`,
    method: 'PATCH',
    data: { delta }
  })
);

export default updateUserBuyingPower;