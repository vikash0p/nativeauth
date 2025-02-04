import React from 'react';
import {View, Text, FlatList, ActivityIndicator, Image} from 'react-native';
import {useAppSelector} from '../redux-toolkit/hooks';
import {RootState} from '../redux-toolkit/store';
import {useGetReviewsByUserIdQuery} from '../redux-toolkit/features/reviews/reviewApi';
import StarRating from '../components/ProductComponents/StarRating';

const MyReviewScreen = () => {
  const {user} = useAppSelector((state: RootState) => state.auth);
  const userId = user?._id ?? '';
  const {data: reviews, isLoading} = useGetReviewsByUserIdQuery(userId);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View className="flex-1 p-2">
      <FlatList
        data={reviews?.reviews}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <View className="mb-4 p-4 border border-black rounded-md">
            <View className="flex-row items-center gap-6">
              <Image
                source={{uri: item.productId.image}}
                className="w-20 h-20 rounded-lg"
                resizeMode="cover"
              />
              <View>
                <Text className="text-lg font-semibold">
                  {item.productId.title}
                </Text>
                <Text className="text-lg font-semibold ">
                  ${item.productId.finalPrice}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center justify-between  my-2">
              <Text className="text-lg font-semibold">
                <StarRating rating={item.rating} />
              </Text>
              <Text className=" text-gray-800 text-lg">
                {new Date(item.date).toLocaleDateString()}
              </Text>
            </View>
            <Text className=" text-lg text-gray-800">{item.comment}</Text>
          </View>
        )}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center">
            <Text className="text-center text-gray-900 text-2xl font-bold">
              No reviews available
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default MyReviewScreen;
