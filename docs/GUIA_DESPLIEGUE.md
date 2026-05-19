# Guía de despliegue de Chiltu

Esta guía describe el orden recomendado para registrar Chiltu en las tres plataformas: **INDECOPI** (registro de derechos de autor), **GitHub** (hosting y citación) y **Zenodo** (DOI académico).

El orden propuesto **no es arbitrario**: cada paso construye sobre el anterior. INDECOPI primero porque el certificado puede tomar 30 días hábiles y conviene iniciarlo de inmediato. GitHub después porque la URL pública fortalece el expediente Zenodo. Zenodo al final porque depende del release de GitHub para generar el DOI automáticamente.

---

## Paso 1 — INDECOPI

### 1.1 Antes de empezar

Reunir las siguientes piezas firmadas y escaneadas en PDF:

- [ ] **Memoria descriptiva** (`docs/MEMORIA_DESCRIPTIVA.md`) impresa, con DNI y fecha completados, firmada por los tres co-autores en la Sección IX.
- [ ] **Declaración jurada de Rubén Armando Daga López** (`docs/DECLARACION_JURADA_COAUTORIA.md` impresa y completada), firmada manuscritamente.
- [ ] **Declaración jurada de Jacinto Joaquín Vertiz Osores** (la misma plantilla, copia separada), firmada manuscritamente.
- [ ] **Comprobante de pago** de la tasa INDECOPI: arancel 203000707, S/ 357.70 (pagar en pagalo.pe).
- [ ] **ZIP del software** (`chiltu.zip`).

Si UNTELS confirma la co-producción institucional tras la reunión con el VRI, agregar:

- [ ] **Oficio de UNTELS** firmado por el Vicerrectorado de Investigación reconociendo a la universidad como co-productora del software (referencia al reglamento de PI vigente).

### 1.2 Pago de la tasa

1. Ingresar a **https://pagalo.pe** (Banco de la Nación)
2. Registrarse con DNI, correo y clave (única vez)
3. Buscar **"Indecopi"** → seleccionar arancel **01086**
4. Seleccionar concepto **203000707 — REGISTRO SOFTWARE / PROGRAMA DE COMPUTACIÓN / ODA**
5. Pagar **S/ 357.70** con tarjeta
6. Descargar el comprobante en PDF

### 1.3 Plataforma virtual INDECOPI

1. Ingresar a **https://www.gob.pe/10562-registrar-una-obra-en-el-indecopi**
2. Acceder al Registro Virtual de Obras
3. Crear la casilla electrónica con DNI del solicitante (Obert)
4. Llenar el formulario **F-DDA-02 — Software o Programa de Ordenador**

### 1.4 Datos exactos para el formulario F-DDA-02

| Sección | Campo | Valor |
|---------|-------|-------|
| 1 | ¿Es usted? | **Autor + Productor + Titular** (marcar las tres) |
| 2 | Solicitante | Obert Marín Sánchez, DNI [completar], domicilio personal |
| 3 | Representante | Vacío (vas como persona natural) |
| 4 | Título | **Chiltu** |
| 4 | ¿La obra es derivada? | **No** |
| 4 | ¿La obra se publicó? | **No** (inédita al momento del depósito) |
| 4 | País de origen | Perú |
| 4 | Fecha de terminación | **19-05-2026** (o fecha de generación del ZIP final) |
| 4 | Fecha de publicación | Vacío |
| 5 | Autores identificados | **Sí** (los tres) |
| 5 | Autor 1 | Obert Marín Sánchez |
| 5 | Autor 2 | Rubén Armando Daga López |
| 5 | Autor 3 | Jacinto Joaquín Vertiz Osores |
| 6 | Productor | Obert Marín Sánchez (+ UNTELS si oficio del VRI lo confirma) |
| 7a | ¿Obra por encargo? | **Sí** (si UNTELS figura como productor) / No (si no) |
| 7b | ¿Cesión a tu favor? | No |
| 7c | Autorización de obra originaria | No aplica (no es obra derivada) |
| 8 | ¿Exhibición en exposiciones DDA? | **Sí** |
| 8 | ¿Publicar en Boletín Electrónico? | **Sí** |
| 8 | ¿Producción digital para Archivo Nacional? | **Sí** |
| 9 | Correspondencia | Por correo electrónico |

### 1.5 Archivos a subir

1. **Memoria descriptiva firmada** (PDF) — la pieza obligatoria
2. **Manual de usuario** (PDF, convertido de `docs/MANUAL_USUARIO.md`)
3. **Código fuente** — subir el ZIP completo (`chiltu.zip`) o las piezas más representativas:
   - `index.html`
   - `js/data.js`
   - `js/map.js`
   - `js/charts.js`
4. **Comprobante de pago** (PDF de pagalo.pe)
5. **Declaraciones juradas** de Rubén y Jacinto (PDFs escaneados)
6. **Oficio de UNTELS** si aplica (PDF)

### 1.6 Espera y seguimiento

- Plazo regular: **30 días hábiles**
- Plazo máximo con observaciones: **120 días hábiles**
- Notificaciones llegan a la casilla electrónica INDECOPI
- Email para consultas: **derechodeautor@indecopi.gob.pe**
- Cuando esté aprobado, llega: resolución directoral + certificado con código QR (descargable desde la plataforma)

---

## Paso 2 — GitHub

### 2.1 Crear el repositorio

1. Ir a **https://github.com** y autenticarse con la cuenta personal de Obert
2. Clic en **+ → New repository**
3. Configurar:
   - **Repository name**: `chiltu`
   - **Description**: `Atlas digital de diversidad de tomate silvestre (Solanum spp.) del Perú`
   - **Public** (marcar)
   - NO marcar "Add a README file" (ya lo tenemos)
   - License: **Creative Commons Attribution Non Commercial 4.0** (si aparece) o dejarlo vacío (ya viene LICENSE.txt)
