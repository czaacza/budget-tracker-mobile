import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

const LoginRegisterPopup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(''); // State to hold the error message
  const [message, setMessage] = useState(''); // Generic message state to handle both error and success

  const { handleLogin, handleRegister } = useAuth(); // Get the handleLogin function from context

  const onLoginPress = async () => {
    try {
      await handleLogin(username, password);
      setError(''); // Clear error on successful login
    } catch (e) {
      setError(e.message); // Set error message if an error is thrown
    }
  };

  const onRegisterPress = async () => {
    try {
      await handleRegister(username, email, password);
      setMessage('Registration successful, please login.'); // Set success message
      setError(''); // Clear error on successful registration
      setIsLogin(true); // Switch to login screen
    } catch (e) {
      setError(e.message); // Set error message if an error is thrown
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.popup}>
        <Text style={styles.header}>{isLogin ? 'Login' : 'Register'}</Text>
        {error !== '' && <Text style={styles.errorText}>{error}</Text>}
        {message !== '' && <Text style={styles.messageText}>{message}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          autoCapitalize="none"
          onChangeText={setUsername}
        />
        {!isLogin && (
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            autoCapitalize="none"
            onChangeText={setEmail}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          autoCapitalize="none"
          onChangeText={setPassword}
        />
        <Button
          title={isLogin ? 'Login' : 'Register'}
          onPress={isLogin ? onLoginPress : onRegisterPress}
        />
        <TouchableOpacity
          onPress={() => setIsLogin(!isLogin)}
          style={styles.toggleButton}
        >
          <Text style={styles.toggleText}>
            {isLogin
              ? "Don't have an account? Register"
              : 'Already have an account? Login'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: '80%',
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  messageText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: 'green', // or another color that signifies success or error based on the context
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5,
    padding: 10,
  },
  toggleButton: {
    marginTop: 15,
  },
  toggleText: {
    color: 'blue',
    textAlign: 'center',
  },
});

export default LoginRegisterPopup;
