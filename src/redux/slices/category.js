/* eslint-disable */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as Api from "../../api/endpoints";
import { Axios } from "../../api/instances"
import { NotificationManager } from "react-notifications";
import { history } from "../../utils/utils";

const initialState = {
    categories: {
        items: [],
        totalPages: 0,
        currentPage: 0,
        totalItems: 0,
    },
    category: null,
    loading: false,
    buttonLoading: false,
};

const fetchAllCategories = createAsyncThunk(
    "categories/fetchAllCategories",
    async (id) => {
        // TODO:: Fix Page size
        const res = await Axios.get(`${Api.GET_CATEGORY}?page=0&size=1000&user_id=${id}`)
        console.log(res)
        return res.data.data
    }
);

const postCategory = createAsyncThunk(
    "categories/addCategory",
    async ({ name, description, user_id }) => {
        try {
            const res = await Axios.post(Api.CREATE_CATEGORY, {
                name,
                description,
                user_id,
            });
            history.push('/#/category/all');
            
        } catch (error) {
            throw error?.response?.data || error.message;
        }
    }
)

const updateCategory = createAsyncThunk(
    "categories/updateCategory",
    async ({ name, description, user_id }) => {
        try {
            const res = await Axios.patch(Api.EDIT_CATEGORY, {
                name,
                description,
                user_id,
            });
            history.push('/#/category/all');
            
        } catch (error) {
            throw error?.response?.data || error.message;
        }
    }
)


const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCategories.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchAllCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.loading = false
            })
            .addCase(fetchAllCategories.rejected, (state, action) => {
                state.loading = false;
                NotificationManager.error(action.error.message);
            })
            .addCase(postCategory.pending, (state, action) => {
                state.buttonLoading = true;
            })
            .addCase(postCategory.fulfilled, (state, action) => {
                state.buttonLoading = false;
                NotificationManager.success("Category added!");
                window.location.reload(false)
            })
            .addCase(postCategory.rejected, (state, action) => {
                state.buttonLoading = false;
                NotificationManager.error(action.error.message);
            })
            .addCase(updateCategory.pending, (state, action) => {
                state.buttonLoading = true;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.buttonLoading = false;
                NotificationManager.success("Category updated!");
                window.location.reload(false)
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.buttonLoading = false;
                NotificationManager.error(action.error.message);
            })
    },
});

export { fetchAllCategories, postCategory, updateCategory };

export default categoriesSlice.reducer;