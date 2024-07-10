import React, { useEffect, useState } from 'react';
import PdfViewer from './Pdf-viewer';  // Adjust the import path
import { Loader } from '../Loader/loader';
import { GetfindingData } from '../services/Get-Findings';

const ExcelTableComponent: React.FC = () => {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        let token = window.localStorage.getItem('accessToken');
        token = token ? JSON.parse(token) : null;

        GetfindingData(token, (error, response) => {
            if (error) {
                setLoading(false);
            } else {
                console.log(response);
                if (response) {
                    createExcelTable(response);
                    setLoading(false);
                }
            }
        });
    }, []);

    const createExcelTable = (data: any) => {
        Excel.run(async (context) => {
            const sheet = context.workbook.worksheets.getActiveWorksheet();

            let existingTable = sheet.tables.getItemOrNullObject("FindingsTable");
            existingTable.load();
            await context.sync();

            if (!existingTable.isNullObject) {
                existingTable.delete();
                await context.sync();
            }

            const headers = [["ID", "Location", "Pages", "Box Coordinates"]];
            const rows = data.map((finding: any) => {
                const coordinates = finding.boxes.map((box: any) => `(${box.x}, ${box.y})`).join(" | ");
                return [finding.id, finding.location, finding.page, coordinates];
            });
            const table = sheet.tables.add("A1:D1", true);
            table.name = "FindingsTable";
            table.getHeaderRowRange().values = headers;
            table.rows.add(null, rows);
            sheet.getRange("A1:D1").format.autofitColumns();
            sheet.getRange("A1:D1").format.autofitRows();

            await context.sync();
        }).catch((error) => {
            console.error("Error creating or deleting table:", error);
        });
    };

    const onSelectionChanged = (eventArgs: Excel.SelectionChangedEventArgs) => {
        console.log(eventArgs)
        return Excel.run(function (context) {
            var selectedRange = context.workbook.getSelectedRange();
            selectedRange.load("values");

            return context.sync()
                .then(function () {
                    const selectedValue = selectedRange.values[0][0];
                    if (isValidURL(selectedValue)) {
                        setPdfUrl(selectedValue);
                    } else {
                        setPdfUrl(null);
                    }
                });
        }).catch(function (error) {
            console.error("Error: " + error);
            if (error instanceof OfficeExtension.Error) {
                console.error("Debug info: " + JSON.stringify(error.debugInfo));
            }
        });
    };

    const isValidURL = (string: string) => {
        try {
            new URL(string);
            return true;
        } catch {
            return false;
        }
    };

    useEffect(() => {
        Excel.run(function (context) {
            context.workbook.onSelectionChanged.add(onSelectionChanged);
            return context.sync();
        }).catch(function (error) {
            console.error("Error registering selection changed event:", error);
            if (error instanceof OfficeExtension.Error) {
                console.error("Debug info: " + JSON.stringify(error.debugInfo));
            }
        });
    }, []);

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ flex: '4' }}>
                    <PdfViewer pdfUrl={pdfUrl} />
                </div>
            </div>
            {loading && <Loader />}
        </>
    );
};

export default ExcelTableComponent;
