import "./App.css";
import Inputs from "./components/SearchBar";
import IconLabelButtons from "./components/Button";
import { useState } from "react";
import TitlebarBelowImageList from "./components/ImageGrid";
import { CSVLink } from "react-csv";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button } from "@mui/material";

const BACKENDURL = "http://127.0.0.1:5000/";
const STORAGEURL = "http://0.0.0.0:8000/";

function App() {
    const [query, setQuery] = useState("");
    const [images, setImages] = useState([]);
    const [data, setData] = useState([]);

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

    const handleAdd = (newData) => {
        setData([...data, newData]);
    };

    const handleRemove = (index) => {
        setData((prev) => prev.filter((_, i) => i !== index));
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
            <div
                style={{
                    display: "flex",
                    flexFlow: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 5,
                }}
            >
                <TitlebarBelowImageList images={images} handleAdd={handleAdd} />
                <div>
                    Submit bar
                    <div>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            {data.map((item, index) => (
                                <li
                                    style={{
                                        display: "flex",
                                        flexFlow: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: 5,
                                    }}
                                >
                                    <Button onClick={() => handleRemove(index)}>
                                        <RemoveIcon />
                                    </Button>
                                    <div>{`${item[0]}, ${item[1]}`}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <CSVLink
                        data={data}
                        enclosingCharacter={``}
                        separator={`,`}
                    >
                        Download me
                    </CSVLink>
                    ;
                </div>
            </div>
        </div>
    );
}

export default App;
