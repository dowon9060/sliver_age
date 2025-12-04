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
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.profileInfo}>
            <Text style={styles.nickname}>김건강님</Text>
            <View style={styles.statsRow}>
              <View style={styles.statBadge}>
                <Text style={styles.statLabel}>Lv.12</Text>
              </View>
              <View style={styles.statBadge}>
                <Text style={styles.heartIcon}>❤️</Text>
                <Text style={styles.statLabel}>95%</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.profileAvatar}>
            <Text style={styles.avatarText}>김</Text>
          </TouchableOpacity>
        </View>
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
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>추천 모임</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>전체보기</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recommendContainer}
          >
            <TouchableOpacity style={styles.recommendCard}>
              <View style={styles.cardImage}>
                <View style={styles.imagePlaceholder}>
                  <Text style={styles.imagePlaceholderText}>🎨</Text>
                </View>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>취미</Text>
                </View>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>수채화 그리기 교실</Text>
                <Text style={styles.cardLocation}>종로 문화센터</Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.cardParticipants}>9명 참여중</Text>
                  <Text style={styles.cardDistance}>0.8km</Text>
                </View>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.recommendCard}>
              <View style={styles.cardImage}>
                <View style={styles.imagePlaceholder}>
                  <Text style={styles.imagePlaceholderText}>📚</Text>
                </View>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>독서</Text>
                </View>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>카페에서 책 읽기</Text>
                <Text style={styles.cardLocation}>익선동 북카페</Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.cardParticipants}>4명 참여중</Text>
                  <Text style={styles.cardDistance}>1.2km</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.recommendCard}>
              <View style={styles.cardImage}>
                <View style={styles.imagePlaceholder}>
                  <Text style={styles.imagePlaceholderText}>🧘</Text>
                </View>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>운동</Text>
                </View>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>아침 요가 클래스</Text>
                <Text style={styles.cardLocation}>남산 공원</Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.cardParticipants}>7명 참여중</Text>
                  <Text style={styles.cardDistance}>0.5km</Text>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>인기 공동구매</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>전체보기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dealCard}>
            <View style={styles.dealImageContainer}>
              <View style={styles.dealImagePlaceholder}>
                <Text style={styles.dealImageText}>🍎</Text>
              </View>
              <View style={styles.dealBadge}>
                <Text style={styles.dealBadgeText}>마감임박</Text>
              </View>
            </View>
            <View style={styles.dealContent}>
              <Text style={styles.dealTitle}>국내산 사과 5kg</Text>
              <View style={styles.dealPriceRow}>
                <Text style={styles.dealDiscount}>45%</Text>
                <Text style={styles.dealPrice}>15,900원</Text>
                <Text style={styles.dealOriginal}>29,000원</Text>
              </View>
              <View style={styles.dealProgress}>
                <View style={[styles.dealProgressBar, { width: '75%' }]} />
              </View>
              <View style={styles.dealFooter}>
                <Text style={styles.dealParticipants}>15/20명 참여</Text>
                <Text style={styles.dealTime}>2시간 남음</Text>
              </View>
            </View>
          </View>

          <View style={styles.dealCard}>
            <View style={styles.dealImageContainer}>
              <View style={styles.dealImagePlaceholder}>
                <Text style={styles.dealImageText}>🥬</Text>
              </View>
              <View style={styles.dealBadge}>
                <Text style={styles.dealBadgeText}>HOT</Text>
              </View>
            </View>
            <View style={styles.dealContent}>
              <Text style={styles.dealTitle}>유기농 채소 박스</Text>
              <View style={styles.dealPriceRow}>
                <Text style={styles.dealDiscount}>30%</Text>
                <Text style={styles.dealPrice}>24,500원</Text>
                <Text style={styles.dealOriginal}>35,000원</Text>
              </View>
              <View style={styles.dealProgress}>
                <View style={[styles.dealProgressBar, { width: '55%' }]} />
              </View>
              <View style={styles.dealFooter}>
                <Text style={styles.dealParticipants}>11/20명 참여</Text>
                <Text style={styles.dealTime}>5시간 남음</Text>
              </View>
            </View>
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
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  profileSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  nickname: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 6,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  heartIcon: {
    fontSize: 12,
  },
  profileAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  menuContainer: {
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuContentContainer: {
    paddingHorizontal: 20,
    gap: 20,
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
    marginTop: 32,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563EB',
  },
  recommendContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  recommendCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: 280,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  cardImage: {
    width: '100%',
    height: 180,
    position: 'relative',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    fontSize: 64,
  },
  categoryBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  cardLocation: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardParticipants: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '600',
  },
  cardDistance: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  dealCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  dealImageContainer: {
    width: 120,
    height: 120,
    position: 'relative',
  },
  dealImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dealImageText: {
    fontSize: 48,
  },
  dealBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#DC2626',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  dealBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  dealContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  dealTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  dealPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  dealDiscount: {
    fontSize: 16,
    fontWeight: '800',
    color: '#DC2626',
  },
  dealPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  dealOriginal: {
    fontSize: 13,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  dealProgress: {
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  dealProgressBar: {
    height: '100%',
    backgroundColor: '#DC2626',
    borderRadius: 3,
  },
  dealFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dealParticipants: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '600',
  },
  dealTime: {
    fontSize: 12,
    color: '#DC2626',
    fontWeight: '600',
  },
});

