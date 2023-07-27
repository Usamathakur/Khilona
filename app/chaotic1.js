import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { BannerAd, BannerAdSize, InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';

const adUnitId = 'ca-app-pub-3603149055596095/1898070564';
const adUnitId2 = 'ca-app-pub-3603149055596095/9596597182';

const interstitial = InterstitialAd.createForAdRequest(adUnitId2, {
  requestNonPersonalizedAdsOnly: true,
});

const chaotic1 = () => {
  const [kNumbers, setKNumbers] = useState([]);
  const [seenNumbers, setSeenNumbers] = useState([]);
  const [generateK1, setGenerateK1] = useState(false);
  const [generateK2, setGenerateK2] = useState(false);
  const [result, setResult] = useState('');

  useEffect(() => {
    if (generateK1) {
      const interval = setInterval(() => {
        const lastNumber = kNumbers[kNumbers.length - 1] || 0;
        const randomNum = generateNextNumber(lastNumber, true);
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
        const lastNumber = seenNumbers[seenNumbers.length - 1] || 0;
        const randomNum = generateNextNumber(lastNumber, false);
        setSeenNumbers((prevNumbers) => [...prevNumbers, randomNum]);
      }, 500);

      return () => {
        clearInterval(interval);
      };
    }
  }, [generateK2]);

  const generateNextNumber = (lastNumber, isK) => {
    const min = isK ? -1 / Math.PI : -1;
    const max = isK ? 1 / Math.PI : 1;
    const range = max - min;
    const randomOffset = Math.random() * range;
    return lastNumber + randomOffset;
  };

  const handleAddition = () => {
    const kSum = kNumbers.reduce((total, num) => total + num, 0);
    const seenSum = seenNumbers.reduce((total, num) => total + num, 0);
    setResult((kSum + seenSum).toFixed(2));
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
          <View style={styles.numbersContainer}>{renderNumbers(kNumbers)}</View>
          <TouchableOpacity
            style={styles.generateButton}
            onPress={() => setGenerateK1(!generateK1)}
          >
            <Text style={styles.buttonText}>
              {generateK1 ? 'Stop Generating' : 'Start Generating k1'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.calculatorContainer}>
          <Text style={styles.title}>High Chaos (seen1 - seen10):</Text>
          <View style={styles.numbersContainer}>{renderNumbers(seenNumbers)}</View>
          <TouchableOpacity
            style={styles.generateButton}
            onPress={() => setGenerateK2(!generateK2)}
          >
            <Text style={styles.buttonText}>
              {generateK2 ? 'Stop Generating' : 'Start Generating seen'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={() => { handleAddition(); showInterstitialAd(); }}>
          <Text style={styles.buttonText}>∩</Text>
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

const renderNumbers = (numbers) => {
  return numbers.map((num, index) => (
    <Text key={index} style={styles.chaosNumber}>
      {num.toFixed(2)}
    </Text>
  ));
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
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
  numbersContainer: {
    alignItems: 'center',
  },
  chaosNumber: {
    fontSize: 16,
    marginBottom: 5,
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
    backgroundColor: '#1DA1F2',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default chaotic1;
