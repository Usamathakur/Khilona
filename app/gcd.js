import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BannerAd,BannerAdSize } from 'react-native-google-mobile-ads';

const adUnitId2 = 'ca-app-pub-3603149055596095/1898070564';

const gcd = () => {
  const [displayValue, setDisplayValue] = useState('');
  const [result, setResult] = useState('');
  
  const handlePress = (value) => {
    if (value === 'C') {
      setDisplayValue('');
      setResult('');
    } else if (value === '=') {
      calculateResult();
    } else {
      setDisplayValue(displayValue + value);
    }
  };

  const calculateResult = () => {
    try {
      const expression = displayValue.trim();
      const evaluatedResult = evaluateExpression(expression);
      setResult(evaluatedResult.toString());
    } catch (error) {
      setResult('Invalid expression');
    }
  };

  const evaluateExpression = (expression) => {
    const n = parseInt(expression);
    if (isNaN(n)) {
      throw new Error('Invalid input');
    }
    if (n <= 0) {
      throw new Error('Input must be a positive integer');
    }
  
    const divisors = [];
    for (let i = 1; i <= n; i++) {
      if (n % i === 0) {
        divisors.push(i);
      }
    }
  
    return divisors;
  };
  

  const gcd = (a, b) => {
    // Calculate the Greatest Common Divisor (GCD) of two numbers
    if (b === 0) {
      return a;
    }
    return gcd(b, a % b);
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
        <TouchableOpacity style={styles.button} onPress={() => handlePress('1')}>
          <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('2')}>
          <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('3')}>
          <Text style={styles.buttonText}>3</Text>
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
        <TouchableOpacity style={styles.button} onPress={() => handlePress('7')}>
          <Text style={styles.buttonText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('8')}>
          <Text style={styles.buttonText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('9')}>
          <Text style={styles.buttonText}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { handlePress('='); }}>
          <Text style={styles.buttonText}>gcd</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>{result}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
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
  resultContainer: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    padding: 10,
  },
  resultText: {
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
  },
});

export default gcd;
