const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

const EMAIL = "mehak1340.be23@chitkara.edu.in";

/* =========================
   ROOT ROUTE
========================= */
app.get("/", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: EMAIL
  });
});

/* =========================
   HEALTH ROUTE
========================= */
app.get("/health", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: EMAIL
  });
});

/* =========================
   BFHL ROUTE
========================= */
app.post("/bfhl", async (req, res) => {
  try {
    const body = req.body;

    /* ---- Fibonacci ---- */
    if (body.fibonacci !== undefined) {
      const n = body.fibonacci;
      let fib = [0, 1];
      for (let i = 2; i < n; i++) {
        fib.push(fib[i - 1] + fib[i - 2]);
      }
      return res.status(200).json({
        is_success: true,
        official_email: EMAIL,
        data: fib.slice(0, n)
      });
    }

    /* ---- Prime ---- */
    if (body.prime) {
      const isPrime = (n) => {
        if (n < 2) return false;
        for (let i = 2; i <= Math.sqrt(n); i++) {
          if (n % i === 0) return false;
        }
        return true;
      };

      return res.status(200).json({
        is_success: true,
        official_email: EMAIL,
        data: body.prime.filter(isPrime)
      });
    }

    /* ---- HCF ---- */
    if (body.hcf) {
      const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
      const result = body.hcf.reduce((a, b) => gcd(a, b));

      return res.status(200).json({
        is_success: true,
        official_email: EMAIL,
        data: result
      });
    }

    /* ---- LCM ---- */
    if (body.lcm) {
      const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
      const lcm = (a, b) => (a * b) / gcd(a, b);
      const result = body.lcm.reduce((a, b) => lcm(a, b));

      return res.status(200).json({
        is_success: true,
        official_email: EMAIL,
        data: result
      });
    }

    /* ---- AI (Gemini) ---- */
 if (body.AI) {
  const response = await axios.post(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
    {
      contents: [
        {
          parts: [{ text: body.AI }]
        }
      ]
    },
    {
      params: {
        key: process.env.GEMINI_API_KEY
      }
    }
  );

  const answer =
    response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Unknown";

  return res.status(200).json({
    is_success: true,
    official_email: EMAIL,
    data: answer.split(" ")[0]
  });
}

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      is_success: false
    });
  }
});

/* =========================
   SERVER
========================= */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
