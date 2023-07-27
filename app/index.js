import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Link } from "expo-router";
import { AdEventType, BannerAd, BannerAdSize, InterstitialAd } from 'react-native-google-mobile-ads';

const adUnitId = 'ca-app-pub-3603149055596095/1898070564';
const adUnitId2 = 'ca-app-pub-3603149055596095/9596597182';

const interstitial = InterstitialAd.createForAdRequest(adUnitId2, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing', 'shoes', 'accessories', 'beauty', 'makeup', 'skincare', 'health', 'fitness', 'wellness', 'lifestyle', 'food', 'travel', 'technology', 'gaming', 'entertainment', 'music', 'sports', 'home', 'decor', 'finance', 'investing', 'business'],
});

export default function Page() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
    });

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

  // No advert ready to show yet
  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.main}>
          <Text style={styles.title}>Start Calculation</Text>
          <Link href="/calculator" style={styles.button} onPress={() => { interstitial.show(); }}>
            <Text style={styles.buttonText}>Prime Sum</Text>
          </Link>
          <Link href="/number" style={styles.button} onPress={() => { interstitial.show(); }}>
            <Text style={styles.buttonText}>Experiment with Numbers</Text>
          </Link>
          <Link href="/gcd" style={styles.button} onPress={() => { interstitial.show(); }}>
            <Text style={styles.buttonText}>Calculate GCD</Text>
          </Link>
          <Link href="/chaotic2" style={styles.button} onPress={() => { interstitial.show(); }}>
            <Text style={styles.buttonText}>Chaotic Numbers by Usama Thakur Method 1</Text>
          </Link>
          <Link href="/chaotic1" style={styles.button} onPress={() => { interstitial.show(); }}>
            <Text style={styles.buttonText}>Chaotic Numbers by Usama Thakur Method 2</Text>
          </Link>
          <Link href="/settheory" style={styles.button} onPress={() => { interstitial.show(); }}>
            <Text style={styles.buttonText}>Set Theory</Text>
          </Link>
        </View>
      </ScrollView>
      <View>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  main: {
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#1DA1F2",
    borderRadius: 999,
    paddingVertical: 16,
    paddingHorizontal: 40,
    alignSelf: "stretch",
    marginTop: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
