import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import MapView, {Marker} from 'react-native-maps';

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true,
        }
    }

    //Get data fro API
    componentDidMount() {
        fetch('https://corona.lmao.ninja/v2/jhucsse')
          .then((response) => response.json())
          .then((data) => {
            this.setState({data: data});
          })
          .catch((error) => console.error(error))
          .finally(() => {
            this.setState({ isLoading: false });
          });
    }

    //Render the list of locations fetched from API
    mapMarkers = () => {
        return this.state.data.map((data, index) => <Marker
          key={index}
          coordinate={{ latitude: Number(data.coordinates.latitude), longitude: Number(data.coordinates.longitude) }}
          title={"Province:" + data.province + " ,Country: "+ data.country}
          description= {"Confirmed cases: " + data.stats.confirmed}
        ></Marker>)
    }

    render() {
     const { mapContainer, wrapper, mapStyle } = styles;
      return (
        <View style={wrapper}>
        <View style={mapContainer}>
          <MapView
            style={mapStyle}
            initialRegion={{
              latitude: 60.220800,
              longitude: 24.777650,
              latitudeDelta: 9,
              longitudeDelta: 9,
            }}
          >
              {this.mapMarkers()}
          </MapView>
        </View>
        </View>
      )
    }
  }
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#F6F6F6' },
  mapStyle: {
    width: width,
    height: height - 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mapContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFFFFF',
    margin: 10,
    borderRadius: 2,
    shadowColor: '#3B5458',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2
  },
})