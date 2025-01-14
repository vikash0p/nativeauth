import {TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {useAppDispatch, useAppSelector} from '../../redux-toolkit/hooks';
import {RootState} from '../../redux-toolkit/store';
import {
  useAddItemToCartMutation,
  useGetCartQuery,
} from '../../redux-toolkit/features/cart/cartApi';
import {Toast} from 'toastify-react-native';
import {resetCartQuantity} from '../../redux-toolkit/features/cart/cartSlice';
import {useIncrementSalesMutation} from '../../redux-toolkit/features/sales/salesApi';

const Cart = ({productId}: {productId: string}) => {
  const {user} = useAppSelector((state: RootState) => state.auth);
  const {colors, quantity} = useAppSelector((state: RootState) => state.cart);
  const [addItemToCart, {isLoading}] = useAddItemToCartMutation();
  const dispatch = useAppDispatch();

  const {data} = useGetCartQuery(user?._id ?? '');
  const cartItem = data?.items?.find(item => item.productId === productId);
  const cartQuantity = cartItem?.quantity || 0;

  const [incrementSales] = useIncrementSalesMutation();

  const handleAddToCart = async () => {
    try {
      await addItemToCart({
        userId: user?._id ?? '',
        productId,
        quantity,
        color: colors,
      }).unwrap();

      dispatch(resetCartQuantity());

      await incrementSales({
        productId,
        userId: user?._id ?? '',
      }).unwrap();

      Toast.success('Item added to cart successfully.');
    } catch (error: any) {

      Toast.error(
        (error as {data?: {message?: string}})?.data?.message ||
          'Something went wrong. Please try again.',
      );
    }
  };

  return (
    <TouchableOpacity
      className={`bg-indigo-600 flex-1 py-4 rounded-lg items-center shadow-lg disabled:bg-gray-500 disabled:cursor-not-allowed ${
        isLoading ? 'opacity-50' : ''
      }`}
      accessible
      accessibilityLabel="Add to Cart"
      disabled={
        isLoading ||
        cartQuantity >= 5 ||
        quantity <= 0 ||
        !colors ||
        !user ||
        (data?.totalQuantity ?? 0) >= 10
      }
      onPress={handleAddToCart}>
      <Text className="text-white text-xl font-semibold">
        {isLoading ? 'Adding...' : 'Add to Cart'}
      </Text>
    </TouchableOpacity>
  );
};

export default Cart;
