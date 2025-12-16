/* eslint-disable react/no-unescaped-entities */
import { Montserrat } from "next/font/google";
import NavbarNuestroSistema from "./navbar-nuestro-sistema";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "900"],
  display: "swap",
  preload: false,
});

export default function TerminosYCondiciones() {
  return (
    <div className={`${montserrat.className} bg-[#f8f9fd] min-h-screen`}>
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-3 bg-[#f3fbff] bg-opacity-100 z-50">
        <NavbarNuestroSistema />
      </header>

      <br />
      <br />
      <br />
      <section className="mt-12 text-gray-800 px-6 md:px-16 py-12 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#000080] mb-6">
          Términos y Condiciones
        </h1>
        <p className="text-lg font-normal text-center max-w-2xl mx-auto mb-12">
          Bienvenido a GetGo. A continuación, te presentamos nuestros términos y
          condiciones de uso. Te recomendamos leerlos atentamente.
        </p>

        <div className="space-y-10 text-justify text-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-[#000080] italic mb-2 tracking-tight">
              1. ANTECEDENTES GENERALES
            </h2>
            <p>
              GETGO SOCIAL MARKETING SpA es una empresa dedicada principalmente
              a la gestión del servicio de transporte privado de pasajeros,
              cumpliendo siempre con todas las normas y directrices emanadas del
              Ministerio de Transportes (en adelante, “GETGO”). La información o
              el uso de la información proporcionada y disponible en el portal
              de GETGO o a través del propio dispositivo móvil, está sujeta a
              los siguientes términos y condiciones (en adelante, los “Términos
              y Condiciones”). Estos Términos y Condiciones de uso rigen las
              relaciones legales y contractuales entre GETGO y quienes utilicen
              las aplicaciones, páginas web, contenido, productos y servicios
              puestos a disposición por GETGO (en adelante, los “Servicios”), de
              todos sus dominios, subdominios, páginas y subpáginas y otras
              plataformas de distribución digital, ya sea en la forma de
              contenido, aplicaciones en una computadora local o servicios de
              aplicación provistos de manera remota vía internet, teléfono,
              correo electrónico o por cualquier otro medio. En ese sentido,
              tanto el Cliente solicitante de los servicios (en adelante, el
              “Socio Usuario”) como los Terceros Proveedores que realicen el
              servicio de transporte de pasajeros (en adelante, el “Socio
              Conductor”) y que en ambos casos utilicen las plataformas de
              GETGO, aceptan estos Términos y Condiciones, así como el contenido
              de los Servicios en su forma actual, inteligencia de negocios, u
              otro afín, al utilizar los Servicios, plataforma o cualquiera de
              sus partes. GETGO se reserva el derecho de modificar estos
              Términos y Condiciones, al igual que los servicios o cualquier
              parte de los mismos en cualquier tiempo. Socio Usuario o Socio
              Conductor al momento de interactuar y/o utilizar el cualquiera de
              los servicios de GETGO después de las modificaciones en los
              Términos y Condiciones, en los Servicios entregados por GETGO, o
              parche y/o aplicación y/o instalación de nueva versión del
              aplicativo, éste estará aceptando tácitamente dichos cambios, lo
              que implica que estará de acuerdo con la nueva forma del Servicio
              y/o de los nuevos Términos y Condiciones. GETGO se reserva el
              derecho de suspender o dar de baja a cualquier Usuario que, a
              exclusivo criterio de GETGO, no cumpla con los estándares
              definidos en estas Términos y Condiciones o con las políticas
              vigentes de GETGO, sin que ello genere derecho a resarcimiento
              alguno.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#000080] italic mb-2 tracking-tight">
              2. RELACIÓN CONTRACTUAL
            </h2>
            <p>
              Las presentes Términos y Condiciones regulan el acceso o uso que
              terceros hagan de los Servicios puestos a disposición por GETGO,
              lo que es expresamente aceptado por cada uno de los terceros que
              hagan uso de los referidos Servicios. Los Usuarios reconocen que
              GETGO provee solamente los Servicios aquí indicados, y que la
              función de transporte la realiza exclusivamente el Socio
              Conductor, siendo esta una estricta relación civil entre el ambos,
              que no constituye a GETGO como proveedor final de ese servicio, ni
              en un operador de movilidad. En consecuencia, GETGO no participa
              ni se hace responsable de manera alguna por la relación civil
              entre los Socio Usuario y Socios Conductores, ni por la
              interacción entre ellos o terceros. Será el Socio Conductor el
              responsable de la calidad del servicio de transporte y de la
              seguridad al manejar de conformidad con las disposiciones de los
              Términos y Condiciones y las leyes aplicables. Igualmente, en el
              caso de que, por culpa del Socio Conductor, un tercero (incluidos
              el Socio Usuario) sufra cualquier daño o agravio, el Socio
              Conductor deberá cubrir la indemnización que corresponda. En caso
              de que el Socio Conductor sea culpable de cualquier daño o agravio
              derivado de su actuación o del incumplimiento de los presentes
              Términos y Condiciones, que cause cualquier pérdida GETGO, deberá
              resarcirlo en su totalidad en favor del perjudicado.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#000080] italic mb-2 tracking-tight">
              3. DE LOS SERVICIOS
            </h2>
            <p>
              Los Servicios prestados por GETGO consisten en la intermediación y
              gestión del transporte privado de pasajeros, generando vínculos
              entre móviles (Socios Conductores) y clientes (Socios Usuarios) de
              la aplicación, mediante el uso de una plataforma de tecnología que
              permite a los Socios Usuarios de aplicaciones móviles de GETGO o
              páginas web proporcionadas como parte de los Servicios, organizar
              y planear el transporte y/o servicios de logística con proveedores
              terceros, independientes de dichos servicios, incluidos terceros
              transportistas independientes y terceros proveedores logísticos
              independientes, conforme a un acuerdo con previo entre estos y
              GETGO. El Socio (Usuario y/o Conductor) entiende y reconoce que
              los servicios de GETGO se limitan a intermediar entre el Socio
              Usuario solicitante del Servicio y el Socio Conductor que utilice
              la plataforma GETGO, cumpliendo con los estándares, valores y
              principios que dictamina la empresa.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#000080] italic mb-2 tracking-tight">
              4. DEL ESTÁNDAR DE LOS SERVICIOS
            </h2>
            <p>
              Somos una comunidad donde el éxito se comparte. Nuestras ganancias
              se distribuyen de manera justa entre todos los miembros de la
              plataforma. Como GETGO nuestra misión es conectar con personas
              para transportar con seguridad, eficiencia y puntualidad. Y
              nuestra visión es liderar el transporte por aplicación en
              Latinoamérica, poniendo la seguridad, innovación y tecnología al
              servicio de nuestros socios y de un futuro más conectado. Nuestros
              Objetivos;
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
              <li>
                Proporcionar soluciones de transporte personalizadas e
                innovadoras que conecten personas de forma segura.
              </li>
              <li>
                Ofrecer servicios de transporte confiable, seguro y eficiente.
              </li>
              <li>
                Ser una plataforma con servicios seguros para los usuarios.
              </li>
              <li>Entregar servicios diferenciados.</li>
              <li>
                Inspirar y apoyar a nuestros socios para que construyan negocios
                prósperos y sostenibles.
              </li>
              <li>Entregar beneficios para conductores y usuarios.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#000080] italic mb-2 tracking-tight">
              5. SOBRE LOS SOCIOS USUARIOS
            </h2>
            <p>
              El Socio Usuario comprende que antes o aún después de haberle a
              GETGO, proporcionado la información solicitada, GETGO se reserva
              el derecho de no prestarle los Servicios por criterios internos de
              GETGO u otros factores, determinados intrínsecamente por GETGO Los
              Socios Usuarios se comprometen a usar las credenciales y/o acceso
              a la plataforma de forma personal e intransferible, no pudiendo
              solicitar o prestar los Servicios por cuenta o en beneficio
              distintos de los indicados en la titularidad del Servicio
              solicitado. El Servicio no está disponible para el uso de personas
              menores de 18 años. Asimismo, no se permitirá el transporte de
              personas menores de 18 años, a menos que aquellos sean acompañados
              por el Titular del Servicio. En el uso de los Servicios, los
              Socios Usuarios no causarán estorbos, molestias, incomodidades o
              daños al Móvil y menos al Socio Conductor, tanto entre ellos como
              a terceros no participantes del Servicio, debiendo cumplir en
              todos los casos con la conducta esperada por una persona
              razonable. De todas formas, se encuentra expresamente prohibida la
              utilización de la plataforma por personas en manifiesto estado de
              ebriedad o intemperancia. En algunos casos, se le podrá requerir
              que facilite un documento de identidad u otro elemento de
              verificación de identidad para el acceso o uso de los Servicios, y
              usted acepta que se le podrá denegar el acceso o uso de los
              Servicios si se niega a facilitar el documento de identidad o el
              elemento de verificación de identidad.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#000080] italic mb-2 tracking-tight">
              6. REGISTRO DEL SOCIO USUARIOS
            </h2>
            <p>
              Para ser Socio Usuario de la plataforma de GETGO la persona debe
              descargar la aplicación, instalarla en su dispositivo móvil y
              completar exitosamente los procesos de registro que se solicitan.
              Al registrarse, el Socio Conductor deberá asegurarse que toda la
              información personal haya proporcionado sea fidedigna, honesta,
              precisa, completa y válida, así mismo se deberá encontrar al día.
              De lo anterior GETGO Podrá solicitar validación presencial de
              documentos con el fin de validar su legitimidad. El Socio
              Conductor y cualquier persona que use GETGO (Socio Conductor o
              Socio Usuario) deberá tener al menos 18 años de edad o la mayoría
              de edad fijada en la jurisdicción. GETGO no asume responsabilidad
              por Socios Usuarios que violen la disposición de mayoría de edad,
              y sus responsables, tutores o acudientes, por lo que, en dicho
              caso, serán los responsables, tutores o acudientes quienes
              asumirán directamente cualquier responsabilidad y consecuencia
              relativa a los presentes Términos y Condiciones. El Socio Usuario
              no cederá o transferirá de ninguna forma la cuenta vinculada a su
              nombre para efectos de GETGO a ninguna persona natural o jurídica.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#000080] italic mb-2 tracking-tight">
              7. LICENCIA
            </h2>
            <p>
              Sujeto al cumplimiento de estas Condiciones, GETGO otorga a Socios
              Usuarios y Socios Conductores una licencia limitada,
              intransferible y esencialmente revocable para el acceso y uso de
              las Aplicaciones en su dispositivo personal y/o página web, solo
              en relación con su uso de los Servicios. Cualquier otro derecho no
              licenciado no se entenderá como parte de estos Términos y
              Condiciones, a menos que así lo disponga un contrato entre las
              partes.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#000080] italic mb-2 tracking-tight">
              8. SUSPENSIÓN
            </h2>
            <p>
              GETGO determinará, a su entera discreción, si ha ocurrido un
              incumplimiento de los presentes Términos y Condiciones por parte
              los Socios Usuarios de las plataformas de GETGO Cuando haya
              ocurrido un incumplimiento de estos Términos y Condiciones, la
              Empresa podrá tomar las medidas que considere adecuadas. Un
              incumplimiento de los presentes Términos y Condiciones podrá
              resultar, de manera enunciativa pero no limitativa, en las
              siguientes medidas:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
              <li>
                Notificación del incumplimiento incurrido y reiteración al Socio
                Conductor de las obligaciones correspondientes y de las
                consecuencias de no darles cumplimiento;
              </li>
              <li>
                Notificación a las autoridades competentes sobre actos que
                impliquen incumplimiento de los Términos y Condiciones o de las
                disposiciones jurídicas aplicables, así como de cualquier dato
                relevante;
              </li>
              <li>
                Suspensión y/o retiro inmediato, temporal o permanente del
                derecho del Usuario de utilizar las plataformas de GETGO;
              </li>
              <li>
                Presentar acciones legales y demandas en contra del Usuario para
                obtener el reembolso todos los costos sobre una base de
                indemnización (incluyendo, sin limitarse a, costos razonables
                administrativos y de abogados) que resulten del incumplimiento;
              </li>
              <li>Acciones legales adicionales en contra del Socio Usuario.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#000080] italic mb-2 tracking-tight">
              9. SERVICIOS SUPLEMENTARIOS
            </h2>
            <p>
              Se podrán aplicar condiciones suplementarias a determinados
              Servicios, como políticas para un evento, una actividad o una
              promoción particular, y dichas condiciones suplementarias se le
              comunicarán en relación con los Servicios aplicables. Las
              condiciones suplementarias se establecen además de las
              Condiciones, y se considerarán una parte de estas, para los fines
              de los Servicios aplicables. Las condiciones suplementarias
              prevalecerán sobre las Condiciones en el caso de conflicto con
              respecto a los Servicios aplicables.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#000080] italic mb-2 tracking-tight">
              10. PAGO Y FACTURACIÓN
            </h2>
            <p>
              El pago por los Servicios proporcionados por GETGO y el Socio
              Conductor del Móvil se cobrará directamente al Cliente, pudiendo
              utilizarse las formas de tarjeta de crédito, a través de los datos
              facilitados por el Socio Usuario Solicitante al momento de
              registrarse. El precio de las tarifas es mostrado en pesos
              chilenos antes de solicitar el servicio, siempre y cuando el Socio
              Usuario Solicitante señale el lugar de destino; o mediante el uso
              de cupones o tickets de descuento emitidos por GETGO, como
              mecanismos de incentivo del uso de la aplicación, de conformidad a
              los términos y condiciones establecidos para cada uno de ellos. El
              uso de cupones podrá utilizarse para cubrir la totalidad o parte
              del pago total de los servicios del Socio Conductor, pudiendo ser
              pagada la diferencia a través de efectivo o tarjetas de crédito.
              Para el caso de tarjetas de crédito, el monto señalado en la
              Aplicación no incluye la comisión que cobra cada banco por el uso
              de la misma. Los Socios Usuarios aceptan que puede haber
              circunstancias fuera del control de GETGO que podrían causar que
              una tarjeta de crédito y/u otro medio utilizado sea rechazado. Las
              tarifas aplicables al servicio serán cobradas de forma automática,
              una vez finalizado el traslado, a través de los datos de la
              tarjeta de crédito facilitados por el Cliente en la Aplicación. Se
              realizará una retención equivalente al monto del viaje realizado
              previo al comienzo del viaje con la finalidad de validar que el
              instrumento de pago posee los fondos suficientes para su uso.
              Cuando un Socio Usuario solicitante facilita una nueva tarjeta de
              crédito, se podrá realizar una validación de dicho instrumento de
              pago mediante un cobro y reintegro del mismo por un monto no
              superior al equivalente a USD 10. Si por algún motivo el
              instrumento de pago que el Socio Usuario solicitante ha designado
              no cuenta con fondos suficientes, ha caducado su vigencia, es
              inválido o de otro modo no sirve para cobrarle, el Socio Usuario
              acepta que GETGO utilice o lo contacte para proporcionar un método
              de pago alternativo. GETGO podrá bloquear de forma parcial o
              permanente al Socio Usuario por falta de pago o cuando se tenga
              noticia de operaciones fraudulentas efectuadas con los referidos
              medios de pago. Se deja expresa constancia que los pagos
              realizados a través del sistema de pago dentro de la aplicación
              son recogidos y procesados mediante la tecnología del procesador
              de pagos de la parte relacionada de GETGO, o bien, por cualquier
              mandatario de estos últimos que sea designado al efecto, quien
              será la persona encargada del procesamiento de los pagos. Las
              transacciones podrán o no ser cargadas en moneda extranjera,
              dependiendo de las políticas del banco emisor de la tarjeta de
              crédito o débito correspondiente, sin que GETGO sea responsable
              por los posibles costos por transacciones en el extranjero o
              costos por cambio de divisas.
            </p>
            <p>
              Asimismo, el Cliente deberá tener en cuenta los siguientes
              conceptos:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
              <li>Tiempo de espera: Cortesía 5 minutos. </li>
              <li>
                Pagos con tarjeta: Algunos bancos podrían realizar el cargo en
                moneda extranjera.
              </li>
              <li>
                Peajes/TAG: Los peajes serán calculados automáticamente en los
                viajes una vez que el servicio haya sido solicitado por el Socio
                Usuario y serán pagados directamente por el Socio Conductor, sea
                el caso. El monto total correspondiente al viaje se calculará
                automáticamente en la aplicación y será añadido a la tarifa
                final a ser pagada por cualquier medio de pago por el Socio
                Usuario. Esta tarifa final incluirá también la tarifa adicional
                del peaje. Sin embargo, en caso de que el Socio Usuario opte por
                una ruta distinta a la recomendada por la aplicación, podría ser
                objeto de cobros adicionales de peajes, los cuales serán de
                cargo del Socio Usuario.{" "}
              </li>
              <li>
                Los cargos realizados pueden incluir otras tarifas, y/o cargos
                adicionales, incluidas las cuotas de servicio, recargo por
                servicio (tales como, recargos de aeropuerto), tarifas o cargos
                municipales, estatales o nacionales, tarifas por mora, o tarifas
                de procesamiento para pagos a plazos, entre otros que sean
                aplicables.
              </li>
            </ul>
            <p>
              En caso de que el Socio Usuario opte por una ruta distinta a la
              recomendada por la aplicación, podría ser objeto de cobros
              adicionales que se encontrarán considerados en el precio final que
              se cobre por el viaje. En caso de que resultara imposible realizar
              el pago a través de alguno de los instrumentos designados, GETGO
              podrá realizar ilimitada e indefinidamente varios intentos de
              cobro con posterioridad al servicio efectuado. Luego de ello,
              GETGO podrá impedir que el Socio Usuario utilice dichos
              instrumentos de pago para solicitar nuevos servicios a través de
              la Aplicación, mientras no se realice el pago de los montos
              adeudados. Esta situación y el monto de la deuda le serán
              informados al Cliente por medio de la Aplicación y/o vía correo
              electrónico. Por su parte, el Socio Usuario será responsable del
              coste de la reparación por daños o de la limpieza necesaria de los
              móviles, que se ocasionen por el uso de los Servicios que
              sobrepasen los daños considerados normales por el desgaste y la
              limpieza necesaria. En el caso de que un Socio Conductor informe
              de la necesidad de reparación o limpieza, y dicha reparación o
              limpieza se verifique por GETGO a su razonable discreción, GETGO
              se reserva el derecho de facilitar el pago por el coste razonable
              de dicha reparación o limpieza en nombre del Socio Conductor,
              utilizando su método de pago indicado en su cuenta. Dichos
              importes, así como aquellos cargos por la devolución de objetos
              olvidados se transferirán por GETGO al correspondiente Socio
              Conductor y no son reembolsables. De cualquier forma, GETGO se
              reserva el derecho de realizar, sin previo aviso, cambio en los
              porcentajes, tarifas, bonificaciones o afines que se perciban o
              devenguen.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#000080] italic mb-2 tracking-tight">
              11. VIGENCIA
            </h2>
            <p>
              La vigencia de estos Términos y Condiciones será indefinida, y sus
              cláusulas se mantendrán vigentes hasta que sean modificados por
              GETGO. Aunque GETGO dé por terminado los presentes Términos y
              Condiciones, tanto el Socio Conductor como el dueño del vehículo
              serán responsables de cualquier daño o perjuicio que pueda derivar
              de su actuar.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#000080] italic mb-2 tracking-tight">
              12. CASO FORTUITO O FUERZA MAYOR
            </h2>
            <p>
              En caso de que se presente un evento de caso fortuito o fuerza
              mayor, la parte afectada podrá suspender temporalmente el
              cumplimiento de sus obligaciones conforme al presente instrumento
              hasta que el efecto de dicha causa de caso fortuito o fuerza mayor
              cese, y no incurrirá en incumplimiento de contrato; lo anterior,
              en el entendido que dicha parte hará su mejor esfuerzo para
              resolver dicha causa y mitigar las pérdidas. Caso Fortuito o
              fuerza mayor significa cualquier causa impredecible e inevitable
              (aun cuando sea previsible) fuera del control de las partes que
              impida, afecte o demore el cumplimiento por una parte de todas o
              cualquiera de sus obligaciones conforme al presente instrumento.
              Dichas causas incluyen, sin limitación, terremotos, guerra,
              modificación de las leyes, reglamentos y políticas
              gubernamentales, virus de cómputo, ataques de hackers o suspensión
              de servicios prestados por empresas de telecomunicaciones.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#000080] italic mb-2 tracking-tight">
              13. LEGISLACIÓN APLICABLE Y JURISDICCIÓN
            </h2>
            <p>LEGISLACIÓN APLICABLE Y JURISDICCIÓN</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#000080] italic mb-2 tracking-tight">
              14. NOTIFICACIONES
            </h2>
            <p>
              Todas las notificaciones, requerimientos, peticiones y otras
              comunicaciones que el Socio Usuario desee efectuar a GETGO deberán
              realizarse por escrito y se entenderá que han sido correctamente
              realizadas cuando hayan sido recibidas en la dirección
              contacto@getgoapp.cl
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#000080] italic mb-2 tracking-tight">
              15. TRATAMIENTO DE DATOS DE UBICACIÓN (LOCATION)
            </h2>
          </div>
          <div>
            <p>
              GETGO accede y trata datos de ubicación geográfica precisa (GPS, red móvil, Wi-Fi y Bluetooth) y, en algunos casos, de ubicación aproximada, con los siguientes fines:

              Socios Conductores:

              Permitir la asignación automática de viajes y la navegación hasta el punto de recogida y destino.

              Actualizar la posición en tiempo real durante la conducción, incluso cuando la aplicación se encuentra en segundo plano, mientras el estado sea “disponible” o “en viaje”.

              Garantizar la seguridad del viaje, permitir funciones como el botón SOS y generar registros de recorrido ante eventuales incidentes.

              Socios Usuarios (Pasajeros):

              Determinar la ubicación de recogida, calcular rutas, estimar tarifas y mostrar la posición del vehículo durante el trayecto.

              Permitir el correcto emparejamiento con conductores cercanos y mejorar la precisión del servicio.

              Los datos de ubicación se recogen únicamente cuando el Usuario otorga los permisos correspondientes en el sistema operativo (por ejemplo, “Permitir siempre” o “Permitir solo mientras se usa la aplicación”).
              En el caso de los Socios Conductores, el uso de la ubicación en segundo plano es necesario para la prestación continua del servicio, incluso cuando la aplicación no está visible, pero el viaje o el estado de disponibilidad siguen activos.
              El Usuario puede desactivar los permisos de ubicación en cualquier momento desde los ajustes de su dispositivo; sin embargo, ciertas funciones podrían dejar de estar disponibles.

            </p>
            <p>¨ ¨</p>

            <h2 className="text-2xl font-bold text-[#000080] italic mb-2 tracking-tight">
              16. POLÍTICA DE PRIVACIDAD Y PROTECCIÓN DE DATOS PERSONALES
            </h2>
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#000080] italic mb-2">
              INTRODUCCIÓN
            </h2>
            <p className="mb-4">
              GETGO SOCIAL MARKETING SpA (en adelante, “GETGO”), RUT
              77.290.338-3, en su calidad de responsable del tratamiento de
              datos personales, ha elaborado la presente Política de Privacidad
              con el fin de informar a sus Socios Usuarios y Socios Conductores
              (en adelante, conjuntamente, los “Usuarios”) respecto del
              tratamiento de los datos personales que recolecta, almacena,
              utiliza y protege, en cumplimiento de la Ley N° 19.628 sobre
              protección de la vida privada y demás normativa aplicable.
            </p>

            <h3 className="text-xl font-bold text-[#000080] italic mb-2">
              FINALIDAD DEL TRATAMIENTO DE DATOS PERSONALES
            </h3>
            <ul className="list-disc list-inside mb-4">
              <li>
                Permitir el registro y autenticación del Usuario en la
                plataforma.
              </li>
              <li>
                Facilitar el acceso y utilización de los Servicios ofrecidos por
                GETGO, incluyendo la gestión del servicio de transporte privado
                de pasajeros.
              </li>
              <li>
                Contactar a los Usuarios para comunicaciones operativas, de
                seguridad, cumplimiento contractual y notificaciones relativas
                al uso de la plataforma.
              </li>
              <li>
                Validar la identidad de los Usuarios, ya sea mediante mecanismos
                digitales o presenciales.
              </li>
              <li>
                Gestionar los pagos y la facturación de los servicios
                contratados.
              </li>
              <li>
                Monitorear el cumplimiento de los Términos y Condiciones y
                aplicar medidas disciplinarias si corresponde.
              </li>
              <li>
                Cumplir con obligaciones legales, administrativas, contables y
                regulatorias.
              </li>
            </ul>

            <h3 className="text-xl font-bold text-[#000080] italic mb-2">
              DATOS PERSONALES RECOLECTADOS
            </h3>
            <ul className="list-disc list-inside mb-4">
              <li>
                Datos de identificación: nombre completo, RUT o cédula de
                identidad, fecha de nacimiento.
              </li>
              <li>
                Datos de contacto: dirección de correo electrónico, número de
                teléfono.
              </li>
              <li>
                Datos de medios de pago: número de tarjeta de crédito, fecha de
                vencimiento, entre otros necesarios para procesar el pago (los
                cuales son tratados a través de procesadores externos de pago).
              </li>
              <li>
                Información técnica del dispositivo: tipo de dispositivo,
                sistema operativo, identificadores únicos, dirección IP.
              </li>
              <li>
                Datos geográficos: localización geográfica en tiempo real,
                necesarios para coordinar el servicio de transporte.
              </li>
              <li>
                Imágenes, grabaciones o comunicaciones, en caso de requerirse
                como medio de verificación de identidad o como evidencia frente
                a incidentes.
              </li>
            </ul>

            <h2 className="text-xl font-bold text-[#000080] italic mb-2">
              BASE LEGAL PARA EL TRATAMIENTO
            </h2>
            <p className="mb-4">
              El tratamiento de datos personales por parte de GETGO se
              fundamenta en el consentimiento otorgado por los Usuarios al
              aceptar los Términos y Condiciones, y en el cumplimiento de las
              obligaciones contractuales derivadas de la relación entre GETGO y
              los Usuarios.
            </p>

            <h2 className="text-xl font-bold text-[#000080] italic mb-2">
              PLAZO DE CONSERVACIÓN
            </h2>
            <p className="mb-4">
              Los datos personales serán almacenados únicamente durante el
              tiempo que sea necesario para cumplir con las finalidades
              descritas en esta Política, y en ningún caso por un plazo superior
              al permitido por la ley. GETGO podrá conservar los datos durante
              un período adicional cuando exista una obligación legal de
              conservación o para la defensa de sus intereses ante una eventual
              controversia judicial.
            </p>

            <h2 className="text-xl font-bold text-[#000080] italic mb-2">
              MEDIDAS DE SEGURIDAD
            </h2>
            <p className="mb-4">
              GETGO implementa medidas de seguridad administrativas, técnicas y
              físicas destinadas a proteger los datos personales contra el
              tratamiento no autorizado o ilícito, así como contra la pérdida,
              filtración, acceso no autorizado, alteración o destrucción. No
              obstante, el Usuario reconoce que ningún sistema es completamente
              infalible, por lo que GETGO no garantiza que no puedan ocurrir
              incidentes de seguridad más allá de su diligencia razonable.
            </p>

            <h2 className="text-xl font-bold text-[#000080] italic mb-2">
              COMUNICACIÓN Y TRANSFERENCIA DE DATOS PERSONALES
            </h2>
            <ul className="list-disc list-inside mb-4">
              <li>
                A terceros proveedores que colaboren con GETGO en la prestación
                de los Servicios (ej. procesadores de pago), quienes estarán
                obligados a resguardar la confidencialidad y seguridad de los
                datos.
              </li>
              <li>
                A autoridades administrativas, judiciales o regulatorias, en
                cumplimiento de obligaciones legales o requerimientos fundados.
              </li>
              <li>
                En caso de una fusión, adquisición o venta total o parcial de
                GETGO, en cuyo caso los datos podrán ser transferidos como parte
                de dicho proceso.
              </li>
            </ul>

            <h2 className="text-xl font-bold text-[#000080] italic mb-2">
              DERECHOS DEL TITULAR DE LOS DATOS
            </h2>
            <p className="mb-4">
              El Usuario podrá ejercer, en cualquier momento, sus derechos de
              acceso, rectificación, cancelación, oposición (ARCO), y demás
              derechos que reconozca la legislación chilena vigente, mediante
              solicitud escrita dirigida a la dirección de correo electrónico:{" "}
              <a
                href="mailto:contacto@getgoapp.cl"
                className="text-blue-700 underline"
              >
                contacto@getgoapp.cl
              </a>
              .
            </p>

            <h2 className="text-xl font-bold text-[#000080] italic mb-2">
              COOKIES Y TECNOLOGÍAS SIMILARES
            </h2>
            <p className="mb-4">
              GETGO podrá utilizar cookies y tecnologías similares para mejorar
              la experiencia del Usuario, facilitar la navegación, almacenar
              información técnica del dispositivo y personalizar los contenidos.
              El Usuario podrá configurar su navegador para bloquear o eliminar
              cookies, sin embargo, ello podría afectar el correcto
              funcionamiento de la plataforma.
            </p>

            <h2 className="text-xl font-bold text-[#000080] italic mb-2">
              MODIFICACIONES A ESTA POLÍTICA
            </h2>
            <p className="mb-4">
              GETGO podrá modificar la presente Política en cualquier momento.
              Las modificaciones serán notificadas a los Usuarios a través de la
              plataforma o por medios electrónicos, y entrarán en vigencia desde
              su publicación. El uso continuado de los Servicios implicará la
              aceptación de las modificaciones introducidas.
            </p>

            <h2 className="text-xl font-bold text-[#000080] italic mb-2">
              LEGISLACIÓN APLICABLE Y JURISDICCIÓN
            </h2>
            <p className="mb-4">
              Esta Política de Privacidad se rige por la legislación chilena.
              Cualquier controversia relacionada con su aplicación,
              interpretación o ejecución será sometida a la jurisdicción de los
              tribunales ordinarios de justicia de Santiago.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-[#000080] text-white py-8 px-6 md:px-12 rounded-t-3xl text-center">
        <div className="mb-4">
          <div className="flex justify-center gap-6">
            {[
              { name: "tiktok", link: "https://www.tiktok.com/@getgo.chile" },
              { name: "insta", link: "https://www.instagram.com/getgo.cl" },
              { name: "f", link: "https://www.facebook.com/GetGoAppCL" },
              { name: "x", link: "https://x.com/GetGoCL" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`/images/${social.name}.png`}
                  alt={social.name}
                  width={30}
                  height={30}
                  className="w-6 h-6 cursor-pointer"
                />
              </a>
            ))}
          </div>
        </div>

        <p className="text-sm mt-2">
          Todos los derechos reservados GetGo® 2025
        </p>
      </footer>
    </div>
  );
}
