import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { UserProfile } from '../../types';

interface ProfileCardProps {
  profile: UserProfile;
  showMannerScore?: boolean;
}

export default function ProfileCard({ profile, showMannerScore = true }: ProfileCardProps) {
  const getHeartColor = (score: number) => {
    if (score >= 80) return '#4CAF50'; // 초록
    if (score >= 60) return '#FF9800'; // 주황
    return '#F44336'; // 빨강
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: profile.profileImage || 'https://via.placeholder.com/80' }}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.nickname}>{profile.nickname}</Text>
        <Text style={styles.details}>
          {profile.gender === 'male' ? '남성' : '여성'} • {profile.ageGroup}
        </Text>
        {showMannerScore && (
          <View style={styles.mannerScore}>
            <Text style={[styles.heart, { color: getHeartColor(profile.mannerScore) }]}>
              ❤️
            </Text>
            <Text style={styles.score}>{profile.mannerScore.toFixed(0)}%</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  nickname: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  details: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  mannerScore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heart: {
    fontSize: 24,
    marginRight: 8,
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});

