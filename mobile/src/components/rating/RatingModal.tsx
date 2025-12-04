import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface RatingModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: { praise: string; review: string; rating: 'positive' | 'negative' }) => void;
  userName: string;
}

export default function RatingModal({ visible, onClose, onSubmit, userName }: RatingModalProps) {
  const [praise, setPraise] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState<'positive' | 'negative' | null>(null);

  const handleSubmit = () => {
    if (rating) {
      onSubmit({ praise, review, rating });
      setPraise('');
      setReview('');
      setRating(null);
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>{userName}님 평가하기</Text>
          
          <TextInput
            style={styles.input}
            placeholder="칭찬 메시지 (선택)"
            value={praise}
            onChangeText={setPraise}
            multiline
          />
          
          <TextInput
            style={styles.input}
            placeholder="간단한 후기 (선택)"
            value={review}
            onChangeText={setReview}
            multiline
          />
          
          <Text style={styles.label}>매너 평가</Text>
          <View style={styles.ratingButtons}>
            <TouchableOpacity
              style={[
                styles.ratingButton,
                rating === 'positive' && styles.ratingButtonActive,
              ]}
              onPress={() => setRating('positive')}
            >
              <Text style={styles.ratingText}>👍 좋았어요</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.ratingButton,
                rating === 'negative' && styles.ratingButtonActive,
              ]}
              onPress={() => setRating('negative')}
            >
              <Text style={styles.ratingText}>👎 아쉬워요</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>취소</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.submitButton, !rating && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={!rating}
            >
              <Text style={styles.submitText}>제출하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    fontSize: 18,
    marginBottom: 16,
    minHeight: 60,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  ratingButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  ratingButton: {
    flex: 1,
    padding: 16,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  ratingButtonActive: {
    borderColor: '#2196F3',
    backgroundColor: '#E3F2FD',
  },
  ratingText: {
    fontSize: 18,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    padding: 16,
    marginRight: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  cancelText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
  },
  submitButton: {
    flex: 1,
    padding: 16,
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: '#2196F3',
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});


