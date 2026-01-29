import { Link } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Footer from '../components/Footer.jsx'
import NavBar from '../components/NavBar.jsx'
import { SITE } from '../lib/site.js'

function HomePage() {
  const mailto = (payload) => {
    const subject = encodeURIComponent('Contacto — Virtual Estudio')
    const body = encodeURIComponent(
      `Nombre: ${payload.nombre}\n` +
        `Correo: ${payload.correo}\n` +
        `Teléfono: ${payload.telefono}\n` +
        `Publicaciones/semana: ${payload.postsPorSemana}\n\n` +
        `Me interesa conocer el plan recomendado de créditos y el flujo ideal (Campañas / Videos / Prendas / Modelos / Brand DNA).`,
    )
    return `mailto:${SITE.contactEmail}?subject=${subject}&body=${body}`
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const nombre = String(formData.get('nombre') || '').trim()
    const correo = String(formData.get('correo') || '').trim()
    const telefono = String(formData.get('telefono') || '').trim()
    const postsPorSemana = String(formData.get('posts_por_semana') || '').trim()

    if (!nombre || !correo || !telefono || postsPorSemana === '') {
      alert('Completa todos los campos.')
      return
    }

    window.location.href = mailto({ nombre, correo, telefono, postsPorSemana })
  }

  return (
    <>
      <NavBar />

      <main>
        <section className="vs-hero">
          <div className="vs-container">
            <div className="vs-card vs-hero-card">
              <div className="vs-kicker">
                Virtual Estudio · campañas de moda con IA
              </div>
              <h1 className="vs-h1">Crea campañas, sin estudio.</h1>
              <p className="vs-lead">
                Sube tus prendas, elige un modelo virtual, define el escenario
                (UGC o editorial) y genera imágenes y videos listos para
                Instagram y e‑commerce en minutos.
              </p>
              <div className="vs-actions">
                <Button as="a" href={SITE.appUrl} variant="primary">
                  Ir a la app
                </Button>
                <Button as="a" href="/pricing/" variant="secondary">
                  Ver créditos y planes
                </Button>
                <Button as="a" href="#contacto" variant="ghost">
                  Contacto
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="servicios" className="vs-section">
          <div className="vs-container">
            <h2 className="vs-section-title">Servicios</h2>
            <p className="vs-section-subtitle">
              Todo lo que necesitas para producir contenido de moda de forma
              consistente: campañas, variaciones, videos y formatos listos para
              publicar.
            </p>

            <div className="vs-grid">
              <article className="vs-card">
                <h3>Campañas</h3>
                <p>
                  Constructor de campañas para generar nuevas tomas en segundos:
                  pose, escena, estilo y salida.
                </p>
                <ul className="vs-bullets">
                  <li>UGC realista o editorial premium.</li>
                  <li>Formatos 1:1, 4:5 y 9:16.</li>
                  <li>Multiprenda y variaciones desde una semilla.</li>
                </ul>
              </article>

              <article className="vs-card">
                <h3>Videos</h3>
                <p>
                  Anima una imagen semilla con presets de cámara y sujeto para
                  clips rápidos listos para social.
                </p>
                <ul className="vs-bullets">
                  <li>Duración: 5 o 10 segundos.</li>
                  <li>Controles: cámara, sujeto e instrucciones opcionales.</li>
                  <li>Costo estimado: ≈ 1 crédito/seg.</li>
                </ul>
              </article>

              <article className="vs-card">
                <h3>Prendas</h3>
                <p>
                  Sube tus prendas y reutilízalas en campañas. Mantén ordenado
                  tu catálogo de insumos creativos.
                </p>
                <ul className="vs-bullets">
                  <li>Guarda prendas para reutilizarlas.</li>
                  <li>Ideal para colecciones y drops.</li>
                </ul>
              </article>

              <article className="vs-card">
                <h3>Modelos</h3>
                <p>
                  Elige modelos virtuales y sube modelos personalizados para
                  reutilizar rostro y proporciones en tus campañas.
                </p>
                <ul className="vs-bullets">
                  <li>Modelos base + “Mis modelos”.</li>
                  <li>Consistencia visual en campañas.</li>
                </ul>
              </article>

              <article className="vs-card">
                <h3>Créditos</h3>
                <p>
                  Compra paquetes en COP y recarga cuando lo necesites. Controla
                  el uso con historial.
                </p>
                <ul className="vs-bullets">
                  <li>Paquetes de créditos dentro de la app.</li>
                  <li>Historial de compras y generaciones.</li>
                </ul>
              </article>

              <article className="vs-card">
                <h3>Brand DNA</h3>
                <p>
                  Define el ADN de tu marca para que la IA entienda tu producto,
                  audiencia y vibe.
                </p>
                <ul className="vs-bullets">
                  <li>Qué vendes, cliente ideal y ubicación.</li>
                  <li>Vibe: minimalista, urbano, elegante, etc.</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section id="ugc-editorial" className="vs-section">
          <div className="vs-container">
            <div className="vs-split">
              <div className="vs-card">
                <h2 className="vs-section-title">UGC vs Editorial</h2>
                <p className="vs-section-subtitle">
                  Dos modos de producción, según tu objetivo de marketing.
                </p>
                <ul className="vs-bullets">
                  <li>
                    <strong>UGC:</strong> se ve real, casual y “de celular”. Ideal
                    para TikTok/Reels y pruebas rápidas.
                  </li>
                  <li>
                    <strong>Editorial:</strong> look premium tipo campaña. Ideal
                    para e‑commerce, lanzamientos y piezas hero.
                  </li>
                </ul>
              </div>
              <div className="vs-card">
                <h3>Cómo funciona</h3>
                <ul className="vs-bullets">
                  <li>Sube tu prenda.</li>
                  <li>Selecciona tu modelo (base o personalizado).</li>
                  <li>Define escenario/estilo/iluminación.</li>
                  <li>Elige formato y genera.</li>
                </ul>
                <div className="vs-actions">
                  <Button as="a" href={SITE.appUrl} variant="primary">
                    Crear mi primera campaña
                  </Button>
                  <Link className="vs-btn vs-btn--secondary" to="/pricing/">
                    Estimar mis créditos
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="formatos" className="vs-section">
          <div className="vs-container">
            <h2 className="vs-section-title">Formatos listos para publicar</h2>
            <p className="vs-section-subtitle">
              Selecciona la salida ideal para tus plataformas.
            </p>
            <div className="vs-grid">
              <article className="vs-card">
                <h3>Cuadrado</h3>
                <p>1:1 — anuncios y posts estándar.</p>
              </article>
              <article className="vs-card">
                <h3>Instagram Story</h3>
                <p>9:16 — Reels/Stories, vertical y de alto impacto.</p>
              </article>
              <article className="vs-card">
                <h3>Carrusel (IG Feed)</h3>
                <p>4:5 — máximo espacio en feed para producto.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="contacto" className="vs-section">
          <div className="vs-container">
            <div className="vs-card">
              <h2 className="vs-section-title">Hablemos de tu marca</h2>
              <p className="vs-section-subtitle">
                Cuéntanos cuántas publicaciones haces por semana y te
                recomendamos un plan de créditos y un flujo de campaña (UGC o
                editorial).
              </p>

              <form onSubmit={onSubmit}>
                <div className="vs-form-grid">
                  <div className="vs-field">
                    <label htmlFor="nombre">Nombre</label>
                    <input id="nombre" name="nombre" type="text" required />
                  </div>
                  <div className="vs-field">
                    <label htmlFor="correo">Correo</label>
                    <input id="correo" name="correo" type="email" required />
                  </div>
                  <div className="vs-field">
                    <label htmlFor="telefono">Teléfono</label>
                    <input id="telefono" name="telefono" type="tel" required />
                  </div>
                  <div className="vs-field">
                    <label htmlFor="posts_por_semana">
                      Publicaciones por semana
                    </label>
                    <input
                      id="posts_por_semana"
                      name="posts_por_semana"
                      type="number"
                      min="0"
                      step="1"
                      required
                    />
                  </div>
                </div>

                <div className="vs-actions" style={{ marginTop: 14 }}>
                  <Button type="submit" variant="buy">
                    Enviar por correo
                  </Button>
                  <span style={{ color: 'var(--vs-text-muted)', fontSize: 13 }}>
                    Esto abre tu cliente de correo con el mensaje listo.
                  </span>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default HomePage
