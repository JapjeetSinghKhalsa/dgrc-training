
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import axios from "axios";
 import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');   
    const [submit, setSubmit] = useState("LOG IN");

  

const handleLogin = async () => {
  setSubmit("LOG IN");

  if (!email || !password) {
    setErrorMessage("Username and Password cannot be empty.");
    return false;
  }
  if (email.length < 3) {
    setSubmit("LOG IN");
    setErrorMessage("Username must be at least 3 characters long.");
    return false;
  }
  if (password.length < 6) {
    setSubmit("LOG IN");
    setErrorMessage("Password must be at least 6 characters long.");
    return false;
  }

  setErrorMessage("");
  setSubmit("Signing in...");

  try {
    // ✅ Use correct request field names
    const requestData = {
      EmailId: email,
      Password: password
    };

    const response = await axios.post(
      'https://freeapi.miniprojectideas.com/api/JWT/login',
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    console.log("✅ API Response:", response.data);

    if (response.status === 200 && response.data?.result === true) {
      const userData = response.data?.data;

      // ✅ Store token and user data
      await AsyncStorage.setItem('AuthToken', userData.token);
      await AsyncStorage.setItem('RefreshToken', userData.refreshToken);
      await AsyncStorage.setItem('UserEmail', userData.emailId);
      await AsyncStorage.setItem('UserId', userData.userId.toString());

      setSubmit("LOG IN");
      Alert.alert("Success", "User logged in successfully!");
      navigation.navigate('DashboardScreen');
    } else {
      setSubmit("LOG IN");
      Alert.alert("Error",   "Login failed");
    }
  } catch (error) {
    console.error('Login error:', error);
    setSubmit("LOG IN");

    if (error.response) {
       setErrorMessage("Wrong User ID or Password");  
          Alert.alert('Error', "Wrong User ID or Password"); // ✅ Optional alert popup
    } else if (error.request) {
      Alert.alert('Error', 'No response from server. Please check your connection.');
    } else {
      Alert.alert('Error', 'Login failed. Please try again.');
    }
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hi, Welcome! 👋</Text>

      <View style={styles.inputContainer}>
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Enter your email"
          style={styles.input}
          onChangeText={setEmail}
          value={email}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Enter your password"
          style={styles.input}
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.loginButton,
          {
            backgroundColor: submit === 'LOG IN' ? '#BB2A25' : '#2c6e49',
          },
        ]}
        onPress={handleLogin}
        disabled={submit !== 'LOG IN'}
      >
        <Text style={styles.loginButtonText}>{submit || 'LOG IN'}</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>──────────  Or With  ──────────</Text>

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={{ uri: 'https://img.icons8.com/color/48/google-logo.png' }}
            style={styles.socialIcon}
          />
          <Text style={styles.socialButtonText}>Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={{ uri: 'https://img.icons8.com/color/48/facebook.png' }}
            style={styles.socialIcon}
          />
          <Text style={styles.socialButtonText}>Facebook</Text>
        </TouchableOpacity>
      </View>

      <Image
        source={require('../assets/NIC.jpg')}
        style={styles.NICicon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 25,
    flex: 1,
    backgroundColor: '#fff',
  },

  loginButton: {     backgroundColor: '#2c6e49',     borderRadius: 8,     height: 50,     justifyContent: 'center',     alignItems: 'center',     marginTop: 10,   },   loginButtonText: {     color: 'white',     fontSize: 16,     fontWeight: 'bold',   },

  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
  },

   errorText: {     color: 'red',     fontSize: 14,     textAlign: 'center',     marginBottom: 10,     fontWeight: 'bold'   },
  subHeader: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginVertical: 6,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#00008B', // a nice iOS-style blue
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 24,
    color: 'gray',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    padding: 12,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },

  NICicon: {
    width: 250,
    height: 150,
    marginTop: 20,
    alignSelf: 'center',
    
   
    

  }
});

export default LoginScreen;




