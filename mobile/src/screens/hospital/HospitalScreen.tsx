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

interface Hospital {
  id: number;
  name: string;
  category: string;
  address: string;
  phone: string;
  distance: number;
  openTime: string;
  closeTime: string;
  isOpen: boolean;
  services: string[];
  rating: number;
}

export default function HospitalScreen() {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [requestType, setRequestType] = useState<'reservation' | 'pickup' | null>(null);

  const sampleHospitals: Hospital[] = [
    {
      id: 1,
      name: '서울내과의원',
      category: '내과',
      address: '서울시 종로구 종로 123',
      phone: '02-1234-5678',
      distance: 0.3,
      openTime: '09:00',
      closeTime: '18:00',
      isOpen: true,
      services: ['일반진료', '건강검진', '예방접종', '만성질환관리'],
      rating: 4.5,
    },
    {
      id: 2,
      name: '행복정형외과',
      category: '정형외과',
      address: '서울시 종로구 종로 456',
      phone: '02-2345-6789',
      distance: 0.5,
      openTime: '08:30',
      closeTime: '19:00',
      isOpen: true,
      services: ['관절치료', '척추치료', '물리치료', '도수치료'],
      rating: 4.8,
    },
    {
      id: 3,
      name: '밝은안과',
      category: '안과',
      address: '서울시 종로구 종로 789',
      phone: '02-3456-7890',
      distance: 0.7,
      openTime: '09:00',
      closeTime: '17:30',
      isOpen: false,
      services: ['시력검사', '백내장', '녹내장', '안구건조증'],
      rating: 4.3,
    },
    {
      id: 4,
      name: '종로치과의원',
      category: '치과',
      address: '서울시 종로구 종로 101',
      phone: '02-4567-8901',
      distance: 0.9,
      openTime: '09:30',
      closeTime: '18:30',
      isOpen: true,
      services: ['일반진료', '임플란트', '틀니', '스케일링'],
      rating: 4.6,
    },
    {
      id: 5,
      name: '건강한의원',
      category: '한의원',
      address: '서울시 종로구 종로 202',
      phone: '02-5678-9012',
      distance: 1.2,
      openTime: '10:00',
      closeTime: '19:30',
      isOpen: true,
      services: ['침술', '한약', '추나요법', '부항'],
      rating: 4.7,
    },
  ];

  const handleHospitalPress = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    setModalVisible(true);
    setRequestType(null);
  };

  const handleReservation = () => {
    setRequestType('reservation');
  };

  const handlePickup = () => {
    setRequestType('pickup');
  };

  const renderHospital = ({ item }: { item: Hospital }) => (
    <TouchableOpacity
      style={styles.hospitalCard}
      onPress={() => handleHospitalPress(item)}
    >
      <View style={styles.hospitalHeader}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          item.isOpen ? styles.statusOpen : styles.statusClosed,
        ]}>
          <Text style={styles.statusText}>
            {item.isOpen ? '진료중' : '진료종료'}
          </Text>
        </View>
      </View>

      <Text style={styles.hospitalName}>{item.name}</Text>
      <Text style={styles.hospitalAddress}>{item.address}</Text>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>거리</Text>
        <Text style={styles.infoValue}>{item.distance}km</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>진료시간</Text>
        <Text style={styles.infoValue}>
          {item.openTime} - {item.closeTime}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>전화</Text>
        <Text style={styles.infoValue}>{item.phone}</Text>
      </View>

      <View style={styles.servicesContainer}>
        {item.services.slice(0, 3).map((service, index) => (
          <View key={index} style={styles.serviceTag}>
            <Text style={styles.serviceText}>{service}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2563EB" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>동네병원</Text>
        <Text style={styles.headerSubtitle}>내 주변 병원을 찾아보세요</Text>
      </View>

      <FlatList
        data={sampleHospitals}
        renderItem={renderHospital}
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

            {selectedHospital && (
              <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
              >
                {!requestType ? (
                  <>
                    <View style={styles.modalHeader}>
                      <Text style={styles.modalTitle}>{selectedHospital.name}</Text>
                      <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>{selectedHospital.category}</Text>
                      </View>
                    </View>

                    <View style={[
                      styles.statusBadge,
                      selectedHospital.isOpen ? styles.statusOpen : styles.statusClosed,
                      { alignSelf: 'flex-start', marginBottom: 16 }
                    ]}>
                      <Text style={styles.statusText}>
                        {selectedHospital.isOpen ? '진료중' : '진료종료'}
                      </Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>주소</Text>
                      <Text style={styles.detailValue}>{selectedHospital.address}</Text>
                    </View>

                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>전화</Text>
                      <Text style={styles.detailValue}>{selectedHospital.phone}</Text>
                    </View>

                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>거리</Text>
                      <Text style={styles.detailValue}>{selectedHospital.distance}km</Text>
                    </View>

                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>진료시간</Text>
                      <Text style={styles.detailValue}>
                        {selectedHospital.openTime} - {selectedHospital.closeTime}
                      </Text>
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.servicesTitle}>진료 서비스</Text>
                    <View style={styles.servicesList}>
                      {selectedHospital.services.map((service, index) => (
                        <View key={index} style={styles.serviceItem}>
                          <Text style={styles.serviceItemText}>{service}</Text>
                        </View>
                      ))}
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.buttonRow}>
                      <TouchableOpacity
                        style={[styles.actionButton, styles.reservationButton]}
                        onPress={handleReservation}
                      >
                        <Text style={styles.actionButtonText}>예약하기</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[styles.actionButton, styles.pickupButton]}
                        onPress={handlePickup}
                      >
                        <Text style={styles.actionButtonText}>픽업요청</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : requestType === 'reservation' ? (
                  <>
                    <Text style={styles.requestTitle}>예약하기</Text>
                    <Text style={styles.requestSubtitle}>{selectedHospital.name}</Text>

                    <View style={styles.divider} />

                    <View style={styles.infoBox}>
                      <Text style={styles.infoTitle}>예약 안내</Text>
                      <Text style={styles.infoText}>
                        전화 또는 앱을 통해 예약하실 수 있습니다.{'\n\n'}
                        예약 가능 시간: {selectedHospital.openTime} - {selectedHospital.closeTime}{'\n'}
                        전화번호: {selectedHospital.phone}{'\n\n'}
                        예약 변경 및 취소는 방문 1일 전까지 가능합니다.
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={styles.confirmButton}
                      onPress={() => {
                        alert('예약이 접수되었습니다. 병원에서 확인 전화 드릴 예정입니다.');
                        setModalVisible(false);
                      }}
                    >
                      <Text style={styles.confirmButtonText}>예약 신청</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.backButton}
                      onPress={() => setRequestType(null)}
                    >
                      <Text style={styles.backButtonText}>뒤로가기</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <Text style={styles.requestTitle}>픽업 요청</Text>
                    <Text style={styles.requestSubtitle}>{selectedHospital.name}</Text>

                    <View style={styles.divider} />

                    <View style={styles.infoBox}>
                      <Text style={styles.infoTitle}>픽업 서비스 안내</Text>
                      <Text style={styles.infoText}>
                        거동이 불편하신 분들을 위한 병원 픽업 서비스입니다.{'\n\n'}
                        픽업 가능 지역: 반경 3km 이내{'\n'}
                        서비스 시간: 09:00 - 17:00{'\n'}
                        소요 시간: 약 30분 전 도착{'\n\n'}
                        픽업 차량이 집 앞까지 방문합니다.{'\n'}
                        진료 후 귀가 시에도 픽업 서비스를 제공합니다.
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={styles.confirmButton}
                      onPress={() => {
                        alert('픽업 요청이 접수되었습니다. 담당자가 연락 드릴 예정입니다.');
                        setModalVisible(false);
                      }}
                    >
                      <Text style={styles.confirmButtonText}>픽업 신청</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.backButton}
                      onPress={() => setRequestType(null)}
                    >
                      <Text style={styles.backButtonText}>뒤로가기</Text>
                    </TouchableOpacity>
                  </>
                )}

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
  hospitalCard: {
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
  hospitalHeader: {
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
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563EB',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
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
  hospitalName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  hospitalAddress: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoLabel: {
    fontSize: 14,
    color: '#9CA3AF',
    width: 70,
  },
  infoValue: {
    fontSize: 14,
    color: '#374151',
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    gap: 6,
  },
  serviceTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  serviceText: {
    fontSize: 12,
    color: '#6B7280',
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
    maxHeight: '85%',
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
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 20,
  },
  detailRow: {
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  servicesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  servicesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  serviceItem: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  serviceItemText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2563EB',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  reservationButton: {
    backgroundColor: '#2563EB',
  },
  pickupButton: {
    backgroundColor: '#059669',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  requestTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 8,
  },
  requestSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
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
  confirmButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  backButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  bottomPadding: {
    height: 20,
  },
});




