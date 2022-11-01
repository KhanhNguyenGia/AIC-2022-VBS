import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useState, useEffect } from 'react';
import FramePlayer from './FramePlayer';

const BACKENDURL = 'http://127.0.0.1:5000/'

export default function TitlebarBelowImageList(props) {
    const [player, setPlayer] = useState()
    const [idx, setIdx] = useState(null)

    const handleClick = (img, keyframesFolder, keyframe_id) => {
        const keyframesFolderURL = BACKENDURL + keyframesFolder

        fetch(keyframesFolderURL).then(response => {
            if (!response.ok) {
                throw Error('Error!')
            }
            return response.json()
        }).then(data => {
            setPlayer({
                keyframesFolder: keyframesFolder,
                keyframesList: data
            })

            setIdx(keyframe_id)
        }).catch(error => {
            console.log(error)
        })
    }

    console.log(player)
    
    const handleClose = () => {
        setIdx(null)
    }
    
    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.code === 'Escape') {
                handleClose()
            }
        }
        document.addEventListener('keydown', onKeyDown)
      return () => {
        document.removeEventListener('keydown', onKeyDown)
      }
    }, [])
    
    return (
        <ImageList sx={{ width: window.innerWidth, height: window.innerHeight - 80 }} cols={3}>
            {props.images.map((item) => (
                <ImageListItem
                    key={item.img}
                >
                    <img
                        src={`${item.img}?w=248&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                        onClick={() => handleClick(item.img, item.keyframesFolder, item.keyframe_id)}
                    />
                    <ImageListItemBar
                        title={item.title}
                        position="below"
                    />
                </ImageListItem>
            ))}
            {idx && (<FramePlayer
                onClick={() => setIdx(null)}
                player={player}
                idx={idx}
                handleAdd={props.handleAdd}
            />)}
        </ImageList>
    );
}
