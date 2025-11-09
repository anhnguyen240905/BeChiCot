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
// Component hiển thị từng ô (task)
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

// Component popup chọn gợi ý thay thế
function SuggestModal({ task, onChoose, onClose }) {
  if (!task) return null;

  const alternatives = {
    "Anh Kiên Be ship bánh mì Hội An": ["Bún chả bà Dung", "Cơm tấm sườn bì", "Bánh cuốn nóng"],
    "Anh Đức Be giao hợp đồng": ["Anh Đức Be gửi quà cho đối tác", "Anh Đức Be họp với sếp", "Anh Đức Be ship trà sữa"],
    "Anh Sơn Be chở đi học": ["Anh Sơn Be chở đi làm", "Anh Sơn Be chở đi gym", "Anh Sơn Be chở đi cafe"],
    "Chạy deadline": ["Đi xem phim", "Đi chơi với bạn", "Ngủ sớm nạp năng lượng"]
  };

  const options = alternatives[task.title] || [];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-80 shadow-lg text-center">
        <h3 className="font-semibold mb-4">Chọn gợi ý thay thế</h3>
        <div className="flex flex-col gap-2">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => onChoose(task, opt)}
              className="px-4 py-2 bg-yellow-100 hover:bg-yellow-200 rounded"
            >
              {opt}
            </button>
          ))}
        </div>
        <button onClick={onClose} className="mt-4 text-sm text-gray-500">Đóng</button>
      </div>
    </div>
  );
}

