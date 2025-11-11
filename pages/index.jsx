/* 
BE CHÍ CỐT — Microsite (Next.js + Tailwind)
Version: 2025
*/

import React, { useState, useRef, useEffect } from "react";

// COMPONENT: Một ô lịch trình có thể bấm để chỉnh
function EditableTask({ task, onSelect }) {
  return (
    <button
      onClick={() => onSelect(task)}
      className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-yellow-100 rounded-lg shadow-sm border border-gray-200 transition"
    >
      <p className="text-sm text-gray-600">{task.time}</p>
      <p className="font-medium text-gray-800">{task.title}</p>
    </button>
  );
}

// COMPONENT: Popup chọn gợi ý thay thế
function SuggestModal({ task, onChoose, onClose, timetableVersion }) {
  if (!task) return null;

  // Gợi ý cho svtkb1
  const alternatives1 = {
    "Anh Sơn Be chở đi học": [
      "Anh Sơn Be chở đi làm",
      "Anh Sơn Be chở đi gym",
      "Anh Sơn Be chở đi cafe",
    ],
    "Anh Kiên Be ship bánh mì Hội An": [
      "Anh Kiên Be ship bánh bao",
      "Anh Kiên Be ship xôi xéo",
      "Anh Kiên Be ship cháo sườn",
    ],
    "Đi học ở trường": [
      "Đến thư viện học nhóm",
      "Tham gia câu lạc bộ",
      "Đi học thêm buổi tối",
    ],
    "Anh Đức Be giao hợp đồng": [
      "Anh Đức Be giao quà cho đối tác",
      "Anh Đức Be gửi báo cáo sếp",
      "Anh Đức Be nhận đơn mới",
    ],
    "Chạy deadline": [
      "Đi chơi sau deadline",
      "Đi xem phim với bạn",
      "Ngủ bù 10 tiếng liền",
    ],
  };

  // Gợi ý cho svtkb2
  const alternatives2 = {
    "Anh Phúc Be giao bánh bao trứng muối": [
      "Anh Phúc Be giao bánh dày",
      "Anh Phúc Be giao bánh cuốn",
      "Anh Phúc Be giao bánh ướt",
    ],
    "Anh Thiện Be giao phở bò Nam Định": [
      "Anh Thiện Be giao bún riêu",
      "Anh Thiện Be giao cơm tấm",
      "Anh Thiện Be giao mì hải sản",
    ],
    "Anh Hải Be giao Matcha Latte": [
      "Anh Hải Be giao sữa tươi trân châu",
      "Anh Hải Be giao rau má mix",
      "Anh Hải Be giao trà xoài",
    ],
    "Đi họp công ty": [
      "Họp online 30 phút",
      "Họp team building",
      "Họp client cuối năm",
    ],
    "Chạy deadline": [
      "Làm báo cáo nhanh",
      "Gọi team hỗ trợ",
      "Nghỉ ngơi để hồi sức",
    ],
  };

  const alternatives =
    timetableVersion === "svtkb2goiy" ? alternatives2 : alternatives1;
  const options = alternatives[task.title] || [];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-80 shadow-lg text-center">
        <h3 className="font-semibold mb-2">Chọn gợi ý thay thế cho:</h3>
        <p className="text-gray-700 text-sm mb-4 italic">{task.title}</p>

        <div className="flex flex-col gap-2">
          {options.length > 0 ? (
            options.map((opt) => (
              <button
                key={opt}
                onClick={() => onChoose(task, opt)}
                className="px-4 py-2 bg-yellow-100 hover:bg-yellow-200 rounded transition"
              >
                {opt}
              </button>
            ))
          ) : (
            <p className="text-gray-500 text-sm">(Không có gợi ý thay thế)</p>
          )}
        </div>

        <button onClick={onClose} className="mt-4 text-sm text-gray-500">
          Đóng
        </button>
      </div>
    </div>
  );
}

