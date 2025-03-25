import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import globalStyles from '../styles/globalStyles';

const storage = new MMKV();

const SettingsScreen: React.FC = () => {
  const [motivationalEnabled, setMotivationalEnabled] = useState<boolean>(false);

  useEffect(() => {
    const storedValue = storage.getBoolean('motivationalEnabled');
    if (storedValue !== undefined) {
      setMotivationalEnabled(storedValue);
    }
  }, []);

  const toggleMotivational = (value: boolean) => {
    setMotivationalEnabled(value);
    storage.set('motivationalEnabled', value);
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.header}>Settings</Text>
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Enable Motivational Messages</Text>
        <Switch value={motivationalEnabled} onValueChange={toggleMotivational} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  settingLabel: {
    fontSize: 16,
  },
});

export default SettingsScreen;
