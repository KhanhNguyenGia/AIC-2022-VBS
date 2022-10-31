import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Player from './Player';

export default function FramePlayer(props) {
	// console.log(props.idx)
	return (
		<div onClick={props.onClick}>
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={props.idx !== null}
			>
				{props.idx && <Player player={props.player} idx={props.idx}/>}
			</Backdrop>
		</div>
	);
}
