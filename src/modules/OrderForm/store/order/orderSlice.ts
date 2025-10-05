import { addOrder } from './orderApi';
import { useNavigate } from 'react-router-dom';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/modules/OrderMenu';
import { makeCertificateUsed, makePromocodeUsed, selectCartTotals } from '@/modules/OrderMenu/store/cartTotals/cartTotalsSlice';
import { Recepient } from './orderTypes';

// export const defaultRecipient: recipientInterface = {
//   deliveryMethod: "courier",
//   paymentMethod: "SBP",
//   fullName: "",
//   phone: "",
//   address: "",
//   email: "",
//   deliveryDate: "",
//   comment: "",
// };

export const createOrder = createAsyncThunk(
  'orders/createOrder', 
  async (recepient: Recepient) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    
    try {
      const cartTotals = useSelector(selectCartTotals);
      await addOrder({...cartTotals.item, ...recepient});

      const promoId = cartTotals.item.promo.id
      if(promoId) dispatch(makePromocodeUsed(promoId))

      const certificateId = cartTotals.item.certificate.id
      if(certificateId) dispatch(makeCertificateUsed(certificateId))

      navigate("/payment");
    } catch (error) {
      throw new Error("Error when creating an order");
    }
  }
);