import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { supabase } from '../../lib/supabase';
import Header from './Header'; // Adjust the import path as necessary

const Account = ({ session, navigation }) => { // Make sure to include navigation in props
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [avatar_url, setAvatarUrl] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function getProfile() {
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
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, [session]);

  async function updateProfile(event) {
    event.preventDefault();

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
  }

  async function changePassword() {
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
  }

  return (
    <View style={styles.container}>
      <Header 
        onSettingsPress={() => navigation.navigate('Settings')} // Navigate to Settings on press
        iconColor="#007BFF" // Set settings icon color
        textColor="#000000" // Set header text color
      />
      
      {loading && <ActivityIndicator size="large" color="#007BFF" />}
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      {successMessage && <Text style={styles.successText}>{successMessage}</Text>}
      
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80, // Increased padding at the top
    backgroundColor: '#1A1A1A',
  },
  input: {
    height: 40,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    marginBottom: 20, // Increased bottom margin for spacing
    padding: 10,
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    alignItems: 'center',
    marginBottom: 20, // Increased bottom margin for spacing
  },
  buttonText: {
    color: '#FFFFFF',
  },
  errorText: {
    color: 'red',
    marginBottom: 10, // Added margin for spacing
  },
  successText: {
    color: 'green',
    marginBottom: 10, // Added margin for spacing
  },
});

export default Account;
