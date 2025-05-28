import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';

const ProfileScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('profile');

  const renderProfileTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userEmail}>john.doe@example.com</Text>
      </View>

      {/* Personal Information */}
      <View style={styles.personalInfoContainer}>
        <Text style={styles.infoTitle}>Personal Information</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Full Name:</Text>
          <Text style={styles.value}>John Doe</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Email Address:</Text>
          <Text style={styles.value}>john.doe@example.com</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Contact Number:</Text>
          <Text style={styles.value}>+1 (234) 567-890</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Home Address:</Text>
          <Text style={styles.value}>456 Maple Street, Suburbia, CA 90210</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Office Address:</Text>
          <Text style={styles.value}>123 Business Park, Downtown, CA 90211</Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderContactUsTab = () => (
    <View style={styles.contactTab}>
      <Text style={styles.contactTitle}>Contact Us</Text>
      <Text style={styles.contactText}>Email: support@example.com</Text>
      <Text style={styles.contactText}>Phone: +1 (800) 123-4567</Text>
      <Text style={styles.contactText}>Address: 789 Support Blvd, Helpville, CA 90300</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#C53030" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      {/* Tab Buttons */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'profile' && styles.activeTabButton]}
          onPress={() => setActiveTab('profile')}>
          <Text style={[styles.tabButtonText, activeTab === 'profile' && styles.activeTabButtonText]}>
            Profile
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'contact' && styles.activeTabButton]}
          onPress={() => setActiveTab('contact')}>
          <Text style={[styles.tabButtonText, activeTab === 'contact' && styles.activeTabButtonText]}>
            Contact Us
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      {activeTab === 'profile' ? renderProfileTab() : renderContactUsTab()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#C53030',
    paddingHorizontal: 20,
    paddingVertical: 15,
    elevation: 4,
  },
  backButton: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerPlaceholder: {
    width: 28,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  activeTabButton: {
    backgroundColor: '#C53030',
  },
  tabButtonText: {
    fontSize: 16,
    color: '#4A5568',
    fontWeight: '600',
  },
  activeTabButtonText: {
    color: '#FFFFFF',
  },
  tabContent: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  profileHeader: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 30,
    marginBottom: 20,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#C53030',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666666',
  },
  personalInfoContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 20,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C53030',
    marginBottom: 16,
  },
  infoRow: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3748',
  },
  value: {
    fontSize: 16,
    color: '#4A5568',
    marginTop: 4,
  },
  contactTab: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  contactTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#C53030',
    marginBottom: 16,
  },
  contactText: {
    fontSize: 16,
    color: '#4A5568',
    marginBottom: 10,
  },
});

export default ProfileScreen;
