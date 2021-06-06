import React from 'react'
import { MapContainer, GeoJSON, Marker, Popup } from 'react-leaflet'
import './map.css'
import {  
    oneOptions,  // 0 - 100
    twoOptions,  // 100-200
    threeOptions,// 200-400
    fourOptions, // 400-600
    fiveOptions, // 600-800
    sixOptions,  // 800-1000
    sevenOptions,// 1000-1200
    eightOptions // 1200+
} from '../../data/colorPalette'

const Map = ({countries, keysuka}) => {
    const countryStyle = {
        fillColor: "white",
        weight: 1,
        color: "black",
        fillOpacity: 1,
      }
    
      const onEachCountry = (country, layer) => {
        let cases = parseInt(country.properties.cases) 
        let color = 'red'
        if( cases < 10000) {
            color = oneOptions.color
        } else if( cases < 20000){
            color = twoOptions.color
        } else if( cases < 40000){
            color = threeOptions.color
        } else if( cases < 60000){
            color = fourOptions.color
        } else if( cases < 80000){
            color = fiveOptions.color
        } else if( cases < 100000){
            color = sixOptions.color
        } else if( cases < 120000){
            color = sevenOptions.color
        } else {
            color = eightOptions.color
        }
        layer.options.fillColor = color
        const name = country.properties.ADMIN;
        const casesNum = country.properties.cases;
        layer.bindPopup(`${name} ${casesNum}`);

        layer.on({
          'mouseover':  (e) => {
              e.target.openPopup()
            },
        })
    
      }
      console.log(countries)

      return (
        <MapContainer 
            style={{height: 500, width: 900, marginTop: 0}} 
            center={[35.5499, 129.31666]} 
            zoom={7} 
            scrollWheelZoom={true}
        >
            <GeoJSON 
                key={keysuka} 
                onEachFeature={onEachCountry} 
                style={countryStyle} 
                data={countries}
                />
            <Marker position={[35.5499, 129.31666]}>
              <Popup>
                Ulsan, KOR
              </Popup>
            </Marker>
        </MapContainer>
    )
}

export default Map;