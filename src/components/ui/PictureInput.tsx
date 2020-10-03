import ReactCrop, { Crop } from "react-image-crop";
import { getCroppedImg } from "../../utils/helpers";
import { ChangeEvent, useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    button: {
        margin: "5px 10px",
    },
});

interface Props {
    baseFileName?: string;
    onRawImageCreated?: (rawImage: string | ArrayBuffer) => any;
    onFileCreated?: (blob: Blob) => any;
    name?: string;
    buttonText?: string;
}

const PictureInput: React.FC<Props> = ({
    onRawImageCreated,
    onFileCreated,
    baseFileName,
    name,
    buttonText,
}) => {
    const [src, setSrc] = useState<string | ArrayBuffer>();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [crop, setCrop] = useState<Crop>({
        aspect: 1,
        unit: "%",
        width: 50,
    });
    const imageRef = useRef<HTMLImageElement>();

    const inputRef = useRef<HTMLInputElement>();
    const classes = useStyles();

    function handleFileSelected(event: ChangeEvent<HTMLInputElement>): void {
        const file = event.target.files[0];
        if (!file || file.size / Math.pow(2, 20) > 5) return;
        const reader = new FileReader();

        reader.onload = function () {
            setSrc(this.result);
            setModalOpen(true);
        };
        reader.readAsDataURL(event.target.files[0]);
    }

    async function handleFinishCrop() {
        const fileExtension = imageRef.current.src.split(";")[0].split("/")[1];
        const fileName = `${baseFileName}.${fileExtension}`;
        const file = await getCroppedImg(imageRef.current, crop, fileName);
        onFileCreated && onFileCreated(file);

        if (onRawImageCreated) {
            const reader = new FileReader();

            reader.onload = () => onRawImageCreated(reader.result);
            reader.readAsDataURL(file);
            setModalOpen(false);
        }
    }

    function handleCancelCrop() {
        setModalOpen(false);
    }

    return (
        <>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileSelected}
                name={name}
                ref={inputRef}
                style={{ display: "none" }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={() => inputRef.current.click()}
            >
                {buttonText || "Select Image"}
            </Button>
            <Dialog open={modalOpen}>
                {src ? (
                    <div>
                        <ReactCrop
                            src={src as string}
                            crop={crop}
                            onChange={(newCrop) => setCrop(newCrop)}
                            onImageLoaded={(img) => {
                                imageRef.current = img;
                            }}
                        />
                    </div>
                ) : null}
                <Button
                    onClick={handleCancelCrop}
                    className={classes.button}
                    variant="outlined"
                    color="primary"
                >
                    CANCEL
                </Button>
                <Button
                    onClick={handleFinishCrop}
                    className={classes.button}
                    variant="contained"
                    color="primary"
                >
                    FINISH
                </Button>
            </Dialog>
        </>
    );
};

export default PictureInput;
