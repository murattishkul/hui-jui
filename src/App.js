/*
  + (1 point) Set the center of viewpoint to Ulsan, ROK

  + (3 point) Use a sequential color pallette (single-hue) to depict the number of total confirmed
  cases on the map
    + (2 point) Set the data range for each section of color on your own
    + (.5 point) Define more than 7 divisions of color
    + (.5 point) Plot a legend for the choropleth map

  + (2 point) Show a tooltip for the mouseover event on a country region
  Page 1
    + (2 point) Include the country name and the number of its total confirmed case in each
    tooltip

+ (3 point) Filter the data by date
  + (1 point) Enable to check data of ONE year
  + (2 point) Use a date picker or a date slider to select the date you want to check
 The data should be changed to a corresponding date when you select

*/
import React, {useMemo, useState, useEffect } from 'react'
import Papa from 'papaparse'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Map from './components/Map/Map'
import geojson from './data/countries.json'
import Legend from './components/Legend/Legend'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

function App() {
  const [date, setDate] = useState(new Date(2021,4,24));
  const [data, setData] = useState(null)
  const [countries, setCountries] = useState(geojson.features)
  const [keysuka, setKeySuka] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const handleFileSelect = (evt) => {
    setIsLoading(true)
    var file = evt.target.files[0];
 
    Papa.parse(file, {
      header: true,
      complete: function(results) {
        setData(results);
        console.log("Parsing complete:", results)
        setIsLoading(false)
      }
    });
  }

  const filterByDate = (data) => {
      let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
      let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
      let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
      let stringDate = `${ye}-${mo}-${da}`;
      return data.data.filter(item => item.date === stringDate)
  }

  useEffect( () => {
    setIsLoading(true)
    if(data){
      const features = geojson.features;
      let filteredData = filterByDate(data)
      console.log(filteredData)
      features.forEach( json => {
        let cases = filteredData.find(item => item.iso_code === json.properties.ISO_A3)?.total_cases
        json.properties['cases'] = cases
      })

      setCountries(features)
      setKeySuka(keysuka+1)
    }
    setIsLoading(false)
  },[date, data])

  console.log(date, data)
  return (
    <div style={{ display: "flex", flexDirection: 'column', margin: '0 100px 100px 50px' }}>

      <div style={{ 
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        display:'flex',
        flexDirection: 'column',
      }}>
        <p>1. Please load csv covid data - data.csv file from source directory</p>
        <input style={{ alignSelf:'center'}} type="file" id="csv-file" name="files" onChange={handleFileSelect}/>
      </div>

      {
      isLoading ? 
      
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        // timeout={3000} //3 secs
        style={{marginTop: '50px', alignSelf:'center'}}
      />  :
      <div style={{ display: "flex", flexDirection: 'column' }}>

      <div  style={{margin: 50, alignSelf:'center'}}>
        <p>2. Please choose date</p>
        <DatePicker 
          maxDate={new Date(2021,4,24)} 
          minDate={new Date(2020,4,24)} 
          selected={date} 
          onChange={(date) => setDate(date)} 
          style={{zIndex:99999}}
          popperPlacement='right' 
          />
      </div>

        <div style={{display:'flex', justifyContent:"center", flexDirection: 'column', alignSelf: 'center', alignItems: 'center'  }}>
          <p>3. Observe results</p>
          <Map countries={countries} keysuka={keysuka}/>
        </div>
        

      <div style={{display:'flex', justifyContent:"center", marginTop: '30px' }}>
        <Legend />
      </div>
      </div>
    }

    </div>
  );
}

export default App;
