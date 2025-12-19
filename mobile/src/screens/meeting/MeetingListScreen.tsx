import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import apiClient from '../../api/client';
import { Meeting } from '../../types';

export default function MeetingListScreen({ navigation }: any) {
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const response = await apiClient.get('/meetings');
      setMeetings(response.data);
    } catch (error) {
      console.error('Failed to fetch meetings', error);
    }
  };

  const renderMeeting = ({ item }: { item: Meeting }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('MeetingDetail', { id: item.id })}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>
      <View style={styles.info}>
        <Text style={styles.infoText}>
          👥 {item.currentParticipants}/{item.maxParticipants}명
        </Text>
        <Text style={styles.infoText}>
          💰 {item.participationFee.toLocaleString()}원
        </Text>
      </View>
      <Text style={styles.status}>
        {item.status === 'open' ? '✅ 참여 가능' : '❌ 마감'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={meetings}
        renderItem={renderMeeting}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
      
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateMeeting')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 18,
    color: '#666',
    marginBottom: 12,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 18,
    color: '#444',
  },
  status: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  fabText: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
  },
});





