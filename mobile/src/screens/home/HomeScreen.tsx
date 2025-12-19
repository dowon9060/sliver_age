import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, borderRadius, typography, shadows } from '../../styles/theme';

const { width } = Dimensions.get('window');

interface MenuItem {
  id: string;
  title: string;
  subtitle: string;
  screen: string;
  icon: string;
  color: string;
}

export default function HomeScreen({ navigation }: any) {
  const [selectedMenu, setSelectedMenu] = useState('1');

  const menuItems: MenuItem[] = [
    {
      id: '1',
      title: '모임',
      subtitle: '내 주변 모임을 찾아보세요',
      screen: 'MeetingHome',
      icon: '모임',
      color: '#2563EB',
    },
    {
      id: '2',
      title: '커뮤니티',
      subtitle: '정보를 공유하고 소통해요',
      screen: 'Community',
      icon: '커뮤',
      color: '#059669',
    },
    {
      id: '3',
      title: '공동구매',
      subtitle: '함께 구매하면 더 저렴해요',
      screen: 'GroupBuy',
      icon: '구매',
      color: '#DC2626',
    },
    {
      id: '4',
      title: '취미활동',
      subtitle: '새로운 취미를 시작해보세요',
      screen: 'Hobby',
      icon: '취미',
      color: '#7C3AED',
    },
    {
      id: '5',
      title: '동네병원',
      subtitle: '내 주변 병원을 찾아보세요',
      screen: 'Hospital',
      icon: '병원',
      color: '#0891B2',
    },
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
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>안녕하세요 👋</Text>
            <Text style={styles.nickname}>김건강님</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Text style={styles.notificationIcon}>🔔</Text>
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        <View style={styles.healthScoreCard}>
          <View style={styles.healthScoreContent}>
            <Text style={styles.healthScoreLabel}>건강활동 점수</Text>
            <View style={styles.healthScoreRow}>
              <Text style={styles.healthScoreValue}>95</Text>
              <Text style={styles.healthScoreMax}>/100</Text>
            </View>
            <Text style={styles.healthScoreSubtext}>이번 주 최고 기록이에요! 🎉</Text>
          </View>
          <View style={styles.healthScoreCircle}>
            <Text style={styles.healthScorePercentage}>95%</Text>
          </View>
        </View>

        <View style={styles.quickStats}>
          <View style={styles.quickStatItem}>
            <Text style={styles.quickStatValue}>12</Text>
            <Text style={styles.quickStatLabel}>참여 모임</Text>
          </View>
          <View style={styles.quickStatDivider} />
          <View style={styles.quickStatItem}>
            <Text style={styles.quickStatValue}>8</Text>
            <Text style={styles.quickStatLabel}>활동일</Text>
          </View>
          <View style={styles.quickStatDivider} />
          <View style={styles.quickStatItem}>
            <Text style={styles.quickStatValue}>2.4km</Text>
            <Text style={styles.quickStatLabel}>이동거리</Text>
          </View>
        </View>
      </LinearGradient>

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
              style={[
                styles.menuCard,
                selectedMenu === item.id && styles.menuCardActive,
              ]}
              onPress={() => setSelectedMenu(item.id)}
            >
              <Text
                style={[
                  styles.menuCardText,
                  selectedMenu === item.id && styles.menuCardTextActive,
                ]}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {selectedMenu === '1' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>추천 모임</Text>
              <TouchableOpacity 
                style={styles.registerButton}
                onPress={() => {/* 모임 등록 화면으로 이동 */}}
              >
                <Text style={styles.registerButtonText}>+ 등록하기</Text>
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
                    <Text style={styles.imagePlaceholderText}>취미</Text>
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
                    <Text style={styles.imagePlaceholderText}>독서</Text>
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
                    <Text style={styles.imagePlaceholderText}>운동</Text>
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
        )}

        {selectedMenu === '2' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>인기 게시글</Text>
              <TouchableOpacity 
                style={styles.registerButton}
                onPress={() => {/* 게시글 작성 화면으로 이동 */}}
              >
                <Text style={styles.registerButtonText}>+ 등록하기</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.communityCard}>
              <Text style={styles.communityTitle}>남산 산책 후기</Text>
              <Text style={styles.communityContent}>오늘 남산에서 산책했는데 날씨가 정말 좋았어요...</Text>
              <View style={styles.communityFooter}>
                <Text style={styles.communityAuthor}>김건강</Text>
                <View style={styles.communityStats}>
                  <Text style={styles.communityStat}>♥ 24</Text>
                  <Text style={styles.communityStat}>댓글 12</Text>
                </View>
              </View>
            </View>
            <View style={styles.communityCard}>
              <Text style={styles.communityTitle}>건강한 식단 정보</Text>
              <Text style={styles.communityContent}>시니어를 위한 건강식단 레시피를 공유합니다...</Text>
              <View style={styles.communityFooter}>
                <Text style={styles.communityAuthor}>박영희</Text>
                <View style={styles.communityStats}>
                  <Text style={styles.communityStat}>♥ 18</Text>
                  <Text style={styles.communityStat}>댓글 8</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {selectedMenu === '3' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>인기 공동구매</Text>
              <TouchableOpacity onPress={() => navigation.navigate('GroupBuy')}>
                <Text style={styles.seeAll}>전체보기</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.dealCard}>
              <View style={styles.dealImageContainer}>
                <View style={styles.dealImagePlaceholder}>
                  <Text style={styles.dealImageText}>사과</Text>
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
                  <Text style={styles.dealImageText}>채소</Text>
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
        )}

        {selectedMenu === '4' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>인기 취미활동</Text>
              <TouchableOpacity 
                style={styles.registerButton}
                onPress={() => {/* 취미활동 등록 화면으로 이동 */}}
              >
                <Text style={styles.registerButtonText}>+ 등록하기</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.hobbyCard}>
              <Text style={styles.hobbyTitle}>서예 교실</Text>
              <Text style={styles.hobbyInfo}>매주 화요일 • 종로문화센터</Text>
              <Text style={styles.hobbyPrice}>월 80,000원</Text>
              <Text style={styles.hobbyLevel}>난이도: 초급</Text>
            </View>
            <View style={styles.hobbyCard}>
              <Text style={styles.hobbyTitle}>골프 레슨</Text>
              <Text style={styles.hobbyInfo}>매주 목요일 • 강남골프장</Text>
              <Text style={styles.hobbyPrice}>월 120,000원</Text>
              <Text style={styles.hobbyLevel}>난이도: 중급</Text>
            </View>
          </View>
        )}

        {selectedMenu === '5' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>내 주변 병원</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Hospital')}>
                <Text style={styles.seeAll}>전체보기</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.hospitalCard}>
              <Text style={styles.hospitalName}>서울내과의원</Text>
              <Text style={styles.hospitalAddress}>서울시 종로구 • 0.3km</Text>
              <Text style={styles.hospitalTime}>평일 09:00 - 18:00</Text>
              <View style={styles.hospitalActions}>
                <TouchableOpacity style={styles.hospitalButton}>
                  <Text style={styles.hospitalButtonText}>예약하기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.hospitalButton, styles.hospitalButtonSecondary]}>
                  <Text style={styles.hospitalButtonTextSecondary}>픽업요청</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.hospitalCard}>
              <Text style={styles.hospitalName}>강남정형외과</Text>
              <Text style={styles.hospitalAddress}>서울시 종로구 • 0.7km</Text>
              <Text style={styles.hospitalTime}>평일 09:00 - 19:00</Text>
              <View style={styles.hospitalActions}>
                <TouchableOpacity style={styles.hospitalButton}>
                  <Text style={styles.hospitalButtonText}>예약하기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.hospitalButton, styles.hospitalButtonSecondary]}>
                  <Text style={styles.hospitalButtonTextSecondary}>픽업요청</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
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
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.xl,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
  },
  nickname: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.white,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationIcon: {
    fontSize: 20,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.danger,
  },
  healthScoreCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  healthScoreContent: {
    flex: 1,
  },
  healthScoreLabel: {
    fontSize: 13,
    color: colors.gray[600],
    marginBottom: 4,
  },
  healthScoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  healthScoreValue: {
    fontSize: 40,
    fontWeight: '800',
    color: colors.primary.main,
  },
  healthScoreMax: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.gray[400],
    marginLeft: 4,
  },
  healthScoreSubtext: {
    fontSize: 12,
    color: colors.gray[600],
  },
  healthScoreCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 6,
    borderColor: colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  healthScorePercentage: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary.main,
  },
  quickStats: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  quickStatItem: {
    alignItems: 'center',
    flex: 1,
  },
  quickStatValue: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 2,
  },
  quickStatLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  quickStatDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  content: {
    flex: 1,
  },
  menuContainer: {
    paddingVertical: spacing.xl,
    backgroundColor: colors.white,
  },
  menuContentContainer: {
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
  },
  menuCard: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    backgroundColor: colors.gray[100],
    borderRadius: borderRadius.xl,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  menuCardActive: {
    backgroundColor: colors.primary.main,
    borderColor: colors.primary.main,
    ...shadows.md,
  },
  menuCardText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.gray[700],
  },
  menuCardTextActive: {
    color: colors.white,
  },
  section: {
    marginTop: spacing.xxxl,
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.gray[900],
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary.main,
  },
  registerButton: {
    backgroundColor: colors.primary.main,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.round,
    ...shadows.sm,
  },
  registerButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
  },
  recommendContainer: {
    paddingHorizontal: spacing.xl,
    gap: spacing.lg,
  },
  recommendCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xxl,
    width: width * 0.75,
    overflow: 'hidden',
    ...shadows.lg,
  },
  cardImage: {
    width: '100%',
    height: 180,
    position: 'relative',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.gray[400],
  },
  categoryBadge: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: borderRadius.round,
    ...shadows.sm,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.gray[900],
  },
  cardContent: {
    padding: spacing.lg,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.gray[900],
    marginBottom: 6,
  },
  cardLocation: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: spacing.md,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardParticipants: {
    fontSize: 13,
    color: colors.primary.main,
    fontWeight: '700',
  },
  cardDistance: {
    fontSize: 13,
    color: colors.gray[500],
    fontWeight: '600',
  },
  dealCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    marginHorizontal: spacing.xl,
    marginBottom: spacing.md,
    overflow: 'hidden',
    flexDirection: 'row',
    ...shadows.md,
  },
  dealImageContainer: {
    width: 120,
    height: 140,
    position: 'relative',
  },
  dealImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  dealImageText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.gray[400],
  },
  dealBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.danger,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  dealBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.white,
  },
  dealContent: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'space-between',
  },
  dealTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.gray[900],
    marginBottom: spacing.sm,
  },
  dealPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: spacing.md,
  },
  dealDiscount: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.danger,
  },
  dealPrice: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.gray[900],
  },
  dealOriginal: {
    fontSize: 13,
    color: colors.gray[400],
    textDecorationLine: 'line-through',
  },
  dealProgress: {
    height: 8,
    backgroundColor: colors.gray[100],
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  dealProgressBar: {
    height: '100%',
    backgroundColor: colors.danger,
    borderRadius: 4,
  },
  dealFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dealParticipants: {
    fontSize: 13,
    color: colors.gray[700],
    fontWeight: '700',
  },
  dealTime: {
    fontSize: 13,
    color: colors.danger,
    fontWeight: '700',
  },
  communityCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    marginHorizontal: spacing.xl,
    marginBottom: spacing.md,
    ...shadows.md,
  },
  communityTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.gray[900],
    marginBottom: spacing.sm,
  },
  communityContent: {
    fontSize: 15,
    color: colors.gray[600],
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  communityFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  communityAuthor: {
    fontSize: 14,
    color: colors.gray[700],
    fontWeight: '600',
  },
  communityStats: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  communityStat: {
    fontSize: 14,
    color: colors.gray[500],
    fontWeight: '600',
  },
  hobbyCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    marginHorizontal: spacing.xl,
    marginBottom: spacing.md,
    ...shadows.md,
  },
  hobbyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.gray[900],
    marginBottom: spacing.sm,
  },
  hobbyInfo: {
    fontSize: 15,
    color: colors.gray[600],
    marginBottom: spacing.sm,
  },
  hobbyPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary.main,
    marginBottom: 4,
  },
  hobbyLevel: {
    fontSize: 13,
    color: colors.gray[500],
  },
  hospitalCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    marginHorizontal: spacing.xl,
    marginBottom: spacing.md,
    ...shadows.md,
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.gray[900],
    marginBottom: 6,
  },
  hospitalAddress: {
    fontSize: 15,
    color: colors.gray[600],
    marginBottom: 4,
  },
  hospitalTime: {
    fontSize: 14,
    color: colors.gray[500],
    marginBottom: spacing.lg,
  },
  hospitalActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  hospitalButton: {
    flex: 1,
    backgroundColor: colors.primary.main,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    ...shadows.sm,
  },
  hospitalButtonSecondary: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.gray[300],
  },
  hospitalButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.white,
  },
  hospitalButtonTextSecondary: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.gray[700],
  },
});

