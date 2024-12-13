export interface Miembro {
  id:                   string;
  nombres:              string;
  apellidos:            string;
  tipoDocumento:        string;
  numeroDocumento:      string;
  fechaNacimiento:      Date;
  edad:                 number;
  ciudadNacimiento:     string;
  paisNacimiento:       string;
  estudia:              boolean;
  grado:                string;
  institucionEducativa: string;
  eps:                  string;
  tieneSisbem:          boolean;
  grupoPoblacional:     string;
  grupoEtnico:          string;
  discapacidad:         boolean;
  condicionMedica:      string;
  estado:               boolean;
  imagenUrl:            string;
}
