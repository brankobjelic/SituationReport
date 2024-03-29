import React from 'react'
import { useContext } from 'react';
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
    Font,
    Image,
    PDFViewer
  } from "@react-pdf/renderer";
  import TimesFont from '../Fonts/times.ttf'
  import TimesFontB from '../Fonts/timesbd.ttf'
  import TimesFontBI from   '../Fonts/timesbi.ttf'
  import TimesFontI from   '../Fonts/timesi.ttf'
  import FetchContext from '../Store/fetch-context';


const PdfDocument = ({report, userName, email}) => {
    const ctx = useContext(FetchContext)
    var gpsLink = `https://google.com/maps/?q=${report.latitude},${report.longitude}`
    var mailLink = `mailto:${email}`
    const imageEndpoint="api/reports/getimage?name="
    var requestUrl = ctx.protocol + ctx.host + ctx.port + imageEndpoint

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
      fontSize: "12px",
      textAlign: "justify",
    },
    section: {
      margin: 10,
      padding: 10,
    },
    dateSection: {
      marginLeft: 10,
      marginBottom: 0,
      marginTop: 10,
      paddingLeft: 10,
    },
    viewer: {
      width: window.innerWidth, //the pdf viewer will take up all of the width and height
      height: window.innerHeight * 0.9,
    },
    imageSection: {
      display: 'flex',
      flexDirection: "row",
      flexWrap: "wrap",
      margin: 10,
      padding: 10,
    },
    image: {
      width: '170',
      height: '170',
      float: 'left',
      margin: 5,
      objectFit: 'scale-down',
    },
  });
  
    const MyDoc = (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.dateSection}>
                    <Text>Datum i vreme: {new Date(report.dateAndTime).toLocaleString('sr-RS')}</Text>
                </View>
                <View style={styles.section}>
                    <Text>Ustanova: {report.institution}</Text>
                    <Text>Razlog prijave: {report.causeDescription}</Text>
                </View>
                <View style={styles.section}>
                    <Text>Podnosilac prijave: {userName} (<Link src={mailLink}>{email}</Link>)</Text>
                </View>
                <View style={styles.section}>
                        <Text>Adresa ili opis lokacije: {report.location}</Text>
                    {report.latitude ? <Text>GPS koordinate: <Link src={gpsLink}><Text>{report.latitude},{report.longitude}</Text></Link></Text> : null}
                </View>
                <View style={styles.section}>
                    <Text>Predmet: {report.title}</Text>
                    <Text>{report.description}</Text>
                </View>
                <View style={styles.imageSection}>
                  {report.pic1 ? <Link src={requestUrl+report.pic1}><Image style={styles.image} src={requestUrl+report.pic1} /></Link> : null}
                  {report.pic2 ? <Link src={requestUrl+report.pic2}><Image style={styles.image} src={requestUrl+report.pic2} /></Link> : null}
                  {report.pic3 ? <Link src={requestUrl+report.pic3}><Image style={styles.image} src={requestUrl+report.pic3} /></Link> : null}
                </View>
                </Page>
        </Document>
    );

  return (
    <BlobProvider document={MyDoc}>
    {({ url }) => (
      <a href={url} target="_blank" rel="noopener noreferrer" style={{color: 'black'}}><FontAwesomeIcon icon={faFilePdf} size = 'xl' /></a>
    )}
  </BlobProvider>

  )
}

export default PdfDocument