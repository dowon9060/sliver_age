import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, borderRadius, typography, shadows } from '../../styles/theme';

interface Activity {
  id: number;
  type: 'meeting' | 'community' | 'groupbuy' | 'hobby';
  title: string;
  description: string;
  date: Date;
  status: 'completed' | 'upcoming' | 'cancelled';
}

export default function ActivityScreen() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'meeting' | 'community' | 'groupbuy' | 'hobby'>('all');

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

  const filteredActivities = selectedFilter === 'all' 
    ? sampleActivities 
    : sampleActivities.filter(activity => activity.type === selectedFilter);

  const filters = [
    { key: 'all', label: '전체' },
    { key: 'meeting', label: '모임' },
    { key: 'community', label: '커뮤니티' },
    { key: 'groupbuy', label: '공동구매' },
    { key: 'hobby', label: '취미' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary.main} />

      <LinearGradient
        colors={colors.primary.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>활동내역</Text>
        <Text style={styles.headerSubtitle}>나의 건강한 활동을 확인하세요 💪</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{sampleActivities.length}</Text>
            <Text style={styles.statLabel}>총 활동</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {sampleActivities.filter(a => a.status === 'completed').length}
            </Text>
            <Text style={styles.statLabel}>완료</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {sampleActivities.filter(a => a.status === 'upcoming').length}
            </Text>
            <Text style={styles.statLabel}>예정</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.filterContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContent}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterChip,
                selectedFilter === filter.key && styles.filterChipActive,
              ]}
              onPress={() => setSelectedFilter(filter.key as any)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedFilter === filter.key && styles.filterChipTextActive,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {filteredActivities.map((activity, index) => (
          <View key={activity.id} style={styles.timelineItem}>
            {/* Timeline line */}
            <View style={styles.timelineLineContainer}>
              <View
                style={[
                  styles.timelineDot,
                  { backgroundColor: getTypeColor(activity.type) },
                ]}
              />
              {index < filteredActivities.length - 1 && (
                <View style={styles.timelineLine} />
              )}
            </View>

            {/* Activity card */}
            <TouchableOpacity style={styles.activityCard}>
              <View style={styles.activityHeader}>
                <View
                  style={[
                    styles.typeBadge,
                    { backgroundColor: getTypeColor(activity.type) + '15' },
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
                  <Text
                    style={[
                      styles.statusText,
                      activity.status === 'upcoming'
                        ? styles.statusUpcomingText
                        : activity.status === 'completed'
                        ? styles.statusCompletedText
                        : styles.statusCancelledText,
                    ]}
                  >
                    {getStatusText(activity.status)}
                  </Text>
                </View>
              </View>

              <Text style={styles.activityTitle}>{activity.title}</Text>
              <Text style={styles.activityDescription}>
                {activity.description}
              </Text>
              
              <View style={styles.activityFooter}>
                <Text style={styles.activityDate}>
                  📅 {activity.date.toLocaleDateString('ko-KR', {
                    month: 'long',
                    day: 'numeric',
                  })}
                </Text>
                <Text style={styles.activityTime}>
                  🕐 {activity.date.toLocaleTimeString('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  header: {
    paddingTop: 50,
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.xl,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: spacing.xl,
  },
  statsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  filterContainer: {
    backgroundColor: colors.white,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  filterContent: {
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
  },
  filterChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.gray[100],
    borderRadius: borderRadius.round,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  filterChipActive: {
    backgroundColor: colors.primary.main + '15',
    borderColor: colors.primary.main,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray[600],
  },
  filterChipTextActive: {
    color: colors.primary.main,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.xl,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  timelineLineContainer: {
    width: 40,
    alignItems: 'center',
    marginRight: spacing.md,
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: colors.white,
    ...shadows.sm,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: colors.gray[200],
    marginTop: spacing.sm,
  },
  activityCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.md,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  typeBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: borderRadius.sm,
  },
  typeText: {
    fontSize: 13,
    fontWeight: '700',
  },
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: borderRadius.sm,
  },
  statusUpcoming: {
    backgroundColor: colors.warning + '20',
  },
  statusCompleted: {
    backgroundColor: colors.success + '20',
  },
  statusCancelled: {
    backgroundColor: colors.danger + '20',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  statusUpcomingText: {
    color: colors.warning,
  },
  statusCompletedText: {
    color: colors.success,
  },
  statusCancelledText: {
    color: colors.danger,
  },
  activityTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.gray[900],
    marginBottom: 6,
  },
  activityDescription: {
    fontSize: 15,
    color: colors.gray[600],
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  activityFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.gray[100],
  },
  activityDate: {
    fontSize: 13,
    color: colors.gray[600],
    fontWeight: '600',
  },
  activityTime: {
    fontSize: 13,
    color: colors.gray[500],
    fontWeight: '600',
  },
});




