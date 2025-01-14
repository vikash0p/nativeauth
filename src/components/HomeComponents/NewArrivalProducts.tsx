import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useGetNewArrivalProductsQuery} from '../../redux-toolkit/features/products/productApi';
import {Product} from '../../redux-toolkit/types';
import HomeProductCard from './HomeProductCard';

const NewArrivalProducts = () => {
  const {data, isLoading} = useGetNewArrivalProductsQuery({});

  if ((!data || !data.products.length) && (!data || isLoading)) {
    return (
      <View className="flex-1 items-center justify-center bg-white py-5">
        <Text className="text-lg text-gray-500">No products found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-2">
      <Text className="text-xl font-bold text-gray-800 mb-4 text-center">
        New Arrival Products
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        className="flex flex-row">
        {data.products.map((product: Product) => (
          <HomeProductCard product={product} key={product._id} title={'NEW'} />
        ))}
      </ScrollView>
    </View>
  );
};

export default NewArrivalProducts;
