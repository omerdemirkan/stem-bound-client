import Modal from "./Modal";
import ReactCrop, { Crop } from "react-image-crop";
import { getCroppedImg } from "../../utils/helpers";
import { ChangeEvent, useState, useRef } from "react";

interface Props {
    onRawImageCreated?: (rawImage: string | ArrayBuffer) => any;
    onBlobCreated?: (blob: Blob) => any;
    baseFileName: string;
}

const PictureInput: React.FC<Props> = ({
    onRawImageCreated,
    onBlobCreated,
    baseFileName,
}) => {
    const [src, setSrc] = useState<string | ArrayBuffer>();
    const imageRef = useRef<HTMLImageElement>();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [crop, setCrop] = useState<Crop>({
        aspect: 1,
        unit: "%",
        width: 50,
    });

    function handleFileSelected(event: ChangeEvent<HTMLInputElement>): void {
        const file = event.target.files[0];
        if (file.size / Math.pow(2, 20) > 5) return;
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
        onBlobCreated && onBlobCreated(croppedImageBlob);

        if (onRawImageCreated) {
            const reader = new FileReader();

            reader.onload = () => onRawImageCreated(reader.result);
            reader.readAsDataURL(croppedImageBlob);
            setModalOpen(false);
        }
    }

    function handleCancelCrop() {
        setModalOpen(false);
    }

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileSelected} />
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
        </div>
    );
};

export default PictureInput;
