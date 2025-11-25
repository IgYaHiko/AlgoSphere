(() => {
  const form = document.getElementById("dataForm");
  const preview = document.getElementById("preview");
  const downloadHtmlBtn = document.getElementById("downloadHtml");
  const downloadPdfBtn = document.getElementById("downloadPdf");
  const templateSelect = document.getElementById("templateSelect");
  const themeSelect = document.getElementById("themeSelect");
  const aiGenBtn = document.getElementById("aiGen");
  const photoInput = document.getElementById("photo");
  const openaiKeyInput = document.getElementById("openaiKey");

  let lastTemplateHTML = "";
  let lastName = "portfolio";
  let photoDataUrl = "";

  // -----------------------------------------
  // PHOTO UPLOAD
  // -----------------------------------------
  photoInput?.addEventListener("change", (e) => {
    const f = e.target.files?.[0];
    if (!f) {
      photoDataUrl = "";
      return;
    }
    const r = new FileReader();
    r.onload = () => {
      photoDataUrl = r.result;
    };
    r.readAsDataURL(f);
  });

  // -----------------------------------------
  // THEME SWITCHER
  // -----------------------------------------
  function applyTheme(name) {
    document.body.classList.remove("theme-light", "theme-blue", "theme-warm");
    document.body.classList.add(`theme-${name}`);
  }

  themeSelect.addEventListener("change", (e) => applyTheme(e.target.value));
  applyTheme(themeSelect.value);

  // -----------------------------------------
  // TEMPLATE BUILDER
  // -----------------------------------------
  function buildTemplate(data, templateName) {
    const skills = (data.skills || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const projectsRaw = (data.projects || "")
      .split(";;")
      .map((s) => s.trim())
      .filter(Boolean);

    const projects = projectsRaw.map((p) => {
      const [n, d] = p.split("|").map((x) => x?.trim());
      return { name: n || p, desc: d || "" };
    });

    const exps = (data.experience || "")
      .split(";;")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((it) => {
        const [company, role, years] = it.split("|").map((x) => x?.trim());
        return { company, role, years };
      });

    const edus = (data.education || "")
      .split(";;")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((it) => {
        const [degree, place, year] = it.split("|").map((x) => x?.trim());
        return { degree, place, year };
      });

    const socials = (data.socials || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    // shared CSS for standalone file
    const commonCSS = `
      body{font-family:Inter,Arial,Helvetica,sans-serif;margin:0;padding:0;background:#f7fafc;color:#0b1220}
      .wrap{max-width:900px;margin:28px auto;padding:28px;background:#fff;border-radius:12px;box-shadow:0 10px 30px rgba(2,6,23,0.08)}
      header{display:flex;gap:18px;align-items:center}
      .avatar{width:120px;height:120px;border-radius:12px;object-fit:cover;border:3px solid #06b6d4}
      h1{margin:0;font-size:28px}
      h3{margin:0;font-size:16px;color:#334155}
      p.lead{color:#475569}
      .section{margin-top:18px}
      .chips span{display:inline-block;background:#eef2ff;color:#0b1220;padding:6px 10px;border-radius:999px;margin:6px 6px 0 0}
      .project{padding:12px;border-radius:10px;background:#f8fafc;margin-bottom:10px}
      .grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
      a.social{display:inline-block;margin-right:8px;color:#0369a1;text-decoration:none}
      @media (max-width:700px){ .grid{grid-template-columns:1fr} .avatar{width:96px;height:96px} }
    `;

    // ---------- MODERN TEMPLATE ----------
    if (templateName === "modern") {
      return `
      <!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
      <title>${data.name} – Portfolio</title>
      <style>${commonCSS}</style>
      </head><body><div class="wrap">
        <header>
          <img class="avatar" src="${photoDataUrl ||
            "https://via.placeholder.com/320x320?text=Photo"}" alt="avatar">
          <div>
            <h1>${data.name}</h1>
            <h3>${data.title}</h3>
            <p class="lead">${data.bio}</p>
            ${socials
              .map(
                (s) =>
                  `<a class="social" href="${s}" target="_blank" rel="noopener">${s.replace(
                    /^https?:\/\//,
                    ""
                  )}</a>`
              )
              .join(" ")}
          </div>
        </header>

        <div class="section grid">
          <div>
            <h2>Skills</h2>
            <div class="chips">${skills.map((s) => `<span>${s}</span>`).join("")}</div>

            <h2 style="margin-top:16px">Experience</h2>
            ${exps
              .map(
                (e) =>
                  `<div class="project"><strong>${e.role} — ${e.company}</strong><div style="color:#64748b">${e.years}</div></div>`
              )
              .join("")}
          </div>

          <div>
            <h2>Projects</h2>
            ${projects
              .map(
                (p) =>
                  `<div class="project"><strong>${p.name}</strong><div style="color:#475569">${p.desc}</div></div>`
              )
              .join("")}

            <h2 style="margin-top:16px">Education</h2>
            ${edus
              .map(
                (ed) =>
                  `<div class="project"><strong>${ed.degree}</strong><div style="color:#64748b">${ed.place} • ${ed.year}</div></div>`
              )
              .join("")}
          </div>
        </div>

        <footer style="margin-top:18px;color:#94a3b8">Generated with AI Portfolio Creator</footer>
      </div></body></html>`;
    }

    // ---------- MINIMAL TEMPLATE ----------
    if (templateName === "minimal") {
      return `
      <!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
      <title>${data.name} – Portfolio</title>
      <style>
        body{font-family:Inter,Arial;margin:0;background:#0b1220;color:#e6eef6}
        .wrap{max-width:780px;margin:40px auto;padding:26px}
        .top{display:flex;align-items:center;gap:16px}
        .avatar{width:96px;height:96px;border-radius:12px;object-fit:cover}
        h1{margin:0;font-weight:600}
        .muted{color:#94a3b8;}
        .section{margin-top:18px;border-top:1px dashed rgba(255,255,255,0.04);padding-top:14px}
        .chip{display:inline-block;padding:6px 10px;background:rgba(255,255,255,0.06);border-radius:999px;margin-right:8px}
        a{color:#60a5fa}
      </style>
      </head><body><div class="wrap">

        <div class="top">
          <img class="avatar" src="${photoDataUrl ||
            "https://via.placeholder.com/320x320?text=Photo"}">
          <div>
            <h1>${data.name}</h1>
            <div class="muted">${data.title}</div>
            <p style="margin-top:8px">${data.bio}</p>
          </div>
        </div>

        <div class="section"><h3>Skills</h3>${skills
          .map((s) => `<span class="chip">${s}</span>`)
          .join("")}</div>

        <div class="section"><h3>Projects</h3>${projects
          .map(
            (p) =>
              `<div style="margin-top:8px"><strong>${p.name}</strong><div class="muted">${p.desc}</div></div>`
          )
          .join("")}</div>

        <div class="section"><h3>Experience & Education</h3>
          ${exps
            .map(
              (e) =>
                `<div><strong>${e.role} @ ${e.company}</strong> <div class="muted">${e.years}</div></div>`
            )
            .join("")}
          ${edus
            .map(
              (e) =>
                `<div><strong>${e.degree}</strong> <div class="muted">${e.place} • ${e.year}</div></div>`
            )
            .join("")}
        </div>

        <div class="section"><h3>Contact</h3>
          ${socials
            .map((s) => `<div><a href="${s}" target="_blank">${s}</a></div>`)
            .join("")}
        </div>

      </div></body></html>`;
    }

    // ---------- DEVELOPER TEMPLATE ----------
    return `
    <!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <title>${data.name} – Portfolio</title>
    <style>
      body{font-family:Inter,Arial;margin:0;background:#0f1724;color:#e6eef6}
      .wrap{max-width:900px;margin:28px auto;padding:28px}
      header{display:flex;gap:18px;align-items:center}
      .avatar{width:100px;height:100px;border-radius:10px;object-fit:cover;border:2px solid #06b6d4}
      h1{margin:0;font-size:24px}
      .muted{color:#94a3b8}
      .grid{display:grid;grid-template-columns:2fr 1fr;gap:18px;margin-top:18px}
      .card{background:#071029;padding:14px;border-radius:10px}
    </style></head><body><div class="wrap">

      <header>
        <img class="avatar" src="${photoDataUrl ||
          "https://via.placeholder.com/320x320?text=Photo"}">
        <div>
          <h1>${data.name}</h1>
          <div class="muted">${data.title}</div>
          <p class="muted">${data.bio}</p>
        </div>
      </header>

      <div class="grid">
        <div>
          <div class="card"><h3>Projects</h3>${projects
            .map(
              (p) =>
                `<div style="margin-bottom:10px"><strong>${p.name}</strong><div class="muted">${p.desc}</div></div>`
            )
            .join("")}</div>
          <div class="card" style="margin-top:12px"><h3>Experience</h3>${exps
            .map(
              (e) =>
                `<div style="margin-bottom:8px"><strong>${e.role}</strong> <div class="muted">${e.company} • ${e.years}</div></div>`
            )
            .join("")}</div>
        </div>

        <aside>
          <div class="card"><h3>Skills</h3><div style="margin-top:8px">${skills
            .map(
              (s) =>
                `<span style="display:inline-block;background:#e6eef6;color:#042f3b;padding:6px 10px;border-radius:999px;margin:6px 6px 0 0">${s}</span>`
            )
            .join("")}</div></div>

          <div class="card" style="margin-top:12px"><h3>Education</h3>${edus
            .map(
              (e) =>
                `<div><strong>${e.degree}</strong><div class="muted">${e.place} • ${e.year}</div></div>`
            )
            .join("")}</div>

          <div class="card" style="margin-top:12px"><h3>Contact</h3>${socials
            .map(
              (s) =>
                `<div><a href="${s}" style="color:#60a5fa">${s.replace(
                  /^https?:\/\//,
                  ""
                )}</a></div>`
            )
            .join("")}</div>
        </aside>
      </div>

      <footer style="margin-top:18px;color:#94a3b8">Generated with AI Portfolio Creator</footer>

    </div></body></html>`;
  }

  // -----------------------------------------
  // LOCAL AI GENERATOR
  // -----------------------------------------
  function localAIGenerate(formData) {
    if (!formData.bio || formData.bio.trim().length < 10) {
      const skills = (formData.skills || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const role = formData.title || "Developer";
      const skillList = skills.slice(0, 4).join(", ") || "web technologies";
      formData.bio = `${role} skilled in ${skillList}. I build clean, maintainable web applications and enjoy solving real-world problems with modern tools.`;
    }

    const prs = (formData.projects || "")
      .split(";;")
      .map((p) => p.trim())
      .filter(Boolean);

    const updated = prs.map((p) => {
      if (p.includes("|")) return p;
      const skills = (formData.skills || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const desc = skills.length
        ? `A project built with ${skills.slice(0, 3).join(", ")}`
        : `A personal project`;
      return `${p}|${desc}`;
    });

    formData.projects = updated.join(";;");
    return formData;
  }

  // -----------------------------------------
  // GENERATE PREVIEW
  // -----------------------------------------
  async function generateAndPreview(values) {
    let data = localAIGenerate({ ...values });
    const tpl = templateSelect.value || "modern";

    const html = buildTemplate(data, tpl);

    const doc = preview.contentDocument || preview.contentWindow.document;
    doc.open();
    doc.write(html);
    doc.close();

    lastTemplateHTML = html;
    lastName =
      (data.name && data.name.replace(/\s+/g, "-").toLowerCase()) ||
      "portfolio";

    downloadHtmlBtn.disabled = false;
    downloadPdfBtn.disabled = false;
  }

  // -----------------------------------------
  // FORM SUBMIT
  // -----------------------------------------
  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const formValues = {
      name: document.getElementById("name").value.trim(),
      title: document.getElementById("title").value.trim(),
      bio: document.getElementById("bio").value.trim(),
      skills: document.getElementById("skills").value.trim(),
      projects: document.getElementById("projects").value.trim(),
      experience: document.getElementById("experience").value.trim(),
      education: document.getElementById("education").value.trim(),
      socials: document.getElementById("socials").value.trim(),
    };
    await generateAndPreview(formValues);
  });

  // -----------------------------------------
  // AI GENERATE BUTTON
  // -----------------------------------------
  aiGenBtn.addEventListener("click", async () => {
    const formValues = {
      name: document.getElementById("name").value.trim() || "Your Name",
      title: document.getElementById("title").value.trim() || "Developer",
      bio: document.getElementById("bio").value.trim(),
      skills:
        document.getElementById("skills").value.trim() ||
        "HTML, CSS, JavaScript",
      projects:
        document.getElementById("projects").value.trim() ||
        "Portfolio;;Demo App",
      experience:
        document.getElementById("experience").value.trim() ||
        "Acme|Front-end|2021-2023",
      education:
        document.getElementById("education").value.trim() ||
        "BSc CS|University|2019",
      socials: document.getElementById("socials").value.trim() || "",
    };

    const generated = localAIGenerate(formValues);

    document.getElementById("bio").value = generated.bio;
    document.getElementById("projects").value = generated.projects;

    await generateAndPreview(generated);
  });


// -----------------------------------------
// DOWNLOAD HTML
// -----------------------------------------
downloadHtmlBtn.addEventListener("click", () => {
  if (!lastTemplateHTML) {
    alert("Please generate a preview first!");
    return;
  }

  const blob = new Blob([lastTemplateHTML], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${lastName}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});


  // -----------------------------------------
// -----------------------------------------
// DOWNLOAD PDF (html2canvas + jsPDF)
// -----------------------------------------
downloadPdfBtn.addEventListener("click", async () => {
  try {
    const iframeDoc = preview.contentDocument || preview.contentWindow.document;
    const element = iframeDoc.body;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      width: element.scrollWidth,
      height: element.scrollHeight
    });

    const imgData = canvas.toDataURL("image/png");

    // Check if jsPDF is available in different possible locations
    const jsPDF = window.jspdf ? window.jspdf.jsPDF : window.jsPDF;
    
    if (!jsPDF) {
      throw new Error("jsPDF library not found. Please make sure it's properly loaded.");
    }

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // Add page if content is too long
    if (pdfHeight > pdf.internal.pageSize.getHeight()) {
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      // Content exceeds page height, we might need to split across pages
      // For simplicity, we'll just scale to fit
      const scale = pdf.internal.pageSize.getHeight() / pdfHeight;
      pdf.deletePage(1);
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth * scale, pdfHeight * scale);
    } else {
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    }

    pdf.save(`${lastName}.pdf`);
  } catch (error) {
    console.error("PDF generation failed:", error);
    alert(`PDF generation failed: ${error.message}. Please check if all required libraries are loaded.`);
  }
});

})();
