/* 
BE CHÍ CỐT — Microsite (Next.js + Tailwind)
Version: 2025
*/

import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";

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

  const alternatives1 = {
    "Anh Kiên Be ship bánh mì Hội An": ["Anh Kiên Be ship bánh bao","Anh Kiên Be ship xôi xéo","Anh Kiên Be ship cháo sườn"],
    "Anh Thiên Be ship bún chả bà Dung": ["Anh Thiên Be ship bún mắm Đà Nẵng","Anh Thiên Be ship bánh canh cua Sài Gòn","Anh Thiên Be ship bún hải sản"],
    "Anh Đức Be giao hợp đồng cho đối tác": ["Anh Đức Be giao quà cho đối tác","Anh Đức Be giao hàng cho khách","Anh Đức Be giao quà cho ngiu"],
    "Anh Minh Be ship trà sữa": ["Anh Minh Be ship trà chanh lô hội","Anh Minh Be ship chè mít","Anh Minh Be ship sinh tố xoài"],
  };
  const alternatives2 = {
    "Anh Phúc Be giao bánh bao trứng muối": ["Anh Phúc Be giao bánh dày","Anh Phúc Be giao bánh cuốn","Anh Phúc Be giao bánh ướt"],
    "Anh Thiện Be giao phở bò Nam Định": ["Anh Thiện Be giao bún riêu","Anh Thiện Be giao cơm Tấm","Anh Thiện Be giao mì hải sản"],
    "Anh Hải Be giao Matcha Latte": ["Anh Hải Be giao sữa tươi trân châu đường đen","Anh Hải Be giao rau má mix","Anh Hải Be giao trà xoài"],
  };
  const alternatives3 = {
    "Anh Cường Be ship phở bò": ["Anh Cường Be ship bánh mì Hội An","Anh Cường Be ship bánh cuốn","Anh Cường Be ship xôi gà"],
    "Anh Nam Be ship lẩu thái 1 người ăn": ["Anh Nam Be ship bún đậu mắm tôm","Anh Nam Be ship bún ốc nguội","Anh Nam Be ship nem chua rán"],
    "Chị Lan Be ship bánh tráng trộn và trà sữa": ["Chị Lan Be ship bánh mì nướng muối ớt","Chị Lan Be ship tàu phớ","Chị Lan Be ship mì cay"],
  };
  const alternatives4 = {
    "Anh Minh Be ship xôi thập cẩm": ["Anh Minh Be ship bánh mì xíu mại","Anh Minh Be ship bánh đúc nóng","Anh Minh Be ship bánh ướt"],
    "Anh Thiện Be ship nem nướng": ["Anh Thiện Be ship nem nướng Tân Việt","Anh Thiện Be ship bún chả bà Dung","Anh Thiện Be ship ngan cháy tỏi"],
    "Anh Linh Be ship hồ sơ cho đối tác": ["Anh Linh Be ship thư tình cho crush","Anh Linh Be ship hàng cho khách","Anh Linh Be ship quà cho khách"],
    "Anh Bách Be ship Starbuck": ["Anh Bách Be ship trà sữa thái xanh","Anh Bách Be ship chè Thái","Anh Bách Be ship tàu phớ"],
  };

  const alternatives = 
    timetableVersion === "svtkb1goiy" ? alternatives1 :
    timetableVersion === "svtkb2goiy" ? alternatives2 :
    timetableVersion === "ndltkb1goiy" ? alternatives4 : alternatives3;

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
  const [introPage, setIntroPage] = useState(1);
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const timetableTemplate1 = [
    { id: 2, title: "Anh Kiên Be ship bánh mì Hội An", time: "07:00" },
    { id: 4, title: "Anh Thiên Be ship bún chả bà Dung", time: "11:30" },
    { id: 7, title: "Anh Đức Be giao hợp đồng cho đối tác", time: "15:00" },
    { id: 13, title: "Anh Minh Be ship trà sữa", time: "20:30" },
  ];
  const timetableTemplate2 = [
    { id: 1, title: "Anh Phúc Be giao bánh bao trứng muối", time: "08:00" },
    { id: 4, title: "Anh Thiện Be giao phở bò Nam Định", time: "10:30" },
    { id: 8, title: "Anh Hải Be giao Matcha Latte", time: "15:00" },
  ];
  const timetableTemplate3 = [
    { id: 1, title: "Anh Cường Be ship phở bò", time: "08:30" },
    { id: 3, title: "Anh Nam Be ship lẩu thái 1 người ăn", time: "12:00" },
    { id: 12, title: "Chị Lan Be ship bánh tráng trộn và trà sữa", time: "21:00" },
  ];
  const timetableTemplate4 = [
    { id: 2, title: "Anh Minh Be ship xôi thập cẩm", time: "07:00" },
    { id: 4, title: "Anh Thiện Be ship nem nướng", time: "12:00" },
    { id: 6, title: "Anh Linh Be ship hồ sơ cho đối tác", time: "14:00" },
    { id: 7, title: "Anh Bách Be ship Starbuck", time: "16:00" },
  ];

  const [editableTasks, setEditableTasks] = useState(timetableTemplate1);

  const handleSelectTask = (task) => setSelectedTask(task);
  const handleChooseAlternative = (task, newTitle) => {
    setEditableTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, title: newTitle } : t))
    );
    setSelectedTask(null);
  };
  const handleFinishEditing = () => setStep("finalTimetable");
  const resetAll = () => {
    setRole(null);
    setStep("chooseRole");
    setSelectedTimetable(null);
    setEditableTasks(timetableTemplate1);
  };

  // Mẫu full timetable (demo)
  const fullTimetableStudent1 = timetableTemplate1;
  const fullTimetableStudent2 = timetableTemplate2;
  const fullTimetableWorker1 = timetableTemplate3;
  const fullTimetableWorker2 = timetableTemplate4;

  const finalFullTimetable =
    selectedTimetable === "svtkb1goiy" ? fullTimetableStudent1 :
    selectedTimetable === "svtkb2goiy" ? fullTimetableStudent2 :
    selectedTimetable === "ndltkb1goiy" ? fullTimetableWorker2 :
    fullTimetableWorker1;

  return (
    <>
      <Head>
        <title>Be Chí Cốt Microsite</title>
      </Head>

      {introPage <= 6 ? (
        <IntroSlides onStart={() => setIntroPage(7)} />
      ) : (
        <div className="min-h-screen bg-cover bg-center relative text-gray-800" style={{ backgroundImage: "url('/bg.png')" }}>
          <audio ref={audioRef} src="/bgmusic.mp3" loop />
          <button onClick={() => setIsPlaying(!isPlaying)} className="fixed top-4 right-4 px-3 py-1 bg-yellow-500 text-white rounded shadow">
            {isPlaying ? "Tắt nhạc" : "Bật nhạc"}
          </button>

          {step === "chooseRole" && (
            <div className="flex flex-col items-center justify-center min-h-screen text-center">
              <img src="/banla.png" alt="Bạn là" className="w-[22rem] md:w-[26rem] mb-4" />
              <div className="flex flex-col gap-2">
                <button onClick={() => { setRole("student"); setStep("pickTimetable"); }}>
                  <img src="/sinhvien.png" alt="Sinh viên" className="w-full max-w-xl h-auto hover:scale-105 transition-transform duration-200" />
                </button>
                <button onClick={() => { setRole("worker"); setStep("pickTimetable"); }}>
                  <img src="/nguoidilam.png" alt="Người đi làm" className="w-full max-w-xl h-auto hover:scale-105 transition-transform duration-200" />
                </button>
              </div>
            </div>
          )}

{/* STEP 2: PICK TIMETABLE */}
{step === "pickTimetable" && (
  <div className="flex flex-col items-center">
    <img src="/chonlichtrinh.png" className="w-[800px] mb-4" />

    {/* Nếu là SINH VIÊN */}
    {role === "student" && (
      <div className="flex gap-6">
        <button
          onClick={() => {
            setSelectedTimetable("svtkb1goiy");
            setEditableTasks(timetableTemplate1.map((t) => ({ ...t })));
            setStep("suggestTimetable");
          }}
        >
          <img src="/svtkb1.jpg" className="w-[250px] rounded-lg hover:scale-105 transition" />
        </button>
        <button
          onClick={() => {
            setSelectedTimetable("svtkb2goiy");
            setEditableTasks(timetableTemplate2.map((t) => ({ ...t })));
            setStep("suggestTimetable");
          }}
        >
          <img src="/svtkb2.jpg" className="w-[250px] rounded-lg hover:scale-105 transition" />
        </button>
      </div>
    )}

    {/* Nếu là NGƯỜI ĐI LÀM */}
    {role === "worker" && (
      <div className="flex gap-6">
        <button
          onClick={() => {
            setSelectedTimetable("ndltkb2goiy");
            setEditableTasks(timetableTemplate3.map((t) => ({ ...t })));
            setStep("suggestTimetable");
          }}
        >
          <img src="/ndltkb2.jpg" className="w-[250px] rounded-lg hover:scale-105 transition" />
        </button>
        <button
          onClick={() => {
            setSelectedTimetable("ndltkb1goiy");
            setEditableTasks(timetableTemplate4.map((t) => ({ ...t })));
            setStep("suggestTimetable");
          }}
        >
          <img src="/ndltkb1.jpg" className="w-[250px] rounded-lg hover:scale-105 transition" />
        </button>
      </div>
    )}
  </div>
)}

{/* STEP 3: SUGGEST TIMETABLE */}
{step === "suggestTimetable" && (
  <div className="flex flex-col items-center">
    <img src="/goiy1.png" alt="Be gợi ý" className="w-[800px] mb-4" />
    <img
      src={`/${selectedTimetable || "svtkb1goiy"}.jpg`}
      className="w-[250px] rounded-lg shadow-lg mb-6"
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
        className="px-4 py-2 bg-blue-100 rounded shadow"
      >
        Chỉnh sửa lịch trình
      </button>
    </div>
  </div>
)}

{/* STEP 3.5: EDIT TIMETABLE */}
{step === "editTimetable" && (
  <div
    className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-6 text-center"
    style={{ backgroundImage: "url('/bg.png')" }}
  >
    <div className="flex flex-col items-center bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6">
      <img src="/tuychinh.png" className="w-[800px] mb-4" />

      <div className="grid grid-cols-1 gap-8 w-full max-w-3xl">
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
  </div>
)}

{/* STEP 3.6: FINAL TIMETABLE */}
{step === "finalTimetable" && (
  <div
    className="min-h-screen bg-cover bg-center flex justify-center items-center p-6"
    style={{ backgroundImage: "url('/bg.png')" }}
  >
    <div className="bg-white/95 shadow-lg rounded-2xl p-8 max-w-xl w-full flex flex-col items-center text-center">
      <img
        src="/lichtrinhfinal.png"
        className="w-[600px] mb-6"
        alt="Lịch trình cuối cùng"
      />

      <div className="divide-y divide-gray-200 w-full mb-6 rounded-lg overflow-hidden">
        {finalFullTimetable.map((task) => {
          const editedTask = editableTasks.find((t) => t.id === task.id);
          const displayTitle = editedTask ? editedTask.title : task.title;

          return (
            <div
              key={task.id}
              className={`py-3 px-4 text-left rounded ${
                task.editable
                  ? "bg-yellow-100 border-l-4 border-yellow-400"
                  : "bg-blue-500 text-white"
              }`}
            >
              <p className="text-sm opacity-90">{task.time}</p>
              <p className="font-medium">{displayTitle}</p>
            </div>
          );
        })}
      </div>

      <div className="flex gap-4 mt-2">
        <button
          onClick={() => setStep("ugc")}
          className="px-6 py-3 bg-yellow-500 text-white rounded shadow hover:scale-105 transition"
        >
          Xác nhận & Tiếp tục
        </button>

        <button
          onClick={() => setStep("editTimetable")}
          className="px-6 py-3 bg-gray-300 text-gray-700 rounded shadow hover:scale-105 transition"
        >
          Quay lại
        </button>
      </div>
    </div>
  </div>
)}

{/* STEP 4: UGC FORM */}
{step === "ugc" && (
  <div
    className="min-h-screen bg-cover bg-center flex items-center justify-center p-6"
    style={{ backgroundImage: "url('/bg.png')" }}
  >
    <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-8 max-w-3xl w-full text-gray-800 flex flex-col gap-4 overflow-auto">
      
      <img
        src="/chiase.png"
        alt="Chia sẻ trải nghiệm cùng Be Chí Cốt"
        className="w-[1500px] mb-4 self-center"
      />

      {/* Step 1 - Cảm nghĩ */}
      <h3 className="font-semibold mb-0">Cảm nghĩ sau buổi "First Date" cùng Be Chí Cốt</h3>
      <p className="text-sm text-gray-500 mt-1 mb-2">Chọn tối đa 2 lựa chọn bạn nhé</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
        {feelingsOptions.map((f) => (
          <label
            key={f}
            className={`p-2 border rounded cursor-pointer text-sm ${
              ugc.feelings.includes(f)
                ? "bg-yellow-100 border-yellow-400"
                : "hover:bg-gray-100"
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
      <h3 className="font-semibold mb-0">Hứa hẹn cho những buổi "date" tiếp theo</h3>
      <p className="text-sm text-gray-500 mt-1 mb-2">Chọn tối đa 2 lựa chọn bạn nhé</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
        {promisesOptions.map((p) => (
          <label
            key={p}
            className={`p-2 border rounded cursor-pointer text-sm ${
              ugc.promises.includes(p)
                ? "bg-yellow-100 border-yellow-400"
                : "hover:bg-gray-100"
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

      {/* Nút gửi / làm lại */}
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

      {/* Canvas hiển thị chứng nhận */}
      <canvas
        ref={canvasRef}
        width={868}
        height={760}
        className="w-full max-w-[700px] rounded-lg shadow mb-4"
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
            formData.append("upload_preset", "microsite_cert"); // Cloudinary preset

            try {
              const res = await fetch(
                "https://api.cloudinary.com/v1_1/dxrfxl6v7/image/upload",
                { method: "POST", body: formData }
              );
              const data = await res.json();
              if (data.secure_url) {
                const caption = `First date cùng cốt tại: https://your-vercel-link.vercel.app

#BeChíCốt #CốtChìuBạnChill #NgàyNhịpNhàngBớtLoToang #FirstdatecungCot #marketingonair #MOA2025_Activation #be`;

                const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  data.secure_url
                )}&quote=${encodeURIComponent(caption)}`;

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
</>
);
