import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../interface";
import axios from "axios";

// Khởi tạo state
const initialState: User[] = []
// Hàm lấy tất cả user
export const getUser: any = createAsyncThunk(
    "users/getAllUser",
    async () => {
        const data = await axios.get("http://localhost:8080/users")
        return data.data
    }
)

// Khai báo hàm đi thêm mới user
export const addUser: any = createAsyncThunk(
    "users/addUser",
    async (user) => {
        const response = await axios.post("http://localhost:8080/users", user)
        return response.data
    }
)

// Hàm xóa user
export const deleteUser: any = createAsyncThunk(
    "users/deleteUser",
    async (id) => {
        const response = await axios.delete(`http://localhost:8080/users/${id}`)
        return id
    }
)

// Hàm sửa user
export const editUsers: any = createAsyncThunk(
    "users/editUser",
    async ({ id, user }: { id: number, user: User}) => {
        const response = await axios.patch(`http://localhost:8080/users/${id}`, user);
        return response.data
    }
)

const userReducer = createSlice({
    name: "user",
    initialState: {
        user: initialState
    },
    reducers: {
        // Nơi khai báo các action
    },
    extraReducers: (builder) => {
        builder.addCase(getUser.pending, (state, action) => {
            // Trạng thái chờ lấy dữ liệu
        })
        .addCase(getUser.fulfilled, (state: any, action) => {
            // Trạng thái lấy dữ liệu thành công
            state.user=action.payload
        })
        .addCase(getUser.rejected, (state, action) => {
            // Trạng thái lấy dữ liệu thất bại
        })
        .addCase(addUser.fulfilled, (state, action) => {
            state.user.push(action.payload)
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            let result = state.user.filter((item: any) => item.id !== action.payload)
            state.user = [...result]
            console.log(state.user);
            
        })
        .addCase(editUsers.fulfilled, (state, action) => {
            const index = state.user.findIndex((item: any) => item.id === action.payload.id);
            if (index !== -1) {
                state.user[index] = action.payload;
            }
        });
    }
})

// Xuất ra các action

// Xuất ra reducer
export default userReducer.reducer