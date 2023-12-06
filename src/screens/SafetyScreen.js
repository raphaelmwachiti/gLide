import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking, Modal } from 'react-native';

const SafetyScreen = ({ navigation }) => {
  const [isEmergencyModalVisible, setEmergencyModalVisible] = useState(false);

  const showEmergencyModal = () => {
    setEmergencyModalVisible(true);
  };

  const hideEmergencyModal = () => {
    setEmergencyModalVisible(false);
  };

  const handleEmergencyCall = () => {
    hideEmergencyModal();
    Linking.openURL('tel:911');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/safety.jpg')}
        style={styles.icon}
      />
      <Text style={styles.title}>Your Safety Matters</Text>

      <View style={styles.tipsContainer}>
        <Text style={styles.tip}>1. Verify the vehicle details before entering.</Text>
        
        <Text style={styles.tip}>2. Use well-lit and populated pick-up/drop-off points.</Text>
        <Text style={styles.tip}>3. Trust your instincts; if something feels off, cancel the ride.</Text>
        {/* Add more safety tips as needed */}
      </View>

      {/* Emergency Call Button */}
      <TouchableOpacity
        style={[styles.button, styles.emergencyButton]}
        onPress={showEmergencyModal}
      >
        <Text style={styles.buttonText}>Emergency Call</Text>
      </TouchableOpacity>

      {/* Got It Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Got It</Text>
      </TouchableOpacity>

      {/* Emergency Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEmergencyModalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Emergency Call</Text>
            <Text style={styles.modalText}>Are you sure you want to call 911?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.emergencyButton]}
                onPress={handleEmergencyCall}
              >
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={hideEmergencyModal}
              >
                <Text style={styles.modalButtons}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tipsContainer: {
    marginBottom: 20,
    width: '80%',
  },
  tip: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#00BFFF',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
  },
  emergencyButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default SafetyScreen;
