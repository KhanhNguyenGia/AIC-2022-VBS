import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';

export default function IconLabelButtons(props) {
    return (
        <Stack direction="row" spacing={2}>
            <Button
                variant="contained"
                endIcon={<SearchIcon />}
                type={props.type}
                size="small"
            >
                Search
            </Button>
        </Stack>
    );
}
