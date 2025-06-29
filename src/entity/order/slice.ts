import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { addOrder, getOrders, getOrdersByUserId } from "@/services/api";
import { Order, OrdersState } from "./types";

const defaultOrder: Order = {
  id: 0,
  userId: "",
  cartItems: [],
  total: 0,
  totalWithDiscount: 0,
  discount: 0,
  promocodeDiscount: null,
  promocodeId: null,
  certificateDiscount: null,
  deliveryCost: 500,
  certificateId: null,
  recipient: {
    deliveryMethod: "courier",
    paymentMethod: "SBP",
    fullName: "",
    phone: "",
    address: "",
    email: "",
    deliveryDate: "",
    comment: "",
  },
};

const initialState: OrdersState = {
  items: [],
  current: { ...defaultOrder },
  loading: "idle",
  error: null,
};

export const fetchOrders = createAsyncThunk(
  "products/fetchOrders",
  async () => {
    const response = await getOrders();
    return response;
  }
);

export const fetchOrdersByUserId = createAsyncThunk(
  "products/fetchOrdersByUserId",
  async (userId: string) => {
    try {
      const response = await getOrdersByUserId(userId);
      return response;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  }
);

export const createOrder = createAsyncThunk(
  "products/createOrder",
  async (order: Order ) => {
    try {
      console.log(order)
      const response = await addOrder(order);
      return response;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  }
);

const ordersSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    changeOrderInfo(state, action: PayloadAction<Partial<Order> & { userId: string } | undefined>) {
      if (state.current === null) state.current = { ...defaultOrder };

      if (action.payload) {
        state.current.userId = action.payload.userId;
        const { userId, ...rest } = action.payload;
        Object.assign(state.current, rest);
      }

      // Пересчёт totals
      const cartItems = state.current.cartItems || [];
      const total = cartItems.reduce(
        (sum, item) => sum + item.product.prevPrice * item.quantity,
        0
      );
      let totalWithDiscount = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      const discount = total - totalWithDiscount;

      // Промокод — процент
      let promoDiscount = 0;
      if (typeof state.current.promocodeDiscount === 'number' && state.current.promocodeDiscount > 0) {
        promoDiscount = totalWithDiscount * (state.current.promocodeDiscount / 100);
        totalWithDiscount -= promoDiscount;
        state.current.promocodeDiscount = promoDiscount;
      }

      // Сертификат — сумма
      if (typeof state.current.certificateDiscount === 'number' && state.current.certificateDiscount > 0) {
        totalWithDiscount -= state.current.certificateDiscount;
      }

      state.current.total = total;
      state.current.totalWithDiscount = totalWithDiscount + state.current.deliveryCost;
      state.current.discount = discount;
    }
  },
  extraReducers: (builder) => {
    builder
      //fetchOrders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch orders";
      })
      //fetchOrdersByUserId
      .addCase(fetchOrdersByUserId.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchOrdersByUserId.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchOrdersByUserId.rejected, (state, action) => {
        state.loading = "failed";
        state.error =
          action.error.message || "Failed to fetch orders by user id";
      })
      //createOrder
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.items = action.payload;
      });
  },
});

export const { changeOrderInfo } = ordersSlice.actions;
export default ordersSlice.reducer; 
