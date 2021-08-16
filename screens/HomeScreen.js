import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import NavOptions from "../components/NavOptions";
import NavFavourites from "../components/NavFavourites";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setOrigin, setDestination } from "../slices/navSlice";




function HomeScreen () {
    const dispatch = useDispatch();
    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
                <Image
                 style ={{
                    width: 100,
                    height: 100,
                    resizeMode: "contain",
                 }}
                  source={{
                    uri: "https://links.papareact.com/gzs",
                 }} 
                />

                <GooglePlacesAutocomplete
                  placeholder="Where From?"
                  styles={{
                      container: {
                          flex: 0,
                      },
                      textInput: {
                          fontSize: 18,
                      },
                  }}
                  onPress={(data, details= null) => {
                      dispatch(
                          setOrigin ({
                          location: details.geometry.location,
                          description: data.description,   
                      })
                      )

                      dispatch(setDestination(null))
                      
                  }}
                  fetchDetails={true}
                  returnKeyType={"search"}
                  enablePoweredByContainer={false}
                  minLength={2}
                  query={{
                      key: GOOGLE_MAPS_APIKEY,
                      language: 'en'
                  }}
                  nearbyPlacesAPI="GooglePlacesSearch"
                  debounce={400}
                />

                <NavOptions />
                <NavFavourites />
            </View>
            
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    text: {
        color: 'blue',
    }
})