4. **Create repository**

### 2.2 Subir el contenido

```bash
# En la terminal local, desde la carpeta donde está descomprimido chiltu/
cd chiltu

# Inicializar git
git init
git add .
git commit -m "Chiltu v1.0.0 — release inicial (piloto RCL)"

# Conectar con el repositorio remoto
git branch -M main
git remote add origin https://github.com/obemarsan/chiltu.git

# Subir
git push -u origin main
```

Reemplazar `obemarsan` con tu usuario real de GitHub.

### 2.3 Activar GitHub Pages

1. En el repositorio, ir a **Settings → Pages**
2. En **Source**: seleccionar **Deploy from a branch**
3. **Branch**: `main` · **Folder**: `/ (root)`
4. **Save**

En 1-2 minutos la URL pública estará activa en:
```
https://obemarsan.github.io/chiltu/
```

Verificar que el atlas se vea correctamente en línea.

### 2.4 Crear el primer Release (importante para Zenodo)

1. En el repositorio, ir a **Releases → Create a new release**
2. **Choose a tag**: `v1.0.0` (crear nuevo)
3. **Release title**: `Chiltu v1.0.0 — Piloto RCL`
4. **Describe this release**:

```markdown
Versión piloto inaugural de Chiltu, atlas digital de diversidad de tomate silvestre del Perú.

## Alcance
- 88 puntos georreferenciados
- 4 especies de Solanum sect. Lycopersicon
- 3 cuencas: Rímac, Chillón y Lurín (departamento de Lima)

## Co-autoría
- Obert Marín Sánchez (UNTELS)
- Rubén Armando Daga López (UNTELS)
- Jacinto Joaquín Vertiz Osores (UNTELS)

Grupo BIOPROSGEN. Proyecto base RCU 125-2024-UNTELS-CU bajo permiso SERFOR AUT-IFL-2025-076.
```

5. **Publish release**

Esta acción dispara la generación del DOI en Zenodo (siempre que ya hayas conectado la cuenta en el paso siguiente).

---

## Paso 3 — Zenodo

### 3.1 Vincular GitHub con Zenodo (única vez)

1. Ir a **https://zenodo.org**
2. **Sign in with GitHub** (o crear cuenta y luego conectar)
3. Ir a **https://zenodo.org/account/settings/github/**
4. Activar el repositorio **chiltu** moviendo el toggle a la derecha

Desde este momento, **cada release nuevo en GitHub generará automáticamente una entrada en Zenodo con DOI propio**.

### 3.2 Verificar el primer depósito

1. Después de publicar el release v1.0.0 en GitHub, esperar 2-5 minutos
2. Ir a **https://zenodo.org/account/settings/github/**
3. Verás `chiltu` con una marca verde y el DOI generado
4. Clic en el DOI para verificar que los metadatos estén correctos (los toma de `.zenodo.json`)

### 3.3 Actualizar el README con el DOI real

Una vez que Zenodo asigna el DOI (formato típico: `10.5281/zenodo.20281485`):

1. Editar el README.md y reemplazar el badge `pendiente_Zenodo` por el DOI real:

```markdown
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.20281485.svg)](https://doi.org/10.5281/zenodo.20281485)
```

2. Actualizar también el archivo `CITATION.cff` añadiendo el DOI:

```yaml
doi: 10.5281/zenodo.20281485
```

3. Hacer commit y push del cambio (sin necesidad de nuevo release).

### 3.4 Resultado final

Ahora Chiltu es un objeto académico:

- **Citable** con DOI permanente
- **Indexable** en bases de datos académicas que rastrean Zenodo (Google Scholar, Crossref, etc.)
- **Versionable**: cada release futuro en GitHub generará un nuevo DOI con metadatos actualizados
- **Verificable**: cualquier evaluador puede acceder a https://doi.org/[DOI] y descargar la versión exacta citada

---

## Paso 4 — Difusión académica

Una vez completados los tres pasos anteriores, la pieza está lista para ser comunicada:

- **CV RENACYT**: agregar entrada de producción científica con título, DOI Zenodo, certificado INDECOPI (cuando esté), URL GitHub Pages
- **Perfil ORCID**: agregar el ítem como "Work" tipo Software con DOI
- **Página personal o LinkedIn**: enlace al atlas en línea (URL GitHub Pages) y al DOI Zenodo
- **Redes BIOPROSGEN**: comunicar el lanzamiento del piloto e invitar a la comunidad científica a citarlo
- **Email al herbario UNPRG** y a SERFOR comunicando el lanzamiento del atlas con el dataset depositado

---

## Cronograma sugerido

| Semana | Actividad |
|--------|-----------|
| 1 | Reunión con VRI · acuerdos sobre UNTELS como productor · firmas de declaraciones juradas |
| 1 | Pago pagalo.pe · presentación virtual INDECOPI |
| 1 | Crear repositorio GitHub · subir contenido · activar GitHub Pages |
| 1 | Conectar Zenodo · crear primer release v1.0.0 |
| 2 | Verificar DOI Zenodo · actualizar README y CITATION.cff con DOI |
| 2 | Difusión inicial en BIOPROSGEN y redes académicas |
| 3-7 | Espera respuesta INDECOPI (30 días hábiles) |
| 8 | Recepción de certificado INDECOPI · actualizar README y memoria con número de registro |

---

*Última actualización de esta guía: Mayo 2026.*
