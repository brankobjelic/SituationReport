import React from 'react'
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import {
    Document,
    Page,
    BlobProvider,
    Text,
    View,
    StyleSheet,
    Link,
    Font,
    Image
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
    },
    section: {
      margin: 10,
      padding: 10,
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
      width: '30%',
      height: 'auto',
      float: 'left',
      margin: 5,
      objectFit: 'scale-down',
      objectPosition: 'top',
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
                <View style={styles.imageSection}>
                  {report.pic1 &&<Image style={styles.image} src={requestUrl+report.pic1} />}
                  {report.pic2 &&<Image style={styles.image} src={requestUrl+report.pic2} />}
                  {report.pic3 &&<Image style={styles.image} src={requestUrl+report.pic3} />}
                </View>
                </Page>
        </Document>
    );

  return (
    <BlobProvider document={MyDoc}>
    {({ url }) => (
      <a href={url} target="_blank" style={{color: 'black'}}><FontAwesomeIcon icon={faFilePdf} size = 'lg' /></a>
    )}
  </BlobProvider>
  )
}

export default PdfDocument