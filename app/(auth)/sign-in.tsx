import React, { useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import { router } from 'expo-router';
import { signIn } from '@/lib/auth';
import { HustlLogo } from '@/components/HustlLogo';
import { Typography } from '@/components/ui/Typography';
import { PremiumInput } from '@/components/ui/PremiumInput';
import { GlowButton } from '@/components/ui/GlowButton';
import { PremiumCard } from '@/components/ui/PremiumCard';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await signIn({ email, password });
      router.replace('/(tabs)/');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <LinearGradient
        colors={['rgba(0, 56, 255, 0.95)', 'rgba(0, 33, 165, 0.95)']}
        style={styles.background}
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <HustlLogo size={60} clickable={false} />
          <Typography variant="h1" color="#ffffff" style={styles.title}>
            Welcome Back
          </Typography>
          <Typography variant="body1" color="rgba(255,255,255,0.8)" style={styles.subtitle}>
            Sign in to continue your campus hustle
          </Typography>
        </View>

        <PremiumCard style={styles.formCard} variant="glass">
          <View style={styles.form}>
            <PremiumInput
              label="Email"
              placeholder="your.email@ufl.edu"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              icon={<Mail size={20} color="rgba(0, 56, 255, 0.7)" />}
            />

            <PremiumInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              icon={<Lock size={20} color="rgba(0, 56, 255, 0.7)" />}
            />

            <TouchableOpacity 
              style={styles.showPasswordButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={20} color="rgba(0, 30, 60, 0.6)" />
              ) : (
                <Eye size={20} color="rgba(0, 30, 60, 0.6)" />
              )}
              <Typography variant="body2" color="rgba(0, 30, 60, 0.6)">
                {showPassword ? 'Hide' : 'Show'} password
              </Typography>
            </TouchableOpacity>

            <GlowButton
              title={loading ? "Signing In..." : "Sign In"}
              onPress={handleSignIn}
              disabled={loading}
              variant="primary"
              size="lg"
              style={styles.signInButton}
            />

            <View style={styles.footer}>
              <Typography variant="body2" color="rgba(0, 30, 60, 0.7)">
                Don't have an account?{' '}
              </Typography>
              <TouchableOpacity onPress={() => router.push('/(auth)/sign-up')}>
                <Typography variant="body2" color="rgba(0, 56, 255, 0.8)" style={styles.linkText}>
                  Sign up
                </Typography>
              </TouchableOpacity>
            </View>
          </View>
        </PremiumCard>
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
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    marginTop: 20,
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: '700',
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 24,
  },
  formCard: {
    padding: 32,
  },
  form: {
    gap: 20,
  },
  showPasswordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-end',
    marginTop: -10,
  },
  signInButton: {
    marginTop: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  linkText: {
    fontWeight: '600',
  },
});