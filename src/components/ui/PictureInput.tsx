import Modal from "./Modal";
import ReactCrop, { Crop } from "react-image-crop";
import { getCroppedImg, blobToFile } from "../../utils/helpers";
import { ChangeEvent, useState, useRef, Ref } from "react";

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
        const croppedImageBlob = await getCroppedImg(
            imageRef.current,
            crop,
            fileName
        );

        const file = blobToFile(croppedImageBlob, fileName);
        console.log(file);
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
            <button onClick={() => inputRef.current.click()}>
                {buttonText || "Select Image"}
            </button>
            <Modal open={modalOpen} width="800px">
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
                <button onClick={handleCancelCrop}>CANCEL</button>
                <button onClick={handleFinishCrop}>FINISH</button>
            </Modal>
        </>
    );
};

export default PictureInput;
