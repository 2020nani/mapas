import React, {useState} from 'react';
import { View,PermissionsAndroid,Alert,Text,TouchableOpacity,StyleSheet, } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
 

 Geocoder.init("AIzaSyAm7cwW_QWAGx7w5BCUt45XvUI3jGclyoo", {language : "en"}); // set the language

export default function App() {
  const [position, setPosition] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  
    const request_location_runtime_permission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Permissão de Localização',
              message: 'A aplicação precisa da permissão de localização.',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            Geolocation.getCurrentPosition(
              pos => {
                setPosition({
                  ...position,
                  latitude: pos.coords.latitude,
                  longitude: pos.coords.longitude,
                });
              },
              error => {
                console.log(error);

                Alert.alert('Houve um erro ao pegar a latitude e longitude.');
              },
              { enableHighAccuracy: true, timeout: 15000, maximumAge:10000 }
            );
          } else {
            Alert.alert('Permissão de localização não concedida');
          }
        } catch (err) {
          console.log(err);
        }
      };
      Geocoder.from(position.latitude,position.longitude)
      .then(json => {
      var addressComponent = json.results[0].address_components[0];
        console.log(addressComponent);
      })
      .catch(error => console.warn(error));
  

  return (
    <View style={styles.container}>
    <MapView
      style={styles.map}
      region={position}
      onPress={e =>
        setPosition({
          ...position,
          latitude: e.nativeEvent.coordinate.latitude,
          longitude: e.nativeEvent.coordinate.longitude,
        })
      }>
      <Marker
          coordinate={position}
          title={'Marcador'}
          description={'Testando o marcador no mapa'}
        />
    </MapView>
    <View style={styles.positonBox}>
      <Text style={styles.positonBoxTitle}>Sua Localização</Text>
      <View style={styles.positonBoxLatLon}>
        <Text style={{fontSize: 18}}>Lat.</Text>
        <Text style={{fontSize: 18}}>{position.latitude}</Text>
      </View>
      <View style={styles.positonBoxLatLon}>
        <Text style={{fontSize: 18}}>Lon.</Text>
        <Text style={{fontSize: 18}}>{position.longitude}</Text>
      </View>
    </View>
    <TouchableOpacity
      style={styles.locationButton}
      onPress={() => {
        request_location_runtime_permission();
      }}>
      <Icon name="my-location" color={'#fff'} size={30} />
    </TouchableOpacity>
    <View style={styles.logo}>
        <Text style={styles.logoText}>HernaniDev</Text>
        <Text style={[styles.logoText, {color: '#e74c3c'}]}>Map</Text>
      </View>
   
  </View>

  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      backgroundColor: '#4682B4',
      height: '100%',
      width: '100%',
    },
    logo: {
      backgroundColor: '#fff',
      borderRadius: 15,
      paddingHorizontal: 15,
      elevation: 5,
      marginTop: -730,
      alignSelf: 'center',
      marginRight: 10,
      flexDirection: 'row',
    },
    logoText: {
      fontWeight: 'bold',
      fontSize: 22,
    },

    positonBox: {
      backgroundColor: '#fff',
      borderRadius: 20,
      opacity: 0.75,
      marginTop: -170,
      marginHorizontal: 40,
      padding: 25,
      shadowColor: '#000',
      elevation: 5,
    },
    positonBoxTitle: {
      textAlign: 'center',
      fontSize: 22,
      fontWeight: 'bold',
      color: '#e74c3c',
    },
    positonBoxLatLon: {flexDirection: 'row', justifyContent: 'space-between'},

    locationButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 150,
    marginTop: -25,
    width: 50,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 8,
  },
});
