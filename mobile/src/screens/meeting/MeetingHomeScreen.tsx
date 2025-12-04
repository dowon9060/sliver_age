import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StatusBar,
} from 'react-native';
import * as Location from 'expo-location';
import apiClient from '../../api/client';
import { Meeting } from '../../types';

const { width } = Dimensions.get('window');

interface CategoryItem {
  id: string;
  icon: string;
  label: string;
  onPress: () => void;
}

export default function MeetingHomeScreen({ navigation }: any) {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLocationAndFetchMeetings();
  }, []);

  const getLocationAndFetchMeetings = async () => {
    try {
      // 위치 권한 요청
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('위치 권한이 거부되었습니다');
        // 권한이 없어도 서울 기준으로 샘플 데이터 표시
        await fetchNearbyMeetings(37.5665, 126.978);
        setLoading(false);
        return;
      }

      // 현재 위치 가져오기
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      // 반경 1.5km 내 모임 가져오기
      await fetchNearbyMeetings(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude
      );
    } catch (error) {
      console.error('위치 또는 모임 가져오기 실패:', error);
      // 에러 발생 시에도 서울 기준으로 샘플 데이터 표시
      await fetchNearbyMeetings(37.5665, 126.978);
    } finally {
      setLoading(false);
    }
  };

  const fetchNearbyMeetings = async (latitude: number, longitude: number) => {
    try {
      // 샘플 데이터 (개발용)
      const sampleMeetings: Meeting[] = [
        {
          id: 1,
          title: '아침 산책 모임',
          description: '남산에서 함께 가볍게 산책하며 건강한 하루를 시작해요!',
          location: {
            id: 1,
            name: '남산 팔각정',
            address: '서울시 중구 남산공원길 105',
            latitude: latitude + 0.005,
            longitude: longitude + 0.003,
            type: 'other' as const,
            isAffiliated: false,
          },
          hostId: 1,
          dateTime: new Date('2024-12-06T07:00:00'),
          maxParticipants: 10,
          currentParticipants: 6,
          participationFee: 0,
          status: 'open' as const,
        },
        {
          id: 2,
          title: '수채화 그리기 교실',
          description: '경복궁 풍경을 수채화로 그려보는 즐거운 시간',
          location: {
            id: 2,
            name: '종로 문화센터',
            address: '서울시 종로구 삼청로 30',
            latitude: latitude + 0.008,
            longitude: longitude - 0.005,
            type: 'other' as const,
            isAffiliated: true,
          },
          hostId: 2,
          dateTime: new Date('2024-12-05T14:00:00'),
          maxParticipants: 12,
          currentParticipants: 9,
          participationFee: 15000,
          status: 'open' as const,
        },
        {
          id: 3,
          title: '점심 맛집 탐방',
          description: '북촌 한옥마을 근처 맛집을 함께 찾아가요',
          location: {
            id: 3,
            name: '북촌한옥마을',
            address: '서울시 종로구 계동길 37',
            latitude: latitude + 0.010,
            longitude: longitude + 0.002,
            type: 'restaurant' as const,
            isAffiliated: false,
          },
          hostId: 3,
          dateTime: new Date('2024-12-05T12:00:00'),
          maxParticipants: 8,
          currentParticipants: 8,
          participationFee: 20000,
          status: 'closed' as const,
        },
        {
          id: 4,
          title: '카페에서 책 읽기',
          description: '조용한 카페에서 좋아하는 책을 읽으며 여유로운 오후를',
          location: {
            id: 4,
            name: '익선동 북카페',
            address: '서울시 종로구 익선동 166-5',
            latitude: latitude - 0.003,
            longitude: longitude + 0.008,
            type: 'cafe' as const,
            isAffiliated: true,
          },
          hostId: 4,
          dateTime: new Date('2024-12-05T15:00:00'),
          maxParticipants: 6,
          currentParticipants: 4,
          participationFee: 8000,
          status: 'open' as const,
        },
        {
          id: 5,
          title: '노래교실',
          description: '옛날 가요부터 최신곡까지! 함께 노래 부르며 즐거운 시간',
          location: {
            id: 5,
            name: '서울 노인종합복지관',
            address: '서울시 중구 퇴계로 210',
            latitude: latitude - 0.005,
            longitude: longitude - 0.004,
            type: 'senior_center' as const,
            isAffiliated: true,
          },
          hostId: 5,
          dateTime: new Date('2024-12-06T10:00:00'),
          maxParticipants: 20,
          currentParticipants: 15,
          participationFee: 0,
          status: 'open' as const,
        },
        {
          id: 6,
          title: '탁구 동호회',
          description: '매주 목요일 탁구 치며 건강 챙기고 친구도 만들어요',
          location: {
            id: 6,
            name: '명동 체육센터',
            address: '서울시 중구 명동길 74',
            latitude: latitude + 0.002,
            longitude: longitude - 0.006,
            type: 'other' as const,
            isAffiliated: false,
          },
          hostId: 6,
          dateTime: new Date('2024-12-05T16:00:00'),
          maxParticipants: 8,
          currentParticipants: 6,
          participationFee: 5000,
          status: 'open' as const,
        },
        {
          id: 7,
          title: '한강 자전거 라이딩',
          description: '여의도 한강공원에서 시작하는 자전거 라이딩',
          location: {
            id: 7,
            name: '여의도 한강공원',
            address: '서울시 영등포구 여의동로 330',
            latitude: latitude - 0.012,
            longitude: longitude + 0.010,
            type: 'other' as const,
            isAffiliated: false,
          },
          hostId: 7,
          dateTime: new Date('2024-12-06T09:00:00'),
          maxParticipants: 10,
          currentParticipants: 7,
          participationFee: 10000,
          status: 'open' as const,
        },
        {
          id: 8,
          title: '전통차 시음회',
          description: '인사동에서 다양한 전통차를 마시며 문화 체험',
          location: {
            id: 8,
            name: '인사동 찻집',
            address: '서울시 종로구 인사동길 12',
            latitude: latitude + 0.006,
            longitude: longitude + 0.001,
            type: 'cafe' as const,
            isAffiliated: true,
          },
          hostId: 8,
          dateTime: new Date('2024-12-05T13:00:00'),
          maxParticipants: 8,
          currentParticipants: 5,
          participationFee: 12000,
          status: 'open' as const,
        },
      ];
      
      setMeetings(sampleMeetings);
      
      // 실제 API 호출 (주석 처리)
      // const response = await apiClient.get('/meetings', {
      //   params: {
      //     latitude,
      //     longitude,
      //     radius: 1.5, // 1.5km
      //   },
      // });
      // setMeetings(response.data);
    } catch (error) {
      console.error('모임 목록 가져오기 실패:', error);
    }
  };

  const categories: CategoryItem[] = [
    {
      id: '1',
      icon: '운동',
      label: '운동',
      onPress: () => console.log('운동'),
    },
    {
      id: '2',
      icon: '문화',
      label: '문화',
      onPress: () => console.log('문화'),
    },
    {
      id: '3',
      icon: '식사',
      label: '식사',
      onPress: () => console.log('식사'),
    },
    {
      id: '4',
      icon: '카페',
      label: '카페',
      onPress: () => console.log('카페'),
    },
    {
      id: '5',
      icon: '노래',
      label: '노래',
      onPress: () => console.log('노래'),
    },
    {
      id: '6',
      icon: '취미',
      label: '취미',
      onPress: () => console.log('취미'),
    },
    {
      id: '7',
      icon: '산책',
      label: '산책',
      onPress: () => console.log('산책'),
    },
    {
      id: '8',
      icon: '독서',
      label: '독서',
      onPress: () => console.log('독서'),
    },
  ];

  const renderCategory = ({ item }: { item: CategoryItem }) => (
    <TouchableOpacity style={styles.categoryItem} onPress={item.onPress}>
      <View style={styles.categoryIconContainer}>
        <Text style={styles.categoryIcon}>{item.icon}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderMeeting = ({ item }: { item: Meeting }) => (
    <TouchableOpacity
      style={styles.meetingCard}
      onPress={() => navigation.navigate('MeetingDetail', { id: item.id })}
    >
      <View style={styles.meetingHeader}>
        <Text style={styles.meetingTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <View
          style={[
            styles.statusBadge,
            item.status === 'open' ? styles.statusOpen : styles.statusClosed,
          ]}
        >
          <Text style={styles.statusText}>
            {item.status === 'open' ? '모집중' : '마감'}
          </Text>
        </View>
      </View>

      <Text style={styles.meetingDescription} numberOfLines={2}>
        {item.description}
      </Text>

      <View style={styles.meetingInfo}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>장소</Text>
          <Text style={styles.infoText} numberOfLines={1}>
            {item.location?.name || '위치 미정'}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>인원</Text>
          <Text style={styles.infoText}>
            {item.currentParticipants}/{item.maxParticipants}명
          </Text>
        </View>
      </View>

      <View style={styles.meetingFooter}>
        <Text style={styles.feeText}>
          {item.participationFee === 0
            ? '무료'
            : `${item.participationFee.toLocaleString()}원`}
        </Text>
        <Text style={styles.distanceText}>500m</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2563EB" />
      
      {/* 헤더 */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>실버세대</Text>
          <Text style={styles.headerSubtitle}>
            {location ? '내 주변 1.5km' : '위치 확인중...'}
          </Text>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterIcon}>설정</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 카테고리 메뉴 */}
        <View style={styles.categoriesSection}>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* 지도 보기 버튼 */}
        <TouchableOpacity
          style={styles.mapViewButton}
          onPress={() => navigation.navigate('MeetingMap', { meetings, location })}
        >
          <Text style={styles.mapViewText}>지도로 보기</Text>
          <Text style={styles.mapViewArrow}>→</Text>
        </TouchableOpacity>

        {/* 근처 모임 섹션 */}
        <View style={styles.meetingsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>근처 모임</Text>
            <Text style={styles.sectionCount}>
              {meetings.length}개의 모임
            </Text>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>모임을 불러오는 중...</Text>
            </View>
          ) : meetings.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>근처에 모임이 없습니다</Text>
              <Text style={styles.emptySubtext}>
                첫 번째 모임을 만들어보세요!
              </Text>
            </View>
          ) : (
            <FlatList
              data={meetings}
              renderItem={renderMeeting}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              contentContainerStyle={styles.meetingsList}
            />
          )}
        </View>
      </ScrollView>

      {/* 플로팅 버튼 */}
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
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#2563EB',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterIcon: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  categoriesSection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  categoriesList: {
    paddingHorizontal: 12,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 70,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2563EB',
  },
  mapViewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2563EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  mapViewText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563EB',
  },
  mapViewArrow: {
    fontSize: 18,
    color: '#2563EB',
    fontWeight: 'bold',
  },
  meetingsSection: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  sectionCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  meetingsList: {
    gap: 16,
  },
  meetingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 12,
  },
  meetingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  meetingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusOpen: {
    backgroundColor: '#D1FAE5',
  },
  statusClosed: {
    backgroundColor: '#FEE2E2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
  meetingDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  meetingInfo: {
    gap: 8,
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  infoText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  meetingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  feeText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2563EB',
  },
  distanceText: {
    fontSize: 14,
    color: '#6B7280',
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabText: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

