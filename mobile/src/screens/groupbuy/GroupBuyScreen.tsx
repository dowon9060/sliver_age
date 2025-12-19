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

interface GroupBuyProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  minQuantity: number;
  currentQuantity: number;
  deadline: Date;
  category: string;
  status: 'active' | 'closed';
}

export default function GroupBuyScreen() {
  const [selectedProduct, setSelectedProduct] = useState<GroupBuyProduct | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const sampleProducts: GroupBuyProduct[] = [
    {
      id: 1,
      title: '국내산 사과 5kg',
      description: '당도 높은 부사 사과입니다. 신선하고 아삭한 식감이 일품입니다.',
      price: 25000,
      originalPrice: 35000,
      minQuantity: 10,
      currentQuantity: 7,
      deadline: new Date('2024-12-07T18:00:00'),
      category: '과일',
      status: 'active',
    },
    {
      id: 2,
      title: '한우 1등급 불고기 2kg',
      description: '신선한 한우 1등급 불고기용입니다. 가족 모임에 추천합니다.',
      price: 58000,
      originalPrice: 75000,
      minQuantity: 5,
      currentQuantity: 5,
      deadline: new Date('2024-12-06T15:00:00'),
      category: '정육',
      status: 'closed',
    },
    {
      id: 3,
      title: '무농약 쌀 10kg',
      description: '경기도산 무농약 쌀입니다. 밥맛이 좋고 건강에 좋습니다.',
      price: 38000,
      originalPrice: 48000,
      minQuantity: 8,
      currentQuantity: 6,
      deadline: new Date('2024-12-08T20:00:00'),
      category: '곡물',
      status: 'active',
    },
    {
      id: 4,
      title: '제주 한라봉 3kg',
      description: '달콤하고 과즙이 풍부한 제주 한라봉입니다.',
      price: 28000,
      originalPrice: 38000,
      minQuantity: 10,
      currentQuantity: 9,
      deadline: new Date('2024-12-06T22:00:00'),
      category: '과일',
      status: 'active',
    },
    {
      id: 5,
      title: '국산 고등어 10마리',
      description: '신선한 국산 고등어입니다. 구이나 조림으로 드세요.',
      price: 32000,
      originalPrice: 42000,
      minQuantity: 6,
      currentQuantity: 4,
      deadline: new Date('2024-12-07T12:00:00'),
      category: '수산',
      status: 'active',
    },
  ];

  const handleProductPress = (product: GroupBuyProduct) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const getTimeRemaining = (deadline: Date) => {
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diff < 0) return '마감';
    if (hours < 24) return `${hours}시간 ${minutes}분 남음`;
    const days = Math.floor(hours / 24);
    return `${days}일 남음`;
  };

  const renderProduct = ({ item }: { item: GroupBuyProduct }) => {
    const discountRate = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);
    const progress = (item.currentQuantity / item.minQuantity) * 100;

    return (
      <TouchableOpacity
        style={[
          styles.productCard,
          item.status === 'closed' && styles.productCardClosed,
        ]}
        onPress={() => handleProductPress(item)}
      >
        <View style={styles.productHeader}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          {item.status === 'closed' && (
            <View style={styles.closedBadge}>
              <Text style={styles.closedText}>마감</Text>
            </View>
          )}
        </View>

        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productDescription} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.discountRate}>{discountRate}%</Text>
          <Text style={styles.price}>{item.price.toLocaleString()}원</Text>
          <Text style={styles.originalPrice}>
            {item.originalPrice.toLocaleString()}원
          </Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${Math.min(progress, 100)}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {item.currentQuantity}/{item.minQuantity}명 참여
          </Text>
        </View>

        <View style={styles.deadlineRow}>
          <Text style={styles.deadlineLabel}>마감시간</Text>
          <Text style={styles.deadlineTime}>{getTimeRemaining(item.deadline)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2563EB" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>공동구매</Text>
        <Text style={styles.headerSubtitle}>함께 구매하면 더 저렴해요</Text>
      </View>

      <FlatList
        data={sampleProducts}
        renderItem={renderProduct}
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

            {selectedProduct && (
              <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedProduct.title}</Text>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{selectedProduct.category}</Text>
                  </View>
                </View>

                <Text style={styles.modalDescription}>{selectedProduct.description}</Text>

                <View style={styles.divider} />

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>할인가</Text>
                  <Text style={styles.detailValue}>
                    {selectedProduct.price.toLocaleString()}원
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>정상가</Text>
                  <Text style={styles.detailOriginalPrice}>
                    {selectedProduct.originalPrice.toLocaleString()}원
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>최소 수량</Text>
                  <Text style={styles.detailValue}>{selectedProduct.minQuantity}명</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>현재 참여</Text>
                  <Text style={styles.detailValue}>{selectedProduct.currentQuantity}명</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>마감 시간</Text>
                  <Text style={styles.detailValue}>
                    {selectedProduct.deadline.toLocaleString('ko-KR', {
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.infoBox}>
                  <Text style={styles.infoTitle}>구매 안내</Text>
                  <Text style={styles.infoText}>
                    • 최소 인원이 모집되면 자동으로 주문이 진행됩니다{'\n'}
                    • 마감 시간까지 최소 인원 미달 시 자동 취소됩니다{'\n'}
                    • 배송은 주문 확정 후 2-3일 소요됩니다{'\n'}
                    • 신선식품은 교환/환불이 어려울 수 있습니다
                  </Text>
                </View>

                <TouchableOpacity
                  style={[
                    styles.joinButton,
                    selectedProduct.status === 'closed' && styles.joinButtonDisabled,
                  ]}
                  disabled={selectedProduct.status === 'closed'}
                >
                  <Text style={styles.joinButtonText}>
                    {selectedProduct.status === 'active' ? '참여하기' : '마감되었습니다'}
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
  productCard: {
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
  productCardClosed: {
    opacity: 0.6,
  },
  productHeader: {
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
  closedBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  closedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#DC2626',
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  discountRate: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#DC2626',
    marginRight: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563EB',
  },
  progressText: {
    fontSize: 14,
    color: '#6B7280',
  },
  deadlineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  deadlineLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  deadlineTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DC2626',
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
  modalDescription: {
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
  },
  detailOriginalPrice: {
    fontSize: 16,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
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




