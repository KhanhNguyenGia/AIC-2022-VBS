import "./App.css";
import Inputs from "./components/SearchBar";
import IconLabelButtons from "./components/Button";
import { useState } from "react";
import TitlebarBelowImageList from "./components/ImageGrid";

const BACKENDURL = "http://127.0.0.1:5000/";
const STORAGEURL = "http://0.0.0.0:8000/";

function App() {
    const [query, setQuery] = useState("");
    const [images, setImages] = useState([]);

    const onFormSubmit = (e) => {
        e.preventDefault();

        fetch(BACKENDURL, {
            method: "POST",
            body: query,
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error("Error");
                }
                return response.json();
            })
            .then((data) => {
                setImages(() => {
                    const newImages = data.map((x) => {
                        return {
                            img: STORAGEURL + x["image_path"].slice(0),
                            title: x["image_path"].slice(-20),
                            videoSrc:
                                STORAGEURL +
                                "Video/" +
                                x["video_name"] +
                                ".mp4",
                            keyframesFolder: x["image_path"].slice(10, 19),
                            keyframe_id: x["keyframe_id"],
                        };
                    });
                    return newImages;
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    return (
        <div className="App">
            <form
                onSubmit={onFormSubmit}
                style={{
                    display: "flex",
                    flexFlow: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 5,
                }}
            >
                <Inputs
                    name="query"
                    value={query}
                    onChangeInput={handleChange}
                />
                <IconLabelButtons type="submit" />
            </form>
            <TitlebarBelowImageList images={images} />
            <div>Changed</div>
        </div>
    );
}

export default App;
