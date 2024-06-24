import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  deleteUser,
  getUser,
  editUsers,
} from "../../stores/reducers/userReducer";
import { User } from "../../interface";

export default function Admin() {
  const [editUser, setEditUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<string>("");
  const getData: any = useSelector((state) => state);
  console.log(1111, getData.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleAdd = () => {
    let newUser = {
      name: "Nhi",
    };
    dispatch(addUser(newUser));
  };

  // Hàm xóa user
  const handleDelete = (id: number) => {
    dispatch(deleteUser(id));
  };

  // Hàm sửa user
  const handleEdit = (user: User) => {
    setEditUser(user);
    setNewUser(user.name);
  };

  const handleUpdate = () => {
    if (editUser) {
      dispatch(editUsers({ id: editUser.id, user: { name: newUser } }));
      setEditUser(null);
      setNewUser("");
    }
  };
  return (
    <div>
      <input
        type="text"
        onChange={(e) => setNewUser(e.target.value)}
        value={newUser}
      />
      <button onClick={handleUpdate}>Cập nhật</button>
      {getData.user.user.map((item: any) => (
        <>
          <li>{item.name}</li>

          <button onClick={() => handleEdit(item)}>Sửa</button>
          <button onClick={() => handleDelete(item.id)}>Xoá</button>
        </>
      ))}{" "}
      <br />
      <button onClick={handleAdd}>Thêm</button>
    </div>
  );
}
