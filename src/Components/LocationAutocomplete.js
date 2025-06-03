import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_PLACES_API_KEY} from '../config/googlePlaces';

const LocationAutocomplete = ({
  placeholder,
  onLocationSelect,
  value,
  error,
  label,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <GooglePlacesAutocomplete
        placeholder={placeholder}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          onLocationSelect({
            description: data?.description,
            placeId: data?.place_id,
            details: details,
          });
        }}
        query={{
          key: GOOGLE_PLACES_API_KEY, // Use imported API key instead of hardcoded
          language: 'en',
          components: 'country:in', // Restrict to India, change as needed
          types: 'geocode', // Add explicit types to avoid filtering issues
        }}
        fetchDetails={true}
        enablePoweredByContainer={false}
        styles={{
          textInputContainer: [
            styles.textInputContainer,
            error && styles.inputError,
          ],
          textInput: styles.textInput,
          listView: styles.listView,
          row: styles.row,
          description: styles.description,
          predefinedPlacesDescription: styles.predefinedPlacesDescription,
        }}
        textInputProps={{
          placeholderTextColor: '#9CA3AF',
          returnKeyType: 'search',
        }}
        debounce={300}
        minLength={2}
        isRowScrollable={true}
        listViewDisplayed="auto"
        keepResultsAfterBlur={false}
        suppressDefaultStyles={false}
        numberOfLines={1}
        disableScroll={false}
        predefinedPlaces={[]}
        predefinedPlacesAlwaysVisible={false}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    zIndex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  textInputContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 0,
    height: 44,
  },
  textInput: {
    backgroundColor: 'transparent',
    color: '#374151',
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    margin: 0,
    height: '100%',
  },
  listView: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderTopWidth: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: -1,
    maxHeight: 200,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  row: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  rowContainer: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 2,
  },
  rowAddress: {
    fontSize: 12,
    color: '#6B7280',
  },
  description: {
    fontSize: 14,
    color: '#374151',
  },
  predefinedPlacesDescription: {
    fontSize: 14,
    color: '#374151',
  },
  inputError: {
    borderColor: '#DC2626',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 12,
    marginTop: 4,
  },
});

export default LocationAutocomplete;
