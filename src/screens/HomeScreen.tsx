/* eslint-disable react-native/no-inline-styles */
import {SafeAreaView, ScrollView, View} from 'react-native';
import React from 'react';
import HomeTopBar from '../components/HomeComponents/HomeTopBar';
import HomeCategory from '../components/HomeComponents/HomeCategory';
import HomeCarousel from '../components/HomeComponents/HomeCarousel';
import HomeCollection from '../components/HomeComponents/HomeCollection';
import ReusableImage from '../components/ReusableComponents/ReusableImage';
import Footer from '../components/Globalcomponets/Footer';
import {TabsScreenNavigationProp} from '../navigation/navigationTypes';
import Features from '../components/HomeComponents/Features';
import HomeBrand from '../components/HomeComponents/HomeBrand';
import HomeMaterial from '../components/HomeComponents/HomeMaterial';
import FeaturesList from '../components/HomeComponents/FeaturesList';
import NewArrivalProducts from '../components/HomeComponents/NewArrivalProducts';

const HomeScreen: React.FC<{navigation: TabsScreenNavigationProp}> = ({
  navigation,
}) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <HomeTopBar navigation={navigation} />
      <ScrollView contentContainerStyle={{paddingBottom: 20}}>
        <HomeCarousel />
        <HomeCategory />
        <View>
          <ReusableImage
            image={require('../asset/images/banner/banner16.jpg')}
            styles="w-full h-24 rounded-md"
            navigation={() => navigation.navigate('Register')}
          />
          <ReusableImage
            image={require('../asset/images/banner/banner17.jpg')}
            styles="w-full h-24 rounded-md"
          />
        </View>
        <HomeCollection />
        <FeaturesList />
        <NewArrivalProducts />
        <HomeBrand />
        <HomeMaterial />
        <Features />
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
