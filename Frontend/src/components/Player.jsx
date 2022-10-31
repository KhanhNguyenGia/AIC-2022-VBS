import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const STORAGEURL = "http://0.0.0.0:8000/";
const LOCALVIDEOURL = "file:///mnt/01D8D8D4752A1C30/VBS/Video/";

export default function Player(props) {
    const [idx, setIdx] = useState(props.idx);
    const [videoPlayer, setVideoPlayer] = useState(null);

    const keyframeListLength = props.player.keyframesList.length;

    const handleClick = (e) => {
        e.stopPropagation();
    };

    const handlePrevious = () => {
        setIdx((prev) => Math.max(prev - 1, 0));
    };

    const handleNext = () => {
        setIdx((prev) => Math.min(prev + 1, keyframeListLength));
    };

    const handleClickPlayer = () => {
        const videoURL =
            STORAGEURL + "Video/" + props.player.keyframesFolder + ".mp4";
        const localVideoURL =
            LOCALVIDEOURL + props.player.keyframesFolder + ".mp4";
        setVideoPlayer(localVideoURL);
    };

    useEffect(() => {
        const onKeyDown = (e) => {
            switch (e.code) {
                case "ArrowLeft":
                    handlePrevious();
                    break;
                case "ArrowRight":
                    handleNext();
                    break;
                default:
            }
        };
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    return (
        <div
            style={{
                background: "white",
                display: "flex",
                flexFlow: "column",
                gap: 5,
                justifyContent: "center",
                alignItems: "center",
            }}
            onClick={handleClick}
        >
            <img
                src={STORAGEURL + props.player.keyframesList[idx]}
                alt="abc"
                width={1000}
                onClick={handleClickPlayer}
            />
            <div
                style={{
                    display: "flex",
                    flexFlow: "row",
                    gap: 5,
                    alignItems: "center",
                }}
            >
                <Button onClick={handlePrevious}>
                    <ArrowBackIosIcon />
                </Button>
                <div style={{ color: "black" }}>
                    {props.player.keyframesList[idx].slice(10)}
                </div>
                <Button onClick={handleNext}>
                    <ArrowForwardIosIcon />
                </Button>
            </div>
            {
                videoPlayer && (
                    <div style={{ color: "black" }}>{videoPlayer}</div>
                ) /* <video src={videoPlayer} width={1000} controls/> */
            }
        </div>
    );
}
