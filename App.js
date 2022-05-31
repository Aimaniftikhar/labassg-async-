import { useState } from 'react';
import * as React from 'react';
import { SafeAreaView, StyleSheet, Image, View, Text, Button, TouchableOpacity, } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from "react";
import { BarChart } from 'react-native-chart-kit';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Stack = createNativeStackNavigator();
const Home = ({ navigation }) => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [visible, setVisible] = useState(false);

  const onDateChange = (date, type) => {
    setVisible(false)
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
    } else {
      setSelectedEndDate(null);
      setSelectedStartDate(date);
    }
  };
  const [fajar, setfajar] = useState("");
  const [zohar, setzohar] = useState("");
  const [asar, setasar] = useState("");
  const [magrib, setmagrib] = useState("");
  const [esha, setesha] = useState("");


  const onChange = (event, selectedDate) => {
    setVisible(false);
    const currentDate = selectedDate || date;
    setdate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getFullYear() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getDate();

    settext(fDate);
  };

  const storeFajar = async (val) => {
    setfajar(val);
    try {
      await AsyncStorage.setItem(text + "f", val);
    } catch (e) {
      // saving error
    }
  };
  const storeZuhar = async (val) => {
    setzohar(val);
    try {
      await AsyncStorage.setItem(text + "z", val);
    } catch (e) {
      // saving error
    }
  };
  const storeAsar = async (val) => {
    setasar(val);
    try {
      await AsyncStorage.setItem(text + "a", val);
    } catch (e) {
      // saving error
    }
  };
  const storeMaghrib = async (val) => {
    setmagrib(val);
    try {
      await AsyncStorage.setItem(text + "m", val);
    } catch (e) {
      // saving error
    }
  };
  const storeesha = async (val) => {
    setesha(val);
    try {
      await AsyncStorage.setItem(text + "i", val);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const fajar = await AsyncStorage.getItem(text + "f");
      const zuhar = await AsyncStorage.getItem(text + "z");
      const asar = await AsyncStorage.getItem(text + "a");
      const maghrib = await AsyncStorage.getItem(text + "m");
      const isha = await AsyncStorage.getItem(text + "i");

      setFajar(fajar);
      setzuhar(zuhar);
      setasar(asar);
      setmaghrib(maghrib);
      setisha(isha);
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  });





  return (
    <View style={styles.container}>



      <View style={styles.container_calender}>
        <Text style={styles.titleStyle}>
          Salah App
        </Text>
        <View style={{ width: 150, height: 50, backgroundColor: "#93f5cc", borderRadius: 40, alignSelf: 'center' }}>
          <TouchableOpacity onPress={(val) => setVisible(val)}> <Text style={{ fontSize: 20, paddingTop: 10 }} >      Pick Date</Text></TouchableOpacity></View>
        {visible && (<CalendarPicker

          height={600}
          width={1200}
          startFromMonday={true}
          minDate={new Date(2018, 1, 1)}
          maxDate={new Date()}
          previousTitle={<Image style={{ width: 50, height: 50, }} source={require("./assets/back.png")} />}
          nextTitle={<Image style={{ width: 50, height: 50, }} source={require("./assets/Farward.png")} />}
          todayBackgroundColor="#e6ffe6"
          selectedDayColor="#66ff33"
          selectedDayTextColor="#000000"
          textStyle={{
            fontFamily: 'Cochin',
            color: '#000000',

          }}
          onDateChange={onDateChange}
        />)}

        <View style={styles.textStyle}>
          <Text style={styles.txtStyle}>
            Selected Start Date :
          </Text>
          <Text style={styles.txtStyle}>
            {selectedStartDate ? selectedStartDate.toString() : ''}
          </Text>

        </View>


        <View style={styles.prayer_view}>

          <View style={styles.prayer_section} >

            <Image
              style={styles.namaz_image}
              source={require("./assets/fajrprayer.png")}
            ></Image>

            <RadioButtonGroup

              selected={fajar}
              onSelected={(val) => storeFajar(val)}
              containerStyle={{ flexDirection: "row" }}
              radioStyle={{ backgroundColor: "white" }}
              radioBackground="green">

              <RadioButtonItem value="fajarof" label={<Text style={{ color: "black", fontSize: 20, fontWeight: 'bold', marginLeft: 15, marginRight: 15 }}>Offered</Text>
              } />
              <RadioButtonItem value="fajarnotof" label={
                <Text style={{ color: "black", fontSize: 20, fontWeight: 'bold', marginLeft: 15, marginRight: 15 }}>Not Offered</Text>
              } />
            </RadioButtonGroup>

          </View >
          <View style={styles.prayer_section} >

            <Image
              style={styles.namaz_image}
              source={require("./assets/zuhr.png")}
            ></Image>

            <RadioButtonGroup

              selected={zohar}
              onSelected={(val) => storeZuhar(val)}
              containerStyle={{ flexDirection: "row" }}
              radioStyle={{ backgroundColor: "white" }}
              radioBackground="green"
            >
              <RadioButtonItem value="zoharof" label={<Text style={{ color: "black", fontSize: 20, fontWeight: 'bold', marginLeft: 15, marginRight: 15 }}>Offered</Text>
              } />
              <RadioButtonItem value="zoharnotof" label={
                <Text style={{ color: "black", fontSize: 20, fontWeight: 'bold', marginLeft: 15, marginRight: 15 }}>Not Offered</Text>
              } />
            </RadioButtonGroup>

          </View >
          <View style={styles.prayer_section} >

            <Image
              style={styles.namaz_image}
              source={require("./assets/asar.png")}
            ></Image>

            <RadioButtonGroup

              selected={asar}
              onSelected={(val) => storeAsar(val)}
              containerStyle={{ flexDirection: "row" }}
              radioStyle={{ backgroundColor: "white" }}
              radioBackground="green"
            >
              <RadioButtonItem value="asarof" label={<Text style={{ color: "black", fontSize: 20, fontWeight: 'bold', marginLeft: 15, marginRight: 15 }}>Offered</Text>
              } />
              <RadioButtonItem value="asarnotof" label={
                <Text style={{ color: "black", fontSize: 20, fontWeight: 'bold', marginLeft: 15, marginRight: 15 }}>Not Offered</Text>
              } />
            </RadioButtonGroup>

          </View >
          <View style={styles.prayer_section} >

            <Image
              style={styles.namaz_image}
              source={require("./assets/magrib.png")}
            ></Image>

            <RadioButtonGroup

              selected={magrib}
              onSelected={(val) => storeMaghrib(val)}
              containerStyle={{ flexDirection: "row" }}
              radioStyle={{ backgroundColor: "white" }}
              radioBackground="green"
            >
              <RadioButtonItem value="magribof" label={<Text style={{ color: "black", fontSize: 20, fontWeight: 'bold', marginLeft: 15, marginRight: 15 }}>Offered</Text>
              } />
              <RadioButtonItem value="magribnotof" label={
                <Text style={{ color: "black", fontSize: 20, fontWeight: 'bold', marginLeft: 15, marginRight: 15 }}>Not Offered</Text>
              } />
            </RadioButtonGroup>

          </View >
          <View style={styles.prayer_section} >

            <Image
              style={styles.namaz_image}
              source={require("./assets/isha.png")}
            ></Image>

            <RadioButtonGroup

              selected={esha}
              onSelected={(val) => storeesha(val)}
              containerStyle={{ flexDirection: "row" }}
              radioStyle={{ backgroundColor: "white" }}
              radioBackground="green"
            >
              <RadioButtonItem value="eshaof" label={<Text style={{ color: "black", fontSize: 20, fontWeight: 'bold', marginLeft: 15, marginRight: 15 }}>Offered</Text>
              } />
              <RadioButtonItem value="eshanotof" label={
                <Text style={{ color: "black", fontSize: 20, fontWeight: 'bold', marginLeft: 15, marginRight: 15 }}>Not Offered</Text>
              } />
            </RadioButtonGroup>

          </View >

        </View>


      </View>

      <Text style={styles.titleStyle}>Previous Record</Text>
      <View style={styles.nextscreen}>
        <Text style={{ alignSelf: 'center', fontSize: 20, marginRight: 10, backgroundColor: '#93f5cc', borderRadius: 20, width: 160, height: 70, paddingTop: 20, }} onPress={() => navigation.navigate('Weekly')}>       Weekly </Text>

        <Text style={{ alignSelf: 'center', fontSize: 20, marginRight: 10, backgroundColor: '#93f5cc', borderRadius: 20, width: 160, paddingTop: 20, height: 70, }} onPress={() => navigation.navigate('Monthly')}>       Monthly  </Text>

        <Text style={{ alignSelf: 'center', fontSize: 20, marginRight: 10, backgroundColor: '#93f5cc', borderRadius: 20, paddingTop: 20, width: 160, height: 70, }} onPress={() => navigation.navigate('Yearly')}>        Yearly </Text>

        <Text style={{ alignSelf: 'center', fontSize: 20, marginRight: 20, backgroundColor: '#93f5cc', borderRadius: 20, paddingTop: 20, width: 160, height: 70, }} onPress={() => navigation.navigate('Customized')}>    Customized </Text>

      </View>
    </View >
  );
}; 
function weekly() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Text style={{ alignSelf: 'center', fontSize: 40, color: '#3867e8', paddingBottom: 30, }} >Weekly</Text>



      <BarChart
        data={{

          labels: ['MONDAY ', 'TUESDAY ',"Wednesday","Thursday", 'FRIDAY ', "Saturday",'SUNDAY '],
          datasets: [{ data: [5, 4, 7, 1,2] }],

        }}
        width={800}
        height={450}


        barColor="plum"
        chartConfig={{
          barPercentage: 1.5,
          barRadius: 5,
          propsForLabels: {
            fontSize: '10',
          },
          backgroundColor: 'white',
          backgroundGradientFrom: 'grenn',
          backgroundGradientTo: 'red',
          decimalPlaces: false,
          color: (opacity = 255) => '#ECEFF1',
          style: {
            borderRadius: 20,
          },
        }}
        fromZero={true}
        showValuesOnTopOfBars={true}
      />
    </View>
  )
}

