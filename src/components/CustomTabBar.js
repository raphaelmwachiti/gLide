import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.segmentedControlContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={label}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            style={[
              styles.segmentButton,
              isFocused ? styles.segmentButtonActive : null,
            ]}
          >
            <Text
              style={[
                styles.segmentButtonText,
                { color: isFocused ? '#333' : '#666' },
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  segmentedControlContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    marginTop: 60, 
    backgroundColor: '#DDD'
    
  },
  segmentButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    margin: 3, 
    
  },
  segmentButtonActive: {
    backgroundColor: '#fff',
  },
  segmentButtonText: {
    fontSize: 16,
  },
});

export default CustomTabBar;
