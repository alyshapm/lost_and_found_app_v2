import userApi from "../../utils/userAxios";

// get user infor
const getUserInfor = async () => {
  const response = await userApi.get("/user_infor");
  return response.data;
};

// get all user infor (admin)
const getAllUsersInfor = async () => {
  const response = await userApi.get("/all_infor");

  return response.data;
};

// update user infor
const updateUser = async (data) => {
  const response = await userApi.patch("/update_user", data);

  return response.data;
};

// update user role
const updateUserRole = async (data) => {
  const payload = { role: data.role };
  const response = await userApi.patch(`/update_role/${data._id}`, payload);
  return response.data;
};

// update user status
const updateUserStatus = async (data) => {
  const response = await userApi.patch(`/update_user_status/${data._id}`, data);

  return response.data;
};

// delete user (admin)
// const deleteUser = async (userId, token) => {
//     const response = await axios.delete(API_URL + `/delete/${userId}`, {
//         headers: { Authorization: `Bearer ${token}` }
//     })

//     return response.data
// }

const userService = {
  getUserInfor,
  getAllUsersInfor,
  updateUser,
  updateUserRole,
  updateUserStatus,
};

export default userService;
