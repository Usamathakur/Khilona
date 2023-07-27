import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { BannerAd, BannerAdSize, InterstitialAd } from 'react-native-google-mobile-ads';

const adUnitId = 'ca-app-pub-3603149055596095/1898070564';
const adUnitId2 = 'ca-app-pub-3603149055596095/9596597182';

const interstitial = InterstitialAd.createForAdRequest(adUnitId2, {
  requestNonPersonalizedAdsOnly: true,
});

const chaotic = () => {
  const [kNumbers, setKNumbers] = useState([]);
  const [seenNumbers, setSeenNumbers] = useState([]);
  const [generateK1, setGenerateK1] = useState(false);
  const [generateK2, setGenerateK2] = useState(false);
  const [result, setResult] = useState('');

  useEffect(() => {
    if (generateK1) {
      const interval = setInterval(() => {
        const randomNum = Math.random() * (1 - (-1)) + (-1); // Generate random number between -1 and 1
        setKNumbers((prevNumbers) => [...prevNumbers, randomNum]);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [generateK1]);

  useEffect(() => {
    if (generateK2) {
      const interval = setInterval(() => {
        const randomNum = Math.random() * (1 - (-1)) + (-1); // Generate random number between -1 and 1
        setSeenNumbers((prevNumbers) => [...prevNumbers, randomNum]);
      }, 500);

      return () => {
        clearInterval(interval);
      };
    }
  }, [generateK2]);

  const handleNumberPress = (number) => {
    if (generateK1) {
      setKNumbers((prevNumbers) => [...prevNumbers, number]);
    } else if (generateK2) {
      setSeenNumbers((prevNumbers) => [...prevNumbers, number]);
    }
  };

  const handleAddition = () => {
    const kSum = kNumbers.reduce((total, num) => total + num, 0);
    const seenSum = seenNumbers.reduce((total, num) => total + num, 0);
    setResult((kSum + seenSum).toFixed(2));
  };

  const renderCalculatorButtons = (start, end) => {
    const buttons = [];
    for (let i = start; i <= end; i++) {
      buttons.push(
        <TouchableOpacity key={i} style={styles.calculatorButton} onPress={() => handleNumberPress(i)}>
          <Text style={styles.buttonText}>{i}</Text>
        </TouchableOpacity>
      );
    }
    return buttons;
  };

  const showInterstitialAd = async () => {
    try {
      await interstitial.load();
      await interstitial.show();
    } catch (error) {
      console.log('Failed to show interstitial ad:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.calculatorContainer}>
          <Text style={styles.title}>Low Chaos (k1 - k10):</Text>
          <View style={styles.buttonRow}>{renderCalculatorButtons(1, 10)}</View>
          <TouchableOpacity
            style={styles.generateButton}
            onPress={() => setGenerateK1(!generateK1)}
          >
            <Text style={styles.buttonText}>{generateK1 ? 'Stop Generating' : 'Generate k1'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.calculatorContainer}>
          <Text style={styles.title}>High Chaos (seen1 - seen10):</Text>
          <View style={styles.buttonRow}>{renderCalculatorButtons(1, 10)}</View>
          <TouchableOpacity
            style={styles.generateButton}
            onPress={() => setGenerateK2(!generateK2)}
          >
            <Text style={styles.buttonText}>{generateK2 ? 'Stop Generating' : 'Generate seen'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={() => { handleAddition(); showInterstitialAd(); }}>
          <Text style={styles.buttonText}>=</Text>
        </TouchableOpacity>

        <Text style={styles.resultText}>{result}</Text>
      </ScrollView>
      
      <View>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.BANNER}
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
    marginTop: 30,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  calculatorContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  calculatorButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 5,
    backgroundColor: '#FFFFFF',
  },
  buttonText: {
    fontSize: 24,
  },
  generateButton: {
    backgroundColor: '#1DA1F2',
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    marginVertical: 20,
    backgroundColor: '#2196F3',
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default chaotic;
