// LoadingModal.js
import React from 'react';
import { Modal, View, ActivityIndicator } from 'react-native';

const PRIMARY_COLOR = '#6200EE';

export const LoadingModal = ({ visible }) => (
  <Modal transparent visible={visible}>
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <ActivityIndicator size="large" color={PRIMARY_COLOR} />
    </View>
  </Modal>
);
