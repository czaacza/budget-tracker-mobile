import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AuthProvider, useAuth } from './context/AuthContext';
import Dashboard from './Components/Dashboard/Dashboard';
import LoginRegisterPopup from './Components/LoginRegisterPopup/LoginRegisterPopup';
import MainMenu from './Components/MainMenu/MainMenu';
import { GlobalProvider } from './context/GlobalContext';

const AppContent = () => {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      {user ? <MainMenu /> : <LoginRegisterPopup />}
    </View>
  );
};

const App = () => (
  <AuthProvider>
    <GlobalProvider>
      <AppContent />
    </GlobalProvider>
  </AuthProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

export default App;
