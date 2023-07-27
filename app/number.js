import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BannerAd,BannerAdSize } from 'react-native-google-mobile-ads';

const adUnitId2 = 'ca-app-pub-3603149055596095/1898070564';

const number = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [result, setResult] = useState('');
  const [baseNumber, setBaseNumber] = useState('');
  const [maxNumber, setMaxNumber] = useState('');

  const scrollRef = useRef(null);
  
  useEffect(() => {
    // Load saved values from AsyncStorage
    loadValues();
  }, []);

  useEffect(() => {
    // Save values to AsyncStorage whenever they change
    saveValues();
  }, [displayValue, result, baseNumber, maxNumber]);

  const loadValues = async () => {
    try {
      const savedDisplayValue = await AsyncStorage.getItem('displayValue');
      const savedResult = await AsyncStorage.getItem('result');
      const savedBaseNumber = await AsyncStorage.getItem('baseNumber');
      const savedMaxNumber = await AsyncStorage.getItem('maxNumber');

      if (savedDisplayValue !== null) {
        setDisplayValue(savedDisplayValue);
      }

      if (savedResult !== null) {
        setResult(savedResult);
      }

      if (savedBaseNumber !== null) {
        setBaseNumber(savedBaseNumber);
      }

      if (savedMaxNumber !== null) {
        setMaxNumber(savedMaxNumber);
      }
    } catch (error) {
      console.log('Error loading values from AsyncStorage:', error);
    }
  };

  const saveValues = async () => {
    try {
      await AsyncStorage.setItem('displayValue', displayValue);
      await AsyncStorage.setItem('result', result);
      await AsyncStorage.setItem('baseNumber', baseNumber);
      await AsyncStorage.setItem('maxNumber', maxNumber);
    } catch (error) {
      console.log('Error saving values to AsyncStorage:', error);
    }
  };

  const calculateArse = () => {
    const base = parseFloat(baseNumber);
    const max = parseInt(maxNumber);

    if (isNaN(base) || isNaN(max)) {
      setResult('Please enter valid numbers for the base and max number.');
      return;
    }

    let expression = '';
    for (let i = 0; i <= max; i++) {
      expression += `${base} + ${i} = ${base + i}\n`;
      expression += `${base} - ${i} = ${base - i}\n`;
      expression += `${base} * ${i} = ${base * i}\n`;
      if (i !== 0) {
        expression += `${base} / ${i} = ${base / i}\n`;
      } else {
        expression += `${base} / ${i} = Infinity\n`;
      }
    }

    const mathExpression = displayValue.replace(/÷/g, '/').replace(/×/g, '*');
    try {
      const mathResult = eval(mathExpression);
      expression += `${base} ${displayValue} = ${mathResult}`;
    } catch (error) {
      setResult('Invalid expression');
      return;
    }

    setResult(expression);
  };

  const handlePress = (value) => {
    if (value === 'C') {
      setDisplayValue('0');
      setResult('');
      setBaseNumber('');
      setMaxNumber('');
    } else if (value === '=') {
      calculateArse();
    } else if (value === 'arse') {
      setBaseNumber(displayValue);
      setDisplayValue('0');
      setResult('');
    } else if (value === 'top') {
      scrollRef.current.scrollTo({ y: 0, animated: true });
    } else if (value === 'bottom') {
      scrollRef.current.scrollToEnd({ animated: true });
    } else {
      if (displayValue === '0') {
        setDisplayValue(value);
      } else {
        setDisplayValue(displayValue + value);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} ref={scrollRef}>
        <Text style={styles.explain}>Max Number & Base Number: The number that will be calculated from 0 till you specify and operate all arithmetic calculations of Base number</Text>
        <Text style={styles.explain}>Example: base number +,-,x,/ max number 0-till infinity</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter base number"
          value={baseNumber}
          onChangeText={setBaseNumber}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter max number"
          value={maxNumber}
          onChangeText={setMaxNumber}
          keyboardType="numeric"
        />
        <View style={styles.buttons}>
          <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={() => handlePress('C')}>
            <Text style={styles.buttonText}>C</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('7')}>
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('8')}>
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('9')}>
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('4')}>
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('5')}>
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('6')}>
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('1')}>
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('2')}>
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('3')}>
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('0')}>
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operationButton]} onPress={() => handlePress('+')}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operationButton]} onPress={() => handlePress('-')}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operationButton]} onPress={() => handlePress('×')}>
            <Text style={styles.buttonText}>×</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operationButton]} onPress={() => handlePress('÷')}>
            <Text style={styles.buttonText}>÷</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => { handlePress('='); }}>
          <Text style={styles.buttonText}>=</Text>
        </TouchableOpacity>
          <TouchableOpacity style={styles.scrollButton} onPress={() => handlePress('bottom')}>
            <Text style={styles.scrollButtonText}>Back to Bottom</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{result}</Text>
        </View>
        <TouchableOpacity style={styles.scrollButton} onPress={() => handlePress('top')}>
          <Text style={styles.scrollButtonText}>Back to Top</Text>
        </TouchableOpacity>
      </ScrollView>
      <View>
      <BannerAd
      unitId={adUnitId2}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  display: {
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
  },
  displayText: {
    fontSize: 24,
    textAlign: 'right',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: '#FFFFFF',
  },
  buttonText: {
    fontSize: 24,
  },
  clearButton: {
    backgroundColor: '#F44336',
    color: '#FFFFFF',
  },
  operationButton: {
    backgroundColor: '#E0E0E0',
  },
  equalButton: {
    backgroundColor: '#2196F3',
    color: '#FFFFFF',
  },
  arseButton: {
    backgroundColor: '#4CAF50',
    color: '#FFFFFF',
  },
  resultContainer: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    padding: 10,
    width: '80%',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    lineHeight: 44,
    textAlign: 'center',
    fontWeight: '700',
  },
  scrollButton: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: '#FFFFFF',
    marginTop: 10,
  },
  scrollButtonText: {
    fontSize: 16,
  },
  explain: {
    fontWeight: 'bold',
    fontSize: 16,
    margin: 5,
  },
});

export default number;
