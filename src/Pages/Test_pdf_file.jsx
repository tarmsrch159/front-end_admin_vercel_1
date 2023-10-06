import React from 'react'
//About export a report
import { useReactToPrint } from "react-to-print"
import { Page, Text, Image, Document, StyleSheet } from "@react-pdf/renderer"
function Test_pdf_file() {
    
    const styles = StyleSheet.create({
        body: {
            paddingTop: 35,
            paddingBottom: 65,
            paddingHorizontal: 35
        },
        title: {
            fonSize: 24,
            textAlign: "center",
        },
        text: {
            margin: 12,
            fontSize: 14,
            textAlign: "justify",
        },
        header: {
            fontSize: 12,
            marginBottom: 20,
            textAlign: "center",
            color: "grey",
        },
        pageNumber: {
            position: "absolute",
            fontSize: 12,
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: "center",
            color: 'grey',
        }
    })
    return (
        
            <Document>
                <Page style={styles.body}>
                    <Text style={styles.header} fixed>
                    </Text>


                    <Text style={styles.text}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora esse eligendi, nihil vero soluta quaerat ducimus tempore corporis laborum dolor iure laudantium ullam quasi, officia reiciendis impedit ab nam illo.
                    </Text>


                    <Text style={styles.pageNumber}
                        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
                        fixed></Text>
                </Page>
            </Document>
        
    )
}

export default Test_pdf_file