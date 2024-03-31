import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const DiscountCalculatorApp = () => {
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [youSave, setYouSave] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [history, setHistory] = useState([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const calculateDiscount = () => {
    const original = parseFloat(originalPrice);
    const discount = parseFloat(discountPercentage);

    if (isNaN(original) || isNaN(discount) || discount < 0 || discount > 100) {
      alert('Please enter valid numbers for Original Price and Discount Percentage (0-100).');
      return;
    }

    const discountAmount = (original * discount) / 100;
    const final = original - discountAmount;

    setYouSave(discountAmount.toFixed(2));
    setFinalPrice(final.toFixed(2));

    // Save calculation to history
    const calculation = { originalPrice: original, discountPercentage: discount, priceAfterDiscount: final };
    setHistory([...history, calculation]);
  };

  const clearInputs = () => {
    setOriginalPrice('');
    setDiscountPercentage('');
    setYouSave(0);
    setFinalPrice(0);
  };

  const renderHistoryItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text>Original Price: {item.originalPrice}</Text>
      <Text>Discount Percentage: {item.discountPercentage}%</Text>
      <Text>Price After Discount: {item.priceAfterDiscount.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Discount Calculator App</Text>
      <TextInput
        style={styles.input}
        placeholder="Original Price"
        keyboardType="numeric"
        value={originalPrice}
        onChangeText={setOriginalPrice}
      />
      <TextInput
        style={styles.input}
        placeholder="Discount Percentage"
        keyboardType="numeric"
        value={discountPercentage}
        onChangeText={setDiscountPercentage}
      />
      <Button  title="Calculate" onPress={calculateDiscount} />
      <Text style={styles.result}>You Save: ${youSave}</Text>
      <Text style={styles.result}>Final Price: ${finalPrice}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={clearInputs}>
          <Text style={styles.buttonText}>Clear Inputs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setShowHistoryModal(true)}>
          <Text style={styles.buttonText}>View History</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={showHistoryModal} animationType="slide">
        <View style={styles.historyContainer}>
          <Button title="Close" onPress={() => setShowHistoryModal(false)} />
          <FlatList
            data={history}
            renderItem={renderHistoryItem}
            keyExtractor={(item, index) => index.toString()}
          />
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
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
  },
  result: {
    marginVertical: 10,
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#ff4500',
    padding: 10,
    borderRadius: 50,
    width: '45%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  historyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  historyItem: {
    marginBottom: 20,
  },
});

export default DiscountCalculatorApp;

