import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal,
  StatusBar,
} from 'react-native';

interface HobbyActivity {
  id: number;
  title: string;
  description: string;
  category: string;
  instructor: string;
  schedule: string;
  duration: string;
  maxParticipants: number;
  currentParticipants: number;
  fee: number;
  location: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  status: 'recruiting' | 'full';
}

export default function HobbyScreen() {
  const [selectedActivity, setSelectedActivity] = useState<HobbyActivity | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const sampleActivities: HobbyActivity[] = [
    {
      id: 1,
      title: '서예 교실 - 기초반',
      description: '붓글씨의 기초부터 차근차근 배웁니다. 초보자도 환영합니다.',
      category: '글쓰기',
      instructor: '김서예 선생님',
      schedule: '매주 화요일 오전 10:00',
      duration: '2시간',
      maxParticipants: 12,
      currentParticipants: 8,
      fee: 50000,
      location: '종로 문화센터 3층',
      level: 'beginner',
      status: 'recruiting',
    },
    {
      id: 2,
      title: '시니어 골프 레슨',
      description: '실버세대를 위한 맞춤 골프 레슨입니다. 스윙 자세부터 배웁니다.',
      category: '골프',
      instructor: '박프로 코치',
      schedule: '매주 목요일 오후 2:00',
      duration: '3시간',
      maxParticipants: 8,
      currentParticipants: 8,
      fee: 80000,
      location: '강남 골프 연습장',
      level: 'beginner',
      status: 'full',
    },
    {
      id: 3,
      title: '수필 쓰기 모임',
      description: '인생의 이야기를 글로 남겨보세요. 함께 쓰고 나누는 즐거움.',
      category: '글쓰기',
      instructor: '이작가 님',
      schedule: '매주 수요일 오후 3:00',
      duration: '2시간',
      maxParticipants: 15,
      currentParticipants: 11,
      fee: 40000,
      location: '서울시립도서관 세미나실',
      level: 'beginner',
      status: 'recruiting',
    },
    {
      id: 4,
      title: '수채화 그리기',
      description: '자연을 그리며 힐링하는 시간. 준비물은 제공됩니다.',
      category: '미술',
      instructor: '최화가 선생님',
      schedule: '매주 금요일 오전 10:00',
      duration: '3시간',
      maxParticipants: 10,
      currentParticipants: 7,
      fee: 60000,
      location: '인사동 아트센터',
      level: 'intermediate',
      status: 'recruiting',
    },
    {
      id: 5,
      title: '요가 교실',
      description: '몸과 마음의 균형을 찾는 시니어 요가 클래스입니다.',
      category: '운동',
      instructor: '정요가 강사',
      schedule: '매주 월, 수, 금 오전 8:00',
      duration: '1시간',
      maxParticipants: 20,
      currentParticipants: 15,
      fee: 70000,
      location: '명동 스포츠센터',
      level: 'beginner',
      status: 'recruiting',
    },
    {
      id: 6,
      title: '사진 촬영 입문',
      description: '스마트폰으로 멋진 사진 찍는 법을 배웁니다.',
      category: '사진',
      instructor: '강사진 작가',
      schedule: '매주 토요일 오후 2:00',
      duration: '2시간',
      maxParticipants: 12,
      currentParticipants: 9,
      fee: 45000,
      location: '홍대 사진 스튜디오',
      level: 'beginner',
      status: 'recruiting',
    },
  ];

  const handleActivityPress = (activity: HobbyActivity) => {
    setSelectedActivity(activity);
    setModalVisible(true);
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'beginner': return '초급';
      case 'intermediate': return '중급';
      case 'advanced': return '고급';
      default: return level;
    }
  };

  const renderActivity = ({ item }: { item: HobbyActivity }) => (
    <TouchableOpacity
      style={[
        styles.activityCard,
        item.status === 'full' && styles.activityCardFull,
      ]}
      onPress={() => handleActivityPress(item)}
    >
      <View style={styles.activityHeader}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        {item.status === 'full' && (
          <View style={styles.fullBadge}>
            <Text style={styles.fullText}>마감</Text>
          </View>
        )}
      </View>

      <Text style={styles.activityTitle}>{item.title}</Text>
      <Text style={styles.activityDescription} numberOfLines={2}>
        {item.description}
      </Text>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>강사</Text>
        <Text style={styles.infoValue}>{item.instructor}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>일정</Text>
        <Text style={styles.infoValue}>{item.schedule}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>장소</Text>
        <Text style={styles.infoValue} numberOfLines={1}>{item.location}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.participantsInfo}>
          <Text style={styles.participantsText}>
            {item.currentParticipants}/{item.maxParticipants}명
          </Text>
        </View>
        <Text style={styles.feeText}>
          월 {item.fee.toLocaleString()}원
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2563EB" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>취미활동</Text>
        <Text style={styles.headerSubtitle}>새로운 취미를 시작해보세요</Text>
      </View>

      <FlatList
        data={sampleActivities}
        renderItem={renderActivity}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      {/* 상세 정보 모달 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          />
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />

            {selectedActivity && (
              <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedActivity.title}</Text>
                  <View style={styles.levelBadge}>
                    <Text style={styles.levelText}>
                      {getLevelText(selectedActivity.level)}
                    </Text>
                  </View>
                </View>

                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{selectedActivity.category}</Text>
                </View>

                <Text style={styles.modalDescription}>
                  {selectedActivity.description}
                </Text>

                <View style={styles.divider} />

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>강사</Text>
                  <Text style={styles.detailValue}>{selectedActivity.instructor}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>일정</Text>
                  <Text style={styles.detailValue}>{selectedActivity.schedule}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>수업 시간</Text>
                  <Text style={styles.detailValue}>{selectedActivity.duration}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>장소</Text>
                  <Text style={styles.detailValue}>{selectedActivity.location}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>수강료</Text>
                  <Text style={styles.detailValue}>
                    월 {selectedActivity.fee.toLocaleString()}원
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>모집 인원</Text>
                  <Text style={styles.detailValue}>
                    {selectedActivity.currentParticipants}/{selectedActivity.maxParticipants}명
                  </Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.infoBox}>
                  <Text style={styles.infoTitle}>수강 안내</Text>
                  <Text style={styles.infoText}>
                    • 수강료는 월 단위로 결제됩니다{'\n'}
                    • 첫 수업 체험 후 환불 가능합니다{'\n'}
                    • 준비물은 첫 수업 때 안내됩니다{'\n'}
                    • 결석 시 보강 수업이 제공됩니다
                  </Text>
                </View>

                <TouchableOpacity
                  style={[
                    styles.joinButton,
                    selectedActivity.status === 'full' && styles.joinButtonDisabled,
                  ]}
                  disabled={selectedActivity.status === 'full'}
                >
                  <Text style={styles.joinButtonText}>
                    {selectedActivity.status === 'recruiting' ? '신청하기' : '마감되었습니다'}
                  </Text>
                </TouchableOpacity>

                <View style={styles.bottomPadding} />
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
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
  list: {
    padding: 16,
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  activityCardFull: {
    opacity: 0.6,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563EB',
  },
  fullBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  fullText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#DC2626',
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  activityDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#9CA3AF',
    width: 60,
  },
  infoValue: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  participantsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantsText: {
    fontSize: 14,
    color: '#6B7280',
  },
  feeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#D1D5DB',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    marginTop: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
    marginRight: 12,
  },
  levelBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#D97706',
  },
  modalDescription: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    marginTop: 12,
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
  infoBox: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
  },
  joinButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  joinButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  joinButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  bottomPadding: {
    height: 20,
  },
});




