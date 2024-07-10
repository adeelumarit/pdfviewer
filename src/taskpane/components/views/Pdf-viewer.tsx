import React, { useEffect, useRef } from 'react';
interface PdfViewerProps {
    pdfUrl: string | null;
}
const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const snipResultRef = useRef<HTMLDivElement>(null);
    console.log(pdfUrl)
    useEffect(() => {
        const url = '../../../../assets/ss.pdf';
        //const url = 'https://christophdrayss.github.io/docupulse_landingpage/api/contract_21.pdf';

        const loadingTask = (window as any).pdfjsLib.getDocument(url);

        const canvas = canvasRef.current!;
        const context = canvas.getContext('2d')!;
        let startX: number, startY: number, endX: number, endY: number, isSnipping = false;

        loadingTask.promise.then((pdf: any) => {
            pdf.getPage(1).then((page: any) => {
                const scale = 1.5;
                const viewport = page.getViewport({ scale });
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                };
                page.render(renderContext);
            });
        });

        const handleMouseDown = (event: MouseEvent) => {
            startX = event.offsetX;
            startY = event.offsetY;
            isSnipping = true;
        };

        const handleMouseUp = (event: MouseEvent) => {
            endX = event.offsetX;
            endY = event.offsetY;
            isSnipping = false;

            const width = endX - startX;
            const height = endY - startY;
            if (width && height) {
                snipImage(startX, startY, width, height);
            }
        };

        const snipImage = (x: number, y: number, width: number, height: number) => {
            const snipCanvas = document.createElement('canvas');
            const snipContext = snipCanvas.getContext('2d')!;
            snipCanvas.width = width;
            snipCanvas.height = height;

            snipContext.drawImage(canvas, x, y, width, height, 0, 0, width, height);
            const snipImageDataURL = snipCanvas.toDataURL('image/png');

            const snipResult = snipResultRef.current!;
            snipResult.innerHTML = `<img src="${snipImageDataURL}" alt="Snipped Image">`;

            sendImageToAPI(snipImageDataURL);
        };

        const sendImageToAPI = (imageDataURL: string) => {
            console.log(imageDataURL)
            // const apiUrl = 'https://example.com/api/upload'; // Replace with your API endpoint
            // const data = {
            //     image: imageDataURL,
            // };

            // fetch(apiUrl, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(data),
            // })
            //     .then(response => response.json())
            //     .then(data => {
            //         console.log('Success:', data);
            //     })
            //     .catch(error => {
            //         console.error('Error:', error);
            //     });
        };

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mouseup', handleMouseUp);

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <div>
            <canvas id="pdf-canvas" ref={canvasRef} style={{ border: '1px solid black', cursor: 'crosshair' }}></canvas>
            <div id="snip-result" ref={snipResultRef} style={{ marginTop: '20px', border: '1px solid black' }}></div>
        </div>
    );
};

export default PdfViewer;
