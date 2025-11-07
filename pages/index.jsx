/* 
BE CHÍ CỐT — Microsite (Next.js + Tailwind)
Version: 2025
Tác giả: ChatGPT (theo brief của bạn)
Cấu trúc:
1️⃣ Chọn vai trò (nút ảnh)
2️⃣ Chọn timetable (ảnh)
3️⃣ Gợi ý timetable có dịch vụ Be (ảnh)
4️⃣ Form UGC (text + multiple choice)
5️⃣ Certificate (ảnh chứng nhận)

Ảnh cần upload vào /public/:
- bg.png (background microsite)
- banla.png (ảnh tiêu đề “Bạn là”)
- nguoidilam.png (nút “Người đi làm”)
- sinhvien.png (nút “Sinh viên”)
- chonlichtrinh.png (ô “Chọn lịch trình…”)
- svtkb1.png, svtkb2.png (2 ảnh thời khóa biểu)
- goiy1.png (ô “Be Chí Cốt gợi ý…”)
- svtkbgoiy.png (thời khóa biểu gợi ý)
- chungnhan.png (ô “Chứng nhận tình bạn”)
*/

import React, { useState, useRef, useEffect } from "react";

export default function BeChiCotMicrosite() {
  const [role, setRole] = useState(null);
  const [step, setStep] = useState("chooseRole");
  const canvasRef = useRef(null);

  const feelingsOptions = [
    "Dễ thương phết chứ không đùa",
    "Có tâm hơn cả ny cũ luôn á",
    "Mượt mà, xịn xò, nói chung là “ưng cái bụng”",
    "Nói ít hiểu nhiều, chuẩn chí cốt",
    "Tưởng đâu bạn thân từ kiếp trước",
    "Giảm sức mạnh con tướng này giúp em",
    "Hiểu mình hơn cả mình, đỉnh thiệt",
    "Mượt hơn Sunsilk lun mom",
    "Tưởng toang lại hóa nhịp nhàng",
    "Tán là đổ liền luôn nè",
  ];

  const promisesOptions = [
    "Đi học/ làm đúng giờ mỗi sáng",
    "Ăn khuya sau deadline",
    "Giao thư tình cho crush",
    "Dọn nhà đón niềm vui mới",
    "Đón người yêu ở sân bay",
    "Đi du lịch cuối năm",
    "Sống sót qua mùa mưa gió",
    "Đi nhậu/bonding cuối năm",
    "Công phá 7749 trò chơi",
    "Đi dạo đêm quanh thành phố",
  ];

  const [ugc, setUgc] = useState({ feelings: [], story: "", promises: [] });

  const toggleFeeling = (f) => {
    setUgc((u) => {
      const has = u.feelings.includes(f);
      return {
        ...u,
        feelings: has
          ? u.feelings.filter((x) => x !== f)
          : [...u.feelings, f],
      };
    });
  };

  const togglePromise = (p) => {
    setUgc((u) => {
      const has = u.promises.includes(p);
      return {
        ...u,
        promises: has
          ? u.promises.filter((x) => x !== p)
          : [...u.promises, p],
      };
    });
  };

  function resetAll() {
    setRole(null);
    setStep("chooseRole");
    setUgc({ feelings: [], story: "", promises: [] });
  }

  const generateCertificate = () => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    c.width = 1200;
    c.height = 675;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, 1200, 675);
    ctx.fillStyle = "#111";
    ctx.font = "32px serif";
    ctx.fillText("Chứng nhận Be Chí Cốt", 50, 100);
    ctx.font = "20px serif";
    ctx.fillText(`Vai trò: ${role === "student" ? "Sinh viên" : "Người đi làm"}`, 50, 160);
    ctx.fillText(`Cảm nghĩ: ${ugc.feelings.join(", ")}`, 50, 200);
    ctx.fillText(`Kỷ niệm: ${ugc.story}`, 50, 240);
    ctx.fillText(`Hứa hẹn: ${ugc.promises.join(", ")}`, 50, 280);
    ctx.fillText("— Be Chí Cốt", 50, 360);
  };

  useEffect(() => {
    if (step === "certificate") generateCertificate();
  }, [step]);

  return (
    <div
      className="min-h-screen bg-cover bg-center relative text-gray-800"
      style={{ backgroundImage: "url('/bg.png')" }} // ảnh background microsite
    >

          {/* STEP 1: CHỌN VAI TRÒ */}
          {step === "chooseRole" && (
            <div className="flex flex-col items-center">
              <img src="/banla.png" alt="Bạn là" className="w-80 mb-4" /> {/* ảnh tiêu đề “Bạn là” */}

              <div className="flex flex-col md:flex-row gap-6 items-center">
                <button onClick={() => { setRole("worker"); setStep("pickTimetable"); }}>
                  <img
                    src="/nguoidilam.png"
                    alt="Người đi làm"
                    className="w-80 hover:scale-110 transition-transform"
                  /> {/* nút ảnh “Người đi làm” */}
                </button>
                <button onClick={() => { setRole("student"); setStep("pickTimetable"); }}>
                  <img
                    src="/sinhvien.png"
                    alt="Sinh viên"
                    className="w-80 hover:scale-110 transition-transform"
                  /> {/* nút ảnh “Sinh viên” */}
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: CHỌN THỜI KHÓA BIỂU */}
          {step === "pickTimetable" && (
            <div className="flex flex-col items-center">
              <img src="/chonlichtrinh.png" alt="Chọn lịch trình" className="w-80 mb-4" /> {/* ô “Chọn lịch trình...” */}

              <div className="flex flex-col md:flex-row gap-6">
                {role === "student" && (
                  <>
                    <button onClick={() => setStep("suggestTimetable")}>
                      <img src="/svtkb1.jpg" alt="TKB sinh viên 1" className="w-64 rounded-lg hover:scale-105 transition" /> {/* ảnh TKB1 */}
                    </button>
                    <button onClick={() => setStep("suggestTimetable")}>
                      <img src="/svtkb2.jpg" alt="TKB sinh viên 2" className="w-64 rounded-lg hover:scale-105 transition" /> {/* ảnh TKB2 */}
                    </button>
                  </>
                )}

                {role === "worker" && (
                  <>
                    <button onClick={() => setStep("suggestTimetable")}>
                      <img src="/svtkb1.jpg" alt="TKB người đi làm 1" className="w-64 rounded-lg hover:scale-105 transition" /> {/* có thể thay bằng ảnh riêng */}
                    </button>
                    <button onClick={() => setStep("suggestTimetable")}>
                      <img src="/svtkb2.jpg" alt="TKB người đi làm 2" className="w-64 rounded-lg hover:scale-105 transition" />
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: GỢI Ý BE CHÍ CỐT */}
          {step === "suggestTimetable" && (
            <div className="flex flex-col items-center">
              <img src="/goiy1.png" alt="Be gợi ý" className="w-80 mb-4" /> {/* ô “Be Chí Cốt gợi ý...” */}
              <img src="/svtkbgoiy.jpg" alt="TKB gợi ý" className="w-[28rem] rounded-lg shadow-lg mb-6" /> {/* ảnh thời khóa biểu gợi ý */}

              <div className="flex gap-4">
                <button
                  onClick={() => setStep("ugc")}
                  className="px-4 py-2 bg-yellow-500 text-white rounded shadow"
                >
                  Accept
                </button>
                <button
                  onClick={() => setStep("ugc")}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Đổi món
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: UGC FORM */}
          {step === "ugc" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Chia sẻ trải nghiệm cùng Be Chí Cốt
              </h2>

              <h3 className="font-medium mt-4">Step 1 — Cảm nghĩ</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {feelingsOptions.map((f) => (
                  <label
                    key={f}
                    className={`p-2 border rounded cursor-pointer ${
                      ugc.feelings.includes(f)
                        ? "bg-yellow-100 border-yellow-400"
                        : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={ugc.feelings.includes(f)}
                      onChange={() => toggleFeeling(f)}
                    />
                    <span className="text-sm">{f}</span>
                  </label>
                ))}
              </div>

              <h3 className="font-medium mt-4">
                Step 2 — Kể lại kỷ niệm (2–3 dòng)
              </h3>
              <textarea
                className="w-full border p-2 rounded mt-2"
                rows={3}
                value={ugc.story}
                onChange={(e) =>
                  setUgc((u) => ({ ...u, story: e.target.value }))
                }
                placeholder="Viết ngắn gọn, vui nhẹ, wow moment"
              />

              <h3 className="font-medium mt-4">
                Step 3 — Hứa hẹn (chọn 2–3)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {promisesOptions.map((p) => (
                  <label
                    key={p}
                    className={`p-2 border rounded cursor-pointer ${
                      ugc.promises.includes(p)
                        ? "bg-emerald-100 border-emerald-400"
                        : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={ugc.promises.includes(p)}
                      onChange={() => togglePromise(p)}
                    />
                    <span className="text-sm">{p}</span>
                  </label>
                ))}
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                  onClick={() => setStep("certificate")}
                >
                  Gửi Be Chí Cốt
                </button>
                <button
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={resetAll}
                >
                  Làm lại
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: CERTIFICATE */}
          {step === "certificate" && (
            <div className="flex flex-col items-center">
              <img
                src="/cert.png"
                alt="Chứng nhận tình bạn"
                className="w-96 mb-4"
              /> {/* ô “Chứng nhận tình bạn” */}

              <canvas ref={canvasRef} className="w-full max-w-[600px] shadow" />
              <div className="mt-3 flex gap-3">
                <button
                  onClick={() => {
                    const c = canvasRef.current;
                    const a = document.createElement("a");
                    a.href = c.toDataURL("image/png");
                    a.download = "be-chi-cot-certificate.png";
                    a.click();
                  }}
                  className="px-4 py-2 bg-yellow-500 text-white rounded"
                >
                  Lưu lại
                </button>
                <button
                  onClick={() => {
                    const quote = encodeURIComponent(
                      "Trải nghiệm Be Chí Cốt thật tuyệt!"
                    );
                    const shareUrl = encodeURIComponent(window.location.href);
                    const fb = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${quote}`;
                    window.open(fb, "_blank");
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Chia sẻ
                </button>
                <button
                  onClick={resetAll}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Làm lại
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
