import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
  Modal,
  ScrollView,
  Platform,
} from 'react-native';
import { Meeting } from '../../types';

interface MeetingMapScreenProps {
  navigation: any;
  route: {
    params: {
      meetings: Meeting[];
      location: any;
    };
  };
}

export default function MeetingMapScreen({
  navigation,
  route,
}: MeetingMapScreenProps) {
  const { meetings = [], location } = route.params || {};
  const mapRef = useRef<any>(null);

  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const latitude = location?.coords?.latitude || 37.5665;
  const longitude = location?.coords?.longitude || 126.978;

  const handleMarkerPress = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setModalVisible(true);
  };

  const handleJoinMeeting = async () => {
    if (!selectedMeeting) return;
    console.log('모임 참여:', selectedMeeting.id);
  };

  const getMarkerColor = (meeting: Meeting) => {
    if (meeting.status === 'closed') return '#9CA3AF';
    if (meeting.currentParticipants >= meeting.maxParticipants) return '#EF4444';
    return '#2563EB';
  };

  // 웹용 지도 컴포넌트
  const WebMap = () => {
    const mapUrl = `https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=${latitude},${longitude}&zoom=14`;
    
    return (
      <View style={styles.webMapContainer}>
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          src={mapUrl}
        />
        {/* 웹에서는 마커를 오버레이로 표시 */}
        <View style={styles.webMarkersOverlay}>
          {meetings.map((meeting, index) => {
            if (!meeting.location) return null;
            return (
              <TouchableOpacity
                key={meeting.id}
                style={[
                  styles.webMarker,
                  {
                    left: `${20 + index * 15}%`,
                    top: `${30 + (index % 3) * 20}%`,
                  },
                ]}
                onPress={() => handleMarkerPress(meeting)}
              >
                <View
                  style={[
                    styles.marker,
                    { backgroundColor: getMarkerColor(meeting) },
                  ]}
                >
                  <Text style={styles.markerText}>
                    {meeting.currentParticipants}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  // 네이티브용 지도 컴포넌트
  const NativeMap = () => {
    // 런타임에 동적으로 import
    const RNMaps = require('react-native-maps');
    const MapView = RNMaps.default;
    const Marker = RNMaps.Marker;
    const PROVIDER_GOOGLE = RNMaps.PROVIDER_GOOGLE;

    return (
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
        showsUserLocation
        showsMyLocationButton
      >
        {meetings.map((meeting) => {
          if (!meeting.location) return null;

          return (
            <Marker
              key={meeting.id}
              coordinate={{
                latitude: meeting.location.latitude,
                longitude: meeting.location.longitude,
              }}
              onPress={() => handleMarkerPress(meeting)}
            >
              <View style={styles.markerContainer}>
                <View
                  style={[
                    styles.marker,
                    { backgroundColor: getMarkerColor(meeting) },
                  ]}
                >
                  <Text style={styles.markerText}>
                    {meeting.currentParticipants}
                  </Text>
                </View>
                <View
                  style={[
                    styles.markerArrow,
                    { borderTopColor: getMarkerColor(meeting) },
                  ]}
                />
              </View>
            </Marker>
          );
        })}
      </MapView>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>지도로 보기</Text>
        <View style={styles.placeholder} />
      </View>

      {/* 지도 - 플랫폼별로 다른 컴포넌트 렌더링 */}
      {Platform.OS === 'web' ? <WebMap /> : <NativeMap />}

      {/* 범례 */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#2563EB' }]} />
          <Text style={styles.legendText}>참여 가능</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
          <Text style={styles.legendText}>인원 마감</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#9CA3AF' }]} />
          <Text style={styles.legendText}>모집 종료</Text>
        </View>
      </View>

      {/* 모임 리스트 (웹에서 편의성을 위해) */}
      {Platform.OS === 'web' && (
        <View style={styles.webMeetingsList}>
          <ScrollView>
            {meetings.map((meeting) => (
              <TouchableOpacity
                key={meeting.id}
                style={styles.webMeetingItem}
                onPress={() => handleMarkerPress(meeting)}
              >
                <Text style={styles.webMeetingTitle}>{meeting.title}</Text>
                <Text style={styles.webMeetingInfo}>
                  👥 {meeting.currentParticipants}/{meeting.maxParticipants}명 | 
                  💰 {meeting.participationFee === 0 ? '무료' : `${meeting.participationFee.toLocaleString()}원`}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* 모달 (바텀시트 대체) */}
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

            {selectedMeeting && (
              <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.meetingDetailHeader}>
                  <Text style={styles.meetingDetailTitle}>
                    {selectedMeeting.title}
                  </Text>
                  <View
                    style={[
                      styles.statusBadge,
                      selectedMeeting.status === 'open'
                        ? styles.statusOpen
                        : styles.statusClosed,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        selectedMeeting.status === 'open'
                          ? styles.statusOpenText
                          : styles.statusClosedText,
                      ]}
                    >
                      {selectedMeeting.status === 'open' ? '모집중' : '마감'}
                    </Text>
                  </View>
                </View>

                <Text style={styles.meetingDetailDescription}>
                  {selectedMeeting.description}
                </Text>

                <View style={styles.divider} />

                {/* 모임 정보 */}
                <View style={styles.infoSection}>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoIcon}>📍</Text>
                    <View style={styles.infoContent}>
                      <Text style={styles.infoLabel}>장소</Text>
                      <Text style={styles.infoValue}>
                        {selectedMeeting.location?.name}
                      </Text>
                      <Text style={styles.infoSubValue}>
                        {selectedMeeting.location?.address}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.infoIcon}>👥</Text>
                    <View style={styles.infoContent}>
                      <Text style={styles.infoLabel}>참여 인원</Text>
                      <Text style={styles.infoValue}>
                        {selectedMeeting.currentParticipants}/
                        {selectedMeeting.maxParticipants}명
                      </Text>
                    </View>
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.infoIcon}>💰</Text>
                    <View style={styles.infoContent}>
                      <Text style={styles.infoLabel}>참가비</Text>
                      <Text style={styles.infoValue}>
                        {selectedMeeting.participationFee === 0
                          ? '무료'
                          : `${selectedMeeting.participationFee.toLocaleString()}원`}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.infoIcon}>📅</Text>
                    <View style={styles.infoContent}>
                      <Text style={styles.infoLabel}>일시</Text>
                      <Text style={styles.infoValue}>
                        {new Date(selectedMeeting.dateTime).toLocaleDateString(
                          'ko-KR',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          }
                        )}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.divider} />

                {/* 참여자 섹션 */}
                <View style={styles.participantsSection}>
                  <Text style={styles.participantsTitle}>
                    참여자 ({selectedMeeting.currentParticipants}명)
                  </Text>
                  <View style={styles.participantsList}>
                    {[...Array(selectedMeeting.currentParticipants)].map(
                      (_, index) => (
                        <View key={index} style={styles.participantAvatar}>
                          <Text style={styles.participantAvatarText}>
                            {index + 1}
                          </Text>
                        </View>
                      )
                    )}
                    {selectedMeeting.currentParticipants <
                      selectedMeeting.maxParticipants && (
                      <View style={styles.emptySlot}>
                        <Text style={styles.emptySlotText}>+</Text>
                      </View>
                    )}
                  </View>
                </View>

                {/* 참여 버튼 */}
                <TouchableOpacity
                  style={[
                    styles.joinButton,
                    selectedMeeting.status !== 'open' && styles.joinButtonDisabled,
                  ]}
                  onPress={handleJoinMeeting}
                  disabled={selectedMeeting.status !== 'open'}
                >
                  <Text style={styles.joinButtonText}>
                    {selectedMeeting.status === 'open'
                      ? '모임 참여하기'
                      : '참여 불가'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.detailButton}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('MeetingDetail', {
                      id: selectedMeeting.id,
                    });
                  }}
                >
                  <Text style={styles.detailButtonText}>자세히 보기</Text>
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
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 28,
    color: '#111827',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  placeholder: {
    width: 40,
  },
  map: {
    flex: 1,
  },
  webMapContainer: {
    flex: 1,
    position: 'relative',
  },
  webMarkersOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'box-none',
  },
  webMarker: {
    position: 'absolute',
    pointerEvents: 'auto',
  },
  webMeetingsList: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: 200,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    padding: 12,
  },
  webMeetingItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  webMeetingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  webMeetingInfo: {
    fontSize: 14,
    color: '#6B7280',
  },
  markerContainer: {
    alignItems: 'center',
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  markerText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  markerArrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginTop: -1,
  },
  legend: {
    position: 'absolute',
    top: 120,
    right: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 5,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: '#374151',
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
    maxHeight: '75%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
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
  meetingDetailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    marginTop: 8,
  },
  meetingDetailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
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
  },
  statusOpenText: {
    color: '#059669',
  },
  statusClosedText: {
    color: '#DC2626',
  },
  meetingDetailDescription: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 20,
  },
  infoSection: {
    gap: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 12,
    marginTop: 2,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  infoSubValue: {
    fontSize: 14,
    color: '#6B7280',
  },
  participantsSection: {
    marginTop: 20,
  },
  participantsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  participantsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  participantAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  participantAvatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  emptySlot: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptySlotText: {
    fontSize: 20,
    color: '#9CA3AF',
  },
  joinButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 12,
  },
  joinButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  joinButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  detailButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  detailButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  bottomPadding: {
    height: 20,
  },
});
