import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { BannerAd,BannerAdSize } from 'react-native-google-mobile-ads';

const adUnitId2 = 'ca-app-pub-3603149055596095/1898070564';

const settheory = () => {
  const [setA, setSetA] = useState([]);
  const [setB, setSetB] = useState([]);
  const [union, setUnion] = useState([]);
  const [intersection, setIntersection] = useState([]);
  const [complementA, setComplementA] = useState([]);
  const [complementB, setComplementB] = useState([]);
  
  const handleAddToSetA = (item) => {
    setSetA((prevSetA) => [...prevSetA, item]);
  };

  const handleAddToSetB = (item) => {
    setSetB((prevSetB) => [...prevSetB, item]);
  };

  const handleCalculate = () => {
    const unionSet = Array.from(new Set([...setA, ...setB]));
    setUnion(unionSet);

    const intersectionSet = setA.filter((item) => setB.includes(item));
    setIntersection(intersectionSet);

    const complementASet = setB.filter((item) => !setA.includes(item));
    setComplementA(complementASet);

    const complementBSet = setA.filter((item) => !setB.includes(item));
    setComplementB(complementBSet);
  };

  return (
    <View style={styles.container}>
      <View>
    <BannerAd
    unitId={adUnitId2}
    size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
    requestOptions={{
      requestNonPersonalizedAdsOnly: true,
    }}
  />
    </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.title}>Set Theory Calculator</Text>
        <View style={styles.setContainer}>
          <Text style={styles.subtitle}>Set A:</Text>
          <View style={styles.set}>
            {setA.map((item, index) => (
              <Text key={index} style={styles.setItem}>
                {item}
              </Text>
            ))}
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddToSetA(Math.random().toFixed(2))}
          >
            <Text style={styles.buttonText}>Add to Set A</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.setContainer}>
          <Text style={styles.subtitle}>Set B:</Text>
          <View style={styles.set}>
            {setB.map((item, index) => (
              <Text key={index} style={styles.setItem}>
                {item}
              </Text>
            ))}
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddToSetB(Math.random().toFixed(2))}
          >
            <Text style={styles.buttonText}>Add to Set B</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.calculateButton} onPress={() => { handleCalculate(); }}>
  <Text style={styles.buttonText}>Calculate</Text>
</TouchableOpacity>
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Union: {union.join(', ')}</Text>
          <Text style={styles.resultText}>Intersection: {intersection.join(', ')}</Text>
          <Text style={styles.resultText}>Complement of Set A: {complementA.join(', ')}</Text>
          <Text style={styles.resultText}>Complement of Set B: {complementB.join(', ')}</Text>
        </View>
      </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    marginTop:30
  },
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  setContainer: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  set: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  setItem: {
    backgroundColor: '#2196F3',
    color: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    margin: 5,
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 4,
  },
  calculateButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 4,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  resultContainer: {
    alignItems: 'flex-start',
  },
  resultText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default settheory;
