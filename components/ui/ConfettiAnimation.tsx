import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface ConfettiPiece {
  id: number;
  x: Animated.Value;
  y: Animated.Value;
  rotation: Animated.Value;
  color: string;
  size: number;
}

interface ConfettiAnimationProps {
  active: boolean;
  onComplete?: () => void;
}

export function ConfettiAnimation({ active, onComplete }: ConfettiAnimationProps) {
  const confettiPieces = useRef<ConfettiPiece[]>([]);
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  const colors = ['#0038FF', '#FF5A1F', '#E63A0B', '#0021A5', '#FFD700', '#FF69B4'];

  useEffect(() => {
    if (active) {
      createConfetti();
      startAnimation();
    } else {
      stopAnimation();
    }

    return () => {
      stopAnimation();
    };
  }, [active]);

  const createConfetti = () => {
    confettiPieces.current = Array.from({ length: 50 }, (_, index) => ({
      id: index,
      x: new Animated.Value(Math.random() * width),
      y: new Animated.Value(-20),
      rotation: new Animated.Value(0),
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
    }));
  };

  const startAnimation = () => {
    const animations = confettiPieces.current.map((piece) => {
      return Animated.parallel([
        Animated.timing(piece.y, {
          toValue: height + 50,
          duration: 3000 + Math.random() * 2000,
          useNativeDriver: true,
        }),
        Animated.timing(piece.x, {
          toValue: piece.x._value + (Math.random() - 0.5) * 200,
          duration: 3000 + Math.random() * 2000,
          useNativeDriver: true,
        }),
        Animated.loop(
          Animated.timing(piece.rotation, {
            toValue: 360,
            duration: 1000 + Math.random() * 1000,
            useNativeDriver: true,
          })
        ),
      ]);
    });

    animationRef.current = Animated.parallel(animations);
    animationRef.current.start(() => {
      onComplete?.();
    });
  };

  const stopAnimation = () => {
    if (animationRef.current) {
      animationRef.current.stop();
    }
  };

  if (!active) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      {confettiPieces.current.map((piece) => (
        <Animated.View
          key={piece.id}
          style={[
            styles.confettiPiece,
            {
              backgroundColor: piece.color,
              width: piece.size,
              height: piece.size,
              transform: [
                { translateX: piece.x },
                { translateY: piece.y },
                {
                  rotate: piece.rotation.interpolate({
                    inputRange: [0, 360],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  confettiPiece: {
    position: 'absolute',
    borderRadius: 2,
  },
});