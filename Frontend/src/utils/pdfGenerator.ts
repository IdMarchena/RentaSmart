export const generateContractPDF = (contractContent: string, _fileName: string = 'contrato-arrendamiento.pdf'): void => {
    // Crear una ventana nueva para imprimir
    const printWindow = window.open('', '_blank');
    
    if (!printWindow) {
        alert('No se pudo abrir la ventana de impresión. Por favor, permite las ventanas emergentes.');
        return;
    }

    // Estilos CSS para el contrato
    const styles = `
        <style>
            @page {
                margin: 2cm;
                size: A4;
            }
            
            body {
                font-family: 'Times New Roman', serif;
                font-size: 12pt;
                line-height: 1.5;
                color: #000;
                margin: 0;
                padding: 0;
            }
            
            .contract-header {
                text-align: center;
                font-size: 16pt;
                font-weight: bold;
                margin-bottom: 30px;
                text-transform: uppercase;
            }
            
            .section-title {
                font-size: 14pt;
                font-weight: bold;
                margin: 20px 0 10px 0;
                text-transform: uppercase;
            }
            
            .section-content {
                margin-bottom: 15px;
                text-align: justify;
            }
            
            .signature-line {
                margin-top: 50px;
                border-bottom: 1px solid #000;
                width: 300px;
                text-align: center;
            }
            
            .signature-container {
                display: flex;
                justify-content: space-between;
                margin-top: 30px;
            }
            
            .signature-box {
                width: 45%;
            }
            
            .witness-section {
                margin-top: 40px;
            }
            
            @media print {
                body {
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }
                
                .no-print {
                    display: none;
                }
            }
        </style>
    `;

    // Formatear el contenido del contrato con HTML
    const formattedContent = contractContent
        .split('\n')
        .map(line => {
            // Títulos de secciones (números romanos)
            if (line.match(/^[IVX]+\. .+/)) {
                return `<div class="section-title">${line}</div>`;
            }
            // Líneas de firmas
            else if (line.includes('_________________________')) {
                return `<div class="signature-line">${line}</div>`;
            }
            // Líneas en blanco
            else if (line.trim() === '') {
                return '<br>';
            }
            // Contenido normal
            else {
                return `<div class="section-content">${line}</div>`;
            }
        })
        .join('');

    // HTML completo
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Contrato de Arrendamiento</title>
            ${styles}
        </head>
        <body>
            <div class="contract-header">
                CONTRATO DE ARRENDAMIENTO DE INMUEBLE URBANO
            </div>
            ${formattedContent}
            
            <div class="no-print" style="margin-top: 30px; text-align: center;">
                <button onclick="window.print()" style="
                    background: #007bff;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 14px;
                    margin: 10px;
                ">Imprimir Contrato</button>
                
                <button onclick="window.close()" style="
                    background: #6c757d;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 14px;
                    margin: 10px;
                ">Cerrar</button>
            </div>
        </body>
        </html>
    `;

    // Escribir el contenido en la ventana
    printWindow.document.write(htmlContent);
    printWindow.document.close();

    // Esperar a que se cargue el contenido y luego mostrar el diálogo de impresión
    printWindow.onload = () => {
        setTimeout(() => {
            printWindow.print();
        }, 500);
    };
};

// Función alternativa para descargar como archivo de texto
export const downloadContractAsText = (contractContent: string, fileName: string = 'contrato-arrendamiento.txt'): void => {
    const blob = new Blob([contractContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
};