function monthly() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Text style={{ alignSelf: 'center', fontSize: 40, color: '#3867e8', paddingBottom: 30, }} >Monthly</Text>


      <BarChart
        data={{

          labels: ['JAN', 'FEB', 'MARCH', 'APRIL','May','June','July',"August","Sep",'Oct','Nov','Dec'],
          datasets: [{ data: [30, 13, 25, 18,19] }],

        }}
        width={800}
        height={450}


        barColor="plum"
        chartConfig={{
          barPercentage: 1.5,
          barRadius: 5,
          propsForLabels: {
            fontSize: '10',
          },
          backgroundColor: 'white',
          backgroundGradientFrom: 'grenn',
          backgroundGradientTo: 'red',
          decimalPlaces: false,
          color: (opacity = 255) => '#ECEFF1',
          style: {
            borderRadius: 20,
          },
        }}
        fromZero={true}
        showValuesOnTopOfBars={true}
      />
    </View>
  )
}



function yearly() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Text style={{ alignSelf: 'center', fontSize: 40, color: '#3867e8', paddingBottom: 30, }} >Yearly</Text>

      <BarChart
        data={{

          labels: ['2018', '2019', '2020', '2021',"2022"],
          datasets: [{ data: [160, 132, 205, 180,] }],

        }}
        width={800}
        height={450}


        barColor="plum"
        chartConfig={{
          barPercentage: 1.5,
          barRadius: 5,
          propsForLabels: {
            fontSize: '10',
          },
          backgroundColor: 'white',
          backgroundGradientFrom: 'grenn',
          backgroundGradientTo: 'red',
          decimalPlaces: false,
          color: (opacity = 255) => '#ECEFF1',
          style: {
            borderRadius: 20,
          },
        }}
        fromZero={true}
        showValuesOnTopOfBars={true}
      />

    </View>

  )

}
function customized() {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedStartDatee, setSelectedStartDatee] = useState(null);


  const onDateChange = (date, type) => {
    setVisible(false)
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
    }
  };
  const onDateChangee = (date, type) => {
    setVisiblee(false)
    if (type === 'END_DATE') {
      setSelectedEndDatee(date);
    } else {

      setSelectedStartDatee(date);
    }
  };
  const [visible, setVisible] = useState(false)
  const [visiblee, setVisiblee] = useState(false)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>


      <Text style={{ alignSelf: 'center', fontSize: 40, color: '#3867e8', paddingBottom: 30, }} >Customized</Text>


      <View style={{ width: 150, height: 50, backgroundColor: "#93f5cc", borderRadius: 40, alignSelf: 'center' }}>
        <TouchableOpacity onPress={(val) => setVisible(val)}> <Text style={{ fontSize: 20, paddingTop: 10 }} >      Start Date</Text></TouchableOpacity></View>
      {visible && (<CalendarPicker

        height={600}
        width={1200}
        paddingTop={50}
        startFromMonday={true}
        // allowRangeSelection={true}
        minDate={new Date(2018, 1, 1)}
        maxDate={new Date()}
        previousTitle={<Image style={{ width: 50, height: 50, }} source={require("./assets/back.png")} />}
        nextTitle={<Image style={{ width: 50, height: 50, }} source={require("./assets/Farward.png")} />}
        todayBackgroundColor="#e6ffe6"
        selectedDayColor="#66ff33"
        selectedDayTextColor="#000000"
        textStyle={{
          fontFamily: 'Cochin',
          color: '#000000',
        }}
        onDateChange={onDateChange}
      />)}

      <View style={styles.textStyle}>
        <Text style={styles.txtStyle}>
          Start Date :
        </Text>
        <Text style={styles.txtStyle}>
          {selectedStartDate ? selectedStartDate.toString() : ''}
        </Text>

      </View>



      <View style={{ width: 150, height: 50, backgroundColor: "#93f5cc", borderRadius: 40, alignSelf: 'center' }}>
        <TouchableOpacity onPress={(val) => setVisiblee(val)}> <Text style={{ fontSize: 20, paddingTop: 10 }} >      End Date</Text></TouchableOpacity></View>
      {visiblee && (<CalendarPicker

        height={600}
        width={1200}
        paddingTop={50}
        startFromMonday={true}
        // allowRangeSelection={true}
        minDate={new Date(2018, 1, 1)}
        maxDate={new Date()}
        previousTitle={<Image style={{ width: 50, height: 50, }} source={require("./assets/back.png")} />}
        nextTitle={<Image style={{ width: 50, height: 50, }} source={require("./assets/Farward.png")} />}
        todayBackgroundColor="#e6ffe6"
        selectedDayColor="#66ff33"
        selectedDayTextColor="#000000"
        textStyle={{
          fontFamily: 'Cochin',
          color: '#000000',
        }}
        onDateChange={onDateChangee}
      />)}

      <View style={styles.textStyle}>
        <Text style={styles.txtStyle}>
          End Date :
        </Text>
        <Text style={styles.txtStyle}>
          {selectedStartDatee ? selectedStartDatee.toString() : ''}
        </Text>

      </View>



      <BarChart
        data={{

          labels: ['JAN 2022', 'FEB 2022', 'MARCH 2022', 'APRIL 2022'],
          datasets: [{ data: [160, 132, 205, 180,] }],

        }}
        width={800}
        height={450}


        barColor="plum"
        chartConfig={{
          barPercentage: 1.5,
          barRadius: 5,
          propsForLabels: {
            fontSize: '10',
          },
          backgroundColor: 'white',
          backgroundGradientFrom: 'grenn',
          backgroundGradientTo: 'red',
          decimalPlaces: false,
          color: (opacity = 255) => '#ECEFF1',
          style: {
            borderRadius: 20,
          },
        }}
        fromZero={true}
        showValuesOnTopOfBars={true}
      />
    </View>
  )
}
const App = () => {
  return (<NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Weekly" component={weekly} />
      <Stack.Screen name="Monthly" component={monthly} />
      <Stack.Screen name="Yearly" component={yearly} />
      <Stack.Screen name="Customized" component={customized} />
    </Stack.Navigator>
  </NavigationContainer>)
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 600,
    backgroundColor: '#ffffff',
    paddingBottom: 100,
  },
  container_calender: {
    marginBottom: 100,
  },
  textStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    marginTop: 10,
  },
  txtStyle: {
    fontFamily: 'sansarif',
    fontSize: 30,
    fontStyle: 'italic',
    paddingBottom: 20,
    fontWeight: 'bold',
    color: '#e043d6',
  },
  namaz_image: {
    width: 50,
    height: 50,
    marginRight: 50,
    marginLeft: 20,
  },
  prayer_view: {

    alignSelf: 'center',
    alignContent: 'center',

  },
  titleStyle: {
    textAlign: 'center',
    fontSize: 50,
    color: '#4058e3',
    margin: 20,
    fontFamily: 'sansarif',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  prayer_section: {

    height: 80,
    width: 500,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "black",
  },
  img_prayer: {
    width: 90,
    height: 90,
  },
  changescreenbtn: {
    width: 150,
    fontSize: 30,
    height: 100,
    backgroundColor: "red",
    borderRadius: 20,
    alignItems: 'center',
  },
  nextscreen: {
    flexDirection: 'row',
    alignContent: "center",
    alignItems: 'center',
    alignSelf: 'center',
    height: 100,
    width: 650,
  },
  MainContainer: {

    alignItems: 'center',
    justifyContent: 'center'
  }
});