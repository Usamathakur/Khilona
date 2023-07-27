import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BannerAd,BannerAdSize } from 'react-native-google-mobile-ads';

const adUnitId2 = 'ca-app-pub-3603149055596095/1898070564';

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [primeSum, setPrimeSum] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const isPrime = (num) => {
    if (num < 2) {
      return false;
    }
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  };

  const calculatePrimeSum = () => {
    const num = parseInt(displayValue);
    let sum = 0;
    for (let i = 2; i <= num; i++) {
      if (isPrime(i)) {
        sum += i;
      }
    }
    setPrimeSum(sum);
  };

  const handlePress = (value) => {
    if (value === 'C') {
      setDisplayValue('0');
      setPrimeSum(0);
    } else if (value === '=') {
      calculatePrimeSum();
    } else {
      if (displayValue === '0') {
        setDisplayValue(value);
      } else {
        setDisplayValue(displayValue + value);
      }
    }
  };

  return (
    <>
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.displayText}>{displayValue}</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('C')}>
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
        <TouchableOpacity style={styles.button} onPress={() => handlePress('+')}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('-')}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('*')}>
          <Text style={styles.buttonText}>*</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('/')}>
          <Text style={styles.buttonText}>/</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { handlePress('='); }}>
          <Text style={styles.buttonText}>=</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>Prime Sum: {primeSum}</Text>
      </View>
      
    </View>
    <View>
    <BannerAd
    unitId={adUnitId2}
    size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
    requestOptions={{
      requestNonPersonalizedAdsOnly: true,
    }}
  />
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  display: {
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
  },
  displayText: {
    fontSize: 24,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    width: '32%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  buttonText: {
    fontSize: 24,
  },
  resultContainer: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 35,
    fontWeight: 'bold',
  },
});

export default Calculator;
