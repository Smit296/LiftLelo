# Testing Location Autocomplete Implementation

## Quick Test Instructions

1. **Set up your Google Places API Key**:

   - Open `src/config/googlePlaces.js`
   - Replace `YOUR_GOOGLE_PLACES_API_KEY` with your actual API key from Google Cloud Console
   - Follow the instructions in `GOOGLE_PLACES_SETUP.md` if you haven't set up the API yet

2. **Run the app**:

   ```bash
   npm start
   # or
   yarn start
   ```

3. **Test the functionality**:
   - Navigate to the Registration screen
   - Try typing in the "Home Location" field
   - You should see location suggestions appear as you type
   - Try typing in the "Office Location" field
   - Select a location from the suggestions

## What to Expect

- **Before API Key Setup**: You won't see any suggestions, but the UI should work
- **After API Key Setup**: You should see location suggestions appear as you type
- **Location Selection**: When you select a location, it should populate the field with the full address

## Troubleshooting

1. **No suggestions appearing**:

   - Check that your API key is correctly set in `src/config/googlePlaces.js`
   - Verify that Places API is enabled in Google Cloud Console
   - Check that billing is enabled on your Google Cloud account

2. **API Key errors**:

   - Make sure you're using the Web Service API key (not Android/iOS specific)
   - Ensure the Places API Web Service is enabled
   - Check that your API key has the correct permissions

3. **Network errors**:
   - Check your internet connection
   - Verify that the app has network permissions

## Features

- **Real-time search**: Suggestions appear as you type
- **Country restriction**: Currently set to India (`country:in`), can be changed in LocationAutocomplete.js
- **Debounced requests**: 300ms delay to avoid too many API calls
- **Minimum length**: Requires at least 2 characters before searching
- **Clean UI**: Matches the existing app design

## Customization

You can customize the location autocomplete by editing `src/Components/LocationAutocomplete.js`:

- Change country restriction
- Modify the minimum search length
- Adjust debounce timing
- Customize the styling
- Add more location filters

## Next Steps

After testing, you may want to:

1. Add current location detection functionality
2. Store recently selected locations
3. Add favorites/saved locations
4. Implement location validation
5. Add map integration for location confirmation
