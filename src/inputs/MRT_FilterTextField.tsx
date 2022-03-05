import React, { ChangeEvent, FC, useState } from 'react';
import { IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import { useAsyncDebounce } from 'react-table';
import { useMRT } from '../useMRT';
import { MRT_HeaderGroup } from '..';

interface Props {
  column: MRT_HeaderGroup;
}

export const MRT_FilterTextField: FC<Props> = ({ column }) => {
  const {
    icons: { FilterListIcon, CloseIcon },
    idPrefix,
    localization,
  } = useMRT();

  const [filterValue, setFilterValue] = useState('');

  const handleChange = useAsyncDebounce((value) => {
    column.setFilter(value ?? undefined);
  }, 150);

  const handleClear = () => {
    setFilterValue('');
    column.setFilter(undefined);
  };

  if (column.Filter) {
    return <>{column.Filter?.({ column })}</>;
  }

  return (
    <TextField
      fullWidth
      id={`mrt-${idPrefix}-${column.id}-filter-text-field`}
      inputProps={{
        style: {
          textOverflow: 'ellipsis',
        },
      }}
      margin="dense"
      placeholder={localization.filterTextFieldPlaceholder?.replace(
        '{column}',
        String(column.Header),
      )}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        setFilterValue(e.target.value);
        handleChange(e.target.value);
      }}
      onClick={(e) => e.stopPropagation()}
      value={filterValue ?? ''}
      variant="standard"
      InputProps={{
        startAdornment: (
          <Tooltip
            arrow
            title={localization.filterTextFieldPlaceholder?.replace(
              '{column}',
              String(column.Header),
            )}
          >
            <InputAdornment position="start">
              <FilterListIcon />
            </InputAdornment>
          </Tooltip>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip
              arrow
              title={localization.filterTextFieldClearButtonTitle ?? ''}
            >
              <span>
                <IconButton
                  aria-label={localization.filterTextFieldClearButtonTitle}
                  disabled={filterValue?.length === 0}
                  onClick={handleClear}
                  size="small"
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
          </InputAdornment>
        ),
      }}
    />
  );
};
