import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

interface Activity {
  id: number;
  type: 'meeting' | 'community' | 'groupbuy' | 'hobby';
  title: string;
  description: string;
  date: Date;
  status: 'completed' | 'upcoming' | 'cancelled';
}

export default function ActivityScreen() {
  const sampleActivities: Activity[] = [
    {
      id: 1,
      type: 'meeting',
      title: '아침 산책 모임',
      description: '남산 팔각정에서 진행',
      date: new Date('2024-12-06T07:00:00'),
      status: 'upcoming',
    },
    {
      id: 2,
      type: 'community',
      title: '게시글 작성',
      description: '남산 산책 후기 공유',
      date: new Date('2024-12-04T10:30:00'),
      status: 'completed',
    },
    {
      id: 3,
      type: 'groupbuy',
      title: '국내산 사과 5kg 구매',
      description: '공동구매 참여',
      date: new Date('2024-12-03T14:00:00'),
      status: 'completed',
    },
    {
      id: 4,
      type: 'hobby',
      title: '서예 교실 신청',
      description: '매주 화요일 수업',
      date: new Date('2024-12-02T10:00:00'),
      status: 'upcoming',
    },
    {
      id: 5,
      type: 'meeting',
      title: '탁구 동호회',
      description: '명동 체육센터',
      date: new Date('2024-12-01T16:00:00'),
      status: 'completed',
    },
  ];

  const getTypeText = (type: string) => {
    switch (type) {
      case 'meeting': return '모임';
      case 'community': return '커뮤니티';
      case 'groupbuy': return '공동구매';
      case 'hobby': return '취미활동';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return '#2563EB';
      case 'community': return '#059669';
      case 'groupbuy': return '#DC2626';
      case 'hobby': return '#7C3AED';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '완료';
      case 'upcoming': return '예정';
      case 'cancelled': return '취소';
      default: return status;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2563EB" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>활동내역</Text>
        <Text style={styles.headerSubtitle}>내 활동을 확인하세요</Text>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {sampleActivities.map((activity) => (
          <TouchableOpacity
            key={activity.id}
            style={styles.activityCard}
          >
            <View style={styles.activityHeader}>
              <View
                style={[
                  styles.typeBadge,
                  { backgroundColor: getTypeColor(activity.type) + '20' },
                ]}
              >
                <Text
                  style={[
                    styles.typeText,
                    { color: getTypeColor(activity.type) },
                  ]}
                >
                  {getTypeText(activity.type)}
                </Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  activity.status === 'upcoming'
                    ? styles.statusUpcoming
                    : activity.status === 'completed'
                    ? styles.statusCompleted
                    : styles.statusCancelled,
                ]}
              >
                <Text style={styles.statusText}>
                  {getStatusText(activity.status)}
                </Text>
              </View>
            </View>

            <Text style={styles.activityTitle}>{activity.title}</Text>
            <Text style={styles.activityDescription}>
              {activity.description}
            </Text>
            <Text style={styles.activityDate}>
              {activity.date.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#2563EB',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#DBEAFE',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusUpcoming: {
    backgroundColor: '#FEF3C7',
  },
  statusCompleted: {
    backgroundColor: '#D1FAE5',
  },
  statusCancelled: {
    backgroundColor: '#FEE2E2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  activityDate: {
    fontSize: 13,
    color: '#9CA3AF',
  },
});

