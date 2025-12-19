import React from 'react';
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

export default function ProfileScreen() {
  const badges = [
    { id: 1, icon: '🏃', name: '활동왕', description: '10회 이상 모임 참여', earned: true },
    { id: 2, icon: '✍️', name: '작가', description: '5개 이상 글 작성', earned: true },
    { id: 3, icon: '🤝', name: '친구왕', description: '20명 이상 친구', earned: true },
    { id: 4, icon: '⭐', name: '인기인', description: '좋아요 50개 받기', earned: false },
    { id: 5, icon: '💪', name: '건강지킴이', description: '30일 연속 활동', earned: false },
    { id: 6, icon: '🎯', name: '목표달성', description: '월간 목표 달성', earned: false },
  ];

  const currentLevel = 7;
  const currentExp = 650;
  const nextLevelExp = 1000;
  const expProgress = (currentExp / nextLevelExp) * 100;

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
          <Text style={styles.headerTitle}>내 프로필</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={['#FFD700', '#FFA500']}
              style={styles.avatar}
            >
              <Text style={styles.avatarText}>김</Text>
            </LinearGradient>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>Lv.{currentLevel}</Text>
            </View>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.nickname}>김건강</Text>
            <Text style={styles.ageGroup}>60대 • 서울 종로구</Text>
            <View style={styles.expBar}>
              <View style={styles.expBarBackground}>
                <View style={[styles.expBarFill, { width: `${expProgress}%` }]} />
              </View>
              <Text style={styles.expText}>{currentExp}/{nextLevelExp} EXP</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>참여 모임</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>95</Text>
            <Text style={styles.statLabel}>매너점수</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>작성 글</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🏆 획득한 배지</Text>
            <Text style={styles.badgeCount}>
              {badges.filter(b => b.earned).length}/{badges.length}
            </Text>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.badgesContainer}
          >
            {badges.map((badge) => (
              <View
                key={badge.id}
                style={[
                  styles.badgeCard,
                  !badge.earned && styles.badgeCardLocked,
                ]}
              >
                <Text style={[
                  styles.badgeIcon,
                  !badge.earned && styles.badgeIconLocked,
                ]}>
                  {badge.icon}
                </Text>
                <Text style={[
                  styles.badgeName,
                  !badge.earned && styles.badgeTextLocked,
                ]}>
                  {badge.name}
                </Text>
                <Text style={[
                  styles.badgeDescription,
                  !badge.earned && styles.badgeTextLocked,
                ]}>
                  {badge.description}
                </Text>
                {badge.earned && (
                  <View style={styles.earnedBadge}>
                    <Text style={styles.earnedText}>✓</Text>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>내 활동</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>참여한 모임</Text>
            <Text style={styles.menuItemArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>작성한 글</Text>
            <Text style={styles.menuItemArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>좋아요 한 글</Text>
            <Text style={styles.menuItemArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>구매 내역</Text>
            <Text style={styles.menuItemArrow}>→</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>계정 관리</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>프로필 수정</Text>
            <Text style={styles.menuItemArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>비밀번호 변경</Text>
            <Text style={styles.menuItemArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>알림 설정</Text>
            <Text style={styles.menuItemArrow}>→</Text>
          </TouchableOpacity>
        </View>
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.white,
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    fontSize: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: spacing.lg,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: colors.white,
    ...shadows.lg,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.white,
  },
  levelBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.round,
    borderWidth: 2,
    borderColor: colors.primary.main,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary.main,
  },
  profileInfo: {
    flex: 1,
  },
  nickname: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 4,
  },
  ageGroup: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: spacing.md,
  },
  expBar: {
    marginTop: spacing.sm,
  },
  expBarBackground: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  expBarFill: {
    height: '100%',
    backgroundColor: colors.white,
    borderRadius: 4,
  },
  expText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
    marginTop: spacing.xl,
    marginBottom: spacing.xxl,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    ...shadows.md,
  },
  statValue: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.primary.main,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: colors.gray[600],
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.gray[900],
  },
  badgeCount: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary.main,
  },
  badgesContainer: {
    paddingRight: spacing.xl,
    gap: spacing.md,
  },
  badgeCard: {
    width: 140,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    position: 'relative',
    ...shadows.md,
  },
  badgeCardLocked: {
    backgroundColor: colors.gray[100],
    opacity: 0.6,
  },
  badgeIcon: {
    fontSize: 48,
    marginBottom: spacing.sm,
  },
  badgeIconLocked: {
    opacity: 0.3,
  },
  badgeName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.gray[900],
    marginBottom: 4,
    textAlign: 'center',
  },
  badgeDescription: {
    fontSize: 11,
    color: colors.gray[600],
    textAlign: 'center',
    lineHeight: 16,
  },
  badgeTextLocked: {
    color: colors.gray[400],
  },
  earnedBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  earnedText: {
    fontSize: 14,
    color: colors.white,
    fontWeight: '700',
  },
  menuItem: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...shadows.sm,
  },
  menuItemText: {
    fontSize: 16,
    color: colors.gray[700],
    fontWeight: '600',
  },
  menuItemArrow: {
    fontSize: 18,
    color: colors.gray[400],
  },
});




