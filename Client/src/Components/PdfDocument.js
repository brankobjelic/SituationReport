import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import {
    Document,
    Page,
    BlobProvider,
    Text,
    View,
    StyleSheet,
    Link,
    Font
  } from "@react-pdf/renderer";
  import TimesFont from '../Fonts/times.ttf'
  import TimesFontB from '../Fonts/timesbd.ttf'
  import TimesFontBI from   '../Fonts/timesbi.ttf'
  import TimesFontI from   '../Fonts/timesi.ttf'

const PdfDocument = ({report, userName, email}) => {
    var gpsLink = `https://google.com/maps/?q=${report.latitude},${report.longitude}`
    var mailLink = `mailto:${email}`

    //Register Font
    Font.register({
        family: 'TimesNewRoman',
        fonts: [
            { src: TimesFont }, // font-style: normal, font-weight: normal
            { src: TimesFontB, fontWeight: 700 }, // font-style: normal, font-weight: bold
            { src: TimesFontI, fontStyle: 'italic' },
            { src: TimesFontBI, fontStyle: 'italic', fontWeight: 700 },
           ]
    });

  // Create styles
  const styles = StyleSheet.create({
    page: {
      fontFamily: "TimesNewRoman",
      fontSize: "10px",
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
                    <Text>Podnosilac prijave: {userName} (<Link src={mailLink}>{email}</Link>)</Text>
                </View>
                <View style={styles.section}>
                        <Text>Adresa ili opis lokacije: {report.location}</Text>
                    <Text>GPS koordinate: <Link src={gpsLink}>{report.latitude},{report.longitude}</Link></Text>
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
      <a href={url} target="_blank" style={{color: 'black'}}><FontAwesomeIcon icon={faFilePdf} size = 'lg' /></a>
    )}
  </BlobProvider>
  )
}

export default PdfDocument