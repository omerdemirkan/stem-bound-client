import { ChangeEvent, useState, useRef } from "react";
import ReactCrop, { Crop } from "react-image-crop";
import Modal from "./Modal";
import { getCroppedImg } from "../../utils/helpers";

interface Props {
    onImageCropped: (blob: Blob) => any;
    imageName?: string;
}

const PictureInput: React.FC<Props> = ({ onImageCropped, imageName }) => {
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
        const croppedImage = await getCroppedImg(
            imageRef.current,
            crop,
            imageName || "image"
        );
        onImageCropped(croppedImage);
        setModalOpen(false);
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