export default function BeChiCotMicrosite() {
  function EditableSlot({ slot }) {
  const [editing, setEditing] = React.useState(false);
  const [title, setTitle] = React.useState(slot.title);

  return (
    <div
      onClick={() => setEditing(true)}
      className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer border-4 border-transparent hover:border-yellow-400 transition-all duration-200"
      style={{
        backgroundImage: `url(${slot.img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "150px",
      }}
    >
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        {editing ? (
          <input
            autoFocus
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setEditing(false)}
            className="bg-white/80 text-black px-2 py-1 rounded w-3/4 text-sm"
          />
        ) : (
          <p className="text-white text-center font-medium px-2">{title}</p>
        )}
      </div>

      <div className="absolute top-2 left-2 bg-white/70 text-xs px-2 py-1 rounded">
        {slot.time}
      </div>
    </div>
  );
}
  const [role, setRole] = useState(null);
  const [step, setStep] = useState("chooseRole");
  const canvasRef = useRef(null);

    const [editableTasks, setEditableTasks] = useState([
    { id: 1, title: "Anh Sơn Be chở đi học", time: "07:00" },
    { id: 2, title: "Anh Kiên Be ship bánh mì Hội An", time: "07:30" },
    { id: 3, title: "Đi học ở trường", time: "08:00" },
    { id: 4, title: "Anh Đức Be giao hợp đồng", time: "15:00" },
    { id: 5, title: "Chạy deadline", time: "21:00" },
  ]);
  const [selectedTask, setSelectedTask] = useState(null);

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
  const handleSelectTask = (task) => setSelectedTask(task);

  const handleChooseAlternative = (task, newTitle) => {
    setEditableTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, title: newTitle } : t))
    );
    setSelectedTask(null);
  };

  const handleFinishEditing = () => {
    setStep("finalTimetable");
  };

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
      ctx.fillStyle = "#222";

      const feelingsText = ugc.feelings.length > 0 ? ugc.feelings.join(", ") : "(Chưa nhập)";
      const storyText = ugc.story || "(Chưa nhập)";
      const promisesText = ugc.promises.length > 0 ? ugc.promises.join(", ") : "(Chưa nhập)";

      drawSingleLineText(ctx, feelingsText, 140, 340, 600, 18, 10);
      drawSingleLineText(ctx, storyText, 140, 420, 600, 18, 10);
      drawSingleLineText(ctx, promisesText, 140, 500, 600, 18, 10);

      ctx.font = "bold 20px Arial";
      ctx.fillStyle = "#000000";
      ctx.fillText("Be Chí Cốt", 360, 630);
    };
  };

  // useEffect tự vẽ khi bước certificate
  useEffect(() => {
    if (step === "certificate") generateCertificate();
  }, [step]);
  
  return (
    <div
  className="min-h-screen bg-cover bg-center relative text-gray-800"
  style={{ backgroundImage: "url('/bg.png')" }} // ảnh background microsite
>
          
{step === "chooseRole" && (
  <div className="flex flex-col items-center justify-center min-h-screen text-center">
    {/* Ảnh tiêu đề “Bạn là” */}
    <img
      src="/banla.png"
      alt="Bạn là"
      className="w-[22rem] md:w-[26rem] mb-4"
    />

    {/* Hai nút ảnh đều to và thẳng hàng */}
    <div className="flex flex-col gap-1 md:gap-2 items-center justify-center mt-2">
      <button
        onClick={() => {
          setRole("student");
          setStep("pickTimetable");
        }}
        className="w-full"
      >
        <img
          src="/sinhvien.png"
          alt="Sinh viên"
          className="w-full max-w-xl h-auto hover:scale-105 transition-transform duration-200"
        />
      </button>

      <button
        onClick={() => {
          setRole("worker");
          setStep("pickTimetable");
        }}
        className="w-full"
      >
        <img
          src="/nguoidilam.png"
          alt="Người đi làm"
          className="w-full max-w-xl h-auto hover:scale-105 transition-transform duration-200"
        />
      </button>
    </div>
  </div>
)}

          {/* STEP 2: CHỌN THỜI KHÓA BIỂU */}
          {step === "pickTimetable" && (
            <div className="flex flex-col items-center">
              <img src="/chonlichtrinh.png" alt="Chọn lịch trình" className="w-[600px] mb-4" /> {/* ô “Chọn lịch trình...” */}

              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mt-2">
                {role === "student" && (
                  <>
                    <button onClick={() => setStep("suggestTimetable")}>
                      <img src="/svtkb1.jpg" alt="TKB sinh viên 1" className="w-[210px] rounded-lg hover:scale-105 transition" /> {/* ảnh TKB1 */}
                    </button>
                    <button onClick={() => setStep("suggestTimetable")}>
                      <img src="/svtkb2.jpg" alt="TKB sinh viên 2" className="w-[210px] rounded-lg hover:scale-105 transition" /> {/* ảnh TKB2 */}
                    </button>
                  </>
                )}

                {role === "worker" && (
                  <>
                    <button onClick={() => setStep("suggestTimetable")}>
                      <img src="/ndltkb1.jpg" alt="TKB người đi làm 1" className="w-[210px] rounded-lg hover:scale-105 transition" /> {/* có thể thay bằng ảnh riêng */}
                    </button>
                    <button onClick={() => setStep("suggestTimetable")}>
                      <img src="/ndltkb2.jpg" alt="TKB người đi làm 2" className="w-[210px] rounded-lg hover:scale-105 transition" />
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: GỢI Ý BE CHÍ CỐT */}
          {step === "suggestTimetable" && (
            <div className="flex flex-col items-center">
              <img src="/goiy1.png" alt="Be gợi ý" className="w-110 mb-4" /> {/* ô “Be Chí Cốt gợi ý...” */}
              <img src="/svtkb1goiy.jpg" alt="TKB gợi ý" className="w-[210px] rounded-lg shadow-lg mb-6" /> {/* ảnh thời khóa biểu gợi ý */}

              <div className="flex gap-4">
                <button
                  onClick={() => setStep("ugc")}
                  className="px-4 py-2 bg-yellow-500 text-white rounded shadow"
                >
                  Xác nhận
                </button>
                <button
                  onClick={() => setStep("editTimetable")}
                  className="px-4 py-2 bg-blue-200 rounded"
                >
                  Chỉnh sửa lịch trình
                </button>
              </div>
            </div>
          )}
      
{/* STEP 3.5: LỊCH TRÌNH TƯƠNG TÁC (editable timetable) */}
{step === "editTimetable" && (
  <div
    className="min-h-screen bg-cover bg-center flex flex-col items-center justify-start p-6 text-center"
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
    />
  </div>
)}

{/* STEP 3.6: LỊCH TRÌNH HOÀN CHỈNH */}
{step === "finalTimetable" && (
  <div
    className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-6 text-center"
    style={{ backgroundImage: "url('/bg.png')" }}
  >
    <div className="bg-white/85 backdrop-blur-md shadow-lg rounded-2xl p-6 max-w-2xl w-full">
      <h2 className="text-2xl font-semibold mb-4 text-yellow-800">
        Lịch trình hoàn chỉnh của bạn
      </h2>

      <div className="divide-y divide-gray-200">
        {editableTasks.map((t, i) => (
          <div
            key={t.id}
            className={`py-3 px-4 text-left ${
              i % 2 === 0 ? "bg-gray-50" : "bg-white"
            } rounded-lg`}
          >
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
      <h2 className="text-2xl font-bold mb-6 text-center text-yellow-800">
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
                : "hover:bg-gray-50"
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
                : "hover:bg-gray-50"
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

      <canvas
        ref={canvasRef}
        width={868}
        height={760}
        className="w-full max-w-[500px] rounded-lg shadow mb-4"
      />

      <div className="flex gap-4">
        {/* Tải về */}
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

        {/* Làm lại */}
        <button
          onClick={resetAll}
          className="px-5 py-2 bg-gray-300 rounded hover:scale-105 transition"
        >
          Làm lại
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
      )}
    </div>
  );
}
