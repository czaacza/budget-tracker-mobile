import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../../context/AuthContext';
import Dashboard from '../Dashboard/Dashboard';

const MainMenu = () => {
  const { user, handleLogout } = useAuth();
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const animation = useRef(new Animated.Value(0)).current;
  const menuItems = ['Dashboard', 'Incomes', 'Expenses'];
  const menuItemWidth = 120;

  const renderComponent = () => {
    switch (activeMenu) {
      case 'Dashboard':
        return <Dashboard userId={user.id} />; // Pass user ID or any other needed props
      case 'Incomes':
        return <Text>Incomes</Text>;
      case 'Expenses':
        return <Text>Expenses</Text>;
      default:
        return <Dashboard userId={user.id} />;
    }
  };

  const handleMenuPress = (menuName) => {
    const index = menuItems.indexOf(menuName);
    Animated.spring(animation, {
      toValue: index * menuItemWidth,
      useNativeDriver: false,
    }).start();
    setActiveMenu(menuName);
  };

  const animatedStyle = {
    position: 'absolute',
    bottom: 0,
    left: animation,
    width: 120,
    height: '100%',
    backgroundColor: '#003554',
    borderRadius: 25,
    zIndex: -1,
  };

  const textStyle = (menuName, index) => [
    styles.menuText,
    activeMenu === menuName && styles.activeMenuText,
    { zIndex: 999 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image
          source={require('../../img/avatar-placeholder.png')}
          style={styles.profilePic}
        />
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>
            {user ? user.username : 'User'}
          </Text>
          <TouchableOpacity onPress={handleLogout} style={styles.signOutButton}>
            <FontAwesome name="sign-out" size={18} color="rgba(34,34,96,.6)" />
            <Text style={styles.signOutText}>Sign out</Text>
          </TouchableOpacity>
          <View style={styles.languageSection}>
            <TouchableOpacity onPress={() => console.log('Switch to English')}>
              <Image
                source={require('../../img/uk-flag.webp')}
                style={styles.languageIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Switch to Polish')}>
              <Image
                source={require('../../img/pl-flag.png')}
                style={styles.languageIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.menuContainer}>
        <View style={styles.menuRow}>
          {menuItems.map((menuName, index) => (
            <TouchableOpacity
              key={menuName}
              style={styles.menuItem}
              onPress={() => handleMenuPress(menuName)}
            >
              <Animated.Text style={textStyle(menuName, index)}>
                {menuName}
              </Animated.Text>
            </TouchableOpacity>
          ))}
          <Animated.View style={animatedStyle} />
        </View>
      </View>

      <View style={styles.content}>{renderComponent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f4f4f8',
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 36,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileDetails: {
    justifyContent: 'space-around',
  },
  profileName: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  signOutText: {
    marginLeft: 10,
    color: 'rgba(34,34,96,.6)',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  languageSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 10,
  },
  languageIcon: {
    width: 32,
    height: 16,
    // marginHorizontal: 5,
  },
  menuContainer: {
    alignItems: 'center',
    width: '100%',
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    position: 'relative',
    width: 360,
    height: 40,
  },
  menuItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 25,
    width: 120,
    justifyContent: 'center',
  },
  activeMenu: {
    backgroundColor: '#003554',
  },
  activeMenuText: {
    color: '#fff',
  },
  menuText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  content: {
    flex: 1,
  },
});

export default MainMenu;
