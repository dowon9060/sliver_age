import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar, Modal, ScrollView, TextInput } from 'react-native';
import { Post } from '../../types';

export default function CommunityScreen({ navigation }: any) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    // 샘플 데이터
    const samplePosts: Post[] = [
      {
        id: 1,
        authorId: 1,
        author: {
          id: 1,
          nickname: '김건강',
          gender: 'male',
          ageGroup: '60대',
          mannerScore: 95,
        },
        content: '안녕하세요! 오늘 남산 산책 다녀왔습니다. 날씨가 정말 좋더라고요. 여러분도 산책 추천드려요.',
        images: [],
        likesCount: 12,
        dislikesCount: 0,
        commentsCount: 5,
        createdAt: new Date('2024-12-04T10:30:00'),
      },
      {
        id: 2,
        authorId: 2,
        author: {
          id: 2,
          nickname: '박행복',
          gender: 'female',
          ageGroup: '70대',
          mannerScore: 98,
        },
        content: '우리 동네 복지관에서 무료 건강검진 한다고 하네요. 12월 15일까지니까 참고하세요!',
        images: [],
        likesCount: 25,
        dislikesCount: 0,
        commentsCount: 8,
        createdAt: new Date('2024-12-03T14:20:00'),
      },
      {
        id: 3,
        authorId: 3,
        author: {
          id: 3,
          nickname: '이즐거움',
          gender: 'male',
          ageGroup: '60대',
          mannerScore: 92,
        },
        content: '손주들과 함께 갈 만한 공원 추천해주세요. 서울 근처면 좋겠어요.',
        images: [],
        likesCount: 8,
        dislikesCount: 1,
        commentsCount: 12,
        createdAt: new Date('2024-12-03T09:15:00'),
      },
      {
        id: 4,
        authorId: 4,
        author: {
          id: 4,
          nickname: '최활기',
          gender: 'female',
          ageGroup: '60대',
          mannerScore: 97,
        },
        content: '어제 요가 수업 첫날이었는데 생각보다 재미있더라고요. 몸이 가벼워지는 느낌! 같이 하실 분 계신가요?',
        images: [],
        likesCount: 18,
        dislikesCount: 0,
        commentsCount: 7,
        createdAt: new Date('2024-12-02T16:45:00'),
      },
      {
        id: 5,
        authorId: 5,
        author: {
          id: 5,
          nickname: '정평화',
          gender: 'male',
          ageGroup: '70대',
          mannerScore: 100,
        },
        content: '독서 모임 회원 모집합니다. 매주 화요일 오후 2시, 도서관에서 만나요. 책 좋아하시는 분들 환영합니다!',
        images: [],
        likesCount: 15,
        dislikesCount: 0,
        commentsCount: 10,
        createdAt: new Date('2024-12-01T11:00:00'),
      },
    ];
    setPosts(samplePosts);
  };

  const handleReaction = (postId: number, type: 'like' | 'dislike') => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likesCount: type === 'like' ? post.likesCount + 1 : post.likesCount,
          dislikesCount: type === 'dislike' ? post.dislikesCount + 1 : post.dislikesCount,
        };
      }
      return post;
    }));
  };

  const handlePostPress = (post: Post) => {
    setSelectedPost(post);
    setModalVisible(true);
  };

  const renderPost = ({ item }: { item: Post }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => handlePostPress(item)}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.author}>{item.author.nickname}</Text>
          <Text style={styles.ageGroup}>{item.author.ageGroup}</Text>
        </View>
        <Text style={styles.date}>
          {new Date(item.createdAt).toLocaleDateString('ko-KR', {
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      </View>
      
      <Text style={styles.content} numberOfLines={3}>{item.content}</Text>
      
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={(e) => {
            e.stopPropagation();
            handleReaction(item.id, 'like');
          }}
        >
          <Text style={styles.actionText}>좋아요 {item.likesCount}</Text>
        </TouchableOpacity>
        
        <View style={styles.actionButton}>
          <Text style={styles.actionText}>댓글 {item.commentsCount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2563EB" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>커뮤니티</Text>
        <Text style={styles.headerSubtitle}>정보를 공유하고 소통해요</Text>
      </View>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
      
      <TouchableOpacity
        style={styles.fab}
        onPress={() => alert('글쓰기 기능은 준비 중입니다')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* 게시글 상세 모달 */}
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

            {selectedPost && (
              <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.postHeader}>
                  <View>
                    <Text style={styles.postAuthor}>{selectedPost.author.nickname}</Text>
                    <Text style={styles.postAgeGroup}>{selectedPost.author.ageGroup}</Text>
                  </View>
                  <Text style={styles.postDate}>
                    {new Date(selectedPost.createdAt).toLocaleDateString('ko-KR')}
                  </Text>
                </View>

                <Text style={styles.postContent}>{selectedPost.content}</Text>

                <View style={styles.reactionRow}>
                  <TouchableOpacity
                    style={styles.reactionButton}
                    onPress={() => handleReaction(selectedPost.id, 'like')}
                  >
                    <Text style={styles.reactionButtonText}>
                      좋아요 {selectedPost.likesCount}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.divider} />

                <Text style={styles.commentsTitle}>
                  댓글 {selectedPost.commentsCount}
                </Text>

                <View style={styles.commentsList}>
                  {[...Array(Math.min(selectedPost.commentsCount, 3))].map((_, index) => (
                    <View key={index} style={styles.commentItem}>
                      <Text style={styles.commentAuthor}>
                        {['이웃', '친구', '동료'][index]}
                      </Text>
                      <Text style={styles.commentText}>
                        {index === 0 && '좋은 정보 감사합니다!'}
                        {index === 1 && '저도 참여하고 싶네요.'}
                        {index === 2 && '다음에 같이 가요!'}
                      </Text>
                      <Text style={styles.commentDate}>방금 전</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.commentInput}>
                  <TextInput
                    style={styles.input}
                    placeholder="댓글을 입력하세요"
                    value={commentText}
                    onChangeText={setCommentText}
                    multiline
                  />
                  <TouchableOpacity
                    style={styles.sendButton}
                    onPress={() => {
                      alert('댓글이 등록되었습니다');
                      setCommentText('');
                    }}
                  >
                    <Text style={styles.sendButtonText}>등록</Text>
                  </TouchableOpacity>
                </View>

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
  card: {
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
  author: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  ageGroup: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  date: {
    fontSize: 14,
    color: '#6B7280',
  },
  content: {
    fontSize: 15,
    lineHeight: 22,
    color: '#374151',
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    color: '#6B7280',
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
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    marginTop: 8,
  },
  postAuthor: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  postAgeGroup: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 2,
  },
  postDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  postContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    marginBottom: 20,
  },
  reactionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  reactionButton: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  reactionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563EB',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 20,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  commentsList: {
    marginBottom: 20,
  },
  commentItem: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  commentDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  commentInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  sendButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  bottomPadding: {
    height: 20,
  },
});


