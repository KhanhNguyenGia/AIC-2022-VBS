import * as React from 'react';
// import { useState } from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';

const ariaLabel = { 'aria-label': 'description' };

export default function Inputs(props) {
    return (
        <Box
            sx={{
                '& > :not(style)': { m: 1, width: '50ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <Input
                placeholder="Enter query"
                inputProps={ariaLabel}
                value={props.value}
                onChange={props.onChangeInput} />
        </Box>
    );
}
