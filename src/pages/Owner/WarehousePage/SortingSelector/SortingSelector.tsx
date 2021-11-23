import React, { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const stores: Array<string> = [
  'SORT BY NAME ASC',
  'SORT BY NAME DESC',
  'SORT BY PRICE ASC',
  'SORT BY PRICE DESC',
  'SORT BY QTY ASC',
  'SORT BY QTY DESC',
];
const SortingSelector = () => {
  const [selectedStore, setSelectedStore] = useState<string>(stores[0]);
  return (
    <FormControl style={{ minWidth: '200px' }}>
      <InputLabel id="demo-multiple-name-label" color="secondary">
        Store
      </InputLabel>
      <Select
        value={selectedStore}
        onChange={(event: SelectChangeEvent<typeof selectedStore>) => {
          setSelectedStore(event.target.value);
        }}
        input={<OutlinedInput label="Name" />}
      >
        {stores.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SortingSelector;
