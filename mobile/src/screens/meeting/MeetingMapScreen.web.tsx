import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
  Modal,
  ScrollView,
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
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const latitude = location?.coords?.latitude || 37.5665;
  const longitude = location?.coords?.longitude || 126.978;

  const handleMeetingPress = (meeting: Meeting) => {
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

  const mapUrl = `https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=${latitude},${longitude}&zoom=14`;

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

      {/* Google Maps iframe */}
      <View style={styles.mapContainer}>
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          src={mapUrl}
        />
      </View>

      {/* 모임 리스트 */}
      <View style={styles.meetingsList}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {meetings.map((meeting) => (
            <TouchableOpacity
              key={meeting.id}
              style={styles.meetingItem}
              onPress={() => handleMeetingPress(meeting)}
            >
              <View style={styles.meetingHeader}>
                <View
                  style={[
                    styles.statusDot,
                    { backgroundColor: getMarkerColor(meeting) },
                  ]}
                />
                <Text style={styles.meetingTitle} numberOfLines={1}>
                  {meeting.title}
                </Text>
              </View>
              <Text style={styles.meetingInfo}>
                👥 {meeting.currentParticipants}/{meeting.maxParticipants}명 | 
                💰 {meeting.participationFee === 0 ? '무료' : `${meeting.participationFee.toLocaleString()}원`}
              </Text>
              <Text style={styles.meetingLocation} numberOfLines={1}>
                📍 {meeting.location?.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 모달 */}
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
  mapContainer: {
    flex: 1,
  },
  meetingsList: {
    maxHeight: 250,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    padding: 16,
  },
  meetingItem: {
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  meetingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  meetingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  meetingInfo: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  meetingLocation: {
    fontSize: 14,
    color: '#9CA3AF',
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
  bottomPadding: {
    height: 20,
  },
});




