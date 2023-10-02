
const { response, request } = require('express');
const soapRequest = require('easy-soap-request');
const fs = require("fs");
const xmlBuilder = require("xmlbuilder");
const convert = require('xml-js');
const { resolve } = require("path");

const url = "http://ws.fonasa.cl:8080/Certificados/Previsional";
const headers = {
    "user-agent": "sampleTest",
    "Content-Type": "text/xml;charset=UTF-8",
    "soapAction": "getCertificadoPrevisional"
};



// const xml = fs.readFileSync("assets/fonasa.xml");

const obtenerPaciente = async(req = require, res = response) => {
    try {
        let { run, dverificador } = req.body;

        run = run.split("-");

        let xml = xmlBuilder
            .create("soapenv:Envelope")
            .att("xmlns:soapenv", "http://schemas.xmlsoap.org/soap/envelope/")
            .att("xmlns:cer", "http://certificadorprevisional.fonasa.gov.cl.ws/")
            .ele("soapenv:Header").up()
            .ele("soapenv:Body")
            .ele("cer:getCertificadoPrevisional")
            .ele("cer:query")
            .ele("cer:queryTO")
            .ele("cer:tipoEmisor", "10").up()
            .ele("cer:tipoUsuario", "1").up().up()
            .ele("cer:entidad", "61606407").up()
            .ele("cer:claveEntidad", "6160").up()
            .ele("cer:rutBeneficiario", `${run[0]}`).up()
            .ele("cer:dgvBeneficiario", `${dverificador}`).up()
            .ele("cer:canal", "1")
            .end({pretty: true});

        const response = await soapRequest({url: url, headers: headers, xml: xml});
        const responseXML = convert.xml2json(response.response.body);
        const parseXMLToJSON = JSON.parse(responseXML);
        const paciente = parseXMLToJSON.elements[0].elements[1].elements[0].elements[0].elements[9].elements;
        let previsionPaciente = parseXMLToJSON.elements[0].elements[1].elements[0].elements[0].elements[10].elements[6].elements;

        switch (previsionPaciente) {
                       case undefined:
                           previsionPaciente = 'Isapre: ' + parseXMLToJSON.elements[0].elements[1].elements[0].elements[0].elements[8].elements[0].text;
                           break;
                       default:
                           previsionPaciente = 'Fonasa: ' + parseXMLToJSON.elements[0].elements[1].elements[0].elements[0].elements[10].elements[6].elements[0].text
                           break;
                   };
        res.json({
          ok: true,
          run: `${paciente[0].elements[0].text}-${paciente[1].elements[0].text}`,
          nombre: paciente[2].elements[0].text,
          apellido_paterno: paciente[3].elements[0].text,
          apellido_materno: paciente[4].elements[0].text,
          fecha_nacimiento: paciente[5].elements[0].text,
          direccion: paciente[11].elements[0].text,
          telefono: paciente[16].elements != undefined ? paciente[16].elements[0].text : '0',
          nombre_genero: paciente[7].elements[0].text,
          nombre_comuna: paciente[15].elements[0].text,
          id_comuna: paciente[14].elements[0].text,
          prevision: previsionPaciente
        });

    } catch(error) {
      console.log(error)
        res.json({
            error: error,
            ok: false
        });
    }
}

module.exports = obtenerPaciente;
