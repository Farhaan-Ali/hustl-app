import { useEffect } from 'react';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HustlLogo } from '@/components/HustlLogo';

export default function IndexScreen() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace('/(tabs)/');
      } else {
        router.replace('/(auth)/sign-in');
      }
    }
  }, [user, loading]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(0, 56, 255, 0.95)', 'rgba(0, 33, 165, 0.95)']}
        style={styles.background}
      />
      <View style={styles.content}>
        <HustlLogo size={80} clickable={false} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});