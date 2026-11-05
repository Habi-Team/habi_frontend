/** Ejecutar: node test_static.js. Valida contratos de las plantillas sin navegador. */
const fs=require('fs'),vm=require('vm'),path=require('path');
const context={window:{},document:{fonts:null},Intl,Date,console};vm.createContext(context);
for(const file of ['js/data.js','js/icons.js','js/screens.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'..',file),'utf8'),context,{filename:file});
const {render}=context.window.HabiScreens;
const state={page:'inicio', docFilter:'Todos',taskFilter:'Todos',notifFilter:'Todas',guideFilter:'Todas',read:new Set([103,104]),uploaded:new Set(),year:2026,month:9,selectedDate:null,query:'',regularDate:'2026-11-30',earlyDate:'2026-11-15',result:null,plusError:''};
const tests=[];
const test=(name,ok)=>{tests.push({prueba:name,resultado:ok?'APROBADA':'FALLIDA'});console.log(ok?'OK':'FAIL',name)};
const map={inicio:'Hola, Lucía',seguimiento:'Mi proceso',documentos:'Mis documentos',tramites:'Mis trámites',agenda:'Mi agenda',notificaciones:'Notificaciones',guias:'Guías del proceso',plus:'Un cierre más ágil',menu:'Explorar'};
for(const [route,expected] of Object.entries(map)){
try{ const html=render[route](state);test('Render '+route,html.includes(expected)&&html.length>300&&!html.includes('undefined'))}catch(e){test('Render '+route,false);console.log(e.stack)}
}
let html=render.documentos(state);test('Documentos: 4 elementos', (html.match(/class="card file-card"/g)||[]).length===4);
state.docFilter='Pendiente';html=render.documentos(state);test('Documentos: 2 pendientes', (html.match(/class="card file-card"/g)||[]).length===2);
state.uploaded.add('certificado');html=render.documentos(state);test('Entrega cambia filtro pendientes', (html.match(/class="card file-card"/g)||[]).length===1);
html=render.inicio(state);test('Inicio refleja entrega simulada', html.includes('Documento enviado a revisión'));
state.docFilter='En revisión';html=render.documentos(state);test('En revisión: original y simulado', (html.match(/class="card file-card"/g)||[]).length===2);
html=render.tramites(state);test('Trámites refleja en revisión',html.includes('En revisión'));
state.query='nada123';html=render.guias(state);test('Guías: vacío correcto',html.includes('Prueba otra palabra'));
state.query='firma';html=render.guias(state);test('Guías: coincidencia',html.includes('Antes de la firma'));
state.notifFilter='Sin leer';state.read=new Set([101,102,103,104]);html=render.notificaciones(state);test('Notificaciones: vacío correcto',html.includes('No hay notificaciones'));
state.result=15;html=render.plus(state);test('Habi Plus: resultado de ejemplo',html.includes('15</b>'));
state.result=null;state.plusError='La fecha anticipada debe ser anterior a la fecha habitual.';html=render.plus(state);test('Habi Plus: error accesible',html.includes('role="alert"') && html.includes('aria-invalid="true"'));
state.month=10;state.selectedDate='2026-11-03';html=render.agenda(state);test('Agenda: filtra día con evento',html.includes('Revisión de requisitos'));
html=render.menu(state);test('Menú: restablecimiento',html.includes('data-action="reset"'));
test('Diferencia fechas 15 días',(Date.parse('2026-11-30T12:00:00Z')-Date.parse('2026-11-15T12:00:00Z'))/86400000===15);
const summary={tipo:'Pruebas estáticas de renderizado y contratos; no pruebas de usuario ni E2E en navegador',version:'2.1',fecha:'2026-10-29',cantidad:tests.length,aprobadas:tests.filter(x=>x.resultado==='APROBADA').length,fallidas:tests.filter(x=>x.resultado==='FALLIDA').length,pruebas:tests,limitacion:'Navegador Chromium bloqueado por política administrativa URLBlocklist=*; no se ejecutaron interacciones reales en browser ni capturas de versión 2.1.'};fs.writeFileSync(path.join(__dirname,'RESULTADOS_VERIFICACION.json'),JSON.stringify(summary,null,2));
process.exitCode=summary.fallidas?1:0;
