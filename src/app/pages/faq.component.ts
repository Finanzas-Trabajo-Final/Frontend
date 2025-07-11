import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonComponent } from '../shared/components/button.component';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="faq-container">
      <header class="faq-header">
        <div class="header-content">
          <h1>Preguntas Frecuentes - AmericaCash</h1>
          <app-button
            variant="outline"
            (clickEvent)="goToDashboard()"
          >
            Volver al Dashboard
          </app-button>
        </div>
      </header>

      <main class="faq-main">
        <div class="faq-content">
          <div class="faq-intro">
            <h2>¿Tienes dudas sobre AmericaCash?</h2>
            <p>Encuentra respuestas a las preguntas más comunes sobre nuestra plataforma de análisis financiero de bonos.</p>
          </div>

          <div class="faq-sections">
            <!-- Sección: Acerca de AmericaCash -->
            <div class="faq-section">
              <h3>Acerca de AmericaCash</h3>
              <div class="faq-items">
                <div class="faq-item">
                  <button class="faq-question" (click)="toggleAnswer('about-1')">
                    <span>¿Qué es AmericaCash?</span>
                    <svg class="faq-icon" [class.rotated]="openAnswers['about-1']" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                  </button>
                  <div class="faq-answer" [class.open]="openAnswers['about-1']">
                    <p>AmericaCash es una plataforma financiera especializada en el análisis y gestión de bonos americanos. Permite calcular indicadores financieros, generar cronogramas de pagos y evaluar la rentabilidad de inversiones en bonos.</p>
                  </div>
                </div>

                <div class="faq-item">
                  <button class="faq-question" (click)="toggleAnswer('about-2')">
                    <span>¿Qué tipo de bonos puedo analizar?</span>
                    <svg class="faq-icon" [class.rotated]="openAnswers['about-2']" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                  </button>
                  <div class="faq-answer" [class.open]="openAnswers['about-2']">
                    <p>La plataforma está optimizada para bonos americanos con diferentes características: tasas efectivas o nominales, distintas frecuencias de pago, períodos de gracia totales o parciales, y múltiples monedas (PEN, USD).</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sección: Uso de la Plataforma -->
            <div class="faq-section">
              <h3>Uso de la Plataforma</h3>
              <div class="faq-items">
                <div class="faq-item">
                  <button class="faq-question" (click)="toggleAnswer('usage-1')">
                    <span>¿Cómo creo un nuevo bono? (Guía paso a paso)</span>
                    <svg class="faq-icon" [class.rotated]="openAnswers['usage-1']" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                  </button>
                  <div class="faq-answer" [class.open]="openAnswers['usage-1']">
                    <div class="step-by-step-guide">
                      <h5>📋 Guía Completa para Crear un Bono</h5>
                      
                      <div class="step-section">
                        <h6>🔹 PASO 1: Datos Básicos del Bono</h6>
                        <ul>
                          <li><strong>Valor Nominal:</strong> Ingresa el valor facial del bono (ej: 1000, 5000, 10000)</li>
                          <li><strong>Valor Comercial:</strong> Precio al cual se vende el bono en el mercado</li>
                          <li><strong>Tipo de Tasa de Interés:</strong> Selecciona "Efectiva" o "Nominal"
                            <ul>
                              <li>• <em>Efectiva:</em> Tasa que incluye capitalización</li>
                              <li>• <em>Nominal:</em> Tasa base sin capitalización</li>
                            </ul>
                          </li>
                        </ul>
                      </div>

                      <div class="step-section">
                        <h6>🔹 PASO 2: Configuración de Tasas y Plazos</h6>
                        <ul>
                          <li><strong>Tasa de Interés Anual:</strong> Porcentaje anual (ej: 8.5 para 8.5%)</li>
                          <li><strong>Período de Capitalización:</strong> Cada cuántos días se capitaliza (ej: 360, 180, 90)</li>
                          <li><strong>Plazo en Años:</strong> Duración total del bono (ej: 3, 5, 10 años)</li>
                          <li><strong>Frecuencia de Pago (Meses):</strong> Cada cuántos meses se paga (ej: 6 = semestral, 12 = anual)</li>
                        </ul>
                      </div>

                      <div class="step-section">
                        <h6>🔹 PASO 3: Períodos de Gracia (Opcional)</h6>
                        <ul>
                          <li><strong>Meses de Gracia Totales:</strong> Período donde no se paga capital ni intereses</li>
                          <li><strong>Meses de Gracia Parciales:</strong> Período donde solo se pagan intereses, no capital</li>
                          <li><em>Nota:</em> Dejar en 0 si no hay períodos de gracia</li>
                        </ul>
                      </div>

                      <div class="step-section">
                        <h6>🔹 PASO 4: Configuración Adicional</h6>
                        <ul>
                          <li><strong>Moneda:</strong> Selecciona PEN (Soles) o USD (Dólares)</li>
                          <li><strong>Tasa de Descuento:</strong> Tasa para calcular valor presente (ej: 10.5%)</li>
                          <li><strong>Impuesto a la Renta:</strong> Porcentaje de impuestos (ej: 29.5% en Perú)</li>
                          <li><strong>Fecha de Desembolso:</strong> Fecha cuando se entrega el dinero</li>
                        </ul>
                      </div>

                      <div class="step-section">
                        <h6>🔹 PASO 5: Costos/Gastos Iniciales</h6>
                        <ul>
                          <li><strong>Prima (%):</strong> Costo adicional sobre el valor nominal</li>
                          <li><strong>Costo de Estructuración (%):</strong> Gastos legales y de diseño del bono</li>
                          <li><strong>Costo de Colocación (%):</strong> Comisión de intermediarios financieros</li>
                          <li><strong>Costo de Flotación (%):</strong> Gastos de emisión y comercialización</li>
                          <li><strong>Costo Cavali (%):</strong> Comisión del registro central de valores</li>
                        </ul>
                      </div>

                      <div class="step-section">
                        <h6>🔹 PASO 6: Crear y Analizar</h6>
                        <ol>
                          <li>Revisa que todos los campos estén completos</li>
                          <li>Haz clic en <strong>"Crear Bono"</strong></li>
                          <li>Espera a que se procesen los cálculos</li>
                          <li>Revisa los <strong>Indicadores Financieros</strong> generados</li>
                          <li>Analiza el <strong>Cronograma de Pagos</strong> detallado</li>
                        </ol>
                      </div>

                      <div class="step-section">
                        <h6>🔹 PASO 7: Interpretar Resultados</h6>
                        <p>Una vez creado el bono, podrás ver:</p>
                        <ul>
                          <li><strong>TCEA del Emisor:</strong> Costo real anual para quien emite el bono</li>
                          <li><strong>TREA del Bonista:</strong> Rentabilidad real anual para el inversionista</li>
                          <li><strong>Duración y Convexidad:</strong> Medidas de riesgo ante cambios de tasas</li>
                          <li><strong>Cronograma completo:</strong> Detalle período por período de todos los flujos</li>
                        </ul>
                      </div>

                      <div class="tips-section">
                        <h6>💡 Consejos Importantes:</h6>
                        <ul>
                          <li>• Asegúrate de que la tasa de descuento sea realista del mercado</li>
                          <li>• Los costos iniciales suelen estar entre 1% - 5% del valor nominal</li>
                          <li>• Verifica que la frecuencia de pago sea compatible con el plazo total</li>
                          <li>• Los períodos de gracia afectan significativamente la rentabilidad</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="faq-item">
                  <button class="faq-question" (click)="toggleAnswer('usage-2')">
                    <span>¿Qué indicadores financieros calcula la plataforma?</span>
                    <svg class="faq-icon" [class.rotated]="openAnswers['usage-2']" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                  </button>
                  <div class="faq-answer" [class.open]="openAnswers['usage-2']">
                    <p>La plataforma calcula: TCEA (Tasa de Costo Efectivo Anual), TREA (Tasa de Rendimiento Efectivo Anual), duración, convexidad, duración modificada, precio actual, ganancia/pérdida, tasas efectivas periódicas y costos iniciales.</p>
                  </div>
                </div>

                <div class="faq-item">
                  <button class="faq-question" (click)="toggleAnswer('usage-3')">
                    <span>¿Qué información muestra el cronograma de pagos?</span>
                    <svg class="faq-icon" [class.rotated]="openAnswers['usage-3']" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                  </button>
                  <div class="faq-answer" [class.open]="openAnswers['usage-3']">
                    <p>El cronograma detalla período por período: inflación anual y del período, tipo de gracia, valor del bono, cuotas, amortización, prima, escudo fiscal, flujos del emisor y bonista, flujos descontados y factores de convexidad.</p>
                  </div>
                </div>

                <div class="faq-item">
                  <button class="faq-question" (click)="toggleAnswer('usage-4')">
                    <span>¿Qué errores debo evitar al crear un bono?</span>
                    <svg class="faq-icon" [class.rotated]="openAnswers['usage-4']" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                  </button>
                  <div class="faq-answer" [class.open]="openAnswers['usage-4']">
                    <div class="error-guide">
                      <h6>⚠️ Errores Comunes a Evitar:</h6>
                      <ul>
                        <li><strong>Tasas irreales:</strong> No uses tasas demasiado altas o bajas para el mercado actual</li>
                        <li><strong>Períodos incompatibles:</strong> La frecuencia de pago debe ser menor al plazo total</li>
                        <li><strong>Costos excesivos:</strong> Los costos iniciales superiores al 10% son poco realistas</li>
                        <li><strong>Fechas inconsistentes:</strong> La fecha de desembolso debe ser coherente con el análisis</li>
                        <li><strong>Campos vacíos:</strong> Todos los campos son obligatorios, usa 0 si no aplica</li>
                        <li><strong>Valor comercial erróneo:</strong> No debe ser muy diferente al valor nominal sin justificación</li>
                      </ul>
                      
                      <h6>✅ Valores de Referencia:</h6>
                      <ul>
                        <li>• <strong>Tasas de interés:</strong> Entre 5% - 15% anual (según mercado)</li>
                        <li>• <strong>Costos totales:</strong> Generalmente entre 2% - 7% del valor nominal</li>
                        <li>• <strong>Impuesto a la renta:</strong> 29.5% en Perú, 30% en muchos países</li>
                        <li>• <strong>Frecuencia común:</strong> 6 meses (semestral) o 12 meses (anual)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sección: Conceptos Financieros -->
            <div class="faq-section">
              <h3>Conceptos Financieros</h3>
              <div class="faq-items">
                <div class="faq-item">
                  <button class="faq-question" (click)="toggleAnswer('finance-1')">
                    <span>¿Qué es la TCEA?</span>
                    <svg class="faq-icon" [class.rotated]="openAnswers['finance-1']" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                  </button>
                  <div class="faq-answer" [class.open]="openAnswers['finance-1']">
                    <p>La TCEA (Tasa de Costo Efectivo Anual) es el costo real anual que paga el emisor del bono, considerando todos los gastos y comisiones asociadas a la emisión.</p>
                  </div>
                </div>

                <div class="faq-item">
                  <button class="faq-question" (click)="toggleAnswer('finance-2')">
                    <span>¿Qué es la TREA?</span>
                    <svg class="faq-icon" [class.rotated]="openAnswers['finance-2']" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                  </button>
                  <div class="faq-answer" [class.open]="openAnswers['finance-2']">
                    <p>La TREA (Tasa de Rendimiento Efectivo Anual) es la rentabilidad real anual que obtiene el bonista, considerando el precio de compra y todos los flujos recibidos.</p>
                  </div>
                </div>

                <div class="faq-item">
                  <button class="faq-question" (click)="toggleAnswer('finance-3')">
                    <span>¿Qué son la duración y convexidad?</span>
                    <svg class="faq-icon" [class.rotated]="openAnswers['finance-3']" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                  </button>
                  <div class="faq-answer" [class.open]="openAnswers['finance-3']">
                    <p>La duración mide la sensibilidad del precio del bono ante cambios en las tasas de interés. La convexidad mide cómo cambia la duración cuando varían las tasas, proporcionando una medida más precisa de riesgo.</p>
                  </div>
                </div>

                <div class="faq-item">
                  <button class="faq-question" (click)="toggleAnswer('finance-4')">
                    <span>¿Qué es el escudo fiscal?</span>
                    <svg class="faq-icon" [class.rotated]="openAnswers['finance-4']" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                  </button>
                  <div class="faq-answer" [class.open]="openAnswers['finance-4']">
                    <p>El escudo fiscal es el beneficio tributario que obtiene el emisor al poder deducir los intereses pagados como gasto deducible, reduciendo así su carga impositiva.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sección: Cuenta y Seguridad -->
            <div class="faq-section">
              <h3>Cuenta y Seguridad</h3>
              <div class="faq-items">
                <div class="faq-item">
                  <button class="faq-question" (click)="toggleAnswer('account-1')">
                    <span>¿Cómo creo una cuenta?</span>
                    <svg class="faq-icon" [class.rotated]="openAnswers['account-1']" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                  </button>
                  <div class="faq-answer" [class.open]="openAnswers['account-1']">
                    <p>En la página de login, haz clic en "Regístrate aquí". Completa el formulario con tu email, nombre de usuario y contraseña. Una vez registrado, serás redirigido al login para ingresar con tus credenciales.</p>
                  </div>
                </div>

                <div class="faq-item">
                  <button class="faq-question" (click)="toggleAnswer('account-2')">
                    <span>¿Mis datos están seguros?</span>
                    <svg class="faq-icon" [class.rotated]="openAnswers['account-2']" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                  </button>
                  <div class="faq-answer" [class.open]="openAnswers['account-2']">
                    <p>Sí, utilizamos sistemas de autenticación seguros con tokens JWT y encriptación de contraseñas. Tus datos financieros y personales están protegidos siguiendo las mejores prácticas de seguridad.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sección: Soporte Técnico -->
            <div class="faq-section">
              <h3>Soporte Técnico</h3>
              <div class="faq-items">
                <div class="faq-item">
                  <button class="faq-question" (click)="toggleAnswer('support-1')">
                    <span>¿Qué navegadores son compatibles?</span>
                    <svg class="faq-icon" [class.rotated]="openAnswers['support-1']" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                  </button>
                  <div class="faq-answer" [class.open]="openAnswers['support-1']">
                    <p>AmericaCash es compatible con las versiones más recientes de Chrome, Firefox, Safari y Edge. Recomendamos mantener tu navegador actualizado para una mejor experiencia.</p>
                  </div>
                </div>

                <div class="faq-item">
                  <button class="faq-question" (click)="toggleAnswer('support-2')">
                    <span>¿Cómo contacto soporte técnico?</span>
                    <svg class="faq-icon" [class.rotated]="openAnswers['support-2']" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                  </button>
                  <div class="faq-answer" [class.open]="openAnswers['support-2']">
                    <p>Si no encuentras la respuesta a tu pregunta aquí, puedes contactarnos a través del email de soporte o usar el chat en vivo disponible en el dashboard durante horario laboral.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .faq-container {
      min-height: 100vh;
      background-color: #f9fafb;
    }

    /* Header */
    .faq-header {
      background: white;
      border-bottom: 1px solid #e5e7eb;
      padding: 1rem 0;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .faq-header h1 {
      font-size: 1.75rem;
      font-weight: 700;
      color: #1f2937;
      margin: 0;
      background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Main Content */
    .faq-main {
      padding: 2rem 0;
    }

    .faq-content {
      max-width: 1000px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .faq-intro {
      text-align: center;
      margin-bottom: 3rem;
    }

    .faq-intro h2 {
      font-size: 2rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 1rem;
    }

    .faq-intro p {
      font-size: 1.125rem;
      color: #6b7280;
      max-width: 600px;
      margin: 0 auto;
    }

    /* FAQ Sections */
    .faq-sections {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .faq-section {
      background: white;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .faq-section h3 {
      background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
      color: white;
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0;
      padding: 1.5rem;
    }

    .faq-items {
      padding: 0;
    }

    .faq-item {
      border-bottom: 1px solid #f3f4f6;
    }

    .faq-item:last-child {
      border-bottom: none;
    }

    .faq-question {
      width: 100%;
      background: none;
      border: none;
      padding: 1.5rem;
      text-align: left;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: background-color 0.2s;
      font-size: 1rem;
      font-weight: 500;
      color: #1f2937;
    }

    .faq-question:hover {
      background-color: #f9fafb;
    }

    .faq-icon {
      transition: transform 0.2s;
      color: #6b7280;
    }

    .faq-icon.rotated {
      transform: rotate(45deg);
    }

    .faq-answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-in-out;
      background-color: #f9fafb;
    }

    .faq-answer.open {
      max-height: 2000px;
    }

    .faq-answer p {
      padding: 1.5rem;
      margin: 0;
      color: #4b5563;
      line-height: 1.6;
    }

    /* Step-by-step guide styles */
    .step-by-step-guide {
      padding: 1.5rem;
    }

    .step-by-step-guide h5 {
      color: #1f2937;
      font-size: 1.125rem;
      font-weight: 600;
      margin: 0 0 1.5rem 0;
      border-bottom: 2px solid #3b82f6;
      padding-bottom: 0.5rem;
    }

    .step-section {
      margin-bottom: 1.5rem;
      background: #f8fafc;
      border-radius: 8px;
      padding: 1rem;
      border-left: 4px solid #3b82f6;
    }

    .step-section h6 {
      color: #1f2937;
      font-size: 1rem;
      font-weight: 600;
      margin: 0 0 0.75rem 0;
    }

    .step-section ul {
      margin: 0;
      padding-left: 1.25rem;
      color: #4b5563;
    }

    .step-section li {
      margin-bottom: 0.5rem;
      line-height: 1.5;
    }

    .step-section ul ul {
      margin-top: 0.25rem;
      padding-left: 1rem;
    }

    .step-section ul ul li {
      margin-bottom: 0.25rem;
      font-size: 0.9rem;
      color: #6b7280;
    }

    .step-section ol {
      margin: 0;
      padding-left: 1.25rem;
      color: #4b5563;
    }

    .step-section ol li {
      margin-bottom: 0.5rem;
      line-height: 1.5;
    }

    .step-section strong {
      color: #1f2937;
      font-weight: 600;
    }

    .step-section em {
      color: #6b7280;
      font-style: italic;
    }

    .tips-section {
      background: #fef3c7;
      border: 1px solid #f59e0b;
      border-radius: 8px;
      padding: 1rem;
      margin-top: 1rem;
    }

    .tips-section h6 {
      color: #92400e;
      font-size: 1rem;
      font-weight: 600;
      margin: 0 0 0.75rem 0;
    }

    .tips-section ul {
      margin: 0;
      padding-left: 1.25rem;
      color: #92400e;
    }

    .tips-section li {
      margin-bottom: 0.5rem;
      line-height: 1.5;
    }

    /* Error guide styles */
    .error-guide {
      padding: 1.5rem;
    }

    .error-guide h6 {
      color: #1f2937;
      font-size: 1rem;
      font-weight: 600;
      margin: 0 0 0.75rem 0;
    }

    .error-guide ul {
      margin: 0 0 1.5rem 0;
      padding-left: 1.25rem;
      color: #4b5563;
    }

    .error-guide li {
      margin-bottom: 0.5rem;
      line-height: 1.5;
    }

    .error-guide strong {
      color: #1f2937;
      font-weight: 600;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }

      .faq-intro h2 {
        font-size: 1.5rem;
      }

      .faq-intro p {
        font-size: 1rem;
      }

      .faq-question {
        padding: 1rem;
        font-size: 0.9rem;
      }

      .faq-answer p {
        padding: 1rem;
      }
    }
  `]
})
export class FaqComponent {
  openAnswers: { [key: string]: boolean } = {};

  constructor(private router: Router) {}

  toggleAnswer(questionId: string): void {
    this.openAnswers[questionId] = !this.openAnswers[questionId];
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
