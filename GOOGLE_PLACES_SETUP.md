# Google Places API Setup Guide

This guide will help you set up Google Places API for the location autocomplete feature in the LiftLelo app.

## Prerequisites

1. A Google account
2. A Google Cloud Platform (GCP) project
3. A credit card (for billing, though Google provides free credits)

## Step-by-Step Setup

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on "Select a project" at the top
3. Click "New Project"
4. Enter a project name (e.g., "LiftLelo-Places")
5. Click "Create"

### 2. Enable the Places API

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Places API"
3. Click on "Places API"
4. Click "Enable"

### 3. Create API Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the generated API key
4. (Recommended) Click "Restrict Key" to add restrictions:
   - Under "Application restrictions", select "Android apps" or "iOS apps" based on your platform
   - Add your app's package name and SHA-1 certificate fingerprint
   - Under "API restrictions", select "Restrict key" and choose "Places API"

### 4. Configure Billing (Required)

1. Go to "Billing" in the Google Cloud Console
2. Link a billing account to your project
3. Note: Google provides $200 in free credits monthly for Maps, Routes, and Places

### 5. Update Your App Configuration

1. Open `src/config/googlePlaces.js`
2. Replace `YOUR_GOOGLE_PLACES_API_KEY` with your actual API key:

```javascript
export const GOOGLE_PLACES_API_KEY = 'AIzaSyBVWaKrjvy3MaE7SQ74_uJiULgl1JY0H-Y';
```

## Testing

1. Run your app: `npm start` or `yarn start`
2. Navigate to the Registration screen
3. Try typing in the "Home Location" or "Office Location" fields
4. You should see location suggestions appear as you type

## Troubleshooting

### Common Issues:

1. **"This API project is not authorized to use this API"**

   - Make sure you've enabled the Places API in your Google Cloud project
   - Check that your API key is correct

2. **No suggestions appearing**

   - Verify your API key is correctly set in the config file
   - Check your internet connection
   - Ensure Places API is enabled and billing is set up

3. **"Quota exceeded" error**
   - Check your API usage in Google Cloud Console
   - Verify billing is properly set up

### API Usage Limits:

- Google provides $200 in free credits monthly
- Places Autocomplete: $2.83 per 1000 requests
- Place Details: $3.00 per 1000 requests

## Security Best Practices

1. **Restrict your API key** to specific apps and APIs
2. **Monitor usage** regularly in Google Cloud Console
3. **Don't commit API keys** to version control (use environment variables in production)
4. **Set up usage quotas** to prevent unexpected charges

## Production Considerations

For production apps, consider:

1. Using environment variables for API keys
2. Implementing server-side API calls to hide keys
3. Setting up proper API key restrictions
4. Monitoring and alerting for unusual usage

## Support

If you encounter issues:

1. Check the [Google Places API documentation](https://developers.google.com/places/web-service/overview)
2. Visit [Google Cloud Support](https://cloud.google.com/support)
3. Check the [react-native-google-places-autocomplete documentation](https://github.com/FaridSafi/react-native-google-places-autocomplete)
