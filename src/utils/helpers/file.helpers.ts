import { Crop } from "react-image-crop";

export function getCroppedImg(
    image: HTMLImageElement,
    crop: Crop,
    fileName: string
): Promise<Blob> {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
    );

    // As Base64 string
    // const base64Image = canvas.toDataURL('image/jpeg');

    // As a blob
    return new Promise((resolve, reject) =>
        canvas.toBlob(
            (blob) => {
                // @ts-ignore
                blob.name = fileName;
                resolve(blob);
            },
            "image/jpeg",
            1
        )
    );
}

export function blobToFile(theBlob: Blob, fileName: string): File {
    var b: any = theBlob;
    b.lastModifiedDate = Date.now();
    return new File([theBlob], fileName);
}