// ===============================
// MAIN COMPONENT
// ===============================
export default function BeChiCotMicrosite() {
  const [role, setRole] = useState(null);
  const [step, setStep] = useState("chooseRole");
  const [selectedTimetable, setSelectedTimetable] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const canvasRef = useRef(null);

  // template cho 2 timetable
  const timetableTemplate1 = [
    { id: 1, title: "Anh Sơn Be chở đi học", time: "07:00" },
    { id: 2, title: "Anh Kiên Be ship bánh mì Hội An", time: "07:30" },
    { id: 3, title: "Đi học ở trường", time: "08:00" },
    { id: 4, title: "Anh Đức Be giao hợp đồng", time: "15:00" },
    { id: 5, title: "Chạy deadline", time: "21:00" },
  ];

  const timetableTemplate2 = [
    { id: 1, title: "Anh Phúc Be giao bánh bao trứng muối", time: "07:00" },
    { id: 2, title: "Anh Thiện Be giao phở bò Nam Định", time: "08:00" },
    { id: 3, title: "Anh Hải Be giao Matcha Latte", time: "12:00" },
    { id: 4, title: "Đi họp công ty", time: "14:00" },
    { id: 5, title: "Chạy deadline", time: "21:00" },
  ];

  const [editableTasks, setEditableTasks] = useState(timetableTemplate1);

  // Hàm chọn task
  const handleSelectTask = (task) => setSelectedTask(task);
  const handleChooseAlternative = (task, newTitle) => {
    setEditableTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, title: newTitle } : t))
    );
    setSelectedTask(null);
  };

  const handleFinishEditing = () => setStep("finalTimetable");

  const [ugc, setUgc] = useState({ feelings: [], story: "", promises: [] });

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

  function resetAll() {
    setRole(null);
    setStep("chooseRole");
    setUgc({ feelings: [], story: "", promises: [] });
  }

  function drawSingleLineText(ctx, text, x, y, maxWidth, maxFontSize = 18, minFontSize = 10) {
    let fontSize = maxFontSize;
    ctx.font = `${fontSize}px Arial`;
    while (ctx.measureText(text).width > maxWidth && fontSize > minFontSize) {
      fontSize -= 1;
      ctx.font = `${fontSize}px Arial`;
    }
    ctx.fillText(text, x, y);
  }

  const generateCertificate = () => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const img = new Image();
    img.src = "/cert.png";
    img.onload = () => {
      ctx.drawImage(img, 0, 0, c.width, c.height);
      ctx.textBaseline = "top";
      ctx.fillStyle = "#000";
      const feelingsText = ugc.feelings.join(", ") || "(Chưa nhập)";
      const storyText = ugc.story || "(Chưa nhập)";
      const promisesText = ugc.promises.join(", ") || "(Chưa nhập)";
      const textXStart = 140;
      const textWidth = 600;
      const centerX = textXStart + textWidth / 2;
      ctx.textAlign = "center";
      drawSingleLineText(ctx, feelingsText, centerX, 360, textWidth);
      drawSingleLineText(ctx, storyText, centerX, 425, textWidth);
      drawSingleLineText(ctx, promisesText, centerX, 495, textWidth);
    };
  };
  useEffect(() => {
    if (step === "certificate") generateCertificate();
  }, [step]);

  // =================== UI FLOW ===================
  return (
    <div
      className="min-h-screen bg-cover bg-center relative text-gray-800"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      {/* STEP 1 */}
      {step === "chooseRole" && (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <img src="/banla.png" alt="Bạn là" className="w-[22rem] mb-4" />
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                setRole("student");
                setStep("pickTimetable");
              }}
            >
              <img src="/sinhvien.png" className="w-full max-w-sm hover:scale-105 transition" />
            </button>
            <button
              onClick={() => {
                setRole("worker");
                setStep("pickTimetable");
              }}
            >
              <img src="/nguoidilam.png" className="w-full max-w-sm hover:scale-105 transition" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {step === "pickTimetable" && (
        <div className="flex flex-col items-center">
          <img src="/chonlichtrinh.png" className="w-[600px] mb-4" />
          <div className="flex gap-6">
            <button
              onClick={() => {
                setSelectedTimetable("svtkb1goiy");
                setEditableTasks(timetableTemplate1.map((t) => ({ ...t })));
                setStep("suggestTimetable");
              }}
            >
              <img src="/svtkb1.jpg" className="w-[230px] rounded-lg hover:scale-105 transition" />
            </button>
            <button
              onClick={() => {
                setSelectedTimetable("svtkb2goiy");
                setEditableTasks(timetableTemplate2.map((t) => ({ ...t })));
                setStep("suggestTimetable");
              }}
            >
              <img src="/svtkb2.jpg" className="w-[230px] rounded-lg hover:scale-105 transition" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === "suggestTimetable" && (
        <div className="flex flex-col items-center">
          <img src="/goiy1.png" alt="Be gợi ý" className="w-[800px] mb-4" />
          <img
            src={`/${selectedTimetable || "svtkb1goiy"}.jpg`}
            className="w-[230px] rounded-lg shadow-lg mb-6"
          />
          <div className="flex gap-4">
            <button
              onClick={() => setStep("ugc")}
              className="px-4 py-2 bg-yellow-500 text-white rounded shadow"
            >
              Xác nhận
            </button>
            <button
              onClick={() => setStep("editTimetable")}
              className="px-4 py-2 bg-blue-200 rounded shadow"
            >
              Chỉnh sửa lịch trình
            </button>
          </div>
        </div>
      )}

      {/* STEP 3.5 */}
      {step === "editTimetable" && (
        <div
          className="min-h-screen bg-cover bg-center flex flex-col items-center p-6 text-center"
          style={{ backgroundImage: "url('/bg.png')" }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-yellow-800 drop-shadow">
            Tùy chỉnh lịch trình của bạn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
            {editableTasks.map((t) => (
              <EditableTask key={t.id} task={t} onSelect={handleSelectTask} />
            ))}
          </div>
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleFinishEditing}
              className="px-5 py-2 bg-yellow-500 text-white rounded shadow hover:scale-105 transition"
            >
              Hoàn tất & Tiếp tục
            </button>
            <button
              onClick={() => setStep("suggestTimetable")}
              className="px-5 py-2 bg-gray-300 rounded hover:scale-105 transition"
            >
              Quay lại
            </button>
          </div>

          <SuggestModal
            task={selectedTask}
            onChoose={handleChooseAlternative}
            onClose={() => setSelectedTask(null)}
            timetableVersion={selectedTimetable}
          />
        </div>
      )}

      {/* STEP 3.6 */}
      {step === "finalTimetable" && (
        <div
          className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-6 text-center"
          style={{ backgroundImage: "url('/bg.png')" }}
        >
          <div className="bg-white/85 shadow-lg rounded-2xl p-6 max-w-2xl w-full">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-800">
              Lịch trình hoàn chỉnh của bạn
            </h2>
            <div className="divide-y divide-gray-200">
              {editableTasks.map((t, i) => (
                <div key={t.id} className={`py-3 px-4 text-left ${i % 2 ? "bg-white" : "bg-gray-50"}`}>
                  <p className="text-sm text-gray-500">{t.time}</p>
                  <p className="font-medium text-gray-800">{t.title}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setStep("ugc")}
              className="mt-6 px-6 py-2 bg-yellow-500 text-white rounded shadow hover:scale-105 transition"
            >
              Xác nhận & Tiếp tục
            </button>
          </div>
        </div>
      )}

   {/* STEP 4: UGC FORM */}
{step === "ugc" && (
  <div
    className="min-h-screen bg-cover bg-center flex items-center justify-center p-6"
    style={{ backgroundImage: "url('/bg.png')" }}
  >
    <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-8 max-w-3xl w-full text-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Chia sẻ trải nghiệm cùng Be Chí Cốt
      </h2>

      {/* Step 1 - Cảm nghĩ */}
      <h3 className="font-semibold mb-2">Cảm nghĩ sau buổi "First Date" cùng Be Chí Cốt</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
        {feelingsOptions.map((f) => (
          <label
            key={f}
            className={`p-2 border rounded cursor-pointer text-sm ${
              ugc.feelings.includes(f)
                ? "bg-yellow-100 border-yellow-400"
                : "hover:bg-gray-80"
            }`}
          >
            <input
              type="checkbox"
              className="mr-2"
              checked={ugc.feelings.includes(f)}
              onChange={() => toggleFeeling(f)}
            />
            {f}
          </label>
        ))}
      </div>

      {/* Step 2 - Kỷ niệm */}
      <h3 className="font-semibold mb-2">Kể lại kỷ niệm sau buổi "First Date" cùng Be Chí Cốt</h3>
      <textarea
        className="w-full border p-2 rounded mb-4"
        rows={3}
        value={ugc.story}
        onChange={(e) => setUgc((u) => ({ ...u, story: e.target.value }))}
        placeholder="Chia sẻ với Be nhé!"
      />

      {/* Step 3 - Hứa hẹn */}
      <h3 className="font-semibold mb-2">Hứa hẹn cho những buổi "date" tiếp theo</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
        {promisesOptions.map((p) => (
          <label
            key={p}
            className={`p-2 border rounded cursor-pointer text-sm ${
              ugc.promises.includes(p)
                ? "bg-yellow-100 border-yellow-400"
                : "hover:bg-gray-80"
            }`}
          >
            <input
              type="checkbox"
              className="mr-2"
              checked={ugc.promises.includes(p)}
              onChange={() => togglePromise(p)}
            />
            {p}
          </label>
        ))}
      </div>

      <div className="flex justify-center gap-3">
        <button
          className="px-5 py-2 bg-blue-600 text-white rounded hover:scale-105 transition"
          onClick={() => setStep("certificate")}
        >
          Gửi Be Chí Cốt
        </button>
        <button
          className="px-5 py-2 bg-gray-300 rounded hover:scale-105 transition"
          onClick={resetAll}
        >
          Làm lại
        </button>
      </div>
    </div>
  </div>
)}

{/* STEP 5: CERTIFICATE */}
{step === "certificate" && (
  <div
    className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-6"
    style={{ backgroundImage: "url('/bg.png')" }}
  >
    <div className="flex flex-col items-center bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        Chứng nhận tình bạn
      </h2>

      {/* Canvas hiển thị chứng nhận */}
      <canvas
        ref={canvasRef}
        width={868}
        height={760}
        className="w-full max-w-[500px] rounded-lg shadow mb-4"
      />

      <div className="flex gap-4">
        {/* 1️⃣ Lưu về máy */}
        <button
          onClick={() => {
            const c = canvasRef.current;
            const a = document.createElement("a");
            a.href = c.toDataURL("image/png");
            a.download = "be-chi-cot-certificate.png";
            a.click();
          }}
          className="px-5 py-2 bg-yellow-500 text-white rounded shadow hover:scale-105 transition"
        >
          Lưu lại
        </button>

        {/* 2️⃣ Chia sẻ Facebook */}
        <button
          onClick={async () => {
            const c = canvasRef.current;
            const blob = await new Promise((resolve) => c.toBlob(resolve, "image/png"));

            const formData = new FormData();
            formData.append("file", blob);
            formData.append("upload_preset", "microsite_cert"); // đổi tên preset Cloudinary

            try {
              const res = await fetch(
                "https://api.cloudinary.com/v1_1/dxrfxl6v7/image/upload",
                { method: "POST", body: formData }
              );
              const data = await res.json();
              if (data.secure_url) {
                const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  data.secure_url
                )}`;
                window.open(fbShareUrl, "_blank");
              }
            } catch (err) {
              console.error(err);
              alert("Share thất bại");
            }
          }}
          className="px-5 py-2 bg-blue-600 text-white rounded shadow hover:scale-105 transition"
        >
          Chia sẻ
        </button>

        {/* 3️⃣ Làm lại */}
        <button
          onClick={resetAll}
          className="px-5 py-2 bg-gray-300 rounded shadow hover:scale-105 transition"
        >
          Làm lại
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
