import React from 'react'
import {
    Document,
    Page,
    BlobProvider,
    Text,
    View,
    StyleSheet,
    Link,
    Image
  } from "@react-pdf/renderer";

const PdfDocument = ({report, username, email}) => {
    var gpsLink = `https://google.com/maps/?q=${report.latitude},${report.longitude}`
    var mailLink = `mailto:${email}`
  // Create styles
  const styles = StyleSheet.create({
    page: {
      //backgroundColor: "#d11fb6",
      //color: "white",
    },
    section: {
      margin: 10,
      padding: 10,
    },
    viewer: {
      width: window.innerWidth, //the pdf viewer will take up all of the width and height
      height: window.innerHeight * 0.9,
    },
    image: {
      width: '50%',
      height: 'auto',
    },
  });
  
    const MyDoc = (
      <Document>
        <Page size="A4" style={styles.page}>
              <View style={styles.section}>
                <Text>Ustanova: {report.institution}</Text>
                <Text>Razlog prijave: {report.causeDescription}</Text>
              </View>
              <View style={styles.section}>
                <Text>Podnosilac prijave: {username} </Text><Link src={mailLink}></Link>
              </View>
              <View style={styles.section}>
                  <Link src={gpsLink}>Location on Google Maps</Link>
              </View>
              <View style={styles.section}>
                <Text>Predmet: {report.title}</Text>
                <Text>{report.description}</Text>
              </View>
              </Page>
      </Document>
    );

  return (
    <BlobProvider document={MyDoc}>
    {({ blob, url }) => (
      <a href={url} target="_blank">PDF</a>
    )}
  </BlobProvider>
  )
}

export default PdfDocument