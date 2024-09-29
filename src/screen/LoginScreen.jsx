import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { supabase } from '../../lib/supabase';

const Account = ({ session }) => {
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
      {loading && <ActivityIndicator size="large" color="#FFFFFF" />}
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      {successMessage && <Text style={styles.successText}>{successMessage}</Text>}

      <Text style={styles.text}>UPDATE YOUR PROFILE</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder='USERNAME'
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <Text style={styles.text}>CHANGE PASSWORD</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder='NEW PASSWORD'
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder='CONFIRM PASSWORD'
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <TouchableOpacity style={styles.updateButton} onPress={changePassword} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#213D61" />
        ) : (
          <Text style={styles.updateButtonText}>CHANGE PASSWORD</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => supabase.auth.signOut()} style={styles.signOutButton}>
        <Text style={styles.signOutButtonText}>SIGN OUT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#213D61",
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: "bold",
    marginTop: '10%',
    marginBottom: '5%',
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    width: '70%',
    marginVertical: '5%',
    height: '6%',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    marginLeft: '5%',
    marginRight: '5%',
    fontSize: 17,
  },
  updateButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: '3%',
    borderRadius: 20,
    alignItems: 'center',
    width: '70%',
    marginTop: '10%',
  },
  updateButtonText: {
    color: "#213D61",
    fontSize: 22,
    fontWeight: "bold",
  },
  signOutButton: {
    marginTop: '10%',
  },
  signOutButtonText: {
    color: "#F8EC3B",
    textDecorationLine: 'underline',
    fontSize: 15,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  successText: {
    color: 'green',
    marginBottom: 10,
  },
});
