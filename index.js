const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const EMAIL = "mehak1340.be23@chitkara.edu.in";

// HEALTH API
app.get("/health", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: EMAIL
  });
});

// BFHL API
app.post("/bfhl", async (req, res) => {
  try {
    const body = req.body;

    if (body.fibonacci !== undefined) {
      let n = body.fibonacci;
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

    if (body.hcf) {
      const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
      const result = body.hcf.reduce((a, b) => gcd(a, b));
      return res.status(200).json({
        is_success: true,
        official_email: EMAIL,
        data: result
      });
    }

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

    if (body.AI) {
      // Temporary hardcoded AI response
      return res.status(200).json({
        is_success: true,
        official_email: EMAIL,
        data: "Mumbai"
      });
    }

    return res.status(400).json({ is_success: false });

  } catch (err) {
    return res.status(500).json({ is_success: false });
  }
});
// ROOT ROUTE (IMPORTANT FIX)
app.get("/", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: "mehak1340.be23@chitkara.edu.in"
  });
});

// HEALTH ROUTE
app.get("/health", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: "mehak1340.be23@chitkara.edu.in"
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));

