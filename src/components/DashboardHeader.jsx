import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DashboardHeader = ({logout, email}) => {
  return (
    <View style={styles.container}>
        <Text>{email}</Text>
        <Button title='logout' onPress={logout} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default DashboardHeader