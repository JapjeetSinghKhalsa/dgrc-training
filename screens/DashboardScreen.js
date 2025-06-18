import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const DashboardScreen = () => {
  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        <Image
          source={require('../assets/NIC.jpg')} // Make sure the image exists in this path
          style={styles.image}
        />
        <Text style={styles.title}>📊 Welcome to the Dashboard!</Text>
        <Text style={styles.subtitle}>Explore your reports, entries, and more!</Text>
      </View>

      <View style={styles.buttonGrid}>
        <TouchableOpacity style={styles.gridButton}>
          <Text style={styles.buttonText}>📄 View Reports</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridButton}>
          <Text style={styles.buttonText}>📝 View Entries</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridButton}>
          <Text style={styles.buttonText}>📊 View Graphs</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridButton}>
          <Text style={styles.buttonText}>📤 Upload Data</Text>
        </TouchableOpacity>
      </View>

    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 10,
    marginTop : 40
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#eee',
    fontSize: 16,
    textAlign: 'center',
  },

  ReportButton: {
    backgroundColor : 'white' ,
    borderRadius: 10,
    padding:10 ,
    marginTop: 20,
    height: 100,
    marginHorizontal : 20,

  },

  buttonGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  marginHorizontal: 20,
  marginTop: 30,
},

gridButton: {
  backgroundColor: 'white',
  borderRadius: 10,
  width: '47%',
  height: 100,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 15,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
  elevation: 3,
},

buttonText: {
  fontSize: 16,
  fontWeight: '600',
  textAlign: 'center',
  color: '#333',
},


 

});

export default DashboardScreen;