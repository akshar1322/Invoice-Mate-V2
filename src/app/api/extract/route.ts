import { NextResponse, NextRequest } from "next/server";
import Challan from "@/models/challan.model";
import Bill from "@/models/bill.model";
import LR from "@/models/lr.model";
import Voucher from "@/models/voucher.model";
import LoadingSlip from "@/models/loadingSlip.model";
import convertDateFormat from "@/helpers/convertDateFormat";
import { connectDB } from "@/dbConfig/dbConfig"; // ✅ correct import

export async function POST(request: NextRequest) {
  try {
    console.log("🟡 [STEP 1] API HIT: /api/extract");

    // 1️⃣ Connect to MongoDB
    await connectDB();
    console.log("✅ [STEP 2] Database connected successfully");

    // 2️⃣ Parse request body
    const { startDate, endDate, invoiceType, company } = await request.json();
    console.log("📩 [STEP 3] Data received from frontend:", {
      startDate,
      endDate,
      invoiceType,
      company,
    });

    // Normalize invoiceType and company to avoid mismatch
    const invoiceTypeNormalized = (invoiceType || "").trim().toLowerCase();
    const companyNormalized = (company || "").trim().toLowerCase();
    console.log("🔄 [STEP 4] Normalized values:", {
      invoiceTypeNormalized,
      companyNormalized,
    });

    // 3️⃣ Convert dates
    const start = new Date(convertDateFormat(startDate));
    const end = new Date(convertDateFormat(endDate));
    console.log("📅 [STEP 5] Converted date range:", { start, end });

    // 4️⃣ Map company
    const companyMap: Record<string, string> = {
      "the-rising-freight-carriers": "663770b3b752100159dc12db",
      "maa-saraswati-road-carriers": "66376f17b752100159dc12d9",
      default: "663771e7b752100159dc12dd",
    };

    const companyId = companyMap[companyNormalized] || companyMap.default;
    console.log("🏢 [STEP 6] Selected company ID:", companyId);

    let transactions: any[] = [];

    // 5️⃣ Filter by invoice type
    console.log("🔍 [STEP 7] Processing invoice type:", invoiceTypeNormalized);

    switch (invoiceTypeNormalized) {
      case "loading-slips": {
        console.log("🧾 Fetching loading slips...");
        const loadingSlips = await LoadingSlip.find({ company: companyId });
        console.log("📦 Found", loadingSlips.length, "loading slips total");

        transactions = loadingSlips.filter((s) => {
          const d = new Date(convertDateFormat(s.date || ""));
          return d >= start && d <= end;
        });
        console.log("✅ Filtered", transactions.length, "loading slips in range");

        return NextResponse.json({
          message: "LOADING SLIPS EXTRACTED",
          transactions,
        });
      }

      case "challans": {
        console.log("🧾 Fetching challans...");
        const challans = await Challan.find({ company: companyId });
        console.log("📦 Found", challans.length, "challans total");

        transactions = challans.filter((s) => {
          const d = new Date(convertDateFormat(s.mainBillDate || ""));
          return d >= start && d <= end;
        });
        console.log("✅ Filtered", transactions.length, "challans in range");

        return NextResponse.json({
          message: "CHALLANS EXTRACTED",
          transactions,
        });
      }

      case "bills": {
        console.log("🧾 Fetching bills...");
        const bills = await Bill.find({ company: companyId });
        console.log("📦 Found", bills.length, "bills total");

        transactions = bills.filter((s) => {
          const d = new Date(convertDateFormat(s.mainBillDate || ""));
          return d >= start && d <= end;
        });
        console.log("✅ Filtered", transactions.length, "bills in range");

        return NextResponse.json({
          message: "BILLS EXTRACTED",
          transactions,
        });
      }

      case "vouchers": {
        console.log("🧾 Fetching vouchers...");
        const vouchers = await Voucher.find({ company: companyId });
        console.log("📦 Found", vouchers.length, "vouchers total");

        transactions = vouchers.filter((s) => {
          const d = new Date(convertDateFormat(s.date || ""));
          return d >= start && d <= end;
        });
        console.log("✅ Filtered", transactions.length, "vouchers in range");

        return NextResponse.json({
          message: "VOUCHERS EXTRACTED",
          transactions,
        });
      }

      case "lrs": {
        console.log("🧾 Fetching LRs...");
        const lrs = await LR.find({ company: companyId });
        console.log("📦 Found", lrs.length, "LRs total");

        transactions = lrs.filter((s) => {
          const d = new Date(convertDateFormat(s.date || ""));
          return d >= start && d <= end;
        });
        console.log("✅ Filtered", transactions.length, "LRs in range");

        return NextResponse.json({
          message: "LRS EXTRACTED",
          transactions,
        });
      }

      default:
        console.warn("⚠️ [STEP 8] Invalid invoice type:", invoiceTypeNormalized);
        return NextResponse.json(
          { error: "Invalid invoice type", received: invoiceTypeNormalized },
          { status: 400 }
        );
    }
  } catch (error: any) {
    console.error("❌ [STEP 9] API ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
