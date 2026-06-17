import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Let's add body parser since we will send the base64-encoded PDF
  app.use(express.json({ limit: '100mb' }));
  app.use(express.urlencoded({ limit: '100mb', extended: true }));

  // Relaxed CORS middleware to allow frictionless asset rendering inside Sandboxed Iframes
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

  // In-memory temporary storage for PDF blobs (clean up after 15 minutes to save resources)
  const pdfStore = new Map<string, { buffer: Buffer; mime: string; filename: string }>();

  // API Route: Save PDF
  app.post("/api/save-pdf", (req, res) => {
    try {
      const { pdfBase64, filename } = req.body;
      if (!pdfBase64) {
        return res.status(400).json({ error: "Nenhum conteúdo PDF foi fornecido." });
      }
      
      // Robust Base64 extraction from Data URI
      const commaIndex = pdfBase64.indexOf(",");
      const cleanBase64 = commaIndex !== -1 ? pdfBase64.substring(commaIndex + 1) : pdfBase64;
      const buffer = Buffer.from(cleanBase64, 'base64');
      const id = "ebook_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9);
      
      pdfStore.set(id, {
        buffer,
        mime: 'application/pdf',
        filename: filename || 'Saga_da_Sao_Paulo_Railway.pdf'
      });
      
      // Auto delete file after 15 minutes to keep server memory clean
      setTimeout(() => {
        pdfStore.delete(id);
      }, 15 * 60 * 1000);

      const downloadUrl = `/api/download-pdf/${id}`;
      res.json({ success: true, id, downloadUrl });
    } catch (err: any) {
      console.error("Erro ao salvar PDF temporário:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // API Route: Download PDF with attachment headers to force direct download
  app.get("/api/download-pdf/:id", (req, res) => {
    const { id } = req.params;
    const pdf = pdfStore.get(id);
    
    if (!pdf) {
      return res.status(404).send(`
        <div style="font-family: sans-serif; text-align: center; padding: 40px; color: #2C2620; background: #FAF7F2; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <h2 style="color: #c2410c;">Sua sessão de download expirou ou o arquivo não foi encontrado.</h2>
          <p style="color: #6c594c;">Por favor, retorne ao e-book e clique em "Exportar em PDF" novamente para gerar um novo link.</p>
        </div>
      `);
    }
    
    res.setHeader('Content-Type', pdf.mime);
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(pdf.filename)}"`);
    res.setHeader('Content-Length', pdf.buffer.length);
    res.end(pdf.buffer);
  });

  // Vite development middleware vs Static Production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Express + Vite Server] Rodando com sucesso na porta ${PORT}`);
  });
}

startServer();
