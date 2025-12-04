import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

interface MenuItem {
  id: string;
  title: string;
  subtitle: string;
  screen: string;
  icon: string;
  color: string;
}

export default function HomeScreen({ navigation }: any) {
  const menuItems: MenuItem[] = [
    {
      id: '1',
      title: '모임',
      subtitle: '내 주변 모임을 찾아보세요',
      screen: 'MeetingHome',
      icon: '👥',
      color: '#2563EB',
    },
    {
      id: '2',
      title: '커뮤니티',
      subtitle: '정보를 공유하고 소통해요',
      screen: 'Community',
      icon: '💬',
      color: '#059669',
    },
    {
      id: '3',
      title: '공동구매',
      subtitle: '함께 구매하면 더 저렴해요',
      screen: 'GroupBuy',
      icon: '🛒',
      color: '#DC2626',
    },
    {
      id: '4',
      title: '취미활동',
      subtitle: '새로운 취미를 시작해보세요',
      screen: 'Hobby',
      icon: '🎨',
      color: '#7C3AED',
    },
    {
      id: '5',
      title: '동네병원',
      subtitle: '내 주변 병원을 찾아보세요',
      screen: 'Hospital',
      icon: '🏥',
      color: '#0891B2',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2563EB" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>실버세대</Text>
        <Text style={styles.headerSubtitle}>함께 만드는 행복한 노후</Text>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ScrollView
          horizontal
          style={styles.menuContainer}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.menuContentContainer}
        >
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.screen)}
            >
              <View style={[styles.menuIcon, { backgroundColor: item.color }]}>
                <Text style={styles.menuIconText}>{item.icon}</Text>
              </View>
              <Text style={styles.menuTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>최근 활동</Text>
          <View style={styles.activityCard}>
            <Text style={styles.activityTitle}>아침 산책 모임 참여</Text>
            <Text style={styles.activityTime}>2시간 전</Text>
          </View>
          <View style={styles.activityCard}>
            <Text style={styles.activityTitle}>커뮤니티 게시글 작성</Text>
            <Text style={styles.activityTime}>1일 전</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>추천 모임</Text>
          <View style={styles.recommendCard}>
            <Text style={styles.recommendTitle}>수채화 그리기 교실</Text>
            <Text style={styles.recommendInfo}>종로 문화센터 • 9명 참여중</Text>
          </View>
          <View style={styles.recommendCard}>
            <Text style={styles.recommendTitle}>카페에서 책 읽기</Text>
            <Text style={styles.recommendInfo}>익선동 북카페 • 4명 참여중</Text>
          </View>
        </View>
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
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
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
  },
  menuContainer: {
    paddingVertical: 20,
  },
  menuContentContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },
  menuItem: {
    alignItems: 'center',
    marginRight: 8,
    width: 80,
  },
  menuIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuIconText: {
    fontSize: 32,
  },
  menuTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityTitle: {
    fontSize: 15,
    color: '#374151',
    fontWeight: '500',
  },
  activityTime: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  recommendCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
  },
  recommendTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  recommendInfo: {
    fontSize: 14,
    color: '#6B7280',
  },
});

