import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { supabase } from '../../lib/supabase';
import Header from './Header'; // Adjust the import path as necessary

const Account = ({ session, navigation }) => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [avatar_url, setAvatarUrl] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    let ignore = false;

    const getProfile = async () => {
      setLoading(true);

      if (!session || !session.user) {
        setErrorMessage("User is not authenticated.");
        setLoading(false);
        return;
      }

      const { user } = session;

      const { data, error } = await supabase
        .from('profiles')
        .select(`username, avatar_url`)
        .eq('id', user.id)
        .single();

      if (!ignore) {
        if (error) {
          console.warn(error);
          setErrorMessage("Failed to fetch profile.");
        } else if (data) {
          setUsername(data.username);
          setAvatarUrl(data.avatar_url);
        }
      }

      setLoading(false);
    };

    getProfile();

    return () => {
      ignore = true; // Cleanup function to avoid memory leaks
    };
  }, [session]);

  const handleHomePress = () => {
    console.log("Home button pressed");
    navigation.navigate('Home'); 
  };

  // Update profile function
  const updateProfile = async (event) => {
    event.preventDefault(); // Prevent default form submission

    setLoading(true);
    if (!session || !session.user) {
      setErrorMessage("User is not authenticated.");
      setLoading(false);
      return;
    }

    const { user } = session;

    const updates = {
      id: user.id,
      username,
      avatar_url,
      updated_at: new Date(),
    };

    const { error } = await supabase.from('profiles').upsert(updates);

    if (error) {
      setErrorMessage(error.message);
      setSuccessMessage(null);
    } else {
      setSuccessMessage('Profile updated successfully!');
      setErrorMessage(null);
    }
    setLoading(false);
  };

  // Change password function
  const changePassword = async () => {
    setLoading(true);
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setErrorMessage(error.message);
      setSuccessMessage(null);
    } else {
      setSuccessMessage('Password changed successfully!');
      setErrorMessage(null);
      setNewPassword('');
      setConfirmPassword('');
    }
    setLoading(false);
  };

  // Logout function
  const handleLogout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      setErrorMessage(error.message);
    } else {
      navigation.navigate('Login'); // Navigate to login screen
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.homeButton}>
        <TouchableOpacity style={styles.homeButton} onPress={handleHomePress}>
          <Image source={require("../screen/assets/home.png")} style={styles.home} />
        </TouchableOpacity>
      </View>
      <Header 
        onSettingsPress={() => navigation.navigate('Settings')} // Navigate to Settings on press
        iconColor="#FFFFFF" // Set settings icon color
        textColor="#FFFFFF" // Set header text color
        backgroundColor="#213D61" // Header background color
      />
      
      {loading && <ActivityIndicator size="large" color="#007BFF" />}
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      {successMessage && <Text style={styles.successText}>{successMessage}</Text>}
      
      <Text style={styles.currentUsernameText}>Current Username: {username}</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#AAAAAA" // Placeholder color for better visibility
        value={username}
        onChangeText={setUsername}
      />
      
      <TextInput
        style={styles.input}
        placeholder="New Password"
        placeholderTextColor="#AAAAAA" 
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#AAAAAA" 
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      
      <TouchableOpacity style={styles.button} onPress={updateProfile}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={changePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80, // Extra padding at the top
    backgroundColor: '#213D61',
  },
  input: {
    height: 50, // Increased height for better touch targets
    borderColor: '#FFFFFF',
    borderWidth: 1,
    marginBottom: 20, // Adjusted margin for better spacing
    padding: 10,
    color: '#FFFFFF',
    fontSize: 18, // Increased font size for readability
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 15, // Increased padding for larger buttons
    alignItems: 'center',
    marginBottom: 20, // Spacing between buttons
    borderRadius: 5, // Rounded corners for buttons
  },
  buttonText: {
    color: '#213D61',
    fontWeight: 'bold', // Bold text for better visibility
    fontSize: 18, // Increased font size for buttons
  },
  errorText: {
    color: 'red',
    marginBottom: 10, // Margin for error messages
    fontSize: 16, // Increased font size for better visibility
  },
  successText: {
    color: 'green',
    marginBottom: 10, // Margin for success messages
    fontSize: 16, // Increased font size for better visibility
  },
  homeButton: {
    position: 'absolute',
    top: '6%', 
    right: '5%', // Adjust as necessary
    zIndex: 10,
  },
  currentUsernameText: {
    color: 'white',
    fontSize: 18, // Increased font size for better visibility
    marginBottom: 20, // Spacing below the current username
  },
  home: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  
});

export default Account;
