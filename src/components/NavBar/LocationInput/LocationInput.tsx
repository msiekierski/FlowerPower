import {
  IconButton,
  Input,
  InputAdornment,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { Hint } from 'react-autocomplete-hint';
import { InputUnstyled } from '@mui/core';
import { usePlacesWidget } from 'react-google-autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CheckIcon from '@mui/icons-material/Check';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../redux/user';
import { RootState } from '../../../redux/root-reducer';
import normalizeString from '../../../utils/functions/normalizeString';

const LocationInput = () => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const { setLocation } = bindActionCreators(actionCreators, dispatch);
  const { formattedAddress } = useSelector(
    (root: RootState) => root.user.location
  );
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [inputValue, setInputValue] = useState<string>('');
  console.log(formattedAddress);
  const { ref: materialRef } = usePlacesWidget({
    onPlaceSelected: (place) => {
      console.log(place);
      setSelectedPlace(place);
    },

    inputAutocompleteValue: 'address',
    options: {
      types: ['address'],
      componentRestrictions: { country: 'pl' },
    },
  });

  const onPlaceSubmit = () => {
    if (selectedPlace) {
      setLocation({
        lat: selectedPlace.geometry?.location?.lat(),
        long: selectedPlace.geometry?.location?.lng(),
        city: selectedPlace.address_components[2].long_name,
        formattedAddress: selectedPlace.formatted_address,
      });
    }
  };

  return (
    <TextField
      disabled={!isEditing}
      fullWidth
      color="secondary"
      variant="outlined"
      inputRef={materialRef}
      defaultValue={formattedAddress ? formattedAddress : ''}
      InputProps={{
        style: { width: '400px' },
        endAdornment: (
          <InputAdornment
            position="end"
            onClick={() => {
              if (isEditing) {
                onPlaceSubmit();
              }
              setIsEditing(!isEditing);
            }}
          >
            <IconButton>
              {isEditing ? <CheckIcon /> : <ModeEditIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default LocationInput;
