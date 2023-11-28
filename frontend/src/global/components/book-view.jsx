import React, { useEffect, useState, useContext } from "react";
import Box from '@mui/material/Box';
import { SpecialZoomLevel, Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import packageJson from "../../../package.json";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { ProtectBook } from "../protect/protected-book";

export default function BookView() {

    const { view } = useContext(ProtectBook);

    const pdfjsVersion = packageJson.dependencies['pdfjs-dist'];
    const workerUrl = `https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.js`
    const renderToolbar = (Toolbar) => (
        <Toolbar>
            {({
                Zoom,
                ZoomIn,
                ZoomOut,
            }) => (
                <div
                    style={{
                        alignItems: 'center',
                        display: 'flex',
                        width: '100%',
                    }}
                >
                    <div style={{ padding: '0px 2px' }}>
                        <ZoomOut />
                    </div>
                    <div style={{ padding: '0px 2px' }}>
                        <Zoom levels={[0.2, 0.5, 1.0, 1.2, 1.4, 1.5]} />
                    </div>
                    <div style={{ padding: '0px 2px' }}>
                        <ZoomIn />
                    </div>
                </div>
            )}
        </Toolbar>
    );

    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        renderToolbar,
        sidebarTabs: (defaultTabs) => [
            // defaultTabs[0], // Thumbnails tab
        ],
    });

    return (
        <Box>
            <div
                className="rpv-core__viewer"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    backgroundColor: '#1a1a1a',
                }}
            >
                <div
                    style={{
                        flex: 1,
                    }}
                >
                    <Worker workerUrl={workerUrl}>
                        <Viewer
                            theme={'dark'}
                            fileUrl={view}
                            plugins={[defaultLayoutPluginInstance]}
                            defaultScale={SpecialZoomLevel.ActualSize}
                        />
                    </Worker>
                </div>
            </div>
        </Box>
    )
}